import { Button, Card, CardContent, Divider, Grid, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SoapIcon from '@mui/icons-material/Soap';
import React from "react";

export default function FilterMemo(props: any) {
  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    props.handleFilterChange(newAlignment)
  };

  const cardStyle = {
    background:"#fef6e4"
  }
  const toggleStyle = {
    background:"#8bd3dd"
  }

  return (
    <Grid container spacing={0} mt={1}>
      <Grid item xs={12}>
        <Card sx={cardStyle}>
          <CardContent>
            <Typography mb={1}>フィルター</Typography>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={0}>
              <ToggleButtonGroup
                color="standard"
                value={props.filterCategory}
                exclusive
                size="large"
                onChange={handleFilterChange}
                aria-label="Platform"
                sx={toggleStyle}
              >
                <ToggleButton value="food"><LocalDiningIcon /></ToggleButton>
                <ToggleButton value="soap"><SoapIcon /></ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}