import { Container, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import Calculator from "../components/Calculator";

export default function Calc() {
  return (
    <>
      <Head>
        <title>Kaimemo!</title>
      </Head>
      <Typography variant='h5' mt={1}><Link href="/">Kaimemo</Link></Typography>
      <Calculator />
      
    </>
  )
}