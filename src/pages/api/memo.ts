// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const fetcher = (url: string): Promise<any> => fetch(url).then(res => res.json());
  const API_URL = 'https://fby1jt4nzc.execute-api.ap-northeast-1.amazonaws.com/Prod/memo'

  const data = await fetcher(API_URL)
  res.status(200).json({"data" : data})
}
