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