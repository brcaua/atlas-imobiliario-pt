"use client";

import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to dashboard with search query
      window.location.href = `/dashboard?location=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-white py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Dados Imobiliários{" "}
            <span className="text-primary-600">em Segundos</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Introduza a sua cidade, código postal ou distrito para acompanhar o
            mercado imobiliário português de 2025 com análises do Atlas
            Imobiliário PT
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ex: Lisboa, 1000-001, Porto..."
                className="w-full pl-12 pr-32 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center px-6 text-white bg-primary-600 hover:bg-primary-700 rounded-r-xl transition-colors duration-200"
              >
                <Search className="h-5 w-5 mr-2" />
                <span className="font-medium">Pesquisar</span>
              </button>
            </div>
          </form>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard" className="btn-primary text-lg px-8 py-3">
              Explorar Mapa
            </Link>
            <Link href="/analytics" className="btn-secondary text-lg px-8 py-3">
              Ver Análises
            </Link>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-100 rounded-full opacity-20" />
      </div>
    </section>
  );
}
