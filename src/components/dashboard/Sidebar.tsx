"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Info,
  Star,
  TrendingUp,
  Home,
  Users,
  MapPin,
} from "lucide-react";

interface SidebarProps {
  onFilterChange?: (filters: any) => void;
  onDataPointChange?: (point: string) => void;
  propertyCount?: number;
  isLoading?: boolean;
}

export function Sidebar({
  onFilterChange,
  onDataPointChange,
  propertyCount = 0,
  isLoading,
}: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    popularData: true,
    priceAffordability: false,
    marketTrends: false,
    demographic: false,
    investorMetrics: false,
  });

  const [selectedDataPoint, setSelectedDataPoint] = useState("Home Value");

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const popularDataItems = [
    { name: "Home Value", icon: Home, premium: false },
    { name: "Home Value Growth (YoY)", icon: TrendingUp, premium: false },
    { name: "For Sale Inventory", icon: MapPin, premium: false },
    { name: "Home Price Forecast", icon: Star, premium: true },
    {
      name: "Long-Term Growth Score",
      icon: TrendingUp,
      premium: true,
      isNew: true,
    },
    { name: "Home Value Growth (5-Year)", icon: TrendingUp, premium: true },
    { name: "Overvalued %", icon: TrendingUp, premium: true },
    { name: "Price Cut %", icon: TrendingUp, premium: true },
    { name: "Population Growth", icon: Users, premium: true },
  ];

  return (
    <div className="h-full">
      {/* Search Data Points */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="SEARCH DATA POINTS"
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500 bg-gray-50"
          />
        </div>
      </div>

      {/* Popular Data Section */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection("popularData")}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
        >
          <span className="text-sm font-medium text-gray-900">
            Popular Data
          </span>
          {expandedSections.popularData ? (
            <ChevronUp className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          )}
        </button>

        {expandedSections.popularData && (
          <div className="pb-4">
            {popularDataItems.map((item, index) => (
              <div
                key={item.name}
                onClick={() => {
                  setSelectedDataPoint(item.name);
                  onDataPointChange?.(item.name);
                }}
                className={`mx-4 mb-1 px-3 py-2 rounded cursor-pointer flex items-center justify-between group ${
                  selectedDataPoint === item.name
                    ? "bg-primary-50 text-primary-700"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <item.icon className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-700">{item.name}</span>
                  {item.isNew && (
                    <span className="px-1.5 py-0.5 bg-orange-100 text-orange-600 text-xs rounded font-medium">
                      New
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  {item.premium && (
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  )}
                  <Info className="h-3 w-3 text-gray-300 opacity-0 group-hover:opacity-100" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Other Sections */}
      {[
        { key: "priceAffordability", label: "Home Price & Affordability" },
        { key: "marketTrends", label: "Market Trends" },
        { key: "demographic", label: "Demographic" },
        { key: "investorMetrics", label: "Investor Metrics" },
      ].map((section) => (
        <div key={section.key} className="border-b border-gray-200">
          <button
            onClick={() =>
              toggleSection(section.key as keyof typeof expandedSections)
            }
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
          >
            <span className="text-sm font-medium text-gray-900">
              {section.label}
            </span>
            {expandedSections[section.key as keyof typeof expandedSections] ? (
              <ChevronUp className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
      ))}

      {/* Simple info and coming soon */}
      <div className="p-4 space-y-2">
        <div className="rounded-lg border border-gray-200 p-3">
          <div className="text-xs text-gray-500 mb-1">Sobre</div>
          <div className="text-xs text-gray-700">
            Dados em tempo real de municípios portugueses. Selecione um ponto no
            mapa para ver detalhes.
          </div>
        </div>
        <div className="rounded-lg border border-dashed border-gray-300 p-3 bg-gray-50">
          <div className="text-xs font-medium text-gray-700">Mais filtros</div>
          <div className="text-xs text-gray-500">
            Em breve: pesquisas, tabelas, exportações.
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-auto p-4 bg-gray-50 border-t border-gray-200">
        <div className="text-xs text-gray-600">
          <div>Municípios: {isLoading ? "..." : propertyCount}</div>
          <div>Fonte: INE Portugal</div>
          <div>Atualizado: {new Date().toLocaleDateString("pt-PT")}</div>
        </div>
      </div>
    </div>
  );
}
