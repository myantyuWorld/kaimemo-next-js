import useSWR, { useSWRConfig } from "swr";

const fetcher = (url: string): Promise<any> => fetch(url).then(res => res.json());

export const useFetchMemo = () => {
  const { data, error } = useSWR("https://fby1jt4nzc.execute-api.ap-northeast-1.amazonaws.com/Prod/memo",  fetcher, { refreshInterval: 7000 })

  return {data, error}
}

export const useRecognition = () => {
  // TBD
}