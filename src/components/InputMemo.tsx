import * as React from 'react';
import { Avatar, Button, Card, CardContent, Divider, Grid, Stack, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
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
      <Grid container spacing={0} mt={1}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={1}>
                <TextField id="standard-basic" label="買い物メモを入力" variant="standard" value={description} onChange={(e) => setDescription(e.target.value)} />
                <ToggleButtonGroup
                  color="primary"
                  value={alignment}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                >
                  <ToggleButton value="food" size='small'><LocalDiningIcon /></ToggleButton>
                  <ToggleButton value="soap" size='small'><SoapIcon /></ToggleButton>
                </ToggleButtonGroup>
                <Button variant="outlined" onClick={handleRegistMemo} size='small'>+</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}