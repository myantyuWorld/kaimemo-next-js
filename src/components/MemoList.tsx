import { Avatar, Box, Button, Card, CardContent, Paper, Stack, Typography, styled } from "@mui/material";
import MemoItem from "./MemoItem";

export default function MemoList(props: any) {
  const handleDeleteMemo = (mmid: number) => {
    props.handleDeleteMemo(mmid)
  }
  return (
    <Card>
      <CardContent>
        <Typography mb={1}>memo list</Typography>
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 0, 
          flexDirection: "column",
          height: 500,
          overflowY: "scroll", }}>
          {props.data
            .sort((a: { mmid: number; },b: { mmid: number; }) => a.mmid - b.mmid)
            .map((item: any, index: number) => (
            <MemoItem key={item.mmid} data={item} handleDeleteMemo={() => handleDeleteMemo(item.mmid)}></MemoItem>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}