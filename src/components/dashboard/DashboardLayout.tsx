"use client";

import React, { useState } from "react";
import { Search, Filter, MoreHorizontal, Download, Share2 } from "lucide-react";
import Link from "next/link";

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  map: React.ReactNode;
  onSearch?: (query: string) => void;
}

export function DashboardLayout({
  children,
  sidebar,
  map,
  onSearch,
}: DashboardLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState("State");

  const topNavItems = ["State", "Metro", "County", "Zip"];

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <Link href="/">
              <span className="font-bold text-gray-900 text-sm">
                atlas imobiliário
              </span>
            </Link>
          </div>

          {/* Center: Search and Navigation */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search your County, City, or ZIP Code"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && onSearch) {
                      onSearch(searchQuery.trim());
                    }
                  }}
                />
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {topNavItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => setActiveView(item)}
                    disabled={item !== "State"}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      activeView === item
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 ${item !== 'State' ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-900'}"
                    }`}
                    title={item !== "State" ? "Em breve" : undefined}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Filter className="h-4 w-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Share2 className="h-4 w-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Download className="h-4 w-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreHorizontal className="h-4 w-4 text-gray-600" />
            </button>
            <div className="flex space-x-2 ml-4">
              <button className="px-3 py-1 text-xs font-medium text-primary-600 hover:bg-primary-50 rounded">
                Sign up
              </button>
              <button className="px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          {sidebar}
        </div>

        {/* Map Area */}
        <div className="flex-1 relative">
          {map}

          {/* Bottom Controls */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-4">
            <div className="bg-white rounded-lg shadow-lg px-4 py-2 flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Tooltip</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <button className="text-xs text-gray-600 hover:text-gray-900">
                Table View
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg px-3 py-2">
              <span className="text-xs text-gray-600">Date: Dec 2024</span>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 right-4">
            <div className="bg-white rounded-lg shadow-lg p-3">
              <div className="text-xs font-medium text-gray-900 mb-2">
                Data Point: Home Value
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-3 bg-gradient-to-r from-blue-200 via-yellow-300 to-red-500"></div>
                <span className="text-xs text-gray-600">€150k - €800k</span>
              </div>
            </div>
          </div>

          {/* Right-side overlay area for detail panels */}
          {children}
        </div>
      </div>
    </div>
  );
}
