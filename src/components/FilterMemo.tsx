import { Button, Card, CardContent, Divider, Grid, Stack, Typography } from "@mui/material";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SoapIcon from '@mui/icons-material/Soap';

export default function FilterMemo() {
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
              spacing={2}>
              <Button variant="outlined">
                <LocalDiningIcon /> : 食費
              </Button>
              <Button variant="outlined">
                <SoapIcon /> : 日用品
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}