import { Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Webcam from "react-webcam";


export default function Recognition() {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  const webcamRef = React.useRef(null);
  const [url, setUrl] = React.useState<string | null>(null);
  // TODO : 赤波線をなくす
  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setUrl(imageSrc)
      }
    },
    [webcamRef]
  );
  const recognition = React.useCallback(
    () => {
      console.log("撮影した画像を、解析に回す")
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