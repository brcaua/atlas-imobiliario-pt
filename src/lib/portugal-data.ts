// Comprehensive Portuguese real estate data covering all districts and major municipalities
import { PropertyData } from "../types";

// Major municipalities by district with coordinates and market characteristics
export const PORTUGAL_MUNICIPALITIES = [
  // Aveiro District
  {
    district: "Aveiro",
    municipality: "Aveiro",
    coordinates: [40.6443, -8.6455],
    population: 78450,
    marketTier: "secondary", // primary, secondary, tertiary
    coastalPremium: true,
    universityTown: true,
  },
  {
    district: "Aveiro",
    municipality: "Ovar",
    coordinates: [40.8659, -8.6255],
    population: 55398,
    marketTier: "tertiary",
    coastalPremium: true,
    universityTown: false,
  },
  {
    district: "Aveiro",
    municipality: "Santa Maria da Feira",
    coordinates: [40.9267, -8.5493],
    population: 139309,
    marketTier: "secondary",
    coastalPremium: false,
    universityTown: false,
  },

  // Beja District
  {
    district: "Beja",
    municipality: "Beja",
    coordinates: [38.015, -7.8632],
    population: 35854,
    marketTier: "tertiary",
    coastalPremium: false,
    universityTown: true,
  },
  {
    district: "Beja",
    municipality: "Moura",
    coordinates: [38.1447, -7.4449],
    population: 15808,
    marketTier: "tertiary",
    coastalPremium: false,
    universityTown: false,
  },

  // Braga District
  {
    district: "Braga",
    municipality: "Braga",
    coordinates: [41.5518, -8.4229],
    population: 192494,
    marketTier: "primary",
    coastalPremium: false,
    universityTown: true,
  },
  {
    district: "Braga",
    municipality: "Guimarães",
    coordinates: [41.4412, -8.2918],
    population: 158124,
    marketTier: "secondary",
    coastalPremium: false,
    universityTown: true,
  },
  {
    district: "Braga",
    municipality: "Barcelos",
    coordinates: [41.5388, -8.6151],
    population: 120391,
    marketTier: "tertiary",
    coastalPremium: false,
    universityTown: false,
  },

  // Bragança District
  {
    district: "Bragança",
    municipality: "Bragança",
    coordinates: [41.8057, -6.7571],
    population: 35341,
    marketTier: "tertiary",
    coastalPremium: false,
    universityTown: true,
  },
  {
    district: "Bragança",
    municipality: "Mirandela",
    coordinates: [41.4872, -7.1855],
    population: 23850,
    marketTier: "tertiary",
    coastalPremium: false,
    universityTown: false,
  },

  // Castelo Branco District
  {
    district: "Castelo Branco",
    municipality: "Castelo Branco",
    coordinates: [39.8221, -7.4909],
    population: 56109,
    marketTier: "tertiary",
    coastalPremium: false,
    universityTown: true,
  },
  {
    district: "Castelo Branco",
    municipality: "Covilhã",
    coordinates: [40.2764, -7.5037],
    population: 51797,
    marketTier: "tertiary",
    coastalPremium: false,
    universityTown: true,
  },

  // Coimbra District
  {
    district: "Coimbra",
    municipality: "Coimbra",
    coordinates: [40.2033, -8.4103],
    population: 143396,
    marketTier: "primary",
    coastalPremium: false,
    universityTown: true,
  },
  {
    district: "Coimbra",
    municipality: "Figueira da Foz",
    coordinates: [40.1507, -8.8618],
    population: 62125,
    marketTier: "secondary",
    coastalPremium: true,
    universityTown: false,
  },

  // Évora District
  {
    district: "Évora",
    municipality: "Évora",
    coordinates: [38.5664, -7.9098],
    population: 56596,
    marketTier: "secondary",
    coastalPremium: false,
    universityTown: true,
  },

  // Faro District (Algarve)
  {
    district: "Faro",
    municipality: "Faro",
    coordinates: [37.0194, -7.9322],
    population: 64560,
    marketTier: "primary",
    coastalPremium: true,
    universityTown: true,
  },
  {
    district: "Faro",
    municipality: "Portimão",
    coordinates: [37.1393, -8.538],
    population: 59896,
    marketTier: "primary",
    coastalPremium: true,
    universityTown: false,
  },
  {
    district: "Faro",
    municipality: "Lagos",
    coordinates: [37.102, -8.6739],
    population: 31049,
    marketTier: "primary",
    coastalPremium: true,
    universityTown: false,
  },
  {
    district: "Faro",
    municipality: "Loulé",
    coordinates: [37.1364, -8.0229],
    population: 70622,
    marketTier: "primary",
    coastalPremium: true,
    universityTown: false,
  },
  {
    district: "Faro",
    municipality: "Albufeira",
    coordinates: [37.0887, -8.2503],
    population: 40828,
    marketTier: "primary",
    coastalPremium: true,
    universityTown: false,
  },

  // Guarda District
  {
    district: "Guarda",
    municipality: "Guarda",
    coordinates: [40.5364, -7.2653],
    population: 42541,
    marketTier: "tertiary",
    coastalPremium: false,
    universityTown: true,
  },

  // Leiria District
  {
    district: "Leiria",
    municipality: "Leiria",
    coordinates: [39.7437, -8.8071],
    population: 130100,
    marketTier: "secondary",
    coastalPremium: false,
    universityTown: true,
  },
  {
    district: "Leiria",
    municipality: "Caldas da Rainha",
    coordinates: [39.4033, -9.1378],
    population: 51729,
    marketTier: "secondary",
    coastalPremium: false,
    universityTown: false,
  },
  {
    district: "Leiria",
    municipality: "Nazaré",
    coordinates: [39.6016, -9.0711],
    population: 15158,
    marketTier: "secondary",
    coastalPremium: true,
    universityTown: false,
  },

  // Lisboa District
  {
    district: "Lisboa",
    municipality: "Lisboa",
    coordinates: [38.7223, -9.1393],
    population: 548703,
    marketTier: "primary",
    coastalPremium: false,
    universityTown: true,
  },
  {
    district: "Lisboa",
    municipality: "Cascais",
    coordinates: [38.6979, -9.4215],
    population: 214158,
    marketTier: "primary",
    coastalPremium: true,
    universityTown: false,
  },
  {
    district: "Lisboa",
    municipality: "Sintra",
    coordinates: [38.8107, -9.3843],
    population: 377835,
    marketTier: "primary",
    coastalPremium: false,
    universityTown: false,
  },
  {
    district: "Lisboa",
    municipality: "Amadora",
    coordinates: [38.7536, -9.2302],
    population: 175872,
    marketTier: "primary",
    coastalPremium: false,
    universityTown: false,
  },
  {
    district: "Lisboa",
    municipality: "Oeiras",
    coordinates: [38.6939, -9.3089],
    population: 172120,
    marketTier: "primary",
    coastalPremium: true,
    universityTown: false,
  },
  {
    district: "Lisboa",
    municipality: "Mafra",
    coordinates: [38.9368, -9.3263],
    population: 76685,
    marketTier: "secondary",
    coastalPremium: true,
    universityTown: false,
  },

  // Portalegre District
  {
    district: "Portalegre",
    municipality: "Portalegre",
    coordinates: [39.2967, -7.4281],
    population: 22368,
    marketTier: "tertiary",
    coastalPremium: false,
    universityTown: true,
  },

  // Porto District
  {
    district: "Porto",
    municipality: "Porto",
    coordinates: [41.1579, -8.6291],
    population: 237591,
    marketTier: "primary",
    coastalPremium: false,
    universityTown: true,
  },
  {
    district: "Porto",
    municipality: "Vila Nova de Gaia",
    coordinates: [41.1239, -8.6114],
    population: 302295,
    marketTier: "primary",
    coastalPremium: true,
    universityTown: false,
  },
  {
    district: "Porto",
    municipality: "Matosinhos",
    coordinates: [41.182, -8.6895],
    population: 175478,
    marketTier: "primary",
    coastalPremium: true,
    universityTown: false,
  },
  {
    district: "Porto",
    municipality: "Vila do Conde",
    coordinates: [41.3516, -8.7479],
    population: 79533,
    marketTier: "secondary",
    coastalPremium: true,
    universityTown: false,
  },
  {
    district: "Porto",
    municipality: "Maia",
    coordinates: [41.2279, -8.621],
    population: 135306,
    marketTier: "secondary",
    coastalPremium: false,
    universityTown: false,
  },

  // Santarém District
  {
    district: "Santarém",
    municipality: "Santarém",
    coordinates: [39.2369, -8.6895],
    population: 61752,
    marketTier: "tertiary",
    coastalPremium: false,
    universityTown: true,
  },
  {
    district: "Santarém",
    municipality: "Torres Novas",
    coordinates: [39.4813, -8.537],
    population: 36717,
    marketTier: "tertiary",
    coastalPremium: false,
    universityTown: false,
  },

  // Setúbal District
  {
    district: "Setúbal",
    municipality: "Setúbal",
    coordinates: [38.5244, -8.8882],
    population: 123519,
    marketTier: "secondary",
    coastalPremium: true,
    universityTown: false,
  },
  {
    district: "Setúbal",
    municipality: "Almada",
    coordinates: [38.6794, -9.157],
    population: 174030,
    marketTier: "primary",
    coastalPremium: true,
    universityTown: false,
  },
  {
    district: "Setúbal",
    municipality: "Sesimbra",
    coordinates: [38.4443, -9.1015],
    population: 49500,
    marketTier: "secondary",
    coastalPremium: true,
    universityTown: false,
  },

  // Viana do Castelo District
  {
    district: "Viana do Castelo",
    municipality: "Viana do Castelo",
    coordinates: [41.694, -8.8312],
    population: 88631,
    marketTier: "secondary",
    coastalPremium: true,
    universityTown: false,
  },

  // Vila Real District
  {
    district: "Vila Real",
    municipality: "Vila Real",
    coordinates: [41.3005, -7.7442],
    population: 51850,
    marketTier: "tertiary",
    coastalPremium: false,
    universityTown: true,
  },

  // Viseu District
  {
    district: "Viseu",
    municipality: "Viseu",
    coordinates: [40.6566, -7.9122],
    population: 99274,
    marketTier: "secondary",
    coastalPremium: false,
    universityTown: true,
  },

  // Autonomous Regions
  {
    district: "Região Autónoma dos Açores",
    municipality: "Ponta Delgada",
    coordinates: [37.7394, -25.6681],
    population: 68809,
    marketTier: "secondary",
    coastalPremium: true,
    universityTown: true,
  },
  {
    district: "Região Autónoma da Madeira",
    municipality: "Funchal",
    coordinates: [32.6669, -16.9241],
    population: 105795,
    marketTier: "primary",
    coastalPremium: true,
    universityTown: true,
  },
];

// Calculate realistic property prices based on market characteristics
function calculateBasePrice(municipality: any): number {
  let basePrice = 150000; // Base price for tertiary markets

  // Market tier adjustments
  switch (municipality.marketTier) {
    case "primary":
      basePrice = 350000;
      break;
    case "secondary":
      basePrice = 220000;
      break;
    case "tertiary":
      basePrice = 150000;
      break;
  }

  // Regional adjustments
  if (municipality.district === "Lisboa") {
    basePrice *= 1.8; // Lisboa premium
  } else if (municipality.district === "Porto") {
    basePrice *= 1.3; // Porto premium
  } else if (municipality.district === "Faro") {
    basePrice *= 1.5; // Algarve tourism premium
  }

  // Coastal premium
  if (municipality.coastalPremium) {
    basePrice *= 1.25;
  }

  // University town premium
  if (municipality.universityTown) {
    basePrice *= 1.15;
  }

  // Population-based adjustment
  if (municipality.population > 200000) {
    basePrice *= 1.2;
  } else if (municipality.population > 100000) {
    basePrice *= 1.1;
  } else if (municipality.population < 30000) {
    basePrice *= 0.85;
  }

  return Math.round(basePrice);
}

// Generate comprehensive property data for all municipalities
export function generatePortugalPropertyData(): PropertyData[] {
  return PORTUGAL_MUNICIPALITIES.map((municipality, index) => {
    const basePrice = calculateBasePrice(municipality);
    const pricePerSqm = Math.round(basePrice / 100); // Assume 100sqm average

    // Generate realistic growth rates based on market conditions
    const yearGrowth =
      municipality.marketTier === "primary"
        ? 8 + Math.random() * 8 // 8-16% for primary markets
        : municipality.marketTier === "secondary"
          ? 4 + Math.random() * 6 // 4-10% for secondary markets
          : 1 + Math.random() * 4; // 1-5% for tertiary markets

    // Special Algarve and Lisboa boosts
    const regionalBoost =
      municipality.district === "Faro"
        ? 3
        : municipality.district === "Lisboa"
          ? 2
          : 0;

    return {
      id: (index + 1).toString(),
      location: {
        latitude: municipality.coordinates[0],
        longitude: municipality.coordinates[1],
        address: `Centro Histórico, ${municipality.municipality}`,
        district: municipality.district,
        municipality: municipality.municipality,
        parish: `${municipality.municipality} (Centro)`,
        postalCode: `${(1000 + index * 10).toString()}-001`,
      },
      price: {
        current: basePrice,
        currency: "EUR",
        pricePerSqm: pricePerSqm,
        lastUpdated: "2024-12-27",
      },
      metrics: {
        medianPrice: Math.round(basePrice * 0.95),
        priceGrowth: {
          month: Number((yearGrowth / 12).toFixed(1)),
          quarter: Number((yearGrowth / 4).toFixed(1)),
          year: Number((yearGrowth + regionalBoost).toFixed(1)),
          fiveYear: Number((yearGrowth * 4 + regionalBoost * 3).toFixed(1)),
        },
        inventory: Math.round(municipality.population / 150), // Rough inventory estimate
        daysOnMarket:
          municipality.marketTier === "primary"
            ? 35
            : municipality.marketTier === "secondary"
              ? 45
              : 60,
        priceReductions:
          municipality.marketTier === "primary"
            ? 8
            : municipality.marketTier === "secondary"
              ? 12
              : 18,
      },
      demographics: {
        population: municipality.population,
        medianIncome:
          municipality.marketTier === "primary"
            ? 28000 + Math.random() * 7000
            : municipality.marketTier === "secondary"
              ? 22000 + Math.random() * 5000
              : 18000 + Math.random() * 4000,
        unemploymentRate:
          municipality.marketTier === "primary"
            ? 5.5 + Math.random() * 2
            : municipality.marketTier === "secondary"
              ? 7 + Math.random() * 3
              : 8.5 + Math.random() * 4,
        ageGroups: {
          under25: municipality.universityTown
            ? 22 + Math.random() * 8
            : 18 + Math.random() * 5,
          age25to44: 30 + Math.random() * 8,
          age45to64: 26 + Math.random() * 6,
          over65: 16 + Math.random() * 8,
        },
      },
    };
  });
}

// Get municipalities by district
export function getMunicipalitiesByDistrict(district: string) {
  return PORTUGAL_MUNICIPALITIES.filter((m) => m.district === district);
}

// Get all available districts
export function getAllDistricts(): string[] {
  return [...new Set(PORTUGAL_MUNICIPALITIES.map((m) => m.district))];
}

// Search municipalities
export function searchMunicipalities(query: string) {
  const lowerQuery = query.toLowerCase();
  return PORTUGAL_MUNICIPALITIES.filter(
    (m) =>
      m.municipality.toLowerCase().includes(lowerQuery) ||
      m.district.toLowerCase().includes(lowerQuery)
  );
}
