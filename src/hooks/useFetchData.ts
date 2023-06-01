import useSWR, { useSWRConfig } from "swr";

const fetcher = (url: string): Promise<any> => fetch(url).then(res => res.json());

export const useFetchMemo = () => {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_AWS_API_GATEWAY__BASE_URL}${process.env.NEXT_PUBLIC_AWS_API_GATEWAY_URL_MEMO}`,  fetcher, { refreshInterval: 7000 })

  return {data, error}
}

export const useRecognition = () => {
  // TBD
}