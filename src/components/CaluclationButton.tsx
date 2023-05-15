import CalculateIcon from '@mui/icons-material/Calculate';
import { Fab } from '@mui/material';
import Link from 'next/link';

export default function CalculateButton() {
  const fabStyle = {
    position: 'absolute',
    top: 250,
    right: 16,
  };

  return (
    <Link href="/calc">
      <Fab color="primary" aria-label="add" sx={fabStyle}>
        <CalculateIcon />

      </Fab>
    </Link>
  )
}