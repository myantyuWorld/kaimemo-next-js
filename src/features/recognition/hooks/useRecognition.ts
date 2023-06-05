import { useState, useRef, useCallback } from "react";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";
import { createWorker, Worker } from 'tesseract.js';

interface Recognition {
  Upload: () => void;
  Capture: () => void;
  Reset: () => void;
}

export const useRecognition = (): [any, any, string, string, Recognition] => {
  const [base64Img, setBase64Img] = useState<any>(null);
  const [textOcr, setTextOcr] = useState('');
  const webcamRef = useRef<Webcam>(null);

  const videoConstraints = {
    width: 640,
    height: 360,
    facingMode: "environment"
  };
  const Capture = useCallback(
    async () => {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
        setBase64Img(imageSrc)
        setTextOcr('')
        tryOcr(imageSrc)
      }
    },
    [webcamRef]
  );

  const Upload = useCallback(
    async () => {
      // アップロード時のファイル名を作成
      let today = new Date();

      let year = today.getFullYear();
      let month = today.getMonth() + 1;
      let date = today.getDate();
      let hour = today.getHours();
      let min = today.getMinutes();
      let second = today.getSeconds()
      const fileName = `${year}_${month}_${date}_${hour}_${min}_${second}.png`;
      const client = new S3Client({
        region: process.env.NEXT_PUBLIC_REGION,
        credentials: {
          accessKeyId: `${process.env.NEXT_PUBLIC_ACCESS_KEY_ID}`,
          secretAccessKey: `${process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY}`,
        },
      });
      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        Key: fileName,
        Body: Buffer.from(base64Img.replace(/^data:\w+\/\w+;base64,/, ''), 'base64'),
      };
      try {
        const command = new PutObjectCommand(params);
        await client.send(command);

        setBase64Img(null)
        setTextOcr("")
        // TODO : 簡単なトースト通知を行うようにする
        alert("upload complete")
      } catch (error) {
        // TODO : 簡単なトースト通知を行うようにする
        console.error('画像アップロードエラー:', error);
        alert(error)
      }
    },
    [base64Img]
  );

  const Reset = () => {
    setBase64Img(null)
    setTextOcr("")
  }
  const tryOcr = async (buffer: string) => {
    const worker: Promise<Worker> = createWorker({
      logger: m => console.log(m)
    })
    await (await worker).load();
    await (await worker).loadLanguage('eng');
    await (await worker).initialize('eng');
    await (await worker).setParameters({
      tessedit_ocr_engine_mode: Tesseract.OEM.TESSERACT_ONLY,
      tessedit_char_whitelist: '0123456789',
      tessedit_pageseg_mode: Tesseract.PSM.SINGLE_WORD
    });
    const { data: { text } } = await (await worker).recognize(buffer);
    await (await worker).terminate();
    setTextOcr(text)

  }


  return [webcamRef, videoConstraints, textOcr, base64Img, { Upload, Capture, Reset }]
}