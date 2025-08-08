"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { INEDataExplorer } from "@/components/ine/INEDataExplorer";
import { BarChart3, Map, Database, Search } from "lucide-react";

export default function AnalyticsPage() {
  const [selectedMunicipality, setSelectedMunicipality] = useState("");

  const municipalities = [
    { code: "1106", name: "Lisboa" },
    { code: "1302", name: "Porto" },
    { code: "0613", name: "Coimbra" },
    { code: "0807", name: "Faro" },
    { code: "0305", name: "Braga" },
    { code: "1511", name: "Setúbal" },
    { code: "0714", name: "Évora" },
    { code: "0110", name: "Aveiro" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Análises do Mercado Imobiliário
          </h1>
          <p className="text-lg text-gray-600">
            Explore dados oficiais do INE e análises avançadas do mercado
            português
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              40+ Indicadores
            </h3>
            <p className="text-sm text-gray-600">Métricas oficiais do INE</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Map className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              308 Concelhos
            </h3>
            <p className="text-sm text-gray-600">Cobertura nacional completa</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              3 APIs INE
            </h3>
            <p className="text-sm text-gray-600">
              Catálogo, Base de Dados, Metadados
            </p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Tempo Real
            </h3>
            <p className="text-sm text-gray-600">
              Dados atualizados automaticamente
            </p>
          </div>
        </div>

        {/* Municipality Selection */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Selecionar Município para Análise Detalhada
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {municipalities.map((municipality) => (
              <button
                key={municipality.code}
                onClick={() => setSelectedMunicipality(municipality.code)}
                className={`p-3 rounded-lg border transition-colors duration-200 ${
                  selectedMunicipality === municipality.code
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-700"
                }`}
              >
                <div className="font-medium text-sm">{municipality.name}</div>
                <div className="text-xs text-gray-500">{municipality.code}</div>
              </button>
            ))}
          </div>
          {selectedMunicipality && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-800">
                ✓ Selecionado:{" "}
                {
                  municipalities.find((m) => m.code === selectedMunicipality)
                    ?.name
                }{" "}
                ({selectedMunicipality})
              </div>
            </div>
          )}
        </div>

        {/* INE Data Explorer */}
        <INEDataExplorer municipalityCode={selectedMunicipality} />

        {/* API Information */}
        <div className="card mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Integração com APIs do INE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">
                API de Base de Dados
              </h3>
              <p className="text-sm text-blue-800 mb-2">
                Acesso direto aos dados estatísticos armazenados nas bases de
                dados do INE.
              </p>
              <div className="text-xs text-blue-600">
                Endpoint: /ngt_server/attachfileu.jsp
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-900 mb-2">
                API de Catálogo
              </h3>
              <p className="text-sm text-green-800 mb-2">
                Informações sobre os conjuntos de dados disponíveis, incluindo
                descrições e metadados.
              </p>
              <div className="text-xs text-green-600">
                Endpoint: /ine/json_indicador
              </div>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-medium text-orange-900 mb-2">
                API de Metadados
              </h3>
              <p className="text-sm text-orange-800 mb-2">
                Detalhes sobre a estrutura dos dados, definições de variáveis e
                classificações.
              </p>
              <div className="text-xs text-orange-600">
                Endpoint: /ine/json_metadata
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
