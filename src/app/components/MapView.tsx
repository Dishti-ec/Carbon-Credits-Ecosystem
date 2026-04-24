import { useState, useEffect } from "react";
import {
  MapPin,
  Layers,
  TreePine,
  Factory,
  Sprout,
  ChevronDown,
  Eye,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { supabase } from "../../lib/supabase";

interface DBLocation {
  id: string;
  name: string;
  type: "farm" | "industry" | "fpo";
  lat: number;
  lng: number;
  details: string;
  credits: number;
  status: "active" | "pending" | "verified";
  state: string;
  originalData?: any;
}

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

// Component to recenter map when location is selected
function RecenterAutomatically({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 13);
  }, [lat, lng, map]);
  return null;
}

export function MapView() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [farmlands, setFarmlands] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<DBLocation | null>(null);
  const [filterType, setFilterType] = useState<"all" | "farm" | "industry" | "fpo">("all");
  const [showLayers, setShowLayers] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: companiesData } = await supabase.from("companies").select("*");
      const { data: farmlandsData } = await supabase.from("farmlands").select("*");
      setCompanies(companiesData || []);
      setFarmlands(farmlandsData || []);
    };
    fetchData();
  }, []);

  const dynamicLocations: DBLocation[] = [
    ...companies.filter((c) => c.latitude && c.longitude).map((c) => ({
      id: `company-${c.id}`,
      name: c.name || "Unknown Company",
      type: "industry" as const,
      lat: c.latitude,
      lng: c.longitude,
      details: `Sector: ${c.sector || "N/A"}`,
      credits: c.carbon_credits || 0,
      status: "active" as const,
      state: "India",
      originalData: c,
    })),
    ...farmlands.filter((f) => f.latitude && f.longitude).map((f) => ({
      id: `farm-${f.id}`,
      name: f.farmer_name || "Unknown Farm",
      type: "farm" as const,
      lat: f.latitude,
      lng: f.longitude,
      details: `Crop: ${f.crop_type || "N/A"}`,
      credits: f.estimated_credits || 0,
      status: "pending" as const,
      state: "India",
      originalData: f,
    })),
  ];

  const filteredLocations = dynamicLocations.filter(
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
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-3 bg-card rounded-xl border border-border overflow-hidden relative" style={{ minHeight: "540px" }}>
          <MapContainer center={[22.9734, 78.6569]} zoom={5} style={{ height: "100%", minHeight: "540px", width: "100%", zIndex: 10 }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredLocations.map((loc) => (
              <Marker
                key={loc.id}
                position={[loc.lat, loc.lng]}
                eventHandlers={{
                  click: () => setSelectedLocation(loc),
                }}
              >
                <Popup>
                  <strong>{loc.name}</strong><br />
                  {loc.details}<br />
                  Credits: {loc.credits.toLocaleString()} tCO2e
                </Popup>
              </Marker>
            ))}
            {selectedLocation && (
              <RecenterAutomatically lat={selectedLocation.lat} lng={selectedLocation.lng} />
            )}
          </MapContainer>
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
              {filteredLocations.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No map locations found in database.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
