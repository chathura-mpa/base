export interface Bidder {
  bidderId: string
  endTime: string
  bidAmount: string
  name: string
  email: string
  phone: string
}

export interface BidFormValues {
  auctionId: string // UUID format, required
  bidAmount: number // Number format, required
  bidderId: string // UUID format, required
  name?: string // Optional string
  email?: string // Optional email format
  phone?: string // Optional string format

  [key: string]: unknown
}

export interface Bid {
  auctionId: string
  createdAt: string
  docId: string
  bidAmount: number
  bidderId: string
  bidId: string
  email: string
  updatedAt: string
}
