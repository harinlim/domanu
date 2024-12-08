export type Service = {
  id: string
  name: string
  description: string
  price: number
  seller: string
  marketplace: string
  active: boolean
}

export type ServiceResponse = {
  status: string
  data: Service
  message?: string
}

export type ServicesResponse = {
  status: string
  data: Service[]
  message?: string
}