'use client'

import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { LatLngExpression, Icon } from 'leaflet'
import { PropertyData } from '@/types'

// Fix for default markers in Leaflet with Next.js
const createCustomIcon = () => {
  return new Icon({
    iconUrl: '/images/marker-icon.png',
    shadowUrl: '/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
}

interface MapProps {
  center: LatLngExpression
  zoom: number
  properties: PropertyData[]
  onPropertyClick?: (property: PropertyData) => void
  className?: string
}

// Component to handle map updates
function MapUpdater({ center, zoom }: { center: LatLngExpression; zoom: number }) {
  const map = useMap()
  
  useEffect(() => {
    map.setView(center, zoom)
  }, [map, center, zoom])
  
  return null
}

export function Map({ center, zoom, properties, onPropertyClick, className = '' }: MapProps) {
  const customIcon = useMemo(() => createCustomIcon(), [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <MapUpdater center={center} zoom={zoom} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.location.latitude, property.location.longitude]}
            icon={customIcon}
            eventHandlers={{
              click: () => onPropertyClick?.(property),
            }}
          >
            <Popup>
              <div className="min-w-[200px] p-2">
                <h3 className="font-semibold text-sm mb-2">
                  {property.location.municipality}
                </h3>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Preço Médio:</span>
                    <span className="font-medium">
                      {formatPrice(property.metrics.medianPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Crescimento (1 ano):</span>
                    <span className={`font-medium ${
                      property.metrics.priceGrowth.year > 0 
                        ? 'text-success-600' 
                        : 'text-danger-600'
                    }`}>
                      {formatPercentage(property.metrics.priceGrowth.year)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Inventário:</span>
                    <span className="font-medium">
                      {property.metrics.inventory} propriedades
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dias no Mercado:</span>
                    <span className="font-medium">
                      {property.metrics.daysOnMarket} dias
                    </span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    {property.location.address}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
