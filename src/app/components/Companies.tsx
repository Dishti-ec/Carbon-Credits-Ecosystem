import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Factory } from "lucide-react";

interface Company {
  id: string;
  name: string;
  sector: string;
  compliance_status: string;
}

export function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const sampleCompanies: Company[] = [
    { id: "sample-1", name: "GreenTech Industries", sector: "Manufacturing", compliance_status: "compliant" },
    { id: "sample-2", name: "EcoLogistics", sector: "Transportation", compliance_status: "pending" },
    { id: "sample-3", name: "AgriCorp", sector: "Agriculture", compliance_status: "compliant" },
  ];

  const fetchCompanies = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setCompanies([...sampleCompanies, ...data]);
    } else {
      setCompanies(sampleCompanies);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl" style={{ fontWeight: 600 }}>Companies Directory</h1>
        <p className="text-sm text-muted-foreground mt-1">
          View registered corporate entities and their compliance statuses.
        </p>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading companies...</p>
        ) : companies.length === 0 ? (
          <p className="text-sm text-muted-foreground">No companies found. Create one after signing up!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companies.map((company) => (
              <div key={company.id} className="border border-border rounded-lg p-5 flex flex-col items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Factory className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm" style={{ fontWeight: 600 }}>{company.name}</h3>
                  <p className="text-xs text-muted-foreground">Sector: {company.sector}</p>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    company.compliance_status === "compliant"
                      ? "bg-[#d8f3dc] text-[#2d6a4f]"
                      : "bg-yellow-50 text-yellow-700"
                  }`}
                >
                  {company.compliance_status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
