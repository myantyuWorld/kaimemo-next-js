import { Avatar, Box, Button, Paper, Stack, Typography, styled } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SoapIcon from '@mui/icons-material/Soap';

export default function MemoItem(props: any) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 900,
  }));

  const handleDeleteMemo = (event: any) => {
    const value = event.target.value;
    props.handleDeleteMemo(value);
  };

  return (
    <Item
      sx={{
        my: 1,
        mx: 'auto',
        p: 1,
      }}
    >
      <Stack spacing={2} direction="row" alignItems="center">
        <Avatar>
          {
            props.data.mmsb === '1' ? <LocalDiningIcon /> : <SoapIcon />
          }
        </Avatar>
        <Typography noWrap fontSize={14}>{props.data.mmnm}</Typography>
        <Button variant="contained" onClick={handleDeleteMemo}><DeleteForeverIcon /></Button>
      </Stack>
    </Item>
  )
}