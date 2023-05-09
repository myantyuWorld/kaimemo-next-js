import * as React from 'react';
import Head from 'next/head'
import { Button, Container } from '@mui/material';

import InputMemo from '../components/InputMemo';
import MemoList from '../components/MemoList';

export default function Home() {
  const _memoList = [
    {
      category: "food",
      description: "ビール",
      deleted: false
    },
    {
      category: "food",
      description: "アスパラガス",
      deleted: false
    },
    {
      category: "food",
      description: "納豆",
      deleted: false
    },
    {
      category: "soap",
      description: "猫の餌",
      deleted: false
    },
    {
      category: "soap",
      description: "猫トイレシート",
      deleted: false
    },
  ]
  const [memoList, setMemoList] = React.useState(_memoList)
  const handleClick = () => {
    setMemoList([...memoList, {
      category: "soap",
      description: "Add",
      deleted: false
    }])
  }

  // 子→親
  // https://qiita.com/aliceroot0678/items/e4eabcbe3f9f79cada55
  const handleDeleteMemo = (selectedIndex: number) => {
    setMemoList(
      memoList.filter((memo, index) => (index != selectedIndex))
    )
  }

  return (
    <>
      <Head>
        <title>Kaimemo!</title>
      </Head>
      <Container maxWidth="md">
        <InputMemo></InputMemo>
        <Button onClick={handleClick} variant='contained'>test button</Button>
        <MemoList data={memoList} handleDeleteMemo={handleDeleteMemo}></MemoList>
      </Container>
    </>
  );

}
