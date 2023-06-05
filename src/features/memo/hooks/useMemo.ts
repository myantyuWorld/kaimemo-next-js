import { useState } from "react";
import useSWR from "swr";

export const useMemo = () => {
  const API_URL = `${process.env.NEXT_PUBLIC_AWS_API_GATEWAY__BASE_URL}${process.env.NEXT_PUBLIC_AWS_API_GATEWAY_URL_MEMO}`
  const [filterCategory, setFilterCategory] = useState('food');

  const handleRegistMemo = (data: { mmsb: string; mmnm: string; }) => {
    fetch(API_URL, {
      mode: "cors",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mmsb: data.mmsb, mmnm: data.mmnm }),
    });
  }
  const handleFilterChange = (newAlignment: string) => {
    setFilterCategory(newAlignment);
  };
  const handleDeleteMemo = (mmid: number) => {
    fetch(API_URL, {
      mode: "cors",
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mmid: mmid }),
    });
  }
  const fetcher = (url: string): Promise<any> => fetch(url).then(res => res.json());
  const { data, error } = useSWR(API_URL, fetcher, { refreshInterval: 7000 })
  

  return [handleRegistMemo, handleFilterChange, handleDeleteMemo, filterCategory, data, error]
}
