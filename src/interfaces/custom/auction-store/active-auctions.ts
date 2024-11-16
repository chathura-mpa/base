export interface IAuctionStatusUpdateResponse {
  auctionId: string
  status: string
  updatedAt: object
  docId: string
  createdAt: CreatedAt
}

export interface CreatedAt {
  _seconds: number
  _nanoseconds: number
}
