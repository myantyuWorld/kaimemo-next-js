import Link from 'next/link';
import { Fab } from '@mui/material';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


// https://github.com/mozmorris/react-webcam
export default function RecognitionResultButton() {

  const fabStyle = {
    position: 'absolute',
    top: 50,
    right: 16,
    background:"#8bd3dd"
  };
  const notify = () => toast("今、約4500円です")

  // アイコンをクリックで、react-toastifyでトースト通知（マイクロサービス（recognition-number）で解析した結果を表示
  //（今、何年かAPIリクエストする）
  return (
      <Fab color="primary" aria-label="add" sx={fabStyle}>
        <QueryStatsIcon onClick={notify}/>
        <ToastContainer />
      </Fab>
  )
}