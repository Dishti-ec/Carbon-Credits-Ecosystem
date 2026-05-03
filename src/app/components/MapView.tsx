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
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl, Circle, LayerGroup } from "react-leaflet";
import L from "leaflet";
import { supabase } from "../../lib/supabase";
import { useUserRole } from "../context/UserProvider";
import { useNavigate } from "react-router";

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

const companyIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [30, 30]
});

const farmIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2909/2909760.png',
  iconSize: [30, 30]
});

const getColor = (credits: number, type: string) => {
  if (type === 'industry') return 'blue';
  if (credits > 800) return 'green';
  if (credits > 400) return 'yellow';
  return 'red';
};

const Legend = ({ map }: { map: L.Map }) => {
  useEffect(() => {
    const legend = new L.Control({ position: 'bottomright' });

    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend');
      div.innerHTML = `
        <h4>Carbon Activity</h4>
        <i style="background: green"></i> High Credits<br/>
        <i style="background: yellow"></i> Medium Credits<br/>
        <i style="background: red"></i> Low Credits<br/>
        <i style="background: blue"></i> Company HQ
      `;
      return div;
    };

    legend.addTo(map);
    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
};

function MapLegend() {
  const map = useMap();
  return <Legend map={map} />;
}

// Component to recenter map when location is selected
function RecenterAutomatically({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 13);
  }, [lat, lng, map]);
  return null;
}

export function MapView() {
  const { role, user } = useUserRole();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<any[]>([]);
  const [farmlands, setFarmlands] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<DBLocation | null>(null);
  const [filterType, setFilterType] = useState<"all" | "farm" | "industry" | "fpo">("all");
  const [sectorFilter, setSectorFilter] = useState<string>("all");
  const [showLayers, setShowLayers] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: companiesData } = await supabase.from("companies").select("*");
      const { data: farmlandsData } = await supabase.from("farmlands").select("*");
      
      const sampleCompanies = [
        { id: "sample-map-1", name: "GreenTech Industries", latitude: 28.7041, longitude: 77.1025, sector: "Manufacturing", carbon_credits: 900 },
        { id: "sample-map-2", name: "EcoLogistics", latitude: 19.0760, longitude: 72.8777, sector: "Transportation", carbon_credits: 500 },
      ];
      const sampleFarmlands = [
        { id: "sample-map-3", farmer_name: "Ramesh Kumar", latitude: 31.1471, longitude: 75.3412, crop_type: "Wheat", estimated_credits: 450 },
        { id: "sample-map-4", farmer_name: "Suresh Patel", latitude: 22.2587, longitude: 71.1924, crop_type: "Rice", estimated_credits: 220 },
        { id: "sample-map-5", farmer_name: "Anita Devi", latitude: 19.7515, longitude: 75.7139, crop_type: "Sugarcane", estimated_credits: 850 },
      ];

      setCompanies([...sampleCompanies, ...(companiesData || [])]);
      setFarmlands([...sampleFarmlands, ...(farmlandsData || [])]);
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

  const filteredLocations = dynamicLocations.filter((l) => {
    const typeMatch = filterType === "all" || l.type === filterType;
    const sectorMatch = sectorFilter === "all" || (l.originalData && l.originalData.sector === sectorFilter);
    return typeMatch && sectorMatch;
  });

  // Auto-zoom for farmer (mock logic)
  useEffect(() => {
    if (role === "farmer" && filteredLocations.length > 0) {
      const myFarm = filteredLocations.find(l => l.type === "farm");
      if (myFarm && !selectedLocation) {
        setSelectedLocation(myFarm);
      }
    }
  }, [role, filteredLocations.length]);

  const handleActionClick = () => {
    if (!user) {
      alert("Join CarbonBridge to start your sustainability journey.");
      navigate("/"); // Redirect to auth/login
    }
  };

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
          <div className="relative flex gap-2">
            {role === "company" && (
              <select
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
                className="appearance-none bg-card border border-border rounded-lg px-3 py-2 pr-8 text-sm cursor-pointer"
              >
                <option value="all">All Sectors</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Transportation">Transportation</option>
              </select>
            )}
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-3 bg-card map-container relative" style={{ minHeight: "540px" }}>
          <MapContainer center={[22.9734, 78.6569]} zoom={5} style={{ height: "100%", minHeight: "540px", width: "100%", zIndex: 10 }}>
            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="OpenStreetMap">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
              </LayersControl.BaseLayer>

              <LayersControl.Overlay checked name="Activity Zones">
                <LayerGroup>
                  {filteredLocations.map((loc) => (
                    <Circle
                      key={`circle-${loc.id}`}
                      center={[loc.lat, loc.lng]}
                      radius={loc.credits * 100} // Dynamic radius based on credits
                      pathOptions={{ 
                        color: getColor(loc.credits, loc.type), 
                        fillColor: getColor(loc.credits, loc.type),
                        fillOpacity: 0.4
                      }}
                    />
                  ))}
                </LayerGroup>
              </LayersControl.Overlay>

              <LayersControl.Overlay checked name="Location Markers">
                <LayerGroup>
                  {filteredLocations.map((loc) => (
                    <Marker
                      key={loc.id}
                      position={[loc.lat, loc.lng]}
                      icon={loc.type === 'industry' ? companyIcon : farmIcon}
                      eventHandlers={{
                        click: () => setSelectedLocation(loc),
                      }}
                    >
                      <Popup>
                        <div className="text-sm">
                          <strong className="text-base">{loc.name}</strong><br />
                          <span className="text-muted-foreground">Location:</span> {loc.state}<br />
                          <span className="text-muted-foreground">Credits:</span> {loc.credits.toLocaleString()} tCO2e<br />
                          <span className="text-muted-foreground">Status:</span> {loc.credits > 800 ? "High Impact" : "Growing"}
                          
                          {(role === "company" || !user) && (
                            <button
                              onClick={handleActionClick}
                              className="mt-2 w-full py-1.5 bg-primary text-primary-foreground rounded-md text-xs font-medium hover:bg-primary/90 transition-colors"
                            >
                              {user ? "Buy/Reserve Credits" : "Login to Buy Credits"}
                            </button>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </LayerGroup>
              </LayersControl.Overlay>
            </LayersControl>
            <MapLegend />
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
