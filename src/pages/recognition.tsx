import React from "react";
import Link from "next/link";
import { Button, Card, CardContent, Container, Grid, Skeleton, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { S3 } from 'aws-sdk'
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";
import { createWorker, Worker } from 'tesseract.js';

import BaseTitle from "../components/elements/Title/BaseTitle";
import CardTitle from "../components/elements/Title/CardTitle";

export default function Recognition() {
  const [base64Img, setBase64Img] = React.useState<any>(null);
  const [textOcr, setTextOcr] = React.useState('');
  const webcamRef = React.useRef<Webcam>(null);

  const videoConstraints = {
    width: 640,
    height: 360,
    facingMode: "environment"
  };
  const capture = React.useCallback(
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
  // S3の設定
  const s3 = new S3({
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_REGION,
  });
  const recognition = React.useCallback(
    async () => {
      // アップロード時のファイル名を作成
      const fileName = `${Date.now()}.png`;
      // S3へのアップロードに必要な情報をまとめるオブジェクト
      const params: PutObjectRequest = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        Key: fileName,
        ContentType: "image/png",
        Body: Buffer.from(base64Img.replace(/^data:\w+\/\w+;base64,/, ''), 'base64'),
      };
      try {
        // S3に画像をアップロードする
        const data = await s3.upload(params).promise();
        // アップロードされた画像のURLを取得
        return data.Location;
      } catch (error) {
        // アップロードエラー発生時の処理
        console.error('画像アップロードエラー:', error);
        // null値を返す
        return null;
      }
    },
    [base64Img]
  );
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
  const onClickDelete = () => {
    setBase64Img(null)
    setTextOcr("")
  }
  return (
    <>
      <Link href="/">
        <BaseTitle />
      </Link>
      <Grid container spacing={0} mt={1}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <CardTitle title="プレビュー" />
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                height={200}
                width={300}
                videoConstraints={videoConstraints}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} mt={1}>
          <Card>
            <CardContent>
              <CardTitle title="解析結果数字" />
              {
                textOcr === "" ? <Skeleton animation="wave" /> : textOcr
              }
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} mt={1}>
          <Card>
            <CardContent>
              <CardTitle title="スクリーンショット" />
              {
                base64Img ? <img src={base64Img} height={100} /> : <Skeleton animation="wave" height={100} />
              }
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} mt={1}>
          <Card>
            <CardContent>
              <button onClick={capture}>Capture</button>
              <Button variant="contained" color="error" onClick={onClickDelete} startIcon={<DeleteForeverIcon />}></Button>
              <button onClick={recognition}>recognition</button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}