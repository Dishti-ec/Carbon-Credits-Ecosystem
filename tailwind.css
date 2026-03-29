import { useState } from "react";
import {
  MapPin,
  Layers,
  TreePine,
  Factory,
  Droplets,
  Sprout,
  ChevronDown,
  Eye,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MapLocation {
  id: number;
  name: string;
  type: "farm" | "industry" | "fpo";
  lat: number;
  lng: number;
  x: string;
  y: string;
  details: string;
  credits: number;
  status: "active" | "pending" | "verified";
  state: string;
}

const locations: MapLocation[] = [
  { id: 1, name: "Rajasthan Agroforestry Zone", type: "farm", lat: 26.9, lng: 75.7, x: "38%", y: "32%", details: "4,200 hectares under agroforestry", credits: 3400, status: "active", state: "Rajasthan" },
  { id: 2, name: "Tata Steel - Jamshedpur", type: "industry", lat: 22.8, lng: 86.2, x: "68%", y: "45%", details: "Compliance target: 1.0-3.0% reduction", credits: 12800, status: "verified", state: "Jharkhand" },
  { id: 3, name: "Punjab AWD Rice Cluster", type: "farm", lat: 30.7, lng: 75.8, x: "40%", y: "18%", details: "Methane reduction via Alternate Wetting & Drying", credits: 1850, status: "pending", state: "Punjab" },
  { id: 4, name: "Maharashtra FPO Network", type: "fpo", lat: 19.7, lng: 75.7, x: "42%", y: "58%", details: "850 farmers aggregated across 12 FPOs", credits: 2100, status: "active", state: "Maharashtra" },
  { id: 5, name: "ACC Cement - Wadi Works", type: "industry", lat: 15.5, lng: 75.0, x: "38%", y: "72%", details: "Calcination optimization program", credits: 8200, status: "verified", state: "Karnataka" },
  { id: 6, name: "Gujarat Solar Integration", type: "industry", lat: 22.3, lng: 71.2, x: "22%", y: "48%", details: "Petroleum refinery green energy", credits: 5600, status: "active", state: "Gujarat" },
  { id: 7, name: "UP Biochar Initiative", type: "farm", lat: 27.2, lng: 80.9, x: "52%", y: "28%", details: "Soil organic carbon enhancement", credits: 1200, status: "pending", state: "Uttar Pradesh" },
  { id: 8, name: "Tamil Nadu Textile Cluster", type: "industry", lat: 11.0, lng: 78.0, x: "48%", y: "85%", details: "Process heat optimization", credits: 4300, status: "active", state: "Tamil Nadu" },
];

const typeConfig = {
  farm: { label: "Farm/Agriculture", color: "#52b788", icon: Sprout },
  industry: { label: "Industrial Plant", color: "#2d6a4f", icon: Factory },
  fpo: { label: "FPO Network", color: "#40916c", icon: TreePine },
};

const statusColor = {
  active: "#2d6a4f",
  pending: "#b45309",
  verified: "#0369a1",
};

export function MapView() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [filterType, setFilterType] = useState<"all" | "farm" | "industry" | "fpo">("all");
  const [showLayers, setShowLayers] = useState(true);

  const filteredLocations = locations.filter(
    (l) => filterType === "all" || l.type === filterType
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl" style={{ fontWeight: 600 }}>Geospatial Map</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Carbon project locations, industrial zones, and farmer networks across India
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLayers(!showLayers)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
              showLayers ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"
            }`}
          >
            <Layers className="w-4 h-4" />
            Layers
          </button>
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as typeof filterType)}
              className="appearance-none bg-card border border-border rounded-lg px-3 py-2 pr-8 text-sm cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="farm">Farm Zones</option>
              <option value="industry">Industrial</option>
              <option value="fpo">FPO Networks</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-3 bg-card rounded-xl border border-border overflow-hidden relative" style={{ minHeight: "540px" }}>
          {/* Map Background */}
          <div className="relative w-full h-full min-h-[540px]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1725308283640-cf46e178bd02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXRlbGxpdGUlMjBhZXJpYWwlMjBmYXJtbGFuZCUyMG1hcCUyMHZpZXd8ZW58MXx8fHwxNzcyNzk2Njg1fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Map view"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-[#1b4332]/20 backdrop-blur-[1px]"></div>

            {/* India outline overlay - simplified SVG */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
              <path
                d="M35,10 L50,8 L60,12 L65,10 L75,15 L78,25 L80,35 L75,45 L72,55 L68,50 L60,55 L55,65 L50,75 L48,85 L45,90 L42,88 L40,80 L35,70 L30,60 L25,55 L20,45 L22,35 L28,25 L30,15 Z"
                fill="rgba(45,106,79,0.15)"
                stroke="rgba(45,106,79,0.4)"
                strokeWidth="0.5"
              />
            </svg>

            {/* Location Pins */}
            {filteredLocations.map((loc) => {
              const TypeIcon = typeConfig[loc.type].icon;
              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className="absolute group z-10"
                  style={{ left: loc.x, top: loc.y, transform: "translate(-50%, -50%)" }}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-125 ${
                      selectedLocation?.id === loc.id ? "scale-125 ring-4 ring-white/50" : ""
                    }`}
                    style={{ backgroundColor: typeConfig[loc.type].color }}
                  >
                    <TypeIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45" style={{ backgroundColor: typeConfig[loc.type].color }}></div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-white rounded-lg shadow-xl px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    <p className="text-xs" style={{ fontWeight: 600, color: "#1a2e1a" }}>{loc.name}</p>
                    <p className="text-xs text-gray-500">{loc.credits.toLocaleString()} tCO2e</p>
                  </div>
                </button>
              );
            })}

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button className="w-9 h-9 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                <ZoomIn className="w-4 h-4 text-gray-700" />
              </button>
              <button className="w-9 h-9 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                <ZoomOut className="w-4 h-4 text-gray-700" />
              </button>
              <button className="w-9 h-9 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Maximize2 className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            {/* Legend */}
            {showLayers && (
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-lg shadow-lg p-3">
                <p className="text-xs mb-2" style={{ fontWeight: 600 }}>Map Legend</p>
                <div className="space-y-1.5">
                  {Object.entries(typeConfig).map(([key, config]) => {
                    const Icon = config.icon;
                    return (
                      <div key={key} className="flex items-center gap-2 text-xs">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: config.color }}>
                          <Icon className="w-3 h-3 text-white" />
                        </div>
                        {config.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Selected Location Detail */}
          {selectedLocation ? (
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: typeConfig[selectedLocation.type].color }}
                >
                  {(() => {
                    const Icon = typeConfig[selectedLocation.type].icon;
                    return <Icon className="w-5 h-5 text-white" />;
                  })()}
                </div>
                <div>
                  <p className="text-sm" style={{ fontWeight: 600 }}>{selectedLocation.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedLocation.state}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type</span>
                  <span style={{ fontWeight: 500 }}>{typeConfig[selectedLocation.type].label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Credits</span>
                  <span style={{ fontWeight: 500 }}>{selectedLocation.credits.toLocaleString()} tCO2e</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs"
                    style={{
                      backgroundColor: `${statusColor[selectedLocation.status]}15`,
                      color: statusColor[selectedLocation.status],
                      fontWeight: 500,
                    }}
                  >
                    {selectedLocation.status.charAt(0).toUpperCase() + selectedLocation.status.slice(1)}
                  </span>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">{selectedLocation.details}</p>
                </div>
              </div>
              <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors">
                <Eye className="w-4 h-4" />
                View Full Report
              </button>
            </div>
          ) : (
            <div className="bg-card rounded-xl border border-border p-4 text-center">
              <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Select a location on the map to view details
              </p>
            </div>
          )}

          {/* Location List */}
          <div className="bg-card rounded-xl border border-border p-4">
            <h3 className="text-sm mb-3" style={{ fontWeight: 600 }}>All Locations</h3>
            <div className="space-y-2 max-h-[320px] overflow-y-auto">
              {filteredLocations.map((loc) => {
                const Icon = typeConfig[loc.type].icon;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-colors ${
                      selectedLocation?.id === loc.id ? "bg-secondary" : "hover:bg-muted/50"
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${typeConfig[loc.type].color}20` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: typeConfig[loc.type].color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs truncate" style={{ fontWeight: 500 }}>{loc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {loc.credits.toLocaleString()} tCO2e
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
