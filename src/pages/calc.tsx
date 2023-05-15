import { Container, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

export default function Calc() {
  return (
    <>
      <Head>
        <title>Kaimemo!</title>
      </Head>
      <Container maxWidth="md">
        <Typography variant='h5' mt={1}>Kaimemo!</Typography>
        <Link href="/">back to Kaimemo</Link>
      </Container >
    </>
  )
}