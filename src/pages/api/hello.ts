// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getMoviesChanges } from '@/apis/get'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const data = await getMoviesChanges(1);

  res.status(200).json({ data })
}
