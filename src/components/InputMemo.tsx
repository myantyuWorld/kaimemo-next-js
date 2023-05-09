import * as React from 'react';
import { Avatar, Button, Grid, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SoapIcon from '@mui/icons-material/Soap';

export default function InputMemo() {
  const [alignment, setAlignment] = React.useState('food');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <TextField id="standard-basic" label="Standard" variant="standard" />
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
            <ToggleButton value="necesary"><SoapIcon/></ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained">登録</Button>
        </Grid>
      </Grid>
    </>
  )
}