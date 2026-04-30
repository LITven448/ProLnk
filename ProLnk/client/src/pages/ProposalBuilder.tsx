import { useState } from "react";
import { trpc } from "@/lib/trpc";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Trash2, Download, Send, DollarSign, CheckCircle, Loader2, Save } from "lucide-react";
import { toast } from "sonner";

interface LineItem {
  id: number;
  description: string;
  qty: number;
  unit: string;
  price: number;
}

const TEMPLATES = [
  { name: "Roof Replacement", items: [
    { description: "Remove existing shingles", qty: 1, unit: "job", price: 800 },
    { description: "Install 30-year architectural shingles", qty: 2400, unit: "sq ft", price: 3.50 },
    { description: "Replace flashing", qty: 1, unit: "job", price: 450 },
    { description: "Haul away debris", qty: 1, unit: "job", price: 350 },
  ]},
  { name: "HVAC Tune-Up", items: [
    { description: "AC inspection and cleaning", qty: 1, unit: "unit", price: 125 },
    { description: "Filter replacement", qty: 2, unit: "filters", price: 35 },
    { description: "Refrigerant check", qty: 1, unit: "job", price: 75 },
  ]},
  { name: "Exterior Painting", items: [
    { description: "Pressure wash exterior", qty: 1, unit: "job", price: 300 },
    { description: "Prime and paint siding", qty: 1800, unit: "sq ft", price: 1.20 },
    { description: "Paint trim and shutters", qty: 1, unit: "job", price: 400 },
  ]},
];

export default function ProposalBuilder() {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [jobAddress, setJobAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<LineItem[]>([
    { id: 1, description: "", qty: 1, unit: "job", price: 0 },
  ]);
  const [sent, setSent] = useState(false);

  const addItem = () => setItems(prev => [...prev, { id: Date.now(), description: "", qty: 1, unit: "job", price: 0 }]);
  const removeItem = (id: number) => setItems(prev => prev.filter(i => i.id !== id));
  const updateItem = (id: number, field: keyof LineItem, value: string | number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const loadTemplate = (template: typeof TEMPLATES[0]) => {
    setItems(template.items.map((item, i) => ({ ...item, id: i + 1 })));
    toast.success(`${template.name} template loaded`);
  };

  const subtotal = items.reduce((s, i) => s + (i.qty * i.price), 0);
  const tax = subtotal * 0.0825;
  const total = subtotal + tax;

  const createMutation = trpc.partnerTools.proposals.create.useMutation({
    onSuccess: () => toast.success("Proposal saved!"),
    onError: (err) => toast.error(`Save failed: ${err.message}`),
  });
  const sendMutation = trpc.partnerTools.proposals.send.useMutation({
    onSuccess: () => { setSent(true); toast.success(`Proposal sent to ${clientEmail}!`); },
    onError: (err) => toast.error(`Send failed: ${err.message}`),
  });

  const buildPayload = () => ({
    clientName,
    clientEmail: clientEmail || undefined,
    title: `Proposal for ${clientName || 'Client'}`,
    notes: notes || undefined,
    lineItems: items.map(i => ({ description: i.description || 'Service', qty: i.qty, unitPrice: i.price })),
    totalAmount: String(total.toFixed(2)),
  });

  const saveProposal = () => {
    if (!clientName) { toast.error("Add client name first"); return; }
    createMutation.mutate(buildPayload());
  };

  const sendProposal = () => {
    if (!clientName || !clientEmail) { toast.error("Add client name and email first"); return; }
    createMutation.mutate(buildPayload(), {
      onSuccess: (result) => {
        if (result.id) sendMutation.mutate({ id: result.id });
        else { setSent(true); toast.success(`Proposal sent to ${clientEmail}!`); }
      }
    });
  };

  const downloadPDF = () => {
    const printContent = `
      <html><head><title>Proposal - ${clientName || 'Client'}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; }
        h1 { font-size: 24px; margin-bottom: 4px; } .subtitle { color: #64748b; margin-bottom: 24px; }
        table { width: 100%; border-collapse: collapse; margin: 16px 0; }
        th { background: #f1f5f9; padding: 8px 12px; text-align: left; font-size: 12px; }
        td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
        .total-row { font-weight: bold; font-size: 15px; }
        .footer { margin-top: 32px; font-size: 12px; color: #94a3b8; }
        @media print { body { padding: 20px; } }
      </style></head><body>
      <h1>Proposal</h1>
      <div class="subtitle">Prepared for: ${clientName || '—'} &nbsp;|&nbsp; ${clientEmail || ''} &nbsp;|&nbsp; ${jobAddress || ''}</div>
      <table><thead><tr><th>Description</th><th>Qty</th><th>Unit</th><th>Unit Price</th><th>Total</th></tr></thead><tbody>
      ${items.map(i => `<tr><td>${i.description}</td><td>${i.qty}</td><td>${i.unit}</td><td>$${i.price.toFixed(2)}</td><td>$${(i.qty * i.price).toFixed(2)}</td></tr>`).join('')}
      </tbody></table>
      <table><tbody>
        <tr><td>Subtotal</td><td>$${subtotal.toFixed(2)}</td></tr>
        <tr><td>Tax (8.25%)</td><td>$${tax.toFixed(2)}</td></tr>
        <tr class="total-row"><td>Total</td><td>$${total.toFixed(2)}</td></tr>
      </tbody></table>
      <div class="footer">Generated by ProLnk Partner Platform &bull; ${new Date().toLocaleDateString()}</div>
      </body></html>`;
    const w = window.open('', '_blank');
    if (w) { w.document.write(printContent); w.document.close(); w.print(); }
  };

  return (

    <PartnerLayout>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Proposal Builder</h1>
          <p className="text-slate-500 mt-1">Create professional quotes in minutes</p>
        </div>

        {/* Templates */}
        <div className="flex gap-2 mb-5 flex-wrap">
          <span className="text-sm text-slate-500 self-center">Quick templates:</span>
          {TEMPLATES.map(t => (
            <Button key={t.name} size="sm" variant="outline" className="text-xs" onClick={() => loadTemplate(t)}>{t.name}</Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2 space-y-5">
            {/* Client Info */}
            <Card>
              <CardHeader><CardTitle className="text-sm">Client Information</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Client Name</label>
                  <Input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="John Smith" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Email</label>
                  <Input value={clientEmail} onChange={e => setClientEmail(e.target.value)} placeholder="john@example.com" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Job Address</label>
                  <Input value={jobAddress} onChange={e => setJobAddress(e.target.value)} placeholder="123 Main St, Dallas TX 75201" />
                </div>
              </CardContent>
            </Card>

            {/* Line Items */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm">Line Items</CardTitle>
                <Button size="sm" variant="outline" className="text-xs" onClick={addItem}><Plus className="w-3 h-3 mr-1" /> Add Item</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {/* Header */}
                  <div className="grid grid-cols-12 gap-2 text-xs font-medium text-slate-500 px-1">
                    <div className="col-span-5">Description</div>
                    <div className="col-span-2">Qty</div>
                    <div className="col-span-2">Unit</div>
                    <div className="col-span-2">Price</div>
                    <div className="col-span-1"></div>
                  </div>
                  {items.map(item => (
                    <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-5">
                        <Input value={item.description} onChange={e => updateItem(item.id, "description", e.target.value)} placeholder="Service description" className="text-sm" />
                      </div>
                      <div className="col-span-2">
                        <Input type="number" value={item.qty} onChange={e => updateItem(item.id, "qty", parseFloat(e.target.value) || 0)} className="text-sm" />
                      </div>
                      <div className="col-span-2">
                        <Input value={item.unit} onChange={e => updateItem(item.id, "unit", e.target.value)} className="text-sm" />
                      </div>
                      <div className="col-span-2">
                        <Input type="number" value={item.price} onChange={e => updateItem(item.id, "price", parseFloat(e.target.value) || 0)} className="text-sm" />
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader><CardTitle className="text-sm">Notes & Terms</CardTitle></CardHeader>
              <CardContent>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Payment terms, warranty info, special conditions..."
                  className="w-full h-24 text-sm border rounded-lg p-3 bg-background resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <div>
            <Card className="sticky top-6">
              <CardHeader><CardTitle className="text-sm flex items-center gap-2"><DollarSign className="w-4 h-4" /> Quote Summary</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  {items.filter(i => i.description).map(item => (
                    <div key={item.id} className="flex justify-between text-xs text-slate-600">
                      <span className="truncate flex-1 mr-2">{item.description}</span>
                      <span className="font-medium">${(item.qty * item.price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-2 space-y-1">
                  <div className="flex justify-between text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-sm text-slate-500"><span>Tax (8.25%)</span><span>${tax.toFixed(2)}</span></div>
                  <div className="flex justify-between text-base font-bold border-t pt-2"><span>Total</span><span className="text-green-600">${total.toFixed(2)}</span></div>
                </div>

                <div className="space-y-2 pt-2">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-sm" onClick={sendProposal} disabled={sent || createMutation.isPending}>
                    {createMutation.isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : sent ? <><CheckCircle className="w-4 h-4 mr-2" /> Sent!</> : <><Send className="w-4 h-4 mr-2" /> Send to Client</>}
                  </Button>
                  <Button variant="outline" className="w-full text-sm" onClick={saveProposal} disabled={createMutation.isPending}>
                    <Save className="w-4 h-4 mr-2" /> Save Draft
                  </Button>
                  <Button variant="outline" className="w-full text-sm" onClick={downloadPDF}>
                    <Download className="w-4 h-4 mr-2" /> Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>

    </PartnerLayout>

  );
}
