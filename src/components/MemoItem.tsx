import { Avatar, Box, Button, Paper, Stack, Typography, styled } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SoapIcon from '@mui/icons-material/Soap';
import { useState } from "react";

export default function MemoItem(props: any) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 1000,
  }));

  const [isDisabled, setIsDisabled] = useState(false)

  const handleDeleteMemo = (event: any) => {
    setIsDisabled(true)
    const value = event.target.value;
    props.handleDeleteMemo(value);
  };
  

  return (
    <Item
      sx={{
        my: 1,
        mx: 'auto',
        p: 0.5,
        background:"#fef8ef"
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Avatar>
          {
            props.data.mmsb === 'food' ? <LocalDiningIcon /> : <SoapIcon />
          }
        </Avatar>
        <Typography noWrap fontSize={14} className={isDisabled ? "isDisabled" : ""}  sx={{color:"#001858"}}>{props.data.mmnm}</Typography>
        <Button variant="contained" color="error" onClick={handleDeleteMemo} disabled={isDisabled} startIcon={<DeleteForeverIcon />}></Button>
      </Stack>
    </Item>
  )
}