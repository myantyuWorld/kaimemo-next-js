import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';

export default function Calculator() {
  const [total, setTotal] = useState(0)
  const [num, setNum] = useState(0);
  const [oldNum, setOldNum] = useState(0);
  const [operator, setOperator] = useState();

  function inputNum(e) {
    let input = e.target.value
    if (num === 0) {
      setNum(input);
    } else {
      setNum(num + input);
    }
  }

  function clear() {
    setNum(0);
    setTotal(0);
  }

  function deleteNum() {
    setNum(0);
  }

  function porcentagem(e) {
    setNum(num / 100);
  }

  function changeSign() {
    if (num > 0) {
      setNum(-num);
    } else {
      setNum(Math.abs(num));
    }
  }

  function operatorHandler(e) {
    let operatorInput = e.target.value;
    setOperator(operatorInput);
    setOldNum(num);
    setNum(0);

    calculate()
  }

  function calculate() {
    if (operator === "/") {
      setTotal(parseFloat(oldNum) / parseFloat(num));
    } else if (operator === "X") {
      setTotal(parseFloat(oldNum) * parseFloat(num));
    } else if (operator === "-") {
      setTotal(total - parseFloat(num));
    } else if (operator === "+") {
      setTotal(parseFloat(total) + parseFloat(num));
    }
  }

  return (
    <div>
      <div className='wrapper'>
        <Card>
          <CardContent>
            <Typography variant='h1' className='resultado'>{total}</Typography>
            <Typography variant='h4' className='resultado'>{operator}{num}</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <button onClick={clear}>AC</button>
              </Grid>
              <Grid item xs={12}>
                <button className='orange' onClick={operatorHandler} value={'+'}>+</button>
                <button className='orange' onClick={operatorHandler} value={'-'}>-</button>
                <button className='orange' onClick={deleteNum} value={'-'}><BackspaceIcon/></button>
              </Grid>
            </Grid>
            <button className='grey' onClick={inputNum} value={100}>100</button>
            <button className='grey' onClick={inputNum} value={150}>150</button>
            <button className='grey' onClick={inputNum} value={200}>200</button>
            <button className='grey' onClick={inputNum} value={250}>250</button>
            <button className='grey' onClick={inputNum} value={300}>300</button>
            <button className='grey' onClick={inputNum} value={400}>400</button>
            <button className='grey' onClick={inputNum} value={500}>500</button>
            <button className='grey' onClick={inputNum} value={600}>600</button>
            <button className='grey' onClick={inputNum} value={700}>700</button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}