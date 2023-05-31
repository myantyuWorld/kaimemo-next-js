import { Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Webcam from "react-webcam";

export default function Recognition() {
  const API_URL = "https://fby1jt4nzc.execute-api.ap-northeast-1.amazonaws.com/Prod/recognition"

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment"
  };
  const webcamRef = React.useRef<Webcam>(null);
  const [url, setUrl] = React.useState<any>(null);
  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
        setUrl(imageSrc)
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
        body: JSON.stringify({ img : url }),
      });
    },
    [url]
  );
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
          <img src={url} />
        </Grid>
        <Grid item xs={12}>
          <button onClick={capture}>Capture photo</button>
          <button onClick={() => setUrl(null)}>delete</button>
          <button onClick={recognition}>recognition</button>
        </Grid>
      </Grid>
    </>
  )
}