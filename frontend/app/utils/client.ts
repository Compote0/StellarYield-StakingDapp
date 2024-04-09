import { createPublicClient, http } from 'viem'
import { polygonMumbai } from './polygonMumbai'

export const publicClient = createPublicClient({
  chain: polygonMumbai,
  transport: http()
})