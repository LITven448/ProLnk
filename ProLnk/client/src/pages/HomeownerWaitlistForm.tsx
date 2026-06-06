import React from 'react';
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { track } from "@/lib/analytics";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle, Shield, Zap, Star, Lock, Copy, MessageSquare,
  User, Mail, Phone, MapPin, Home, Wrench, ChevronDown,
} from "lucide-react";

const SERVICE_OPTIONS = [
  "HVAC Service / Replacement",
  "Roof Inspection / Repair",
  "Plumbing Repair",
  "Electrical Work",
  "Landscaping / Lawn Care",
  "Interior Painting",
  "Exterior Painting",
  "Flooring",
  "Kitchen Remodel",
  "Bathroom Remodel",
  "Window / Door Replacement",
  "Fence / Gate",
  "Pool Service",
  "Pest Control",
  "General Handyman",
];

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
];

const BENEFITS = [
  {
    icon: <Zap className="w-6 h-6 text-indigo-400" />,
    title: "Free Quotes",
    desc: "Get competing quotes from vetted pros at no cost to you — ever.",
  },
  {
    icon: <Shield className="w-6 h-6 text-indigo-400" />,
    title: "Vetted Pros Only",
    desc: "Every pro is licensed, insured, and background-checked before they can contact you.",
  },
  {
    icon: <Star className="w-6 h-6 text-indigo-400" />,
    title: "No Spam",
    desc: "You control who reaches out. No cold calls, no random salespeople.",
  },
];

export default function HomeownerWaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referralLink, setReferralLink] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("TX");
  const [zipCode, setZipCode] = useState("");
  const [serviceNeeded, setServiceNeeded] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Home Health Vault — optional property enrichment
  const [showVault, setShowVault] = useState(false);
  const [homeType, setHomeType] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [squareFootage, setSquareFootage] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [stories, setStories] = useState("");
  const [garageSpaces, setGarageSpaces] = useState("");
  const [ownershipStatus, setOwnershipStatus] = useState("");
  const [yearsOwned, setYearsOwned] = useState("");
  const [overallCondition, setOverallCondition] = useState("");
  const [hasPool, setHasPool] = useState(false);
  const [hasBasement, setHasBasement] = useState(false);
  const [hasAttic, setHasAttic] = useState(false);
  const [roofType, setRoofType] = useState("");
  const [roofAge, setRoofAge] = useState("");
  const [hvacType, setHvacType] = useState("");
  const [hvacAge, setHvacAge] = useState("");
  const [waterHeaterType, setWaterHeaterType] = useState("");
  const [waterHeaterAge, setWaterHeaterAge] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setReferralCode(ref);
  }, []);

  const submitMutation = trpc.waitlist.joinHomeWaitlist.useMutation({
    onSuccess: () => {
      const code = `HO${Date.now().toString(36).toUpperCase().slice(-6)}`;
      setReferralLink(`${window.location.origin}/home-waitlist?ref=${code}`);
      track("homeowner_request_submitted", { source: "homeowner_waitlist_form" });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: (e: any) => {
      if (e.message?.includes("already")) {
        toast.error("That email is already on the waitlist!");
      } else {
        toast.error(e.message ?? "Something went wrong. Please try again.");
      }
    },
  });

  const isValid =
    firstName.trim() &&
    lastName.trim() &&
    email.trim().includes("@") &&
    address.trim() &&
    city.trim() &&
    zipCode.trim().length >= 5 &&
    serviceNeeded;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      toast.error("Please fill in all required fields.");
      return;
    }
    // Validate state format (2 letters)
    const stateNorm = state.trim().toUpperCase().slice(0, 2);
    if (stateNorm.length !== 2 || !/^[A-Z]{2}$/.test(stateNorm)) {
      toast.error("Please enter a valid 2-letter state (e.g. TX).");
      return;
    }
    // Validate zip format (5 digits or 5-4)
    const zipNorm = zipCode.trim();
    if (!/^\d{5}(-\d{4})?$/.test(zipNorm)) {
      toast.error("Please enter a valid US zip code (5 digits).");
      return;
    }
    // Compose serviceNeeded with additional notes if provided
    const composedService = additionalNotes.trim()
      ? `${serviceNeeded} | Notes: ${additionalNotes.trim()}`
      : serviceNeeded;
    const num = (v: string) => {
      const n = parseInt(v.replace(/[^0-9]/g, ""), 10);
      return Number.isFinite(n) ? n : undefined;
    };
    const str = (v: string) => (v.trim() ? v.trim() : undefined);
    submitMutation.mutate({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim() || undefined,
      address: address.trim(),
      city: city.trim(),
      state: stateNorm,
      zipCode: zipNorm,
      serviceNeeded: composedService,
      referredBy: referralCode ?? undefined,
      homeType: str(homeType),
      yearBuilt: num(yearBuilt),
      squareFootage: num(squareFootage),
      bedrooms: num(bedrooms),
      bathrooms: str(bathrooms),
      stories: num(stories),
      garageSpaces: num(garageSpaces),
      ownershipStatus: str(ownershipStatus),
      yearsOwned: num(yearsOwned),
      overallCondition: str(overallCondition),
      hasPool: hasPool || undefined,
      hasBasement: hasBasement || undefined,
      hasAttic: hasAttic || undefined,
      roofType: str(roofType),
      roofAge: num(roofAge),
      hvacType: str(hvacType),
      hvacAge: num(hvacAge),
      waterHeaterType: str(waterHeaterType),
      waterHeaterAge: num(waterHeaterAge),
    });
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 py-16"
        style={{ background: "linear-gradient(135deg, #0F0C29 0%, #1B1464 50%, #24243e 100%)" }}
      >
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3">You're on the list!</h1>
          <p className="text-white/60 text-lg mb-2">
            Welcome, {firstName}. We'll reach out to{" "}
            <span className="text-indigo-300 font-medium">{email}</span> when pros are ready in your area.
          </p>
          <p className="text-white/40 text-sm mb-8">
            We'll pre-match you with vetted pros for <strong className="text-white/60">{serviceNeeded}</strong> before you even have to ask.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 text-left">
            <p className="text-white font-semibold text-sm mb-1">Share with a neighbor</p>
            <p className="text-white/50 text-xs mb-3">
              When they join with your link, you both get priority access.
            </p>
            <div className="flex gap-2">
              <input
                readOnly
                value={referralLink}
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white/70 text-xs truncate"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(referralLink);
                  toast.success("Link copied!");
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </button>
            </div>
            <button
              onClick={() => {
                const text = `I just joined the TrustyPro waitlist — AI-matched home service pros, free quotes, no spam. Join here:`;
                window.open(`sms:?body=${encodeURIComponent(text + " " + referralLink)}`, "_blank");
              }}
              className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-medium transition-colors"
            >
              <MessageSquare className="w-4 h-4" /> Text a Neighbor
            </button>
          </div>

          <a href="/" className="text-indigo-400 hover:text-indigo-300 text-sm underline">
            Back to home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #0F0C29 0%, #1B1464 50%, #24243e 100%)" }}
    >
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-4">
            <Home className="w-3.5 h-3.5" /> Homeowner Waitlist
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
            Find Trusted Pros.<br />Get Free Quotes.
          </h1>
          <p className="text-white/60 text-lg max-w-lg mx-auto">
            Tell us what you need. We'll match you with vetted, local home service professionals.
          </p>
        </div>

        {/* 3-column benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center"
            >
              <div className="flex justify-center mb-3">{b.icon}</div>
              <p className="text-white font-semibold text-sm mb-1">{b.title}</p>
              <p className="text-white/50 text-xs leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-white/70 text-sm mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> First Name *
                </Label>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jane"
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                />
              </div>
              <div>
                <Label className="text-white/70 text-sm mb-1.5 block">Last Name *</Label>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Smith"
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                />
              </div>
            </div>

            {/* Contact row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-white/70 text-sm mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Email *
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@email.com"
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                />
              </div>
              <div>
                <Label className="text-white/70 text-sm mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Phone
                </Label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(214) 555-0100"
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <Label className="text-white/70 text-sm mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Street Address *
              </Label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main Street"
                required
                className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
              />
            </div>

            {/* City / State / Zip */}
            <div className="grid grid-cols-6 gap-3">
              <div className="col-span-3">
                <Label className="text-white/70 text-sm mb-1.5 block">City *</Label>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Frisco"
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                />
              </div>
              <div className="col-span-1">
                <Label className="text-white/70 text-sm mb-1.5 block">State *</Label>
                <div className="relative">
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full h-11 px-3 pr-8 rounded-md bg-white/5 border border-white/20 text-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {US_STATES.map((s) => (
                      <option key={s} value={s} className="bg-gray-900 text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-white/40 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <div className="col-span-2">
                <Label className="text-white/70 text-sm mb-1.5 block">ZIP Code *</Label>
                <Input
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="75034"
                  maxLength={10}
                  required
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                />
              </div>
            </div>

            {/* Service Needed */}
            <div>
              <Label className="text-white/70 text-sm mb-1.5 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" /> Service Needed *
              </Label>
              <div className="relative">
                <select
                  value={serviceNeeded}
                  onChange={(e) => setServiceNeeded(e.target.value)}
                  required
                  className="w-full h-11 px-3 pr-8 rounded-md bg-white/5 border border-white/20 text-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="" className="bg-gray-900 text-white/50">
                    Select a service...
                  </option>
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s} value={s} className="bg-gray-900 text-white">
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-white/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <Label className="text-white/70 text-sm mb-1.5 block">
                Additional Notes <span className="text-white/30">(optional)</span>
              </Label>
              <Textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Any details that would help us match you with the right pro..."
                rows={3}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/30 resize-none"
              />
            </div>

            {/* Home Health Vault — optional property enrichment */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
              <button
                type="button"
                onClick={() => setShowVault((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left"
              >
                <span className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-indigo-400" />
                  <span className="text-white/80 text-sm font-medium">
                    Tell us about your home <span className="text-white/30">(optional)</span>
                  </span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-white/40 transition-transform ${showVault ? "rotate-180" : ""}`}
                />
              </button>

              {showVault && (
                <div className="px-4 pb-5 pt-1 space-y-5 border-t border-white/10">
                  <p className="text-white/40 text-xs leading-relaxed pt-3">
                    The more we know about your home, the better we can match you and track its health over time. Every field here is optional.
                  </p>

                  {/* Property basics */}
                  <div>
                    <p className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-3">Property basics</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <Label className="text-white/70 text-sm mb-1.5 block">Home Type</Label>
                        <div className="relative">
                          <select
                            value={homeType}
                            onChange={(e) => setHomeType(e.target.value)}
                            className="w-full h-11 px-3 pr-8 rounded-md bg-white/5 border border-white/20 text-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="" className="bg-gray-900 text-white/50">Select...</option>
                            <option value="single_family" className="bg-gray-900 text-white">Single Family</option>
                            <option value="townhouse" className="bg-gray-900 text-white">Townhouse</option>
                            <option value="condo" className="bg-gray-900 text-white">Condo</option>
                            <option value="multi_family" className="bg-gray-900 text-white">Multi-Family</option>
                            <option value="mobile_manufactured" className="bg-gray-900 text-white">Mobile / Manufactured</option>
                            <option value="other" className="bg-gray-900 text-white">Other</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-white/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <Label className="text-white/70 text-sm mb-1.5 block">Year Built</Label>
                        <Input
                          type="number"
                          inputMode="numeric"
                          value={yearBuilt}
                          onChange={(e) => setYearBuilt(e.target.value)}
                          placeholder="1998"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-sm mb-1.5 block">Square Footage</Label>
                        <Input
                          type="number"
                          inputMode="numeric"
                          value={squareFootage}
                          onChange={(e) => setSquareFootage(e.target.value)}
                          placeholder="2400"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-sm mb-1.5 block">Bedrooms</Label>
                        <Input
                          type="number"
                          inputMode="numeric"
                          value={bedrooms}
                          onChange={(e) => setBedrooms(e.target.value)}
                          placeholder="3"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-sm mb-1.5 block">Bathrooms</Label>
                        <div className="relative">
                          <select
                            value={bathrooms}
                            onChange={(e) => setBathrooms(e.target.value)}
                            className="w-full h-11 px-3 pr-8 rounded-md bg-white/5 border border-white/20 text-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="" className="bg-gray-900 text-white/50">Select...</option>
                            {["1", "1.5", "2", "2.5", "3", "3.5", "4+"].map((b) => (
                              <option key={b} value={b} className="bg-gray-900 text-white">{b}</option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-white/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <Label className="text-white/70 text-sm mb-1.5 block">Stories</Label>
                        <Input
                          type="number"
                          inputMode="numeric"
                          value={stories}
                          onChange={(e) => setStories(e.target.value)}
                          placeholder="2"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-sm mb-1.5 block">Garage Spaces</Label>
                        <Input
                          type="number"
                          inputMode="numeric"
                          value={garageSpaces}
                          onChange={(e) => setGarageSpaces(e.target.value)}
                          placeholder="2"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-sm mb-1.5 block">Ownership</Label>
                        <div className="relative">
                          <select
                            value={ownershipStatus}
                            onChange={(e) => setOwnershipStatus(e.target.value)}
                            className="w-full h-11 px-3 pr-8 rounded-md bg-white/5 border border-white/20 text-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="" className="bg-gray-900 text-white/50">Select...</option>
                            <option value="own" className="bg-gray-900 text-white">Own</option>
                            <option value="rent" className="bg-gray-900 text-white">Rent</option>
                            <option value="manage" className="bg-gray-900 text-white">Manage</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-white/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <Label className="text-white/70 text-sm mb-1.5 block">Years Owned</Label>
                        <Input
                          type="number"
                          inputMode="numeric"
                          value={yearsOwned}
                          onChange={(e) => setYearsOwned(e.target.value)}
                          placeholder="5"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label className="text-white/70 text-sm mb-1.5 block">Overall Condition</Label>
                        <div className="relative">
                          <select
                            value={overallCondition}
                            onChange={(e) => setOverallCondition(e.target.value)}
                            className="w-full h-11 px-3 pr-8 rounded-md bg-white/5 border border-white/20 text-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="" className="bg-gray-900 text-white/50">Select...</option>
                            <option value="excellent" className="bg-gray-900 text-white">Excellent</option>
                            <option value="good" className="bg-gray-900 text-white">Good</option>
                            <option value="fair" className="bg-gray-900 text-white">Fair</option>
                            <option value="needs_work" className="bg-gray-900 text-white">Needs Work</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-white/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
                      {[
                        { label: "Pool", checked: hasPool, set: setHasPool },
                        { label: "Basement", checked: hasBasement, set: setHasBasement },
                        { label: "Attic", checked: hasAttic, set: setHasAttic },
                      ].map((f) => (
                        <label key={f.label} className="flex items-center gap-2 text-white/70 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={f.checked}
                            onChange={(e) => f.set(e.target.checked)}
                            className="w-4 h-4 rounded border-white/30 bg-white/5 accent-indigo-500"
                          />
                          {f.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Systems & age */}
                  <div>
                    <p className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-3">Systems &amp; age</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <Label className="text-white/70 text-sm mb-1.5 block">Roof Type</Label>
                        <Input
                          value={roofType}
                          onChange={(e) => setRoofType(e.target.value)}
                          placeholder="Asphalt shingle"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-sm mb-1.5 block">Roof Age (yrs)</Label>
                        <Input
                          type="number"
                          inputMode="numeric"
                          value={roofAge}
                          onChange={(e) => setRoofAge(e.target.value)}
                          placeholder="8"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label className="text-white/70 text-sm mb-1.5 block">HVAC Type</Label>
                        <Input
                          value={hvacType}
                          onChange={(e) => setHvacType(e.target.value)}
                          placeholder="Central air"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-sm mb-1.5 block">HVAC Age (yrs)</Label>
                        <Input
                          type="number"
                          inputMode="numeric"
                          value={hvacAge}
                          onChange={(e) => setHvacAge(e.target.value)}
                          placeholder="6"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label className="text-white/70 text-sm mb-1.5 block">Water Heater Type</Label>
                        <Input
                          value={waterHeaterType}
                          onChange={(e) => setWaterHeaterType(e.target.value)}
                          placeholder="Gas tank"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                        />
                      </div>
                      <div>
                        <Label className="text-white/70 text-sm mb-1.5 block">WH Age (yrs)</Label>
                        <Input
                          type="number"
                          inputMode="numeric"
                          value={waterHeaterAge}
                          onChange={(e) => setWaterHeaterAge(e.target.value)}
                          placeholder="4"
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/30 h-11"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Privacy badge */}
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-indigo-900/30 border border-indigo-500/20">
              <Lock className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <p className="text-xs text-indigo-200 leading-relaxed">
                <strong className="text-indigo-300">Your info is protected.</strong> We never sell your data. Pros only see your service request — not your personal contact details — until you choose to connect.
              </p>
            </div>

            <Button
              type="submit"
              disabled={!isValid || submitMutation.isPending}
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base disabled:opacity-50 transition-colors"
            >
              {submitMutation.isPending ? "Joining..." : "Join the Waitlist — Free"}
            </Button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          No credit card required. No spam. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
