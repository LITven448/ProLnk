import { Helmet } from "react-helmet-async";
import { useParams, useSearch, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import {
  CheckCircle, Loader2, Search, UserCheck, Home, ArrowRight,
  ShieldCheck, MapPin, ClipboardList, Phone, AlertCircle,
} from "lucide-react";

const INDIGO = "#4F46E5";

type Stage = "submitted" | "matching" | "assigned";

const STEPS: { key: Stage; label: string; desc: string; icon: typeof Search }[] = [
  { key: "submitted", label: "Submitted", desc: "We received your request", icon: ClipboardList },
  { key: "matching", label: "Matching", desc: "Finding the right verified pro", icon: Search },
  { key: "assigned", label: "Pro Assigned", desc: "A pro accepted your job", icon: UserCheck },
];

function stageIndex(stage: Stage) {
  return STEPS.findIndex((s) => s.key === stage);
}

export default function RequestStatus() {
  const params = useParams<{ id: string }>();
  const search = useSearch();
  const token = new URLSearchParams(search).get("t") || "";
  const id = Number(params.id);

  const enabled = Number.isFinite(id) && id > 0 && token.length >= 8;
  const q = trpc.homeowner.getRequestStatus.useQuery(
    { id, token },
    { enabled, retry: false, refetchOnWindowFocus: false }
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-10 px-4">
      <Helmet>
        <title>My Request — TrustyPro</title>
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: INDIGO }}>
            <Home className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Your Request</h1>
          <p className="text-gray-500 mt-2">Track the status of your service request.</p>
        </div>

        {!enabled && (
          <div className="bg-white rounded-3xl shadow-xl border border-indigo-100 p-8 text-center">
            <AlertCircle className="w-8 h-8 mx-auto mb-3 text-amber-500" />
            <h2 className="text-lg font-bold text-gray-900">Invalid link</h2>
            <p className="text-gray-500 mt-2 text-sm">
              This tracking link is missing information. Please use the link from your confirmation.
            </p>
          </div>
        )}

        {enabled && q.isLoading && (
          <div className="bg-white rounded-3xl shadow-xl border border-indigo-100 p-12 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin" style={{ color: INDIGO }} />
          </div>
        )}

        {enabled && q.isError && (
          <div className="bg-white rounded-3xl shadow-xl border border-indigo-100 p-8 text-center">
            <AlertCircle className="w-8 h-8 mx-auto mb-3 text-amber-500" />
            <h2 className="text-lg font-bold text-gray-900">Request not found</h2>
            <p className="text-gray-500 mt-2 text-sm">
              We couldn't find this request. The link may be incorrect or expired.
            </p>
            <Link href="/request-service">
              <a className="mt-5 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: INDIGO }}>
                Start a new request <ArrowRight className="w-4 h-4" />
              </a>
            </Link>
          </div>
        )}

        {enabled && q.data && (
          <div className="space-y-5">
            {/* Status timeline */}
            <div className="bg-white rounded-3xl shadow-xl border border-indigo-100 p-6 sm:p-8">
              <div className="space-y-0">
                {STEPS.map((step, i) => {
                  const current = stageIndex(q.data!.stage);
                  const done = i < current;
                  const active = i === current;
                  const Icon = step.icon;
                  return (
                    <div key={step.key} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition"
                          style={{
                            backgroundColor: done || active ? INDIGO : "#EEF2FF",
                            color: done || active ? "#fff" : "#A5B4FC",
                          }}
                        >
                          {done ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                        </div>
                        {i < STEPS.length - 1 && (
                          <div className="w-0.5 h-10 my-1" style={{ backgroundColor: i < current ? INDIGO : "#E0E7FF" }} />
                        )}
                      </div>
                      <div className="pt-1.5 pb-4">
                        <div className="font-semibold text-gray-900 flex items-center gap-2">
                          {step.label}
                          {active && (
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ color: INDIGO, backgroundColor: `${INDIGO}12` }}>
                              In progress
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{step.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Matched pro card */}
            {q.data.assigned ? (
              <div className="bg-white rounded-3xl shadow-xl border border-indigo-100 p-6 sm:p-8">
                <div className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: INDIGO }}>
                  <UserCheck className="w-4 h-4" /> Your matched pro
                </div>
                <div className="text-xl font-bold text-gray-900">{q.data.assigned.businessName}</div>
                <div className="text-sm text-gray-500 mt-0.5">{q.data.assigned.trade}</div>
                <div className="mt-4 rounded-xl bg-indigo-50 border border-indigo-100 px-4 py-3 text-sm text-gray-700 flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" style={{ color: INDIGO }} />
                  They'll be in touch shortly to confirm details and schedule. Keep an eye on your phone and email.
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-xl border border-indigo-100 p-6 sm:p-8 text-center">
                <Search className="w-7 h-7 mx-auto mb-2" style={{ color: INDIGO }} />
                <div className="font-semibold text-gray-900">Matching you with a pro</div>
                <p className="text-sm text-gray-500 mt-1">
                  We're connecting your job with the best-rated, verified pros in your area. We'll notify you the moment one accepts.
                </p>
              </div>
            )}

            {/* Request details */}
            <div className="bg-white rounded-3xl shadow-xl border border-indigo-100 p-6 sm:p-8">
              <div className="text-sm font-semibold text-gray-700 mb-3">Request details</div>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Service</dt>
                  <dd className="text-gray-900 font-medium text-right">{q.data.category}</dd>
                </div>
                {(q.data.address || q.data.zip) && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-gray-500 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Location</dt>
                    <dd className="text-gray-900 font-medium text-right">{q.data.address || q.data.zip}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Submitted</dt>
                  <dd className="text-gray-900 font-medium text-right">
                    {q.data.submittedAt ? new Date(q.data.submittedAt as any).toLocaleDateString() : "—"}
                  </dd>
                </div>
                <div className="pt-1">
                  <dt className="text-gray-500 mb-1">What you described</dt>
                  <dd className="text-gray-700">{q.data.description}</dd>
                </div>
              </dl>
            </div>

            <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4" /> Background-checked, verified pros only
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
