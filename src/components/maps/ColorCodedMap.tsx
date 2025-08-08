"use client";

import React, { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { PropertyData } from "../../types";

interface ColorCodedMapProps {
  center: LatLngExpression;
  zoom: number;
  properties: PropertyData[];
  dataPoint: string;
  onPropertyClick?: (property: PropertyData) => void;
  className?: string;
}

// Component to handle map updates
function MapUpdater({
  center,
  zoom,
}: {
  center: LatLngExpression;
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
}

// Color scale function based on property values
function getColorByValue(
  value: number,
  min: number,
  max: number,
  dataPoint: string
): string {
  const normalizedValue = (value - min) / (max - min);

  // Different color schemes for different data points
  if (dataPoint.includes("Growth")) {
    // Green to Red for growth (green = good growth, red = low/negative growth)
    if (normalizedValue < 0.33) return "#ef4444"; // red
    if (normalizedValue < 0.66) return "#fbbf24"; // yellow
    return "#22c55e"; // green
  } else {
    // Blue to Red for values (blue = low value, red = high value)
    if (normalizedValue < 0.2) return "#3b82f6"; // blue
    if (normalizedValue < 0.4) return "#06b6d4"; // cyan
    if (normalizedValue < 0.6) return "#10b981"; // emerald
    if (normalizedValue < 0.8) return "#f59e0b"; // amber
    return "#ef4444"; // red
  }
}

function ColorCodedMap({
  center,
  zoom,
  properties,
  dataPoint,
  onPropertyClick,
  className = "",
}: ColorCodedMapProps) {
  // Calculate min/max values for color scaling
  const { minValue, maxValue, geoJsonData } = useMemo(() => {
    if (!properties || properties.length === 0) {
      return { minValue: 0, maxValue: 1, geoJsonData: null };
    }

    let values: number[] = [];

    switch (dataPoint) {
      case "Home Value":
        values = properties.map((p) => p.price.current);
        break;
      case "Home Value Growth (YoY)":
        values = properties.map((p) => p.metrics.priceGrowth.year);
        break;
      case "Population Growth":
        values = properties.map((p) => p.demographics.population);
        break;
      default:
        values = properties.map((p) => p.price.current);
    }

    const min = Math.min(...values);
    const max = Math.max(...values);

    // Create simplified circles for each property (since we don't have actual boundaries)
    const features = properties.map((property) => {
      let value: number;

      switch (dataPoint) {
        case "Home Value":
          value = property.price.current;
          break;
        case "Home Value Growth (YoY)":
          value = property.metrics.priceGrowth.year;
          break;
        case "Population Growth":
          value = property.demographics.population;
          break;
        default:
          value = property.price.current;
      }

      return {
        type: "Feature" as const,
        properties: {
          ...property,
          value,
          color: getColorByValue(value, min, max, dataPoint),
        },
        geometry: {
          type: "Point" as const,
          coordinates: [
            property.location.longitude,
            property.location.latitude,
          ],
        },
      };
    });

    return {
      minValue: min,
      maxValue: max,
      geoJsonData: {
        type: "FeatureCollection" as const,
        features,
      },
    };
  }, [properties, dataPoint]);

  const formatValue = (value: number, point: string): string => {
    if (point.includes("Growth")) {
      return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
    } else if (point === "Home Value") {
      return new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(value);
    } else {
      return value.toLocaleString("pt-PT");
    }
  };

  const pointToLayer = (feature: any, latlng: any) => {
    const L = require("leaflet");

    return L.circleMarker(latlng, {
      radius: 12,
      fillColor: feature.properties.color,
      color: "#fff",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8,
    });
  };

  const onEachFeature = (feature: any, layer: any) => {
    const property = feature.properties;
    // No popup: clicking forwards the property to parent so a right panel can open
    layer.on("click", () => {
      if (onPropertyClick) {
        onPropertyClick(property);
      }
    });
  };

  return (
    <div className={`w-full h-full ${className}`}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <MapUpdater center={center} zoom={zoom} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {geoJsonData && (
          <GeoJSON
            key={`${dataPoint}-${properties.length}`}
            data={geoJsonData}
            pointToLayer={pointToLayer}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>
    </div>
  );
}

export default ColorCodedMap;
