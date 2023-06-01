import * as React from 'react';
import { Box } from '@mui/material';

import CalculateIcon from '@mui/icons-material/Calculate';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import 'react-toastify/dist/ReactToastify.css';

import InputMemo from '../features/memo/components/InputMemo';
import MemoList from '../features/memo/components/MemoList';
import FilterMemo from '../features/memo/components/FilterMemo';
import RecognitionResultButton from '../features/recognition/components/RecognitionResultButton';
import BaseButton from '../components/elements/Button/BaseButton';
import { useFetchMemo } from '../hooks/useFetchData';
import BaseTitle from '../components/elements/Title/BaseTitle';

export default function Home() {
  const API_URL = "https://fby1jt4nzc.execute-api.ap-northeast-1.amazonaws.com/Prod/memo"
  const [filterCategory, setFilterCategory] = React.useState('food');

  const handleRegistMemo = (data: { mmsb: string; mmnm: string; }) => {
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

  const handleFilterChange = (newAlignment: string) => {
    setFilterCategory(newAlignment);
  };
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

  const { data, error } = useFetchMemo()
  if (error) return <div>failed to load</div>
  if (!data) {
    return (
      <Box>
        now loading...
      </Box>
    )
  }
  return (
    <>
      <BaseTitle />
      <InputMemo handleRegistMemo={handleRegistMemo}></InputMemo>
      <FilterMemo handleFilterChange={handleFilterChange} filterCategory={filterCategory} />
      <BaseButton top={10} right={60} component={<CalculateIcon />} link="calc" />
      <BaseButton top={10} right={16} component={<CameraAltIcon />} link="recognition" />
      <RecognitionResultButton />

      <MemoList data={data} filter={filterCategory} handleDeleteMemo={handleDeleteMemo}></MemoList>
    </>
  );

}
