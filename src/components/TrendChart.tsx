import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { HistoricalDataPoint, SelectedRegion, SingaporeRegion } from '../types/haze';
import { REGION_SHORT_NAMES } from '../data/hazeConstants';

interface TrendChartProps {
  dataPoints: HistoricalDataPoint[];
  trendDirection: 'improving' | 'stable' | 'worsening' | 'insufficient_data';
  trendDescription: string;
  deltaPM25: number;
  lastUpdatedTime: string;
  selectedRegion: SelectedRegion;
  onSelectRegion: (reg: SelectedRegion) => void;
}

export const TrendChart: React.FC<TrendChartProps> = ({
  dataPoints,
  trendDirection,
  trendDescription,
  deltaPM25,
  lastUpdatedTime,
  selectedRegion,
  onSelectRegion,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<HistoricalDataPoint | null>(null);

  if (!dataPoints || dataPoints.length === 0) {
    return null;
  }

  // Find max value to calibrate SVG scale
  const points = dataPoints.slice(-12); // Last 12 hourly readings
  const getVal = (pt: HistoricalDataPoint) => {
    if (selectedRegion === 'overall') return pt.overall;
    return pt[selectedRegion as SingaporeRegion] ?? pt.overall;
  };

  const values = points.map(getVal);
  const maxVal = Math.max(...values, 80);
  const chartMax = Math.ceil((maxVal + 20) / 50) * 50; // rounded up ceiling

  // SVG dimensions
  const width = 800;
  const height = 240;
  const paddingX = 45;
  const paddingTop = 25;
  const paddingBottom = 40;

  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingTop - paddingBottom;

  // Calculate coordinates for points
  const coords = points.map((pt, idx) => {
    const val = getVal(pt);
    const x = paddingX + (idx / (points.length - 1 || 1)) * chartWidth;
    const y = paddingTop + chartHeight - (val / chartMax) * chartHeight;
    return { x, y, pt, val };
  });

  // Construct SVG path string
  const linePath = coords.reduce((acc, curr, idx) => {
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${curr.x} ${curr.y}`;
  }, '');

  // Construct filled area path
  const areaPath = coords.length > 0
    ? `${linePath} L ${coords[coords.length - 1].x} ${paddingTop + chartHeight} L ${coords[0].x} ${paddingTop + chartHeight} Z`
    : '';

  // Category thresholds in Y coordinates
  const yNormal = paddingTop + chartHeight - (55 / chartMax) * chartHeight;
  const yElevated = paddingTop + chartHeight - (150 / chartMax) * chartHeight;

  const getTrendBadge = () => {
    switch (trendDirection) {
      case 'improving':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
            <TrendingDown className="w-3.5 h-3.5" />
            Improving (Downward)
          </span>
        );
      case 'worsening':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
            <TrendingUp className="w-3.5 h-3.5" />
            Rising (Upward)
          </span>
        );
      case 'stable':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-slate-100 text-slate-800 border border-slate-300">
            <Minus className="w-3.5 h-3.5" />
            Holding Steady
          </span>
        );
    }
  };

  return (
    <section className="py-8 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAFBFD] rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-sm">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
                  Air Quality Trend Visualisation
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-xs font-bold text-slate-500">Official NEA Hourly Feeds</span>
              </div>
              <h3 className="font-display font-black text-2xl text-[#1E293B] mt-1 flex items-center gap-2.5">
                <span>Today's 1-Hour PM2.5 Trend</span>
                {getTrendBadge()}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {trendDescription}
              </p>
            </div>

            {/* Region selector for chart */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
              <button
                onClick={() => onSelectRegion('overall')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedRegion === 'overall'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                SG Peak
              </button>
              {(['central', 'north', 'south', 'east', 'west'] as SingaporeRegion[]).map((r) => (
                <button
                  key={r}
                  onClick={() => onSelectRegion(r)}
                  className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-all capitalize cursor-pointer ${
                    selectedRegion === r
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {REGION_SHORT_NAMES[r]}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Trend Chart */}
          <div className="relative w-full overflow-x-auto">
            <div className="min-w-[640px]">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
                <defs>
                  {/* Subtle gradient fill under line */}
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EA580C" stopOpacity="0.25" />
                    <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Background Zone Bands */}
                {/* Normal Zone (0 to 55) */}
                <rect
                  x={paddingX}
                  y={Math.max(yNormal, paddingTop)}
                  width={chartWidth}
                  height={paddingTop + chartHeight - Math.max(yNormal, paddingTop)}
                  fill="#10B981"
                  fillOpacity="0.04"
                />
                {/* Elevated Zone (56 to 150) */}
                {yElevated < paddingTop + chartHeight && (
                  <rect
                    x={paddingX}
                    y={Math.max(yElevated, paddingTop)}
                    width={chartWidth}
                    height={Math.max(0, yNormal - Math.max(yElevated, paddingTop))}
                    fill="#F59E0B"
                    fillOpacity="0.04"
                  />
                )}

                {/* Horizontal Guideline: 55 µg/m³ (Normal threshold) */}
                {yNormal >= paddingTop && yNormal <= paddingTop + chartHeight && (
                  <g>
                    <line
                      x1={paddingX}
                      y1={yNormal}
                      x2={paddingX + chartWidth}
                      y2={yNormal}
                      stroke="#10B981"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      strokeOpacity="0.6"
                    />
                    <text
                      x={paddingX + chartWidth + 5}
                      y={yNormal + 4}
                      fill="#059669"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      55 (Normal)
                    </text>
                  </g>
                )}

                {/* Horizontal Guideline: 150 µg/m³ (Elevated threshold) */}
                {yElevated >= paddingTop && yElevated <= paddingTop + chartHeight && (
                  <g>
                    <line
                      x1={paddingX}
                      y1={yElevated}
                      x2={paddingX + chartWidth}
                      y2={yElevated}
                      stroke="#F59E0B"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      strokeOpacity="0.6"
                    />
                    <text
                      x={paddingX + chartWidth + 5}
                      y={yElevated + 4}
                      fill="#D97706"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      150 (Elevated)
                    </text>
                  </g>
                )}

                {/* Area Fill */}
                {areaPath && <path d={areaPath} fill="url(#areaGradient)" />}

                {/* Main Trend Line */}
                <path
                  d={linePath}
                  fill="none"
                  stroke="#1E293B"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data Points */}
                {coords.map((c, i) => {
                  const isLatest = i === coords.length - 1;
                  const isHovered = hoveredPoint === c.pt;
                  const isNormal = c.val <= 55;
                  const isElevated = c.val > 55 && c.val <= 150;
                  const dotColor = isNormal ? '#10B981' : isElevated ? '#F59E0B' : '#EA580C';

                  return (
                    <g
                      key={i}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredPoint(c.pt)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    >
                      {/* Outer pulse for latest reading */}
                      {isLatest && (
                        <circle
                          cx={c.x}
                          cy={c.y}
                          r="10"
                          fill={dotColor}
                          fillOpacity="0.2"
                          className="animate-ping"
                        />
                      )}

                      <circle
                        cx={c.x}
                        cy={c.y}
                        r={isLatest ? 6.5 : isHovered ? 6 : 4.5}
                        fill={dotColor}
                        stroke="#ffffff"
                        strokeWidth="2.5"
                      />

                      {/* Value label on top of point */}
                      <text
                        x={c.x}
                        y={c.y - 12}
                        textAnchor="middle"
                        fill="#1E293B"
                        fontSize={isLatest ? '12' : '10'}
                        fontWeight="bold"
                        className="font-mono-num pointer-events-none select-none"
                      >
                        {c.val}
                      </text>

                      {/* Time label below chart */}
                      <text
                        x={c.x}
                        y={paddingTop + chartHeight + 20}
                        textAnchor="middle"
                        fill="#64748B"
                        fontSize="11"
                        fontWeight="600"
                        className="font-mono-num pointer-events-none select-none"
                      >
                        {c.pt.timeLabel}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Chart Tooltip / Inspector Card */}
          {hoveredPoint && (
            <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-bold text-slate-800">
                  Time: {hoveredPoint.timeLabel} SGT
                </span>
              </div>
              <div className="flex items-center gap-4 text-slate-600 font-mono-num">
                <span>North: <strong className="text-slate-900">{hoveredPoint.north}</strong></span>
                <span>South: <strong className="text-slate-900">{hoveredPoint.south}</strong></span>
                <span>East: <strong className="text-slate-900">{hoveredPoint.east}</strong></span>
                <span>West: <strong className="text-slate-900">{hoveredPoint.west}</strong></span>
                <span>Central: <strong className="text-slate-900">{hoveredPoint.central}</strong></span>
              </div>
            </div>
          )}

          {/* Footer Metadata */}
          <div className="mt-5 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>0–55 Normal</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 ml-2" />
              <span>56–150 Elevated</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 ml-2" />
              <span>151–250 High</span>
            </div>
            <span>Units: 1-hr PM2.5 in micrograms per cubic meter (µg/m³)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
