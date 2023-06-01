import { DeleteForever } from "@mui/icons-material";
import { Button, Card, CardContent, Container, Grid, Skeleton, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Head from "next/head";
import Link from "next/link";
import React from "react";

import Webcam from "react-webcam";
import Tesseract from "tesseract.js";
import { createWorker, Worker } from 'tesseract.js';

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
  const capture = React.useCallback(
    async () => {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
        setBase64Img(imageSrc)

        setTextOcr('')
        // TODO : bug
        tryOcr(imageSrc)
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
        body: JSON.stringify({ img: base64Img }),
      });
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
  const containerStyle = {
    background: "#f3d2c1"
  }
  const titleStyle = {
    color: "#001858"
  }
  return (
    <>
      <Head>
        <title>Kaimemo!</title>
      </Head>
      <Container maxWidth="md" sx={containerStyle}>
        <Typography variant='h3' sx={titleStyle}><Link href="/">Kaimemo!</Link></Typography>
        <Grid container spacing={0} mt={1}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant='h6' sx={titleStyle} mb={1}>プレビュー</Typography>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={300}
                  videoConstraints={videoConstraints}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} mt={1}>
            <Card>
              <CardContent>
                <Typography variant='h6' sx={titleStyle} mb={1}>解析結果数字</Typography>
                {
                  textOcr === "" ? <Skeleton animation="wave"/> : textOcr
                }
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} mt={1}>
            <Card>
              <CardContent>
                <Typography variant='h6' sx={titleStyle} mb={1}>スクリーンショット</Typography>
                {
                  base64Img ? <img src={base64Img} height={100} /> : <Skeleton  animation="wave" height={100}/>
                }
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} mt={1}>
            <Card>
              <CardContent>
                <button onClick={capture}>Capture</button>
                <Button variant="contained" color="error" onClick={onClickDelete} startIcon={<DeleteForeverIcon/>}></Button>
                <button onClick={recognition}>recognition</button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}