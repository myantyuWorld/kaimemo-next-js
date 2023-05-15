import { Avatar, Box, Button, Paper, Stack, Typography, styled } from "@mui/material";
import MemoItem from "./MemoItem";

export default function MemoList(props: any) {
  const handleDeleteMemo = (mmid: number) => {
    props.handleDeleteMemo(mmid)
  }
  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
      {props.data.map((item: any, index: number) => (
        <MemoItem key={index} data={item} handleDeleteMemo={() => handleDeleteMemo(item.mmid)}></MemoItem>
      ))}
    </Box>
  )
}