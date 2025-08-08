// Core property and market data types
export interface PropertyData {
  id: string
  location: {
    latitude: number
    longitude: number
    address: string
    district: string
    municipality: string
    parish: string
    postalCode: string
  }
  price: {
    current: number
    currency: string
    pricePerSqm?: number
    lastUpdated: string
  }
  metrics: {
    medianPrice: number
    priceGrowth: {
      month: number
      quarter: number
      year: number
      fiveYear: number
    }
    inventory: number
    daysOnMarket: number
    priceReductions: number
  }
  demographics: {
    population: number
    medianIncome: number
    unemploymentRate: number
    ageGroups: {
      under25: number
      age25to44: number
      age45to64: number
      over65: number
    }
  }
}

export interface MarketForecast {
  locationId: string
  predictions: {
    threemonth: number
    sixMonth: number
    oneYear: number
    threeYear: number
    fiveYear: number
  }
  confidence: number
  factors: string[]
  lastUpdated: string
}

export interface INEData {
  code: string
  name: string
  level: 'district' | 'municipality' | 'parish'
  population: number
  households: number
  buildings: number
  dwellings: number
  averageIncome: number
  medianAge: number
  educationLevel: {
    basic: number
    secondary: number
    higher: number
  }
  lastCensus: string
}

export interface MapViewport {
  center: [number, number]
  zoom: number
  bounds?: [[number, number], [number, number]]
}

export interface FilterOptions {
  priceRange: [number, number]
  districts: string[]
  municipalities: string[]
  propertyTypes: string[]
  priceGrowthMin?: number
  daysOnMarketMax?: number
  sortBy: 'price' | 'growth' | 'inventory' | 'forecast'
  sortOrder: 'asc' | 'desc'
}

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
  preferences: {
    defaultLocation?: string
    savedSearches: FilterOptions[]
    watchlist: string[]
  }
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}
