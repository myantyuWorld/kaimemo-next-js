import { useState } from 'react';

interface Calculator {
  Input: (e: any) => void;
  Clear: () => void;
  Delete: () => void;
  Calculate: (e: any) => void;
}
export const useCalculator = (): [Calculator, number, number, any] => {
  const [total, setTotal] = useState(0)
  const [num, setNum] = useState(0);
  const [oldNum, setOldNum] = useState(0);
  const [operator, setOperator] = useState();

  const Input = (e: any) => {
    let input = e.target.value
    if (num === 0) {
      setNum(input);
    } else {
      setNum(num + input);
    }
  }

  const Clear = () => {
    setNum(0);
    setTotal(0);
  }

  const Delete = () => {
    setNum(0);
  }

  const Calculate = (e: any) => {
    let operatorInput = e.target.value;
    setOperator(operatorInput);
    setOldNum(num);
    setNum(0);

    _calculate()
  }

  const _calculate = () => {
    if (operator === "-") {
      setTotal(parseFloat(total.toString()) - parseFloat(num.toString()));
    } else if (operator === "+") {
      setTotal(parseFloat(total.toString()) + parseFloat(num.toString()));
    }
  }

  return [{ Input, Clear, Delete, Calculate }, total, num, operator]
}