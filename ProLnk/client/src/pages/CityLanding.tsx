import React from 'react';
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import ProLnkLogo from "@/components/ProLnkLogo";
import SEO from "@/components/SEO";
import {
  MapPin, Users, Home, CheckCircle, ArrowRight, Star,
  DollarSign, Wrench, Zap, Droplets, Wind, TrendingUp,
} from "lucide-react";

type CityData = {
  label: string;
  contractors: number;
  homeowners: number;
  tagline: string;
  topServices: { name: string; avgJob: string; icon: React.ReactNode }[];
  contractors3: { name: string; trade: string; city: string; years: number; rating: number }[];
  howItWorks: { step: string; desc: string }[];
};

const CITIES: Record<string, CityData> = {
  dallas: {
    label: "Dallas",
    contractors: 847,
    homeowners: 3200,
    tagline: "DFW's largest home services network — connecting Dallas homeowners with vetted local contractors.",
    topServices: [
      { name: "HVAC Service & Repair", avgJob: "$850 avg", icon: <Wind className="w-5 h-5″ /> },
      { name: "Electrical Work", avgJob: "$750 avg", icon: <Zap className="w-5 h-5″ /> },
      { name: "Roofing & Storm Repair", avgJob: "$8,500 avg", icon: <Home className="w-5 h-5″ /> },
    ],
    contractors3: [
      { name: "Marcus J.", trade: "HVAC Technician", city: "Dallas, TX", years: 12, rating: 5 },
      { name: "Sandra R.", trade: "Licensed Electrician", city: "Dallas, TX", years: 8, rating: 5 },
      { name: "Derek V.", trade: "Roofing Contractor", city: "Dallas, TX", years: 14, rating: 5 },
    ],
    howItWorks: [
      { step: "Submit Your Request", desc: "Tell ProLnk what you need. Takes 60 seconds." },
      { step: "AI Matches You", desc: "Our AI reviews 847 Dallas contractors and surfaces the 3 best fits for your job." },
      { step: "You Choose & Save", desc: "Get competitive quotes from vetted pros. No cold calls. No shared leads." },
    ],
  },
  "fort-worth": {
    label: "Fort Worth",
    contractors: 412,
    homeowners: 1800,
    tagline: "Fort Worth homeowners get connected to vetted local pros — faster and fairer than any other platform.",
    topServices: [
      { name: "Plumbing Repairs", avgJob: "$600 avg", icon: <Droplets className="w-5 h-5″ /> },
      { name: "General Contracting", avgJob: "$25,000 avg", icon: <Wrench className="w-5 h-5″ /> },
      { name: "HVAC Installation", avgJob: "$850 avg", icon: <Wind className="w-5 h-5″ /> },
    ],
    contractors3: [
      { name: "Carlos M.", trade: "Master Plumber", city: "Fort Worth, TX", years: 11, rating: 5 },
      { name: "Rita K.", trade: "General Contractor", city: "Fort Worth, TX", years: 9, rating: 5 },
      { name: "Tony B.", trade: "HVAC Specialist", city: "Fort Worth, TX", years: 15, rating: 5 },
    ],
    howItWorks: [
      { step: "Describe Your Project", desc: "Share your home service need. We handle the rest." },
      { step: "Get Matched Instantly", desc: "ProLnk's AI selects from 412 Fort Worth contractors for your specific job type." },
      { step: "Hire with Confidence", desc: "Every contractor is licensed, insured, and reviewed by real Fort Worth homeowners." },
    ],
  },
  plano: {
    label: "Plano",
    contractors: 203,
    homeowners: 2100,
    tagline: "Plano homeowners deserve the best contractors. ProLnk's AI finds them — fast.",
    topServices: [
      { name: "Landscaping & Design", avgJob: "$1,200 avg", icon: <Home className="w-5 h-5″ /> },
      { name: "Electrical Upgrades", avgJob: "$750 avg", icon: <Zap className="w-5 h-5″ /> },
      { name: "Painting (Interior/Exterior)", avgJob: "$3,200 avg", icon: <Wrench className="w-5 h-5″ /> },
    ],
    contractors3: [
      { name: "Gloria N.", trade: "Landscape Designer", city: "Plano, TX", years: 7, rating: 5 },
      { name: "Paul J.", trade: "Licensed Electrician", city: "Plano, TX", years: 10, rating: 5 },
      { name: "Rosa T.", trade: "Painting Contractor", city: "Plano, TX", years: 8, rating: 5 },
    ],
    howItWorks: [
      { step: "Tell Us Your Need", desc: "Enter your project details. Our form is optimized for Plano homeowners." },
      { step: "AI Screens 203 Local Pros", desc: "ProLnk surfaces the highest-rated Plano contractors for your job and budget." },
      { step: "Book the Right Pro", desc: "Compare quotes from verified local contractors. No surprises at the door." },
    ],
  },
  frisco: {
    label: "Frisco",
    contractors: 156,
    homeowners: 1900,
    tagline: "Frisco is one of the fastest-growing cities in Texas. ProLnk keeps up — 156 vetted contractors ready.",
    topServices: [
      { name: "New Construction Finishing", avgJob: "$25,000 avg", icon: <Wrench className="w-5 h-5″ /> },
      { name: "Smart Home Electrical", avgJob: "$750 avg", icon: <Zap className="w-5 h-5″ /> },
      { name: "HVAC Systems", avgJob: "$850 avg", icon: <Wind className="w-5 h-5″ /> },
    ],
    contractors3: [
      { name: "Nathan K.", trade: "General Contractor", city: "Frisco, TX", years: 14, rating: 5 },
      { name: "Andre W.", trade: "Smart Home Electrician", city: "Frisco, TX", years: 6, rating: 5 },
      { name: "Maria G.", trade: "HVAC Contractor", city: "Frisco, TX", years: 9, rating: 5 },
    ],
    howItWorks: [
      { step: "Submit Your Home Service Request", desc: "Frisco homes are newer — we match you with contractors who know the market." },
      { step: "Match to 156 Frisco Pros", desc: "AI screens for trade type, availability, and proximity to your Frisco address." },
      { step: "Get It Done Right", desc: "Vetted contractors, transparent pricing, and a Home Health Vault record for your property." },
    ],
  },
  arlington: {
    label: "Arlington",
    contractors: 298,
    homeowners: 2400,
    tagline: "Arlington sits between Dallas and Fort Worth. ProLnk covers every zip code — 298 contractors ready.",
    topServices: [
      { name: "Roofing & Gutters", avgJob: "$8,500 avg", icon: <Home className="w-5 h-5″ /> },
      { name: "Plumbing Service", avgJob: "$600 avg", icon: <Droplets className="w-5 h-5″ /> },
      { name: "Pest Control", avgJob: "$350 avg", icon: <Wrench className="w-5 h-5″ /> },
    ],
    contractors3: [
      { name: "Brian H.", trade: "Roofing Contractor", city: "Arlington, TX", years: 12, rating: 5 },
      { name: "James R.", trade: "Master Plumber", city: "Arlington, TX", years: 9, rating: 5 },
      { name: "Mike O.", trade: "Pest Control Specialist", city: "Arlington, TX", years: 7, rating: 5 },
    ],
    howItWorks: [
      { step: "Describe Your Job", desc: "Tell ProLnk what your Arlington home needs. Any service, any size." },
      { step: "Get Matched to Local Pros", desc: "298 Arlington contractors are in the network. AI picks the best 3 for your job." },
      { step: "Hire and Track the Job", desc: "Contractors are accountable. Every job is logged in your Home Health Vault." },
    ],
  },
};

export default function CityLanding() {
  const params = useParams<{ city: string }>();
  const [, navigate] = useLocation();
  const citySlug = (params.city ?? "").toLowerCase();
  const data = CITIES[citySlug];

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white gap-4″>
        <div className="text-2xl font-bold">City not found</div>
        <Button onClick={() => navigate("/cities")} variant="outline">View DFW Cities</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#050d1a" }}>
      <SEO
        title={`ProLnk ${data.label} — ${data.contractors.toLocaleString()} Contractors, ${data.homeowners.toLocaleString()} Homeowners`}
        description={`${data.tagline} Find licensed, vetted home service contractors in ${data.label}, TX through ProLnk's AI-powered matching platform.`}
        path={`/cities/${citySlug}`}
      />

      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <button onClick={() => navigate("/")} className="focus:outline-none">
          <ProLnkLogo height={32} />
        </button>
        <div className="flex items-center gap-3″>
          <button
            onClick={() => navigate("/cities")}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            All DFW Cities
          </button>
          <Button
            onClick={() => navigate("/founding-partner")}
            className="bg-teal-500 hover:bg-teal-400 text-white font-bold text-sm px-5″
          >
            Join ProLnk {data.label}
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-14 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-5″>
          <MapPin className="w-3.5 h-3.5″ />
          {data.label}, TX · DFW Metro
        </div>

        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-4″>
          ProLnk {data.label}<br />
          <span className="text-teal-400″>Home Services</span>
        </h1>

        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">{data.tagline}</p>

        {/* Stats row */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10″>
          <div className="flex items-center gap-3 bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4″>
            <Users className="w-5 h-5 text-teal-400″ />
            <div className="text-left">
              <div className="text-2xl font-black text-white">{data.contractors.toLocaleString()}</div>
              <div className="text-xs text-gray-400″>verified contractors</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4″>
            <Home className="w-5 h-5 text-teal-400″ />
            <div className="text-left">
              <div className="text-2xl font-black text-white">{data.homeowners.toLocaleString()}</div>
              <div className="text-xs text-gray-400″>homeowners in network</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate("/founding-partner")}
            size="lg"
            className="bg-teal-500 hover:bg-teal-400 text-white font-black text-base px-8 h-14″
          >
            Join ProLnk {data.label} <ArrowRight className="ml-2 w-5 h-5″ />
          </Button>
          <Button
            onClick={() => navigate("/cities")}
            size="lg"
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 h-14″
          >
            View All DFW Cities
          </Button>
        </div>
      </section>

      {/* Top 3 services */}
      <section className="max-w-5xl mx-auto px-6 py-16″>
        <h2 className="text-3xl font-black text-white text-center mb-2″>
          Top Services in {data.label}
        </h2>
        <p className="text-gray-400 text-center mb-10″>
          Based on demand from {data.label} homeowners in the ProLnk network
        </p>
        <div className="grid md:grid-cols-3 gap-6″>
          {data.topServices.map((svc, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4″
            >
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400″>
                {svc.icon}
              </div>
              <div>
                <div className="text-white font-bold text-base mb-1″>{svc.name}</div>
                <div className="inline-flex items-center gap-1.5 text-xs text-teal-400 font-semibold">
                  <DollarSign className="w-3.5 h-3.5″ />
                  {svc.avgJob}
                </div>
              </div>
              <button
                onClick={() => navigate("/founding-partner")}
                className="text-xs text-gray-400 hover:text-teal-400 transition-colors text-left"
              >
                Find a {svc.name.split(" ")[0]} pro in {data.label} →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured contractors */}
      <section className="max-w-5xl mx-auto px-6 py-12″>
        <h2 className="text-3xl font-black text-white text-center mb-2″>
          Featured Contractors in {data.label}
        </h2>
        <p className="text-gray-400 text-center mb-10″>
          Licensed, insured, and reviewed by real {data.label} homeowners
        </p>
        <div className="grid md:grid-cols-3 gap-6″>
          {data.contractors3.map((pro, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-3″
            >
              <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-black text-lg">
                {pro.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div className="text-white font-bold text-base">{pro.name}</div>
                <div className="text-teal-400 text-sm">{pro.trade}</div>
                <div className="text-gray-500 text-xs mt-0.5″>{pro.city} · {pro.years} yrs experience</div>
              </div>
              <div className="flex gap-0.5″>
                {Array.from({ length: pro.rating }).map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400″ />
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-green-400″>
                <CheckCircle className="w-3.5 h-3.5″ />
                Verified ProLnk Partner
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-6 py-14″>
        <h2 className="text-3xl font-black text-white text-center mb-2″>
          How ProLnk Works in {data.label}
        </h2>
        <p className="text-gray-400 text-center mb-10″>
          Three steps to the right contractor for your {data.label} home
        </p>
        <div className="flex flex-col md:flex-row gap-6″>
          {data.howItWorks.map((item, i) => (
            <div key={i} className="flex-1 bg-gray-900 border border-gray-800 rounded-2xl p-6″>
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-black text-sm mb-4″>
                {i + 1}
              </div>
              <div className="text-white font-bold text-base mb-2″>{item.step}</div>
              <div className="text-gray-400 text-sm leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Network income callout */}
      <section className="max-w-4xl mx-auto px-6 py-12″>
        <div className="bg-gray-900 border border-teal-500/20 rounded-2xl p-8″>
          <div className="flex items-center gap-3 mb-4″>
            <TrendingUp className="w-6 h-6 text-teal-400″ />
            <h3 className="text-xl font-black text-white">Are You a {data.label} Contractor?</h3>
          </div>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Join {data.contractors.toLocaleString()} vetted contractors already in the ProLnk {data.label} network.
            Lock in Charter pricing at $149/mo — earn on direct jobs AND on every referral in your network.
            Waitlist closes at 500 applications.
          </p>
          <Button
            onClick={() => navigate("/founding-partner")}
            className="bg-teal-500 hover:bg-teal-400 text-white font-bold"
          >
            Join as a {data.label} Contractor <ArrowRight className="ml-2 w-4 h-4″ />
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-black text-white mb-3″>
          Join ProLnk {data.label}
        </h2>
        <p className="text-gray-400 mb-8″>
          {data.contractors.toLocaleString()} contractors. {data.homeowners.toLocaleString()} homeowners.
          The DFW network that works for both sides.
        </p>
        <Button
          onClick={() => navigate("/founding-partner")}
          size="lg"
          className="bg-teal-500 hover:bg-teal-400 text-white font-black text-lg px-10 h-16″
        >
          Get Started in {data.label} <ArrowRight className="ml-2 w-5 h-5″ />
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
            <button onClick={() => navigate("/cities")} className="hover:text-gray-300 transition-colors">All DFW Cities</button>
          </div>
          <p className="text-gray-600 text-xs">© 2026 ProLnk. Dallas–Fort Worth, TX.</p>
        </div>
      </footer>
    </div>
  );
}
