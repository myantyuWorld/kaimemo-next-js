import * as React from 'react';
import { Avatar, Button, Card, CardContent, Divider, Grid, Stack, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SoapIcon from '@mui/icons-material/Soap';

export default function InputMemo(props: { handleRegistMemo: (arg0: { mmsb: string; mmnm: string; }) => void; }) {
  const [alignment, setAlignment] = React.useState('food');
  const [description, setDescription] = React.useState("")
  const [message, setMessage] = React.useState("買い物メモを入力してね。")

  // useEffectに渡された関数は、レンダーの結果が画面の反映された「あと」に動作する。
  // つまり、「関数の実行タイミングをReactのレンダリング後まで遅らせるHook」
  // 
  //　副作用処理（DOM書き換え、変数代入、API通信などUI構築以外の処理）を関数コンポーネントで扱えるようになる。
  // 第1引数 : 副作用処理
  // 第2引数 : 副作用処理の、実行タイミングを制御する依存データ
  React.useEffect(() => {
    setMessage(description == "" ? "買い物メモを入力してね。" : "入力漏れはないですか？")
  }, [description])

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  const handleRegistMemo = () => {
    props.handleRegistMemo({
      mmsb: alignment,
      mmnm: description
    })
    setDescription("")
  }
  return (
    <>
      <Grid container spacing={0} mt={1}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={1}
                mb={2}>
                  {message}
                </Stack>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={1}>
                <TextField id="standard-basic" label="買い物メモを入力" variant="standard" value={description} onChange={(e) => setDescription(e.target.value)} />
                <ToggleButtonGroup
                  color="primary"
                  value={alignment}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                >
                  <ToggleButton value="food" size='small'><LocalDiningIcon /></ToggleButton>
                  <ToggleButton value="soap" size='small'><SoapIcon /></ToggleButton>
                </ToggleButtonGroup>
                <Button variant="outlined" onClick={handleRegistMemo} size='small'>+</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}