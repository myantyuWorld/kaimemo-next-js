import Link from 'next/link';
import { Fab } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';


// https://github.com/mozmorris/react-webcam
export default function RecognitionButton() {

  const fabStyle = {
    position: 'absolute',
    top: 10,
    right: 16,
    background:"#8bd3dd"
  };

  return (
    <Link href="/recognition">
      <Fab color="primary" aria-label="add" sx={fabStyle}>
        <CameraAltIcon />

      </Fab>
    </Link>
  )
}