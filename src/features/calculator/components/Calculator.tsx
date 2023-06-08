import React, { useState } from 'react';

import { Card, CardContent, Grid, Typography } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useCalculator } from '../hooks/useCalculator';

export default function Calculator() {
  const [calc, total, num, operator] = useCalculator()
  
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
                <button onClick={calc.Clear}>AC</button>
              </Grid>
              <Grid item xs={12}>
                <button className='orange' onClick={calc.Calculate} value={'+'}>+</button>
                <button className='orange' onClick={calc.Calculate} value={'-'}>-</button>
                <button className='orange' onClick={calc.Delete} value={'-'}><BackspaceIcon/></button>
              </Grid>
            </Grid>
            <button className='grey' onClick={calc.Input} value={100}>100</button>
            <button className='grey' onClick={calc.Input} value={150}>150</button>
            <button className='grey' onClick={calc.Input} value={200}>200</button>
            <button className='grey' onClick={calc.Input} value={250}>250</button>
            <button className='grey' onClick={calc.Input} value={300}>300</button>
            <button className='grey' onClick={calc.Input} value={400}>400</button>
            <button className='grey' onClick={calc.Input} value={500}>500</button>
            <button className='grey' onClick={calc.Input} value={600}>600</button>
            <button className='grey' onClick={calc.Input} value={700}>700</button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}