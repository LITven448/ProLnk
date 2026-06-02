import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { trpc } from "@/lib/trpc";
import { AddressAutofill } from "@/components/AddressAutofill";
import { SERVICE_CATEGORIES } from "@/data/serviceCategories";
import {
  CheckCircle, Loader2, Sparkles, Home, ArrowRight, ShieldCheck,
} from "lucide-react";

const INDIGO = "#4F46E5";

export default function RequestService() {
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [description, setDescription] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = trpc.homeowner.submitJobRequest.useMutation({
    onError: (err) => setError(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!category) return setError("Please choose a service.");
    if (!zip || zip.length < 3) return setError("Please enter the property location.");
    if (!description.trim()) return setError("Please describe what you need done.");
    submit.mutate({
      category,
      zip,
      address: address || undefined,
      description: description.trim(),
      contactName: contactName || undefined,
      contactEmail: contactEmail || undefined,
      contactPhone: contactPhone || undefined,
    });
  };

  if (submit.isSuccess) {
    const oppId = submit.data?.opportunityId;
    const token = submit.data?.trackingToken;
    const trackUrl = oppId && token ? `/my-request/${oppId}?t=${token}` : null;
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-indigo-100 max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: `${INDIGO}12` }}>
            <CheckCircle className="w-8 h-8" style={{ color: INDIGO }} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Request received</h1>
          <p className="text-gray-500 mt-2">
            We're matching your job with the best-rated, verified pros in your area. You'll hear from us shortly.
          </p>
          {trackUrl && (
            <a
              href={trackUrl}
              className="mt-6 w-full rounded-xl text-white font-semibold py-3 flex items-center justify-center gap-2 transition"
              style={{ backgroundColor: INDIGO }}
            >
              Track my request <ArrowRight className="w-4 h-4" />
            </a>
          )}
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: INDIGO }}
          >
            Submit another request <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-10 px-4">
      <Helmet>
        <title>Request a Pro — Get Matched with Vetted Local Home Service Pros</title>
        <meta name="description" content="Tell us what you need and get matched with background-checked, verified local home service pros. Free, no obligation. Plumbing, HVAC, electrical, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Request a Pro — Get Matched with Vetted Local Home Service Pros" />
        <meta property="og:description" content="Tell us what you need and get matched with background-checked, verified local home service pros. Free, no obligation." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/trustypro-hero-interior_21ad489c.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Request a Pro — Get Matched with Vetted Local Home Service Pros" />
        <meta name="twitter:description" content="Get matched with background-checked, verified local home service pros. Free, no obligation." />
        <meta name="twitter:image" content="https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/trustypro-hero-interior_21ad489c.webp" />
      </Helmet>
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: INDIGO }}>
            <Home className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Request a Pro</h1>
          <p className="text-gray-500 mt-2">
            Tell us what you need. We match you with vetted local pros — free, no obligation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-indigo-100 p-6 sm:p-8 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">What service do you need?</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
            >
              <option value="">Choose a service…</option>
              {SERVICE_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Property address</label>
            <AddressAutofill
              value={address}
              onAddressSelect={(a) => {
                setAddress([a.street, a.city, a.state].filter(Boolean).join(", "));
                if (a.zip) setZip(a.zip);
              }}
            />
            {!zip && (
              <input
                type="text"
                inputMode="numeric"
                placeholder="Or enter ZIP code"
                aria-label="ZIP code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Describe the job</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              aria-label="Describe the job"
              rows={4}
              placeholder="e.g. AC stopped cooling, blowing warm air. Two-story home, unit is ~8 years old."
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your name</label>
              <input
                type="text"
                aria-label="Your name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                aria-label="Email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone</label>
              <input
                type="tel"
                aria-label="Phone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submit.isPending}
            className="w-full rounded-xl text-white font-semibold py-3.5 flex items-center justify-center gap-2 disabled:opacity-60 transition"
            style={{ backgroundColor: INDIGO }}
          >
            {submit.isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <><Sparkles className="w-5 h-5" /> Get Matched with a Pro</>
            )}
          </button>

          <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4" /> Background-checked, verified pros only
          </p>
        </form>
      </div>
    </div>
  );
}
