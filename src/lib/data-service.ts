// Data service for fetching real estate data from various sources
import { PropertyData, MarketForecast, INEData } from "../types";
import { INEApiClient, PORTUGUESE_DISTRICTS } from "./ine-api";
import {
  generatePortugalPropertyData,
  getMunicipalitiesByDistrict,
  getAllDistricts,
  searchMunicipalities,
} from "./portugal-data";

export class RealEstateDataService {
  private ineClient: INEApiClient;

  constructor() {
    this.ineClient = new INEApiClient(process.env.INE_API_KEY);
  }

  // Get comprehensive real estate data covering all Portugal
  async getPropertiesData(filters?: {
    district?: string;
    municipality?: string;
    priceMin?: number;
    priceMax?: number;
  }): Promise<PropertyData[]> {
    // Generate comprehensive data for all Portugal
    const allData = generatePortugalPropertyData();

    // Apply filters
    let filteredData = allData;

    if (filters?.district) {
      filteredData = filteredData.filter(
        (prop) => prop.location.district === filters.district
      );
    }

    if (filters?.municipality) {
      filteredData = filteredData.filter(
        (prop) => prop.location.municipality === filters.municipality
      );
    }

    if (filters?.priceMin) {
      filteredData = filteredData.filter(
        (prop) => prop.price.current >= filters.priceMin!
      );
    }

    if (filters?.priceMax) {
      filteredData = filteredData.filter(
        (prop) => prop.price.current <= filters.priceMax!
      );
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return filteredData;
  }

  async getMarketForecasts(locationIds?: string[]): Promise<MarketForecast[]> {
    // Mock forecast data
    const forecasts: MarketForecast[] = [
      {
        locationId: "1",
        predictions: {
          threemonth: 2.1,
          sixMonth: 4.5,
          oneYear: 8.2,
          threeYear: 18.5,
          fiveYear: 32.1,
        },
        confidence: 0.78,
        factors: [
          "População crescente",
          "Investimento estrangeiro",
          "Proximidade ao centro",
          "Transportes públicos",
        ],
        lastUpdated: "2024-12-27",
      },
      {
        locationId: "2",
        predictions: {
          threemonth: 2.8,
          sixMonth: 5.2,
          oneYear: 10.1,
          threeYear: 22.3,
          fiveYear: 38.7,
        },
        confidence: 0.82,
        factors: [
          "Regeneração urbana",
          "Turismo crescente",
          "Tecnologia e inovação",
          "Universidades",
        ],
        lastUpdated: "2024-12-27",
      },
    ];

    if (locationIds && locationIds.length > 0) {
      return forecasts.filter((f) => locationIds.includes(f.locationId));
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    return forecasts;
  }

  async getINEData(municipalityCode?: string): Promise<INEData[]> {
    try {
      // Try to get real INE data, fall back to mock data
      const realData = await this.ineClient.getPopulationData(municipalityCode);
      if (realData && realData.length > 0) {
        return realData;
      }
    } catch (error) {
      console.warn("Failed to fetch real INE data, using mock data:", error);
    }

    // Mock INE data
    const mockINEData: INEData[] = [
      {
        code: "1106",
        name: "Lisboa",
        level: "municipality",
        population: 548703,
        households: 265236,
        buildings: 84532,
        dwellings: 298765,
        averageIncome: 31500,
        medianAge: 44.2,
        educationLevel: {
          basic: 25.3,
          secondary: 38.7,
          higher: 36.0,
        },
        lastCensus: "2021",
      },
      {
        code: "1302",
        name: "Porto",
        level: "municipality",
        population: 231962,
        households: 115482,
        buildings: 45231,
        dwellings: 128456,
        averageIncome: 27800,
        medianAge: 42.8,
        educationLevel: {
          basic: 28.1,
          secondary: 41.2,
          higher: 30.7,
        },
        lastCensus: "2021",
      },
      {
        code: "0613",
        name: "Coimbra",
        level: "municipality",
        population: 140796,
        households: 68542,
        buildings: 28145,
        dwellings: 75986,
        averageIncome: 24600,
        medianAge: 40.5,
        educationLevel: {
          basic: 22.8,
          secondary: 39.1,
          higher: 38.1,
        },
        lastCensus: "2021",
      },
    ];

    return mockINEData;
  }

  async getMarketStats() {
    return {
      totalProperties: 125000,
      averagePriceGrowth: 8.7,
      hotMarkets: ["Lisboa", "Porto", "Faro"],
      topGrowthAreas: [
        { name: "Cascais", growth: 15.2 },
        { name: "Vila Nova de Gaia", growth: 12.8 },
        { name: "Funchal", growth: 11.5 },
      ],
    };
  }

  // Enhanced INE data methods
  async getINEHousingData(municipalityCode?: string) {
    try {
      return await this.ineClient.getHousePriceData(municipalityCode);
    } catch (error) {
      console.warn("Failed to fetch INE housing data:", error);
      return [];
    }
  }

  async getINEConstructionData(municipalityCode?: string) {
    try {
      return await this.ineClient.getConstructionData(municipalityCode);
    } catch (error) {
      console.warn("Failed to fetch INE construction data:", error);
      return { permits: [], costs: [] };
    }
  }

  async getComprehensiveMunicipalityData(municipalityCode: string) {
    try {
      return await this.ineClient.getMunicipalityData(municipalityCode);
    } catch (error) {
      console.warn("Failed to fetch comprehensive municipality data:", error);
      return {
        population: [],
        housing: [],
        construction: { permits: [], costs: [] },
      };
    }
  }

  async searchINEIndicators(topic: string) {
    try {
      return await this.ineClient.searchIndicators(topic);
    } catch (error) {
      console.warn("Failed to search INE indicators:", error);
      return [];
    }
  }

  async validateINEIndicator(indicatorId: string): Promise<boolean> {
    try {
      return await this.ineClient.isIndicatorValid(indicatorId);
    } catch (error) {
      console.warn("Failed to validate INE indicator:", error);
      return false;
    }
  }

  // Utility method to search locations
  async searchLocations(query: string): Promise<
    Array<{
      name: string;
      type: "district" | "municipality";
      coordinates?: [number, number];
    }>
  > {
    const allLocations = [
      // All districts
      ...PORTUGUESE_DISTRICTS.map((d) => ({
        name: d.name,
        type: "district" as const,
      })),
      // All municipalities from our comprehensive dataset
      ...searchMunicipalities(query).map((m) => ({
        name: m.municipality,
        type: "municipality" as const,
        coordinates: [m.coordinates[0], m.coordinates[1]] as [number, number],
      })),
    ];

    return allLocations.filter((location) =>
      location.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Get all available districts
  async getAvailableDistricts(): Promise<string[]> {
    return getAllDistricts();
  }

  // Get municipalities by district
  async getMunicipalitiesByDistrict(district: string) {
    return getMunicipalitiesByDistrict(district);
  }
}

// Singleton instance
export const dataService = new RealEstateDataService();
