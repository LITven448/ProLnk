import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import ProLnkLogo from "@/components/ProLnkLogo";
import SEO from "@/components/SEO";
import { MapPin, Users, Home, ArrowRight, TrendingUp } from "lucide-react";

type CityCard = {
  slug: string;
  label: string;
  contractors: number;
  homeowners: number;
  desc: string;
  color: string;
};

const DFW_CITIES: CityCard[] = [
  {
    slug: "dallas",
    label: "Dallas",
    contractors: 847,
    homeowners: 3200,
    desc: "The DFW core — the largest contractor and homeowner base in the network.",
    color: "#14b8a6″,
  },
  {
    slug: "fort-worth",
    label: "Fort Worth",
    contractors: 412,
    homeowners: 1800,
    desc: "West DFW's hub for home services — strong in plumbing, GC, and HVAC.",
    color: "#3b82f6″,
  },
  {
    slug: "plano",
    label: "Plano",
    contractors: 203,
    homeowners: 2100,
    desc: "High-income Plano homeowners demand premium contractors — ProLnk delivers.",
    color: "#8b5cf6″,
  },
  {
    slug: "frisco",
    label: "Frisco",
    contractors: 156,
    homeowners: 1900,
    desc: "One of Texas's fastest-growing cities — new homes need trusted pros.",
    color: "#f97316″,
  },
  {
    slug: "arlington",
    label: "Arlington",
    contractors: 298,
    homeowners: 2400,
    desc: "Between Dallas and Fort Worth — ProLnk covers every zip in Arlington.",
    color: "#eab308″,
  },
];

const TOTAL_CONTRACTORS = DFW_CITIES.reduce((sum, c) => sum + c.contractors, 0);
const TOTAL_HOMEOWNERS = DFW_CITIES.reduce((sum, c) => sum + c.homeowners, 0);

export default function CityLandingList() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen" style={{ background: "#050d1a" }}>
      <SEO
        title="ProLnk Serves All of DFW — Dallas, Fort Worth, Plano, Frisco, Arlington"
        description={`ProLnk connects homeowners with ${TOTAL_CONTRACTORS.toLocaleString()} vetted contractors across the Dallas–Fort Worth metro. Find local pros in Dallas, Fort Worth, Plano, Frisco, and Arlington.`}
        path="/cities"
      />

      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <button onClick={() => navigate("/")} className="focus:outline-none">
          <ProLnkLogo height={32} />
        </button>
        <div className="flex items-center gap-3″>
          <button
            onClick={() => navigate("/trades")}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Browse by Trade
          </button>
          <Button
            onClick={() => navigate("/founding-partner")}
            className="bg-teal-500 hover:bg-teal-400 text-white font-bold text-sm px-5″
          >
            Join the Network
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-14 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-5″>
          <MapPin className="w-3.5 h-3.5″ />
          Dallas–Fort Worth Metro
        </div>

        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-4″>
          ProLnk Serves<br />
          <span className="text-teal-400″>All of DFW</span>
        </h1>

        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          One platform. Five major DFW cities. {TOTAL_CONTRACTORS.toLocaleString()} vetted contractors
          and {TOTAL_HOMEOWNERS.toLocaleString()} homeowners — all in the same AI-powered network.
        </p>

        {/* Metro-wide stats */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10″>
          <div className="flex items-center gap-3 bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4″>
            <Users className="w-5 h-5 text-teal-400″ />
            <div className="text-left">
              <div className="text-2xl font-black text-white">{TOTAL_CONTRACTORS.toLocaleString()}</div>
              <div className="text-xs text-gray-400″>DFW contractors</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4″>
            <Home className="w-5 h-5 text-teal-400″ />
            <div className="text-left">
              <div className="text-2xl font-black text-white">{TOTAL_HOMEOWNERS.toLocaleString()}</div>
              <div className="text-xs text-gray-400″>homeowners in network</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4″>
            <MapPin className="w-5 h-5 text-teal-400″ />
            <div className="text-left">
              <div className="text-2xl font-black text-white">5</div>
              <div className="text-xs text-gray-400″>DFW cities covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* DFW map placeholder */}
      <section className="max-w-5xl mx-auto px-6 py-8″>
        <div
          className="relative rounded-2xl border border-gray-800 overflow-hidden"
          style={{ background: "#0a1628″, minHeight: 280 }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8″>
            <div
              className="w-16 h-16 rounded-full border-2 border-teal-500/30 flex items-center justify-center"
              style={{ background: "rgba(20,184,166,0.08)" }}
            >
              <MapPin className="w-8 h-8 text-teal-400″ />
            </div>
            <div className="text-center">
              <div className="text-white font-bold text-lg mb-1″>Dallas–Fort Worth Metro</div>
              <div className="text-gray-400 text-sm">Interactive coverage map coming soon</div>
            </div>
            {/* City dots */}
            <div className="flex flex-wrap gap-3 justify-center mt-2″>
              {DFW_CITIES.map((city) => (
                <button
                  key={city.slug}
                  onClick={() => navigate(`/cities/${city.slug}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105″
                  style={{
                    background: `${city.color}18`,
                    border: `1px solid ${city.color}40`,
                    color: city.color,
                  }}
                >
                  <MapPin className="w-3 h-3″ />
                  {city.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* City cards */}
      <section className="max-w-5xl mx-auto px-6 py-16″>
        <h2 className="text-3xl font-black text-white text-center mb-2″>
          Select Your City
        </h2>
        <p className="text-gray-400 text-center mb-10″>
          Each city page shows local contractors, top services, and how ProLnk works in your area
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6″>
          {DFW_CITIES.map((city) => (
            <button
              key={city.slug}
              onClick={() => navigate(`/cities/${city.slug}`)}
              className="text-left bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4 hover:border-gray-600 transition-all hover:scale-[1.02] group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${city.color}18` }}
              >
                <MapPin className="w-5 h-5″ style={{ color: city.color }} />
              </div>
              <div>
                <div className="text-white font-black text-xl mb-1 group-hover:text-teal-400 transition-colors">
                  {city.label}
                </div>
                <div className="text-gray-400 text-sm leading-relaxed">{city.desc}</div>
              </div>
              <div className="flex gap-4″>
                <div>
                  <div className="text-white font-bold text-lg">{city.contractors.toLocaleString()}</div>
                  <div className="text-gray-500 text-xs">contractors</div>
                </div>
                <div>
                  <div className="text-white font-bold text-lg">{city.homeowners.toLocaleString()}</div>
                  <div className="text-gray-500 text-xs">homeowners</div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: city.color }}>
                View {city.label} page <ArrowRight className="w-3.5 h-3.5″ />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Why DFW */}
      <section className="max-w-4xl mx-auto px-6 py-12″>
        <div className="bg-gray-900 border border-teal-500/20 rounded-2xl p-8″>
          <div className="flex items-center gap-3 mb-4″>
            <TrendingUp className="w-6 h-6 text-teal-400″ />
            <h3 className="text-xl font-black text-white">Why ProLnk Started in DFW</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-4″>
            Dallas–Fort Worth is the fastest-growing metro in the US. That means more homes,
            more maintenance needs, and more demand for qualified contractors than anywhere else in Texas.
            ProLnk launched here because the supply-demand gap is largest — and the opportunity for
            contractors to build real network income is greatest.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            The Founding Network is open to contractors and homeowners across all 5 major DFW cities.
            Charter spots lock at $149/mo and are capped at 500 applications total.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-black text-white mb-3″>
          Pick Your City. Join the Network.
        </h2>
        <p className="text-gray-400 mb-8″>
          {TOTAL_CONTRACTORS.toLocaleString()} DFW contractors. {TOTAL_HOMEOWNERS.toLocaleString()} homeowners.
          Charter spots close at 500.
        </p>
        <Button
          onClick={() => navigate("/founding-partner")}
          size="lg"
          className="bg-teal-500 hover:bg-teal-400 text-white font-black text-lg px-10 h-16″
        >
          Join the Founding Network <ArrowRight className="ml-2 w-5 h-5″ />
        </Button>
        <p className="text-gray-600 text-xs mt-4″>No long-term contract. Cancel anytime.</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-6″>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4″>
          <ProLnkLogo height={24} />
          <div className="flex gap-6 text-xs text-gray-500″>
            <button onClick={() => navigate("/privacy")} className="hover:text-gray-300 transition-colors">Privacy</button>
            <button onClick={() => navigate("/terms")} className="hover:text-gray-300 transition-colors">Terms</button>
            <button onClick={() => navigate("/trades")} className="hover:text-gray-300 transition-colors">Browse by Trade</button>
          </div>
          <p className="text-gray-600 text-xs">© 2026 ProLnk. Dallas–Fort Worth, TX.</p>
        </div>
      </footer>
    </div>
  );
}
