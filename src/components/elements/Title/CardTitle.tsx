import { Typography } from "@mui/material";

export default function CardTitle(props: any) {
  return (
    <Typography variant='h6' sx={{color: "#001858"}} mb={1}>{props.title}</Typography>
  )
}