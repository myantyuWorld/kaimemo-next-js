import React from "react";
import Link from "next/link";
import { Button, Card, CardContent, Container, Grid, Skeleton, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";
import { createWorker, Worker } from 'tesseract.js';

import BaseTitle from "../components/elements/Title/BaseTitle";
import CardTitle from "../components/elements/Title/CardTitle";
import { useRecognition } from "../features/recognition/hooks/useRecognition";

export default function Recognition() {
  const [webcamRef, videoConstraints, textOcr, base64Img, handlerCapture, handlerResetCapture, handlerUploadCaptureImageOfS3] = useRecognition()
  
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
              <button onClick={handlerCapture}>Capture</button>
              <Button variant="contained" color="error" onClick={handlerResetCapture} startIcon={<DeleteForeverIcon />}></Button>
              <button onClick={handlerUploadCaptureImageOfS3}>recognition</button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}