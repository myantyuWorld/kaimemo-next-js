import { Container, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import Calculator from "../features/calculator/components/Calculator";
import BaseTitle from "../components/elements/Title/BaseTitle";

export default function Calc() {
  return (
    <>
      <Link href="/">
        <BaseTitle/>
      </Link>
      <Calculator />
    </>
  )
}