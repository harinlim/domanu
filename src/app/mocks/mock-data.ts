import { Marketplace } from "@/types/marketplace";
import { Service } from "@/types/service";

export const MOCK_MARKETPLACES: Marketplace[] = [
  {
    id: '1',
    name: 'UNC Chapel Hill',
    description: 'The official marketplace for UNC Chapel Hill students',
    designer: 'admin',
    bidding: true,
    bargaining: true,
    private: false
  },
  {
    id: '2',
    name: 'Duke University',
    description: 'Buy and sell items within the Duke community',
    designer: 'admin',
    bidding: true,
    bargaining: true,
    private: false
  }
]

export const MOCK_SERVICES: Service[] = [
  {
    id: '101',
    name: 'Tutoring Service',
    description: 'Math and Science tutoring for all levels',
    marketplace: '1',
    seller: 'user1',
    price: 25.00,
    active: true
  },
  {
    id: '102',
    name: 'Photography',
    description: 'Professional photography for events',
    marketplace: '1',
    seller: 'user2',
    price: 100.00,
    active: true
  },
  {
    id: '201',
    name: 'Web Development',
    description: 'Custom website development',
    marketplace: '2',
    seller: 'user3',
    price: 500.00,
    active: true
  }
]