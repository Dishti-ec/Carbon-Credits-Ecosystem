import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Sprout, Plus } from "lucide-react";

interface Farmland {
  id: string;
  farmer_name: string;
  land_size: number;
  crop_type: string;
  estimated_credits: number;
  location: string;
}

export function Farmlands() {
  const [farmlands, setFarmlands] = useState<Farmland[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form states
  const [farmerName, setFarmerName] = useState("");
  const [landSize, setLandSize] = useState("");
  const [cropType, setCropType] = useState("");
  const [credits, setCredits] = useState("");
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchFarmlands();
  }, []);

  const fetchFarmlands = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("farmlands")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setFarmlands(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("farmlands").insert([
      {
        user_id: user?.id,
        farmer_name: farmerName,
        land_size: Number(landSize),
        crop_type: cropType,
        estimated_credits: Number(credits),
        location,
      },
    ]);

    if (!error) {
      setShowForm(false);
      setFarmerName("");
      setLandSize("");
      setCropType("");
      setCredits("");
      setLocation("");
      fetchFarmlands(); // Refresh UI instantly
    } else {
      console.error("Error inserting farmland:", error.message);
      alert("Failed to submit form: " + error.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl" style={{ fontWeight: 600 }}>Farmland Listings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Registered agricultural lands and potential carbon credits.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Register Farmland
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-4">
          <h2 className="text-lg font-medium">New Farmland Registry</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1 text-muted-foreground">Farmer Name</label>
              <input required value={farmerName} onChange={(e) => setFarmerName(e.target.value)} type="text" className="w-full px-3 py-2 border rounded-lg bg-input-background" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-muted-foreground">Location</label>
              <input required value={location} onChange={(e) => setLocation(e.target.value)} type="text" className="w-full px-3 py-2 border rounded-lg bg-input-background" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-muted-foreground">Land Size (Acres)</label>
              <input required value={landSize} onChange={(e) => setLandSize(e.target.value)} type="number" step="0.01" className="w-full px-3 py-2 border rounded-lg bg-input-background" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-muted-foreground">Crop Type</label>
              <input required value={cropType} onChange={(e) => setCropType(e.target.value)} type="text" className="w-full px-3 py-2 border rounded-lg bg-input-background" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-muted-foreground">Estimated Credits (tCO2e)</label>
              <input required value={credits} onChange={(e) => setCredits(e.target.value)} type="number" className="w-full px-3 py-2 border rounded-lg bg-input-background" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg border text-sm">Cancel</button>
            <button disabled={submitting} type="submit" className="px-4 py-2 bg-primary text-white rounded-lg text-sm">{submitting ? "Submitting..." : "Submit"}</button>
          </div>
        </form>
      )}

      <div className="bg-card rounded-xl border border-border p-6">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading farmlands...</p>
        ) : farmlands.length === 0 ? (
          <p className="text-sm text-muted-foreground">No records found. Click to register one.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Farmer</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Location</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Size (Acres)</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Crop Type</th>
                  <th className="pb-3 text-sm font-medium text-muted-foreground">Est. Credits</th>
                </tr>
              </thead>
              <tbody>
                {farmlands.map((f) => (
                  <tr key={f.id} className="border-b border-border last:border-0 hover:bg-muted/10">
                    <td className="py-4">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Sprout className="w-4 h-4 text-green-600" />
                        {f.farmer_name}
                      </div>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">{f.location}</td>
                    <td className="py-4 text-sm">{f.land_size}</td>
                    <td className="py-4 text-sm">{f.crop_type}</td>
                    <td className="py-4 text-sm font-semibold">{f.estimated_credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
