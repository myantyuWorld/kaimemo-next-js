import { Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import React from "react";

import Webcam from "react-webcam";
import { createWorker } from 'tesseract.js';

export default function Recognition() {
  const API_URL = "https://fby1jt4nzc.execute-api.ap-northeast-1.amazonaws.com/Prod/recognition"

  const [base64Img, setBase64Img] = React.useState<any>(null);
  const [textOcr, setTextOcr] = React.useState('');
  const webcamRef = React.useRef<Webcam>(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment"
  };
  const worker = createWorker({
    logger: m => console.log(m)
  })
  const capture = React.useCallback(
    async () => {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
        setBase64Img(imageSrc)

        setTextOcr('Recognizing...')
        // TODO : bug
        // await tryOcr();
      }
    },
    [webcamRef]
  );
  const recognition = React.useCallback(
    () => {
      console.log("撮影した画像を、解析に回す")
      fetch(API_URL, {
        mode: "cors",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ img : base64Img }),
      });
    },
    [base64Img]
  );
  const tryOcr = async() => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(file);
    setTextOcr(text);
    await worker.terminate();
  }
  return (
    <>
      <Head>
        <title>Kaimemo!</title>
      </Head>
      <Typography variant='h5' mt={1}><Link href="/">Kaimemo</Link></Typography>
      <Grid container spacing={0} mt={1}>
        <Grid item xs={12}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            height={300}
            width={390}
            videoConstraints={videoConstraints}
          />
        </Grid>
        <Grid item xs={12}>
          {textOcr}
        </Grid>
        <Grid item xs={12}>
          <img src={base64Img} height={300}/>
        </Grid>
        <Grid item xs={12}>
          <button onClick={capture}>Capture photo</button>
          <button onClick={() => setBase64Img(null)}>delete</button>
          <button onClick={recognition}>recognition</button>
        </Grid>
      </Grid>
    </>
  )
}