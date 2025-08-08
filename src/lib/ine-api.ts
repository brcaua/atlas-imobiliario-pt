// INE (Instituto Nacional de Estatística) API integration
import { INEData } from "../types";

// INE API endpoints
const INE_API_ENDPOINTS = {
  DATABASE: "https://www.ine.pt/ngt_server/attachfileu.jsp",
  CATALOG: "https://www.ine.pt/ine/json_indicador",
  METADATA: "https://www.ine.pt/ine/json_metadata",
  INDICATOR: "https://www.ine.pt/ine/json_indicador",
} as const;

export interface INEIndicator {
  id: string;
  name: string;
  unit: string;
  periodicity: string;
}

// Common INE indicators for real estate analysis
export const INE_INDICATORS = {
  POPULATION: "0002044", // População residente
  HOUSEHOLDS: "0002046", // Famílias clássicas
  BUILDINGS: "0002048", // Edifícios
  DWELLINGS: "0002049", // Alojamentos
  CONSTRUCTION_PERMITS: "0008862", // Licenças de construção
  HOUSE_PRICES: "0008873", // Preços da habitação
  CONSTRUCTION_COSTS: "0008874", // Custos de construção
} as const;

export class INEApiClient {
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  // Get catalog information about available indicators
  async getCatalogData(): Promise<any> {
    try {
      const response = await fetch(INE_API_ENDPOINTS.CATALOG, {
        headers: {
          Accept: "application/json",
          ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`INE Catalog API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching INE catalog:", error);
      throw error;
    }
  }

  // Get metadata for a specific indicator
  async getMetadata(indicatorId: string): Promise<any> {
    try {
      const params = new URLSearchParams({
        indic: indicatorId,
      });

      const response = await fetch(`${INE_API_ENDPOINTS.METADATA}?${params}`, {
        headers: {
          Accept: "application/json",
          ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`INE Metadata API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching INE metadata:", error);
      throw error;
    }
  }

  // Get indicator data from the database API
  async getIndicatorData(
    indicatorId: string,
    options: {
      geoLevel?: "country" | "district" | "municipality" | "parish";
      startDate?: string;
      endDate?: string;
      geoIds?: string[]; // Specific geographic IDs to filter
      lang?: "PT" | "EN";
    } = {}
  ): Promise<any> {
    try {
      const {
        geoLevel = "municipality",
        startDate,
        endDate,
        geoIds,
        lang = "PT",
      } = options;

      const params = new URLSearchParams({
        indic: indicatorId,
        lang,
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(geoIds && { geo: geoIds.join(",") }),
      });

      const response = await fetch(`${INE_API_ENDPOINTS.INDICATOR}?${params}`, {
        headers: {
          Accept: "application/json",
          ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`INE Indicator API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching INE indicator data:", error);
      throw error;
    }
  }

  // Validate if an indicator exists and is accessible
  async isIndicatorValid(indicatorId: string): Promise<boolean> {
    try {
      const metadata = await this.getMetadata(indicatorId);
      return metadata && metadata.length > 0;
    } catch (error) {
      console.warn(`Indicator ${indicatorId} validation failed:`, error);
      return false;
    }
  }

  async getPopulationData(municipalityCode?: string): Promise<INEData[]> {
    try {
      // Get population data with optional municipality filter
      const options = municipalityCode
        ? { geoIds: [municipalityCode], geoLevel: "municipality" as const }
        : { geoLevel: "municipality" as const };

      const data = await this.getIndicatorData(
        INE_INDICATORS.POPULATION,
        options
      );

      // Check if data exists and has the expected structure
      if (!data || !Array.isArray(data)) {
        console.warn("INE API returned unexpected data structure");
        return [];
      }

      // Transform INE response to our format
      // Note: Actual INE API structure may vary - this is based on common patterns
      return data.map((item: any) => ({
        code: item.dim_3 || item.codigo || item.geo_cod || "",
        name: item.dim_3_t || item.nome || item.geo_name || "",
        level: this.determineLevelFromCode(item.dim_3 || item.codigo || ""),
        population: parseInt(item.valor || item.value || "0") || 0,
        households: 0, // Would need separate API call with INE_INDICATORS.HOUSEHOLDS
        buildings: 0, // Would need separate API call with INE_INDICATORS.BUILDINGS
        dwellings: 0, // Would need separate API call with INE_INDICATORS.DWELLINGS
        averageIncome: 0, // Would need separate economic indicator
        medianAge: 0, // Would need separate demographic indicator
        educationLevel: {
          basic: 0,
          secondary: 0,
          higher: 0,
        },
        lastCensus: item.periodo || item.period || "2021",
      }));
    } catch (error) {
      console.error("Error fetching population data:", error);
      return [];
    }
  }

  async getConstructionData(municipalityCode?: string) {
    try {
      const options = municipalityCode
        ? { geoIds: [municipalityCode], geoLevel: "municipality" as const }
        : { geoLevel: "municipality" as const };

      const [permits, costs] = await Promise.all([
        this.getIndicatorData(INE_INDICATORS.CONSTRUCTION_PERMITS, options),
        this.getIndicatorData(INE_INDICATORS.CONSTRUCTION_COSTS, options),
      ]);

      return {
        permits: permits || [],
        costs: costs || [],
      };
    } catch (error) {
      console.error("Error fetching construction data:", error);
      throw error;
    }
  }

  async getHousePriceData(municipalityCode?: string) {
    try {
      const options = municipalityCode
        ? { geoIds: [municipalityCode], geoLevel: "municipality" as const }
        : { geoLevel: "municipality" as const };

      const data = await this.getIndicatorData(
        INE_INDICATORS.HOUSE_PRICES,
        options
      );
      return data || [];
    } catch (error) {
      console.error("Error fetching house price data:", error);
      throw error;
    }
  }

  // Get comprehensive data for a municipality
  async getMunicipalityData(municipalityCode: string): Promise<{
    population: INEData[];
    housing: any[];
    construction: { permits: any[]; costs: any[] };
  }> {
    try {
      const [populationData, housingData, constructionData] = await Promise.all(
        [
          this.getPopulationData(municipalityCode),
          this.getHousePriceData(municipalityCode),
          this.getConstructionData(municipalityCode),
        ]
      );

      return {
        population: populationData,
        housing: housingData,
        construction: constructionData,
      };
    } catch (error) {
      console.error("Error fetching comprehensive municipality data:", error);
      throw error;
    }
  }

  // Search for available indicators by topic
  async searchIndicators(topic: string): Promise<any[]> {
    try {
      const catalog = await this.getCatalogData();

      if (!catalog || !Array.isArray(catalog)) {
        return [];
      }

      // Filter indicators by topic (housing, population, economy, etc.)
      return catalog.filter(
        (indicator: any) =>
          indicator.tema?.toLowerCase().includes(topic.toLowerCase()) ||
          indicator.nome?.toLowerCase().includes(topic.toLowerCase()) ||
          indicator.designacao?.toLowerCase().includes(topic.toLowerCase())
      );
    } catch (error) {
      console.error("Error searching indicators:", error);
      return [];
    }
  }

  private determineLevelFromCode(
    code: string
  ): "district" | "municipality" | "parish" {
    // INE geographic codes:
    // District: 2 digits (e.g., "11" for Lisboa)
    // Municipality: 4 digits (e.g., "1106" for Lisboa municipality)
    // Parish: 6+ digits (e.g., "110601" for specific parish)

    if (code.length <= 2) return "district";
    if (code.length <= 4) return "municipality";
    return "parish";
  }
}

// Utility functions for Portuguese administrative divisions
export const PORTUGUESE_DISTRICTS = [
  { code: "01", name: "Aveiro" },
  { code: "02", name: "Beja" },
  { code: "03", name: "Braga" },
  { code: "04", name: "Bragança" },
  { code: "05", name: "Castelo Branco" },
  { code: "06", name: "Coimbra" },
  { code: "07", name: "Évora" },
  { code: "08", name: "Faro" },
  { code: "09", name: "Guarda" },
  { code: "10", name: "Leiria" },
  { code: "11", name: "Lisboa" },
  { code: "12", name: "Portalegre" },
  { code: "13", name: "Porto" },
  { code: "14", name: "Santarém" },
  { code: "15", name: "Setúbal" },
  { code: "16", name: "Viana do Castelo" },
  { code: "17", name: "Vila Real" },
  { code: "18", name: "Viseu" },
  { code: "20", name: "Região Autónoma dos Açores" },
  { code: "30", name: "Região Autónoma da Madeira" },
];

export function getDistrictByCode(code: string) {
  return PORTUGUESE_DISTRICTS.find((d) => d.code === code);
}

export function getDistrictByName(name: string) {
  return PORTUGUESE_DISTRICTS.find((d) =>
    d.name.toLowerCase().includes(name.toLowerCase())
  );
}
