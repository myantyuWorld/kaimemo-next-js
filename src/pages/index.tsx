import * as React from 'react';
import Head from 'next/head'
import { Button, Container } from '@mui/material';

import InputMemo from '../components/InputMemo';
import MemoList from '../components/MemoList';
import useSWR from 'swr'


export default function Home() {
  // https://zenn.dev/uttk/articles/b3bcbedbc1fd00
  const fetcher = (url: string): Promise<any> => fetch(url).then(res => res.json());

  // http://os3-357-11662.vs.sakura.ne.jp:18083/rakuzaim08/vue/memo/index
  // [{"mmid":1183,"mmsb":1,"mmnm":"袋とじ","count":0,"deleteFlg":0}]
  const { data, error } = useSWR('/api/memo', fetcher)

  const handleRegistMemo = (data: { category: string; description: string; deleted: boolean; }) => {
    setMemoList([...memoList, data])
  }

  // 子→親
  // https://qiita.com/aliceroot0678/items/e4eabcbe3f9f79cada55
  const handleDeleteMemo = (mmid: number) => {
    console.log(mmid)
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
        <MemoList data={data.data} handleDeleteMemo={handleDeleteMemo}></MemoList>
      </Container>
    </>
  );

}
