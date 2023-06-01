import { Avatar, Box, Button, Card, CardContent, Grid, Paper, Stack, Typography, styled } from "@mui/material";
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

  const cardStyle = {
    background:"#fef6e4"
  }

  return (
    <Grid container spacing={0} mt={1}>
      <Grid item xs={12}>
        <Card sx={cardStyle}>
          <CardContent>
            <Box sx={{
              flexGrow: 1, overflow: 'hidden', px: 0,
              flexDirection: "column",
              height: 300,
              overflowY: "scroll",
            }}>
              {memoList
                .map((item: any, index: number) => (
                  <MemoItem key={item.mmid} data={item} handleDeleteMemo={() => handleDeleteMemo(item.mmid)}></MemoItem>
                ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}