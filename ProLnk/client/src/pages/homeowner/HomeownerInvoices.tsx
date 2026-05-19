import React from 'react';
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Download,
  CreditCard,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  TrendingDown,
  Wrench,
  Zap,
  Droplets,
  Wind,
  Paintbrush,
  TreePine,
} from "lucide-react";

interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  pro: string;
  trade: string;
  description: string;
  amount: number;
  status: "Paid" | "Pending";
  icon: React.ElementType;
}

const invoices: Invoice[] = [
  {
    id: "1″,
    number: "INV-2026-031″,
    date: "Mar 12, 2026″,
    dueDate: "Mar 19, 2026″,
    pro: "Arctic Air HVAC",
    trade: "HVAC",
    description: "Annual HVAC tune-up, filter replacement",
    amount: 189,
    status: "Paid",
    icon: Wind,
  },
  {
    id: "2″,
    number: "INV-2026-028″,
    date: "Feb 28, 2026″,
    dueDate: "Mar 7, 2026″,
    pro: "FlowRight Plumbing",
    trade: "Plumbing",
    description: "Bathroom faucet replacement, supply line",
    amount: 210,
    status: "Paid",
    icon: Droplets,
  },
  {
    id: "3″,
    number: "INV-2026-024″,
    date: "Feb 20, 2026″,
    dueDate: "Mar 6, 2026″,
    pro: "FineLine Painting Co.",
    trade: "Painting",
    description: "Exterior touch-up — front elevation",
    amount: 320,
    status: "Pending",
    icon: Paintbrush,
  },
  {
    id: "4″,
    number: "INV-2026-015″,
    date: "Jan 15, 2026″,
    dueDate: "Jan 22, 2026″,
    pro: "Volt Pro Electric",
    trade: "Electrical",
    description: "Panel inspection, 3x GFCI outlet install",
    amount: 275,
    status: "Paid",
    icon: Zap,
  },
  {
    id: "5″,
    number: "INV-2025-148″,
    date: "Dec 8, 2025″,
    dueDate: "Dec 15, 2025″,
    pro: "Cornerstone Carpentry",
    trade: "Carpentry",
    description: "Deck board replacement — rear deck",
    amount: 410,
    status: "Paid",
    icon: Wrench,
  },
  {
    id: "6″,
    number: "INV-2025-138″,
    date: "Oct 5, 2025″,
    dueDate: "Oct 12, 2025″,
    pro: "GreenScape Landscaping",
    trade: "Landscaping",
    description: "Tree trimming, debris removal, yard cleanup",
    amount: 346,
    status: "Paid",
    icon: TreePine,
  },
];

const paid = invoices.filter((i) => i.status === "Paid");
const pending = invoices.filter((i) => i.status === "Pending");
const totalPaid = paid.reduce((s, i) => s + i.amount, 0);
const totalPending = pending.reduce((s, i) => s + i.amount, 0);
const ytdTotal = invoices.reduce((s, i) => s + i.amount, 0);

export default function HomeownerInvoices() {
  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white px-4 py-8 max-w-4xl mx-auto">
        <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1″>Invoices</h1>
            <p className="text-slate-400 text-sm">All billing records for your home services</p>
          </div>
          <Button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white">
            <Download className="w-4 h-4″ />
            Export PDF
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8″>
          <Card className="bg-[#0F1F38] border border-slate-700″>
            <CardContent className="p-4″>
              <DollarSign className="w-4 h-4 text-teal-400 mb-2″ />
              <div className="text-xl font-bold text-white">${ytdTotal.toLocaleString()}</div>
              <div className="text-xs text-slate-400 mt-0.5″>YTD Total</div>
            </CardContent>
          </Card>
          <Card className="bg-[#0F1F38] border border-slate-700″>
            <CardContent className="p-4″>
              <CheckCircle className="w-4 h-4 text-green-400 mb-2″ />
              <div className="text-xl font-bold text-white">${totalPaid.toLocaleString()}</div>
              <div className="text-xs text-slate-400 mt-0.5″>Total Paid</div>
            </CardContent>
          </Card>
          <Card className="bg-[#0F1F38] border border-slate-700″>
            <CardContent className="p-4″>
              <Clock className="w-4 h-4 text-yellow-400 mb-2″ />
              <div className="text-xl font-bold text-white">${totalPending.toLocaleString()}</div>
              <div className="text-xs text-slate-400 mt-0.5″>Outstanding</div>
            </CardContent>
          </Card>
          <Card className="bg-[#0F1F38] border border-slate-700″>
            <CardContent className="p-4″>
              <TrendingDown className="w-4 h-4 text-purple-400 mb-2″ />
              <div className="text-xl font-bold text-white">{invoices.length}</div>
              <div className="text-xs text-slate-400 mt-0.5″>Invoices</div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#0F1F38] border border-slate-700 mb-6″>
          <CardContent className="p-5″>
            <div className="flex items-center gap-2 mb-4″>
              <CreditCard className="w-4 h-4 text-teal-400″ />
              <span className="text-white font-semibold text-sm">Payment Method on File</span>
            </div>
            <div className="flex items-center gap-4″>
              <div className="w-12 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <div>
                <div className="text-white text-sm font-medium">Visa ending in 4242</div>
                <div className="text-slate-500 text-xs">Expires 08/2027</div>
              </div>
              <Badge className="ml-auto bg-green-900 text-green-300 border-0 text-xs">Active</Badge>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3″>
          {invoices.map((inv) => {
            const Icon = inv.icon;
            return (
              <Card
                key={inv.id}
                className="bg-[#0F1F38] border border-slate-700 hover:border-slate-500 transition-colors"
              >
                <CardContent className="p-4″>
                  <div className="flex items-start gap-4″>
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0″>
                      <Icon className="w-5 h-5 text-teal-400″ />
                    </div>

                    <div className="flex-1 min-w-0″>
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <div className="flex items-center gap-2″>
                            <span className="text-white text-sm font-semibold">{inv.pro}</span>
                            <span className="text-slate-500 text-xs font-mono">{inv.number}</span>
                          </div>
                          <p className="text-slate-400 text-xs mt-0.5″>{inv.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0″>
                          <div className="text-white font-bold">${inv.amount}</div>
                          <Badge
                            className={`text-xs border-0 mt-1 ${
                              inv.status === "Paid"
                                ? "bg-green-900 text-green-300″
                                : "bg-yellow-900 text-yellow-300″
                            }`}
                          >
                            {inv.status === "Paid" ? (
                              <><CheckCircle className="w-2.5 h-2.5 mr-1 inline" />Paid</>
                            ) : (
                              <><Clock className="w-2.5 h-2.5 mr-1 inline" />Pending</>
                            )}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2″>
                        <div className="flex items-center gap-3 text-xs text-slate-500″>
                          <span className="flex items-center gap-1″>
                            <Calendar className="w-3 h-3″ />
                            {inv.date}
                          </span>
                          {inv.status === "Pending" && (
                            <span className="text-yellow-500″>Due {inv.dueDate}</span>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-7 text-teal-400 hover:text-teal-300 hover:bg-teal-900/30 flex items-center gap-1 px-2″
                        >
                          <FileText className="w-3 h-3″ />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-6 bg-slate-800/40 border border-slate-700″>
          <CardContent className="p-4″>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400 mb-0.5″>Annual Summary 2025–2026</div>
                <div className="text-white font-semibold">
                  ${ytdTotal.toLocaleString()} across {invoices.length} service visits
                </div>
                <div className="text-xs text-slate-500 mt-0.5″>
                  Avg per job: ${Math.round(ytdTotal / invoices.length).toLocaleString()}
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700 flex items-center gap-1.5 text-xs">
                <Download className="w-3 h-3″ />
                Download CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </HomeownerLayout>
  );
}
