import * as React from 'react';
import Head from 'next/head'
import { Box, Button, Container, Fab, Typography } from '@mui/material';

import InputMemo from '../components/InputMemo';
import MemoList from '../components/MemoList';
import useSWR from 'swr'
import FilterMemo from '../components/FilterMemo';
import CalculateButton from '../components/CaluclationButton';
import LinearProgress from '@mui/material/LinearProgress';

export default function Home() {
  // https://zenn.dev/uttk/articles/b3bcbedbc1fd00
  const fetcher = (url: string): Promise<any> => fetch(url).then(res => res.json());

  // http://os3-357-11662.vs.sakura.ne.jp:18083/rakuzaim08/vue/memo/index
  // [{"mmid":1183,"mmsb":1,"mmnm":"袋とじ","count":0,"deleteFlg":0}]
  const API_URL = "https://fby1jt4nzc.execute-api.ap-northeast-1.amazonaws.com/Prod/memo"
  // const { data, error } = useSWR('https://fby1jt4nzc.execute-api.ap-northeast-1.amazonaws.com/Prod/memo', fetcher)
  const { data, error } = useSWR(API_URL, fetcher, { refreshInterval: 7000 })

  const postData = (data: { mmsb: string; mmnm: string; }) => {
    // fetch('https://fby1jt4nzc.execute-api.ap-northeast-1.amazonaws.com/Prod/memo', {
    fetch(API_URL, {
      mode: "cors",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mmsb: data.mmsb, mmnm: data.mmnm }),
    });
  }

  const handleRegistMemo = (data: { mmsb: string; mmnm: string; }) => {
    postData(data)
  }

  const [filterCategory, setFilterCategory] = React.useState('food');
  const handleFilterChange = (newAlignment: string) => {
    setFilterCategory(newAlignment);
  };
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // 子→親
  // https://qiita.com/aliceroot0678/items/e4eabcbe3f9f79cada55
  const handleDeleteMemo = (mmid: number) => {
    console.log(mmid)
    fetch(API_URL, {
      mode: "cors",
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mmid: mmid }),
    });
  }


  if (error) return <div>failed to load</div>
  if (!data) {
    return (
      <Box>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    )
  }

  const containerStyle = {
    background: "#f3d2c1"
  }


  return (
    <>
      <Head>
        <title>Kaimemo!</title>
      </Head>
      <Container maxWidth="md" sx={containerStyle}>
        <Typography variant='h3'>Kaimemo!</Typography>
        <InputMemo handleRegistMemo={handleRegistMemo}></InputMemo>
        <FilterMemo handleFilterChange={handleFilterChange} filterCategory={filterCategory} />
        <CalculateButton />

        <MemoList data={data} filter={filterCategory} handleDeleteMemo={handleDeleteMemo}></MemoList>
      </Container >
    </>
  );

}
