import { Container } from "@mui/material";
import Head from "next/head";

export default function Layout({ children }) {
  const containerStyle = {
    background: "#f3d2c1"
  }

  return (
    <>
      <Head>
        <title>Kaimemo!</title>
      </Head>
      <Container maxWidth="md" sx={containerStyle}>
        <main>{children}</main>
      </Container>
    </>
  );
}