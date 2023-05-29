import { Avatar, Box, Button, Card, CardContent, Paper, Stack, Typography, styled } from "@mui/material";
import MemoItem from "./MemoItem";

export default function MemoList(props: any) {
  const handleDeleteMemo = (mmid: number) => {
    props.handleDeleteMemo(mmid)
  }

  const memoList =
    props.filter ?
      props.data
        .filter((item: { mmsb: string; }) => item.mmsb === props.filter)
        .sort((a: { mmid: number; }, b: { mmid: number; }) => a.mmid - b.mmid)
      :
      props.data
        .sort((a: { mmid: number; }, b: { mmid: number; }) => a.mmid - b.mmid)

  return (
    <Card sx={"background-color:#fef6e4"}>
      <CardContent>
        <Box sx={{
          flexGrow: 1, overflow: 'hidden', px: 0,
          flexDirection: "column",
          height: 480,
          overflowY: "scroll",
        }}>
          {memoList
            .map((item: any, index: number) => (
              <MemoItem key={item.mmid} data={item} handleDeleteMemo={() => handleDeleteMemo(item.mmid)}></MemoItem>
            ))}
        </Box>
      </CardContent>
    </Card>
  )
}