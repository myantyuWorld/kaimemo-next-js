import { Avatar, Box, Button, Paper, Stack, Typography, styled } from "@mui/material";
import MemoItem from "./MemoItem";

export default function MemoList(props: any) {
  const handleDeleteMemo = (index: number) => {
    props.handleDeleteMemo(index)
  }
  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
      {props.data.map((item: any, index: number) => (
        <MemoItem data={item} handleDeleteMemo={() => handleDeleteMemo(index)}></MemoItem>
      ))}
    </Box>
  )
}