"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Database, TrendingUp, Users, Building } from "lucide-react";
import { dataService } from "@/lib/data-service";

interface INEDataExplorerProps {
  municipalityCode?: string;
}

export function INEDataExplorer({ municipalityCode }: INEDataExplorerProps) {
  const [searchTopic, setSearchTopic] = useState("");
  const [selectedIndicator, setSelectedIndicator] = useState("");

  // Fetch available indicators by topic
  const { data: indicators = [], isLoading: isLoadingIndicators } = useQuery({
    queryKey: ["ine-indicators", searchTopic],
    queryFn: () =>
      searchTopic
        ? dataService.searchINEIndicators(searchTopic)
        : Promise.resolve([]),
    enabled: !!searchTopic,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  // Fetch comprehensive data for municipality
  const { data: municipalityData, isLoading: isLoadingMunicipality } = useQuery(
    {
      queryKey: ["ine-municipality", municipalityCode],
      queryFn: () =>
        municipalityCode
          ? dataService.getComprehensiveMunicipalityData(municipalityCode)
          : Promise.resolve(null),
      enabled: !!municipalityCode,
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  );

  // Validate indicator
  const { data: isValidIndicator } = useQuery({
    queryKey: ["ine-indicator-valid", selectedIndicator],
    queryFn: () =>
      selectedIndicator
        ? dataService.validateINEIndicator(selectedIndicator)
        : Promise.resolve(false),
    enabled: !!selectedIndicator,
  });

  const popularTopics = [
    { name: "Habitação", icon: Building, query: "habitacao" },
    { name: "População", icon: Users, query: "populacao" },
    { name: "Preços", icon: TrendingUp, query: "precos" },
    { name: "Construção", icon: Database, query: "construcao" },
  ];

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Explorador de Dados INE
        </h3>

        {/* Topic Search */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pesquisar Indicadores por Tópico
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value)}
              placeholder="Ex: habitação, população, preços..."
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Popular Topics */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tópicos Populares
          </label>
          <div className="grid grid-cols-2 gap-2">
            {popularTopics.map((topic) => (
              <button
                key={topic.name}
                onClick={() => setSearchTopic(topic.query)}
                className="flex items-center space-x-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <topic.icon className="h-4 w-4 text-primary-600" />
                <span className="text-sm font-medium">{topic.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Indicators Results */}
        {searchTopic && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Indicadores Encontrados {isLoadingIndicators && "(A carregar...)"}
            </h4>
            {isLoadingIndicators ? (
              <div className="text-sm text-gray-500">
                A pesquisar indicadores...
              </div>
            ) : indicators.length > 0 ? (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {indicators.map((indicator: any, index: number) => (
                  <div
                    key={indicator.codigo || index}
                    className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setSelectedIndicator(indicator.codigo)}
                  >
                    <div className="font-medium text-sm">
                      {indicator.nome || indicator.designacao}
                    </div>
                    <div className="text-xs text-gray-600">
                      {indicator.codigo}
                    </div>
                    {indicator.unidade && (
                      <div className="text-xs text-gray-500">
                        Unidade: {indicator.unidade}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                Nenhum indicador encontrado para "{searchTopic}"
              </div>
            )}
          </div>
        )}

        {/* Selected Indicator Validation */}
        {selectedIndicator && (
          <div className="mb-6">
            <div
              className={`p-3 rounded-lg ${isValidIndicator ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
            >
              <div className="font-medium text-sm">
                Indicador {selectedIndicator}:{" "}
                {isValidIndicator ? "Válido ✓" : "Inválido ✗"}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Municipality Data */}
      {municipalityCode && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Dados do Município ({municipalityCode})
          </h3>

          {isLoadingMunicipality ? (
            <div className="text-sm text-gray-500">
              A carregar dados do município...
            </div>
          ) : municipalityData ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Population Data */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  População
                </h4>
                <div className="text-sm text-blue-800">
                  {municipalityData.population.length > 0 ? (
                    <>
                      <div>Registos: {municipalityData.population.length}</div>
                      <div>
                        Último censo:{" "}
                        {municipalityData.population[0]?.lastCensus}
                      </div>
                    </>
                  ) : (
                    "Sem dados disponíveis"
                  )}
                </div>
              </div>

              {/* Housing Data */}
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2 flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  Habitação
                </h4>
                <div className="text-sm text-green-800">
                  {municipalityData.housing.length > 0 ? (
                    <>
                      <div>Registos: {municipalityData.housing.length}</div>
                      <div>Dados de preços disponíveis</div>
                    </>
                  ) : (
                    "Sem dados disponíveis"
                  )}
                </div>
              </div>

              {/* Construction Data */}
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-900 mb-2 flex items-center">
                  <Database className="h-4 w-4 mr-2" />
                  Construção
                </h4>
                <div className="text-sm text-orange-800">
                  <div>
                    Licenças: {municipalityData.construction.permits.length}{" "}
                    registos
                  </div>
                  <div>
                    Custos: {municipalityData.construction.costs.length}{" "}
                    registos
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              Não foi possível carregar dados do município
            </div>
          )}
        </div>
      )}

      {/* API Status */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Estado da API INE
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>API Catálogo:</span>
            <span className="text-blue-600">Configurada</span>
          </div>
          <div className="flex justify-between">
            <span>API Base de Dados:</span>
            <span className="text-blue-600">Configurada</span>
          </div>
          <div className="flex justify-between">
            <span>API Metadados:</span>
            <span className="text-blue-600">Configurada</span>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            * Os dados são obtidos diretamente das APIs oficiais do INE. Em caso
            de falha, são utilizados dados de demonstração.
          </div>
        </div>
      </div>
    </div>
  );
}
