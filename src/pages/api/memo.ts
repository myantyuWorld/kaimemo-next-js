// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const fetcher = (url: string): Promise<any> => fetch(url).then(res => res.json());
  const API_URL = 'http://os3-357-11662.vs.sakura.ne.jp:18083/rakuzaim08/vue/memo/index'

  const data = await fetcher(API_URL)
  res.status(200).json({"data" : data})
}
