export type Marketplace = {
  id: string
  name: string
  description: string
  designer: string
  bidding: boolean
  bargaining: boolean
  private: boolean
}

export type MarketplaceResponse = {
  status: string
  data: Marketplace
  message?: string
}

export type MarketplacesResponse = {
  status: string
  data: Marketplace[]
  message?: string
} 