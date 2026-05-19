import { useState } from 'react';
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, DollarSign, Wrench, CheckCircle, AlertTriangle, Ruler, Zap, Droplets } from "lucide-react";

interface ConversionType {
  name: string;
  description: string;
  costRange: string;
  valueAdd: string;
  icon: any;
  color: string;
}

interface PermitItem {
  category: string;
  items: string[];
  icon: any;
  color: string;
}

const CONVERSION_TYPES: ConversionType[] = [
  {
    name: "ADU — Accessory Dwelling Unit",
    description: "Full living space with kitchen and bath. Rental income potential of $900-1,400/mo in DFW suburbs.",
    costRange: "$45,000–$80,000″,
    valueAdd: "$40,000–$70,000″,
    icon: Home,
    color: "#3B82F6″,
  },
  {
    name: "Extra Bedroom",
    description: "Adds a legal bedroom with closet. Significant value add if it brings your home to 4+ bedrooms.",
    costRange: "$20,000–$40,000″,
    valueAdd: "$25,000–$45,000″,
    icon: Home,
    color: "#8B5CF6″,
  },
  {
    name: "Home Office",
    description: "Dedicated workspace with upgraded electrical and HVAC zoning. Adds $8,000–$15,000 in value.",
    costRange: "$20,000–$35,000″,
    valueAdd: "$10,000–$18,000″,
    icon: Home,
    color: "#10B981″,
  },
  {
    name: "Gym / Flex Space",
    description: "Rubber flooring, mirrors, ventilation. Highest personal use, moderate resale value.",
    costRange: "$15,000–$30,000″,
    valueAdd: "$8,000–$15,000″,
    icon: Home,
    color: "#F59E0B",
  },
];

const PERMIT_ITEMS: PermitItem[] = [
  {
    category: "Structural",
    items: ["Insulation to code", "Drywall / fire-rated walls", "Windows for egress (bedrooms)", "Garage door removal or conversion"],
    icon: Home,
    color: "#3B82F6″,
  },
  {
    category: "Electrical",
    items: ["Dedicated circuits for living space", "GFCI in kitchen/bath areas", "Smoke/CO detectors", "Lighting to code"],
    icon: Zap,
    color: "#F59E0B",
  },
  {
    category: "HVAC",
    items: ["Extend existing HVAC or mini-split", "Proper insulation for Texas heat", "Duct work or ductless system", "Ventilation for occupancy"],
    icon: Wrench,
    color: "#10B981″,
  },
  {
    category: "Plumbing (ADU only)",
    items: ["Water supply lines", "Drain/waste/vent rough-in", "Fixture rough-in", "City connection permit"],
    icon: Droplets,
    color: "#8B5CF6″,
  },
];

const CITY_RULES = [
  { city: "Frisco", rule: "ADUs allowed on lots >7,500 sqft. HOA approval required separately.", status: "favorable" },
  { city: "Plano", rule: "Garage conversions allowed. ADU requires owner-occupancy affidavit.", status: "moderate" },
  { city: "Allen", rule: "Garage conversion for personal use allowed. Full ADU requires variance.", status: "moderate" },
  { city: "McKinney", rule: "ADUs allowed with specific setback rules. Check with planning dept.", status: "favorable" },
  { city: "Prosper", rule: "More restrictive. Conversion for personal use only in most zones.", status: "restrictive" },
];

export default function GarageConversionGuide() {
  const [sqft, setSqft] = useState(400);
  const valueAdded = Math.round(sqft * 150);
  const lowCost = 20000;
  const highCost = 45000;
  const roi = Math.round(((valueAdded - ((lowCost + highCost) / 2)) / ((lowCost + highCost) / 2)) * 100);

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white">
        <div className="max-w-4xl mx-auto px-4 py-12″>
          <div className="mb-10″>
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-1.5 mb-4″>
              <Home size={14} className="text-blue-400″ />
              <span className="text-blue-400 text-sm font-medium">DFW Garage Conversion Guide</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3″>
              Add Square Footage and Value
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Garage conversions add an average of <span className="text-white font-semibold">$15,000–$35,000</span> in home value across DFW — and full ADUs can generate <span className="text-white font-semibold">$400–$900/mo</span> in rental income.
            </p>
          </div>

          {/* Conversion Types */}
          <section className="mb-12″>
            <h2 className="text-xl font-bold mb-5″>Conversion Types</h2>
            <div className="grid md:grid-cols-2 gap-4″>
              {CONVERSION_TYPES.map((ct) => (
                <Card key={ct.name} className="bg-white/5 border-white/10″>
                  <CardContent className="p-5″>
                    <div className="flex items-start gap-3 mb-3″>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0″ style={{ backgroundColor: ct.color + "22" }}>
                        <ct.icon size={18} style={{ color: ct.color }} />
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm mb-0.5″>{ct.name}</div>
                        <p className="text-gray-400 text-xs leading-relaxed">{ct.description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3″>
                      <div className="bg-black/30 rounded-lg p-3″>
                        <div className="text-xs text-gray-500 mb-0.5″>Typical Cost</div>
                        <div className="text-sm font-bold text-white">{ct.costRange}</div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-3″>
                        <div className="text-xs text-gray-500 mb-0.5″>Value Added</div>
                        <div className="text-sm font-bold text-green-400″>{ct.valueAdd}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* ROI Calculator */}
          <section className="mb-12″>
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2″>
              <Ruler size={20} className="text-blue-400″ />
              ROI Calculator
            </h2>
            <Card className="bg-white/5 border-white/10″>
              <CardContent className="p-6″>
                <div className="mb-6″>
                  <label className="block text-sm text-gray-400 mb-2″>
                    Square footage converting: <span className="text-white font-semibold">{sqft} sqft</span>
                  </label>
                  <input
                    type="range"
                    min={200}
                    max={800}
                    step={50}
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="w-full accent-blue-500″
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1″>
                    <span>200 sqft</span>
                    <span>800 sqft</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4″>
                  <div className="bg-black/40 rounded-xl p-4 text-center">
                    <div className="text-xs text-gray-500 mb-1″>Value Added</div>
                    <div className="text-2xl font-bold text-green-400″>${valueAdded.toLocaleString()}</div>
                    <div className="text-xs text-gray-600 mt-0.5″>@ $150/sqft avg DFW</div>
                  </div>
                  <div className="bg-black/40 rounded-xl p-4 text-center">
                    <div className="text-xs text-gray-500 mb-1″>Typical Cost</div>
                    <div className="text-2xl font-bold text-white">$32,500</div>
                    <div className="text-xs text-gray-600 mt-0.5″>mid-range estimate</div>
                  </div>
                  <div className="bg-black/40 rounded-xl p-4 text-center">
                    <div className="text-xs text-gray-500 mb-1″>ROI</div>
                    <div className={`text-2xl font-bold ${roi > 0 ? "text-green-400" : "text-red-400"}`}>{roi}%</div>
                    <div className="text-xs text-gray-600 mt-0.5″>at sale</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* City Rules */}
          <section className="mb-12″>
            <h2 className="text-xl font-bold mb-5″>DFW City ADU Rules</h2>
            <div className="space-y-3″>
              {CITY_RULES.map((cr) => (
                <div key={cr.city} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-4″>
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    cr.status === "favorable" ? "bg-green-400″ :
                    cr.status === "moderate" ? "bg-yellow-400″ : "bg-red-400"
                  }`} />
                  <div>
                    <div className="font-semibold text-sm text-white mb-0.5″>{cr.city}</div>
                    <div className="text-gray-400 text-sm">{cr.rule}</div>
                  </div>
                  <div className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${
                    cr.status === "favorable" ? "bg-green-500/20 text-green-400″ :
                    cr.status === "moderate" ? "bg-yellow-500/20 text-yellow-400″ : "bg-red-500/20 text-red-400"
                  }`}>
                    {cr.status}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-3″>Always verify with your city planning department and check HOA CC&Rs before starting any conversion.</p>
          </section>

          {/* Permit Requirements */}
          <section className="mb-12″>
            <h2 className="text-xl font-bold mb-5″>What Permits Are Required</h2>
            <div className="grid md:grid-cols-2 gap-4″>
              {PERMIT_ITEMS.map((pi) => (
                <Card key={pi.category} className="bg-white/5 border-white/10″>
                  <CardContent className="p-5″>
                    <div className="flex items-center gap-2 mb-3″>
                      <pi.icon size={16} style={{ color: pi.color }} />
                      <span className="font-semibold text-sm">{pi.category}</span>
                    </div>
                    <ul className="space-y-1.5″>
                      {pi.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-gray-400″>
                          <CheckCircle size={12} className="text-green-500 mt-0.5 flex-shrink-0″ />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30″>
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold mb-2″>Get Contractor Quotes for Your Garage Conversion</h3>
              <p className="text-gray-400 mb-6″>ProLnk connects you with licensed general contractors who specialize in garage conversions across DFW.</p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-semibold">
                Get Free Quotes →
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </HomeownerLayout>
  );
}
