import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { Send, CheckCircle } from "lucide-react";

type Urgency = "urgent" | "moderate" | "low";

const SERVICE_CATEGORIES = [
  "Roofing", "HVAC", "Plumbing", "Electrical", "Landscaping",
  "Painting", "Flooring", "Windows & Doors", "Fencing", "Gutters",
  "Pressure Washing", "Tree Service", "Pest Control", "General Handyman", "Other"
];

const URGENCY_OPTIONS: { value: Urgency; label: string }[] = [
  { value: "urgent",   label: "Emergency / ASAP" },
  { value: "moderate", label: "Within a week" },
  { value: "low",      label: "Flexible / No rush" },
];

export default function HomeownerRequestPro() {
  const submitLead = trpc.trustyPro.submitRequest.useMutation({
    onSuccess: () => {
      toast.success("Request submitted! Pros in your area will reach out shortly.");
      setSubmitted(true);
    },
    onError: (err) => toast.error(err.message),
  });

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    serviceType: "",
    description: "",
    urgency: "low" as Urgency,
    address: "",
    name: "",
    email: "",
    phone: "",
  });

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  if (submitted) {
    return (
      <HomeownerLayout>
        <div className="p-6 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Request Submitted!</h2>
            <p className="text-muted-foreground mb-6">Verified pros in your area will contact you soon.</p>
            <Button onClick={() => setSubmitted(false)}>Submit Another Request</Button>
          </div>
        </div>
      </HomeownerLayout>
    );
  }

  return (
    <HomeownerLayout>
      <div className="p-6 max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Request a Pro</h1>
          <p className="text-muted-foreground">Tell us what you need and we'll connect you with verified pros in your area</p>
        </div>

        <Card>
          <CardHeader><CardTitle>Service Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Service Category *</label>
              <Select value={form.serviceType} onValueChange={v => set("serviceType", v)}>
                <SelectTrigger><SelectValue placeholder="Select a service…" /></SelectTrigger>
                <SelectContent>
                  {SERVICE_CATEGORIES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Describe what you need *</label>
              <Textarea
                placeholder="Describe the issue or project in detail…"
                value={form.description}
                onChange={e => set("description", e.target.value)}
                rows={4}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Urgency</label>
              <Select value={form.urgency} onValueChange={v => set("urgency", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {URGENCY_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Service Address *</label>
              <Input placeholder="123 Main St, Dallas, TX" value={form.address} onChange={e => set("address", e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Your Contact Info</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Name *</label>
                <Input placeholder="Your name" value={form.name} onChange={e => set("name", e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Phone</label>
                <Input placeholder="(214) 555-0100" value={form.phone} onChange={e => set("phone", e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email *</label>
              <Input type="email" placeholder="you@email.com" value={form.email} onChange={e => set("email", e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Button
          className="w-full gap-2"
          size="lg"
          disabled={!form.serviceType || !form.description || !form.address || !form.name || !form.email || submitLead.isPending}
          onClick={() => submitLead.mutate({
            serviceType: form.serviceType,
            description: form.description,
            urgency: form.urgency,
            address: form.address,
            name: form.name,
            email: form.email,
            phone: form.phone,
          })}
        >
          <Send className="h-4 w-4" />
          {submitLead.isPending ? "Submitting…" : "Submit Request"}
        </Button>
      </div>
    </HomeownerLayout>
  );
}
