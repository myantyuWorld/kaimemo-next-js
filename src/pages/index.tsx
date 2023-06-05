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
import BaseTitle from '../components/elements/Title/BaseTitle';
import { useMemo } from '../features/memo/hooks/useMemo';

export default function Home() {
  const [handleRegistMemo, handleFilterChange, handleDeleteMemo, filterCategory, data, error] = useMemo()

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
      <FilterMemo handleFilterChange={handleFilterChange} filterCategory={filterCategory} data={data}/>
      <BaseButton top={10} right={60} component={<CalculateIcon />} link="calc" />
      <BaseButton top={10} right={16} component={<CameraAltIcon />} link="recognition" />
      <RecognitionResultButton />

      <MemoList data={data} filter={filterCategory} handleDeleteMemo={handleDeleteMemo}></MemoList>
    </>
  );

}
