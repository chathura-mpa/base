import { products } from '@wix/stores'

import { AuctionStatus } from './auction-status'

export interface IAuctionItem extends products.Product {
  uniqueBidders?: number
  totalBids?: number
  currentBid?: number
  winningBid?: number
  soldFor?: number
  endsAt?: Date
  endedAt?: Date
  status?: AuctionStatus
}

export interface ICreateAuctionFormValues {
  productId: string
  variantId?: string
  startPrice: number
  minimumPrice?: number // optional
  maximumPrice?: number
  minBidIncrement?: number
  startTime: string
  endTime?: string
  status?: AuctionStatus

  [key: string]: unknown
}
