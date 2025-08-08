"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { PropertyData, FilterOptions } from "../../types";
import { dataService } from "../../lib/data-service";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { Sidebar } from "../../components/dashboard/Sidebar";
import PropertyDetailPanel from "../../components/dashboard/PropertyDetailPanel";

// Dynamically import the ColorCodedMap component to avoid SSR issues with Leaflet
const ColorCodedMap = dynamic(
  () => import("../../components/maps/ColorCodedMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">A carregar mapa...</div>
      </div>
    ),
  }
);

export default function DashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedProperty, setSelectedProperty] = useState<PropertyData | null>(
    null
  );
  const [selectedDataPoint, setSelectedDataPoint] = useState("Home Value");
  const [center, setCenter] = useState<[number, number]>([39.5, -8.0]);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 1000000],
    districts: [],
    municipalities: [],
    propertyTypes: [],
    sortBy: "price",
    sortOrder: "desc",
  });

  // Portugal's center coordinates
  const mapCenter: [number, number] = center;
  const mapZoom = 7;

  // Fetch comprehensive Portugal property data
  const {
    data: allProperties = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "portugal-properties",
      filters.districts,
      filters.municipalities,
    ],
    queryFn: () =>
      dataService.getPropertiesData({
        district: filters.districts[0],
        municipality: filters.municipalities[0],
        priceMin: filters.priceRange[0],
        priceMax: filters.priceRange[1],
      }),
    staleTime: 1000 * 60 * 30, // 30 minutes cache
    refetchOnWindowFocus: false,
  });

  const filteredProperties = useMemo(() => {
    // Use comprehensive Portugal property data (already filtered by API)
    return allProperties;
  }, [allProperties]);

  const handlePropertyClick = (property: PropertyData) => {
    setSelectedProperty(property);
    setCenter([property.location.latitude, property.location.longitude]);
  };

  const referenceComparisons = useMemo(() => {
    // TODO: Add reference comparisons
    const pick = (name: string) =>
      allProperties.find(
        (p) => p.location.municipality === name || p.location.district === name
      );
    const pack = (p?: PropertyData | null) =>
      p
        ? {
            name: p.location.municipality,
            price: p.price.current,
            yoy: p.metrics.priceGrowth.year,
            fiveYear: p.metrics.priceGrowth.fiveYear,
          }
        : null;
    return {
      lisbon: pack(pick("Lisboa")),
      porto: pack(pick("Porto")),
      faro: pack(pick("Faro")),
    } as const;
  }, [allProperties]);

  const handleSearch = async (query: string) => {
    if (!query) return;
    const results = await dataService.searchLocations(query);
    const hit = results[0];
    if (hit?.coordinates) {
      setCenter([hit.coordinates[0], hit.coordinates[1]]);
    }
  };

  return (
    <DashboardLayout
      sidebar={
        <Sidebar
          onFilterChange={setFilters}
          onDataPointChange={setSelectedDataPoint}
          propertyCount={filteredProperties.length}
          isLoading={isLoading}
        />
      }
      map={
        <ColorCodedMap
          center={mapCenter}
          zoom={mapZoom}
          properties={filteredProperties}
          dataPoint={selectedDataPoint}
          onPropertyClick={handlePropertyClick}
          className="h-full"
        />
      }
      onSearch={handleSearch}
    >
      <PropertyDetailPanel
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        comparisons={referenceComparisons}
      />
    </DashboardLayout>
  );
}
