import CalculateIcon from '@mui/icons-material/Calculate';
import { Fab } from '@mui/material';
import Link from 'next/link';

export default function CalculateButton() {
  const fabStyle = {
    position: 'absolute',
    top: 10,
    right: 60,
    background:"#8bd3dd"
  };

  return (
    <Link href="/calc">
      <Fab color="primary" aria-label="add" sx={fabStyle}>
        <CalculateIcon />

      </Fab>
    </Link>
  )
}