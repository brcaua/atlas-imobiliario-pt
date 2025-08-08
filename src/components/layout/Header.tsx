"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Menu, X, BarChart3, Map, TrendingUp } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Mapa", href: "/dashboard", icon: Map },
    { name: "Análises", href: "/analytics", icon: BarChart3 },
    { name: "Tendências", href: "/trends", icon: TrendingUp },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Atlas Imobiliário PT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Info Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/about"
              className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200"
            >
              Sobre
            </Link>
            <Link href="/dashboard" className="btn-primary text-sm">
              Explorar
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="block text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                Sobre
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="block btn-primary text-sm text-center"
              >
                Explorar
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
