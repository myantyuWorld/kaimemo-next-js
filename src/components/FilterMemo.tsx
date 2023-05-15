import { Button, Card, CardContent, Divider, Grid, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SoapIcon from '@mui/icons-material/Soap';
import React from "react";

export default function FilterMemo(props:any) {
  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    props.handleFilterChange(newAlignment)
  };

  return (
    <Grid container spacing={0} mt={1}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography mb={1}>フィルター</Typography>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={0}>
              <ToggleButtonGroup
                  color="primary"
                  value={props.filterCategory}
                  exclusive
                  onChange={handleFilterChange}
                  aria-label="Platform"
                >
                  <ToggleButton value="food" size='large'><LocalDiningIcon /></ToggleButton>
                  <ToggleButton value="soap" size='large'><SoapIcon /></ToggleButton>
                </ToggleButtonGroup>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}