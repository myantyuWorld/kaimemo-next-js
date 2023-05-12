import * as React from 'react';
import { Avatar, Button, Grid, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SoapIcon from '@mui/icons-material/Soap';

export default function InputMemo(props: { handleRegistMemo: (arg0: { mmsb: string; mmnm: string; }) => void; }) {
  const [alignment, setAlignment] = React.useState('food');
  const [description, setDescription] = React.useState("")

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  const handleRegistMemo = () => {
    props.handleRegistMemo({
      mmsb: alignment,
      mmnm: description
    })
    setDescription("")
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <TextField id="standard-basic" label="Standard" variant="standard" value={description} onChange={(e) => setDescription(e.target.value)}/>
        </Grid>
        <Grid item xs={3}>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="food"><LocalDiningIcon/></ToggleButton>
            <ToggleButton value="soap"><SoapIcon/></ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={handleRegistMemo}>登録</Button>
        </Grid>
      </Grid>
    </>
  )
}