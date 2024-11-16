import { products } from '@wix/stores'

import { AuctionStatus } from './auction-status'

export interface IAuctionStatistics {
  rangeFilter: string
  auctionsCreated: number
  activeAuctions: number
  auctionsCompleted: number
  totalBids: number
  totalBidsIncreased: number
  uniqueBidders: number
  uniqueBiddersIncreased: number
  totalRevenue: number
  totalRevenueIncreased: number
  topTenAuctions: ITopTenAuction[]
}

export interface ITopTenAuction {
  startPrice: number
  productId: string
  docId: string
  auctionId: string
  createdAt: string
  numberOfBidders: number
  highestBid: number
  maximumPrice: number
  minBidIncrement: number
  startTime: string
  endTime: string
  status: AuctionStatus
  updatedAt: string
  totalBids: number
  uniqueBidders: number
}

export interface ITopTenAuctionItem extends ITopTenAuction, products.Product {}

export interface IActiveAuction {
  startPrice: number
  productId: string
  docId: string
  auctionId: string
  createdAt: string
  numberOfBidders: number
  highestBid: number
  maximumPrice: number
  minBidIncrement: number
  startTime: string
  endTime: string
  status: AuctionStatus
  updatedAt: string
}

export interface IAuctionProduct extends products.Product {
  startPrice: number
  productId: string
  docId: string
  auctionId: string
  createdAt: string
  numberOfBidders: number
  highestBid: number
  maximumPrice: number
  minBidIncrement: number
  startTime: string
  endTime: string
  updatedAt: string
  status: AuctionStatus
}

export interface IAvailableProduct extends Partial<products.Product>, Partial<ITopTenAuction> {}
