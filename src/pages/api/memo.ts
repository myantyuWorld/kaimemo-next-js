// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json({"data" : [
    {
      category: "food",
      description: "ビール",
      deleted: false
    },
    {
      category: "food",
      description: "アスパラガス",
      deleted: false
    },
    {
      category: "food",
      description: "納豆",
      deleted: false
    },
    {
      category: "soap",
      description: "猫の餌",
      deleted: false
    },
    {
      category: "soap",
      description: "猫トイレシート",
      deleted: false
    },
  ]})
}
