import { Badge, Button, Card, CardContent, Divider, Grid, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SoapIcon from '@mui/icons-material/Soap';
import React from "react";
import CardTitle from "../../../components/elements/Title/CardTitle";

export default function FilterMemo(props: any) {
  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    props.handleFilterChange(newAlignment)
  };
  const cardStyle = {
    background: "#fef6e4"
  }
  const toggleStyle = {
    background: "#8bd3dd"
  }
  const countFood = props.data.filter((item: { mmsb: string }) => item.mmsb === "food")
  const countSoap = props.data.filter((item: { mmsb: string }) => item.mmsb === "soap")
  const cardTitle = `フィルター : メモの総数(${props.data.length})`
  const toggles = [
    {
      value: "food",
      badgeContent: countFood.length,
      component: <LocalDiningIcon />
    },
    {
      value: "soap",
      badgeContent: countSoap.length,
      component: <SoapIcon />
    },
  ]

  return (
    <Grid container spacing={0} mt={1}>
      <Grid item xs={12}>
        <Card sx={cardStyle}>
          <CardContent>
            <CardTitle title={cardTitle} />
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={3}>
              <ToggleButtonGroup
                color="standard"
                value={props.filterCategory}
                exclusive
                size="large"
                onChange={handleFilterChange}
                aria-label="Platform"
                sx={toggleStyle}
              >
                {toggles.map((item: any, index: number) => (
                  <ToggleButton value={item.value} key={index}>
                    <Badge color="secondary" badgeContent={item.badgeContent} showZero>
                      {item.component}
                    </Badge>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}