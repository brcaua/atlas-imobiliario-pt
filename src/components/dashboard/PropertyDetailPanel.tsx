"use client";

import React, { useMemo, useEffect, useRef } from "react";
import uPlot from "uplot";
import {
  X,
  MapPin,
  Euro,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { PropertyData } from "../../types";

interface PropertyDetailPanelProps {
  property: PropertyData | null;
  onClose: () => void;
  comparisons?: {
    lisbon: {
      name: string;
      price: number;
      yoy: number;
      fiveYear: number;
    } | null;
    porto: {
      name: string;
      price: number;
      yoy: number;
      fiveYear: number;
    } | null;
    faro: { name: string; price: number; yoy: number; fiveYear: number } | null;
  };
}

export function PropertyDetailPanel({
  property,
  onClose,
  comparisons,
}: PropertyDetailPanelProps) {
  if (!property) return null;

  const priceFormatter = new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  return (
    <div className="absolute inset-y-0 z-[1000] right-0 w-full sm:w-[420px] bg-white border-l border-gray-200 shadow-xl flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {property.location.municipality}
          </h3>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {property.location.district}
          </div>
        </div>
        <button
          aria-label="Fechar"
          onClick={onClose}
          className="p-2 rounded hover:bg-gray-100"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4 overflow-y-auto">
        {/* KPI Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-gray-200 p-3">
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Euro className="h-3 w-3" /> Home Value
            </div>
            <div className="text-base font-semibold text-gray-900 mt-1">
              {priceFormatter.format(property.price.current)}
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 p-3">
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> YoY Growth
            </div>
            <div
              className={`text-base font-semibold mt-1 ${property.metrics.priceGrowth.year >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {property.metrics.priceGrowth.year >= 0 ? "+" : ""}
              {property.metrics.priceGrowth.year.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* 5-year Home Value trend (interactive) */}
        <PriceTrendChartInteractive
          currentPrice={property.price.current}
          fiveYearGrowthPct={property.metrics.priceGrowth.fiveYear}
        />

        {/* Population growth chart (interactive) */}
        <PopulationTrendChartInteractive
          basePopulation={property.demographics.population}
          yearlyGrowthPct={Math.max(
            -2,
            Math.min(5, property.metrics.priceGrowth.year / 3)
          )}
        />

        {/* Long-Term Growth Score (stub bars with variation) */}
        <LongTermGrowthChart
          seedKey={`${property.location.municipality}-${property.location.district}`}
          yoy={property.metrics.priceGrowth.year}
          fiveYear={property.metrics.priceGrowth.fiveYear}
        />

        {/* Comparações com mercados de referência */}
        <div className="rounded-lg border border-gray-200 p-3 space-y-2">
          <div className="text-xs font-medium text-gray-700">
            Comparação com mercados de referência
          </div>
          {(["lisbon", "porto", "faro"] as const).map((key) => {
            const ref = (comparisons as any)?.[key];
            if (!ref) return null;
            const diff = property.price.current - ref.price;
            const isUp = diff >= 0;
            return (
              <div
                key={key}
                className="flex items-center justify-between text-sm"
              >
                <div className="text-gray-700">{ref.name}</div>
                <div
                  className={`flex items-center gap-1 ${isUp ? "text-red-600" : "text-green-600"}`}
                >
                  {isUp ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {priceFormatter.format(Math.abs(diff))}
                </div>
              </div>
            );
          })}
          <div className="text-xs text-gray-500">
            Comparação indicativa de preço atual.
          </div>
        </div>

        {/* Details */}
        <div className="rounded-lg border border-gray-200 p-3 space-y-2">
          <div className="text-xs text-gray-500">Detalhes</div>
          <div className="text-sm text-gray-700 flex items-center gap-1">
            <Users className="h-4 w-4 text-gray-500" /> População:{" "}
            {property.demographics.population.toLocaleString("pt-PT")}
          </div>

          <div className="text-sm text-gray-700">
            Anúncios ativos: {property.metrics.inventory}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetailPanel;

// Interactive charts using uPlot
function PriceTrendChartInteractive({
  currentPrice,
  fiveYearGrowthPct,
}: {
  currentPrice: number;
  fiveYearGrowthPct: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const annual = Math.pow(1 + fiveYearGrowthPct / 100, 1 / 5) - 1;
    const start = currentPrice / Math.pow(1 + annual, 5);
    const vals: number[] = [];
    const years: number[] = [];
    const baseYear = new Date().getFullYear() - 5;
    for (let i = 0; i <= 5; i += 1) {
      vals.push(Math.round(start * Math.pow(1 + annual, i)));
      years.push(baseYear + i);
    }

    const data: uPlot.AlignedData = [years, vals];
    const formatEUR = (n: number) =>
      `€${Math.round(n).toLocaleString("pt-PT")}`;
    const opts: uPlot.Options = {
      width: ref.current.clientWidth || 360,
      height: 140,
      scales: { x: { time: false } },
      series: [
        {},
        {
          label: "Preço",
          stroke: "#2563eb",
          width: 2,
          fill: "rgba(96,165,250,0.25)",
          points: { show: true, size: 4, stroke: "#2563eb", fill: "#fff" },
          value: (u, v) => (v == null ? "" : formatEUR(v as number)),
        },
      ],
      axes: [
        {
          grid: { show: true, stroke: "#eef2f7" },
          values: (u, t) => t.map((x) => String(x)),
        },
        {
          grid: { show: true, stroke: "#eef2f7" },
          values: (u, t) => t.map((y) => formatEUR(y as number)),
        },
      ],
      cursor: { focus: { prox: 24 }, drag: { x: true, y: false } },
      legend: { show: true },
      select: { show: true, left: 0, top: 0, width: 0, height: 0 },
    };

    const u = new uPlot(opts, data, ref.current);
    const onResize = () =>
      u.setSize({ width: ref.current?.clientWidth || 360, height: 120 });
    window.addEventListener("resize", onResize);
    return () => {
      u.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [currentPrice, fiveYearGrowthPct]);

  return (
    <div className="rounded-lg border border-gray-200 p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-gray-500">Home Value (últimos 5 anos)</div>
        <div className="text-xs text-gray-700">
          Atual:{" "}
          <span className="font-medium">
            {new Intl.NumberFormat("pt-PT", {
              style: "currency",
              currency: "EUR",
              maximumFractionDigits: 0,
            }).format(currentPrice)}
          </span>
        </div>
      </div>
      <div ref={ref} />
      <div className="mt-1 text-xs text-gray-500">
        Crescimento 5 anos: {fiveYearGrowthPct.toFixed(1)}%
      </div>
    </div>
  );
}

function PopulationTrendChartInteractive({
  basePopulation,
  yearlyGrowthPct,
}: {
  basePopulation: number;
  yearlyGrowthPct: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const r = yearlyGrowthPct / 100;
    const start = basePopulation / Math.pow(1 + r, 5);
    const vals: number[] = [];
    const years: number[] = [];
    const baseYear = new Date().getFullYear() - 5;
    for (let i = 0; i <= 5; i += 1) {
      vals.push(Math.round(start * Math.pow(1 + r, i)));
      years.push(baseYear + i);
    }

    const data: uPlot.AlignedData = [years, vals];
    const fmt = (n: number) => Math.round(n).toLocaleString("pt-PT");
    const opts: uPlot.Options = {
      width: ref.current.clientWidth || 360,
      height: 140,
      scales: { x: { time: false } },
      series: [
        {},
        {
          label: "População",
          stroke: "#059669",
          width: 2,
          fill: "rgba(16,185,129,0.2)",
          points: { show: true, size: 4, stroke: "#059669", fill: "#fff" },
          value: (u, v) => (v == null ? "" : fmt(v as number)),
        },
      ],
      axes: [
        {
          grid: { show: true, stroke: "#eef2f7" },
          values: (u, t) => t.map((x) => String(x)),
        },
        {
          grid: { show: true, stroke: "#eef2f7" },
          values: (u, t) => t.map((y) => fmt(y as number)),
        },
      ],
      cursor: { focus: { prox: 24 }, drag: { x: true, y: false } },
      legend: { show: true },
      select: { show: true, left: 0, top: 0, width: 0, height: 0 },
    };

    const u = new uPlot(opts, data, ref.current);
    const onResize = () =>
      u.setSize({ width: ref.current?.clientWidth || 360, height: 120 });
    window.addEventListener("resize", onResize);
    return () => {
      u.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [basePopulation, yearlyGrowthPct]);

  return (
    <div className="rounded-lg border border-gray-200 p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-gray-500">
          Crescimento Pop. (últimos 5 anos)
        </div>
        <div className="text-xs text-gray-700">
          Atual:{" "}
          <span className="font-medium">
            {basePopulation.toLocaleString("pt-PT")}
          </span>
        </div>
      </div>
      <div ref={ref} />
      <div className="mt-1 text-xs text-gray-500">
        Taxa anual estimada: {yearlyGrowthPct.toFixed(1)}%
      </div>
    </div>
  );
}

// Long-Term Growth Score mini bar chart with deterministic variation (no straight line)
function LongTermGrowthChart({
  seedKey,
  yoy,
  fiveYear,
}: {
  seedKey: string;
  yoy: number;
  fiveYear: number;
}) {
  const { bars, score } = useMemo(() => {
    const base = Math.max(0, Math.min(100, 30 + fiveYear * 0.8 + yoy * 1.2));
    // simple deterministic PRNG based on seed
    let h = 2166136261 >>> 0;
    for (let i = 0; i < seedKey.length; i += 1) {
      h ^= seedKey.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    const rand = () => {
      let x = (h = (h ^ (h << 13)) >>> 0);
      x ^= x >>> 17;
      x ^= x << 5;
      h = x >>> 0;
      return (x >>> 0) / 4294967295;
    };
    const list: number[] = [];
    for (let i = 0; i < 12; i += 1) {
      const wave = Math.sin((i / 12) * Math.PI * 1.6) * 8; // wavy pattern
      const noise = (rand() - 0.5) * 10; // +-5 variation
      const drift = i * 0.6; // slight drift
      list.push(Math.max(0, Math.min(100, base + wave + noise + drift)));
    }
    return { bars: list, score: Math.round(base) } as const;
  }, [seedKey, yoy, fiveYear]);

  const width = 360;
  const height = 96;
  const padding = 8;
  const barCount = bars.length;
  const gap = 2;
  const barWidth = (width - padding * 2 - gap * (barCount - 1)) / barCount;
  const yScale = (v: number) =>
    padding + ((100 - v) / 100) * (height - padding * 2);

  return (
    <div className="rounded-lg border border-gray-200 p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-gray-500">Long-Term Growth Score</div>
        <div className="text-xs text-gray-700">
          Score atual: <span className="font-medium">{score}/100</span>
        </div>
      </div>
      <svg
        role="img"
        aria-label={`Long-Term Growth Score: ${score} em 100`}
        className="w-full"
        viewBox={`0 0 ${width} ${height}`}
      >
        {bars.map((v, i) => (
          <rect
            key={i}
            x={padding + i * (barWidth + gap)}
            y={yScale(v)}
            width={Math.max(1, barWidth)}
            height={height - padding - yScale(v)}
            rx={2}
            fill="#6366f1"
            opacity={0.5 + (v / 100) * 0.5}
          >
            <title>{`Período ${i + 1}: ${v.toFixed(0)}/100`}</title>
          </rect>
        ))}
      </svg>
      <div className="mt-1 text-xs text-gray-500">
        Indicador ilustrativo com variação ao longo do tempo.
      </div>
    </div>
  );
}
