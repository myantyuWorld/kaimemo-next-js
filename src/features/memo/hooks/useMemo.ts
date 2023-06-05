import { useState, useCallback } from "react";
import useSWR from "swr";

interface Memo {
  Regist: (data: { mmsb: string; mmnm: string; }) => void;
  Change: (newCategory: string) => void;
  Delete: (id: number) => void;
}

export const useMemo = (): [Memo, string, any, any] => {
  const API_URL = `${process.env.NEXT_PUBLIC_AWS_API_GATEWAY__BASE_URL}${process.env.NEXT_PUBLIC_AWS_API_GATEWAY_URL_MEMO}`
  const [filterCategory, setFilterCategory] = useState('food');
  
  // =============================
  // useCallback
  // =============================
  // 関数をメモ化（＝useCallBack)
  // カスタムフックが呼び出される際に、関数を再度作成されないようにする
  // =============================
  const Regist = useCallback((data: { mmsb: string; mmnm: string; }): void => {
    fetch(API_URL, {
      mode: "cors",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mmsb: data.mmsb, mmnm: data.mmnm }),
    });
  },[filterCategory]);

  const Change = useCallback((newCategory: string): void => {
    setFilterCategory(newCategory);
  },[]);;

  const Delete = useCallback((id: number): void => {
    fetch(API_URL, {
      mode: "cors",
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mmid: id }),
    });
  }, [])
  const fetcher = useCallback((url: string): Promise<any> => fetch(url).then(res => res.json()), []);
  const { data, error } = useSWR(API_URL, fetcher, { refreshInterval: 7000 })


  return [{ Regist, Change, Delete }, filterCategory, data, error];
}
