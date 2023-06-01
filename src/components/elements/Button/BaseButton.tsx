import { Fab } from '@mui/material';
import Link from 'next/link';

export default function BaseButton(props: any) {
  const fabStyle = {
    position: 'absolute',
    top: props.top,
    right: props.right,
    background: "#8bd3dd"
  };

  return (
    props.link !== "" ?
      (
        <Link href={props.link}>
          <Fab color="primary" aria-label="add" sx={fabStyle}>
            {props.component}
          </Fab>
        </Link>
      ) : <Fab color="primary" aria-label="add" sx={fabStyle}>
        {props.component}
      </Fab>
  )
}