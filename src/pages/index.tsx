import * as React from 'react';
import Head from 'next/head'
import { Button, Container } from '@mui/material';

import InputMemo from '../components/InputMemo';
import MemoList from '../components/MemoList';
import useSWR from 'swr'


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

  // https://zenn.dev/uttk/articles/b3bcbedbc1fd00
  const fetcher = (url: string): Promise<any> => fetch(url).then(res => res.json());
  const { data, error } = useSWR('/api/memo', fetcher)

  // const [memoList, setMemoList] = React.useState(_memoList)
  const [memoList, setMemoList] = React.useState(data.data)
  const handleClick = () => {
    setMemoList([...memoList, {
      category: "soap",
      description: "Add",
      deleted: false
    }])
  }

  const handleRegistMemo = (data: { category: string; description: string; deleted: boolean; }) => {
    setMemoList([...memoList, data])
  }

  // 子→親
  // https://qiita.com/aliceroot0678/items/e4eabcbe3f9f79cada55
  const handleDeleteMemo = (selectedIndex: number) => {
    setMemoList(
      memoList.filter((memo, index) => (index != selectedIndex))
    )
  }

  if (error)return <div>failed to load</div>
	if (!data)return <div>loading...</div>

  return (
    <>
      <Head>
        <title>Kaimemo!</title>
      </Head>
      <Container maxWidth="md">
        <InputMemo handleRegistMemo={handleRegistMemo}></InputMemo>
        <MemoList data={memoList} handleDeleteMemo={handleDeleteMemo}></MemoList>
      </Container>
    </>
  );

}
