import { useState } from 'react';

type Budget = 'low' | 'mid' | 'high';
type HomeStyle = 'traditional' | 'craftsman' | 'modern' | 'ranch';

const budgets: { id: Budget; label: string; range: string }[] = [
  { id: 'low', label: '💰 Budget', range: 'Under $5,000' },
  { id: 'mid', label: '💰💰 Mid-Range', range: '$5,000–$20,000' },
  { id: 'high', label: '💰💰💰 Premium', range: '$20,000+' },
];

const homeStyles: { id: HomeStyle; label: string }[] = [
  { id: 'traditional', label: 'Traditional' },
  { id: 'craftsman', label: 'Craftsman' },
  { id: 'modern', label: 'Modern' },
  { id: 'ranch', label: 'Ranch' },
];

type PlanKey = `${Budget}-${HomeStyle}`;

const plans: Record<PlanKey, { improvements: { item: string; cost: string; valueIncrease: string }[]; valueRange: string }> = {
  'low-traditional': { improvements: [{ item: 'Bold front door repaint (navy or red)', cost: '$200–400', valueIncrease: '+$2K–5K' }, { item: 'New house numbers + mailbox', cost: '$100–300', valueIncrease: '+$500–1K' }, { item: 'Seasonal flowers in porch pots', cost: '$150–400', valueIncrease: '+$1K–3K' }, { item: 'Porch light fixture upgrade', cost: '$200–500', valueIncrease: '+$1K–2K' }, { item: 'Lawn treatment + edging', cost: '$300–800', valueIncrease: '+$2K–5K' }], valueRange: '$6,500–$16,000' },
  'low-craftsman': { improvements: [{ item: 'Repaint front door deep green or black', cost: '$200–400', valueIncrease: '+$2K–5K' }, { item: 'Add window box planters with drought-tolerant plants', cost: '$200–500', valueIncrease: '+$1K–3K' }, { item: 'Replace porch light with lantern-style fixtures', cost: '$300–600', valueIncrease: '+$1K–2K' }, { item: 'Clean and restain porch deck boards', cost: '$400–800', valueIncrease: '+$2K–4K' }, { item: 'Add shutters if missing', cost: '$300–600', valueIncrease: '+$1K–3K' }], valueRange: '$7,000–$17,000' },
  'low-modern': { improvements: [{ item: 'Repaint door matte black or charcoal', cost: '$200–400', valueIncrease: '+$3K–6K' }, { item: 'Replace address numbers with large brushed aluminum', cost: '$100–300', valueIncrease: '+$500–1K' }, { item: 'Add minimalist potted grasses or succulents', cost: '$200–500', valueIncrease: '+$1K–2K' }, { item: 'Pressure wash driveway (major impact on modern homes)', cost: '$200–400', valueIncrease: '+$2K–4K' }, { item: 'Remove dated shutters or ornamental trim', cost: '$100–300', valueIncrease: '+$1K–3K' }], valueRange: '$7,500–$16,000' },
  'low-ranch': { improvements: [{ item: 'Repaint front door bold color (terracotta, sage, red)', cost: '$200–400', valueIncrease: '+$2K–5K' }, { item: 'Add rock or mulch beds — dead lawn is #1 DFW curb killer', cost: '$400–900', valueIncrease: '+$3K–6K' }, { item: 'Trim or remove overgrown shrubs blocking windows', cost: '$200–500', valueIncrease: '+$2K–4K' }, { item: 'New exterior house numbers', cost: '$100–250', valueIncrease: '+$500–1K' }, { item: 'Garage door painting or panel replacement', cost: '$300–800', valueIncrease: '+$2K–5K' }], valueRange: '$9,500–$21,000' },
  'mid-traditional': { improvements: [{ item: 'Full exterior repaint (trim, shutters, body)', cost: '$3,000–6,000', valueIncrease: '+$8K–18K' }, { item: 'Landscaping refresh with irrigation', cost: '$2,000–5,000', valueIncrease: '+$5K–12K' }, { item: 'New fiberglass front door with sidelights', cost: '$2,500–5,000', valueIncrease: '+$5K–10K' }, { item: 'Porch railing replacement', cost: '$1,500–3,500', valueIncrease: '+$3K–6K' }, { item: 'Driveway sealing or concrete repair', cost: '$1,000–3,000', valueIncrease: '+$3K–7K' }], valueRange: '$24,000–$53,000' },
  'mid-craftsman': { improvements: [{ item: 'Cedar shake or board and batten accent gable', cost: '$3,000–6,000', valueIncrease: '+$8K–15K' }, { item: 'Front porch expansion or new porch addition', cost: '$5,000–12,000', valueIncrease: '+$10K–20K' }, { item: 'Full landscaping with drought-tolerant plants', cost: '$3,000–7,000', valueIncrease: '+$6K–14K' }, { item: 'Replace garage door with carriage house style', cost: '$2,500–5,000', valueIncrease: '+$5K–10K' }, { item: 'Exterior lighting package (coach lights, landscape)', cost: '$1,500–4,000', valueIncrease: '+$3K–7K' }], valueRange: '$32,000–$66,000' },
  'mid-modern': { improvements: [{ item: 'Dark exterior repaint in charcoal or navy', cost: '$4,000–8,000', valueIncrease: '+$10K–22K' }, { item: 'Concrete or paver driveway upgrade', cost: '$4,000–10,000', valueIncrease: '+$8K–18K' }, { item: 'Horizontal wood or metal fence addition', cost: '$3,000–7,000', valueIncrease: '+$5K–12K' }, { item: 'Minimalist landscape with native grasses', cost: '$2,000–5,000', valueIncrease: '+$4K–10K' }, { item: 'Steel or pivot front door', cost: '$3,500–8,000', valueIncrease: '+$7K–15K' }], valueRange: '$34,000–$77,000' },
  'mid-ranch': { improvements: [{ item: 'Replace wood siding sections with Hardie plank', cost: '$4,000–10,000', valueIncrease: '+$10K–22K' }, { item: 'Roof replacement if 15+ years old', cost: '$8,000–15,000', valueIncrease: '+$15K–25K' }, { item: 'Irrigation system + sod for dead lawn zones', cost: '$3,000–7,000', valueIncrease: '+$6K–12K' }, { item: 'Carport-to-garage conversion or garage door upgrade', cost: '$2,500–6,000', valueIncrease: '+$8K–16K' }, { item: 'New covered entry or porch addition', cost: '$3,000–8,000', valueIncrease: '+$5K–12K' }], valueRange: '$44,000–$87,000' },
  'high-traditional': { improvements: [{ item: 'Full exterior renovation: new Hardie siding + stone accents', cost: '$15,000–35,000', valueIncrease: '+$25K–55K' }, { item: 'Professional landscaping design + irrigation + lighting', cost: '$8,000–20,000', valueIncrease: '+$15K–30K' }, { item: 'Driveway replacement with stamped concrete or pavers', cost: '$8,000–18,000', valueIncrease: '+$12K–25K' }, { item: 'Custom front door + entry columns', cost: '$6,000–15,000', valueIncrease: '+$10K–20K' }, { item: 'Full exterior lighting system', cost: '$5,000–12,000', valueIncrease: '+$8K–15K' }], valueRange: '$70,000–$145,000' },
  'high-craftsman': { improvements: [{ item: 'Full exterior renovation with real wood accents and stone', cost: '$20,000–45,000', valueIncrease: '+$35K–70K' }, { item: 'Custom front porch with columns and railing', cost: '$10,000–25,000', valueIncrease: '+$15K–30K' }, { item: 'Professional landscaping with mature trees', cost: '$10,000–25,000', valueIncrease: '+$12K–25K' }, { item: 'Heated driveway or paver driveway', cost: '$8,000–20,000', valueIncrease: '+$10K–20K' }, { item: 'Custom exterior lighting design', cost: '$6,000–15,000', valueIncrease: '+$8K–15K' }], valueRange: '$80,000–$160,000' },
  'high-modern': { improvements: [{ item: 'Full exterior cladding: stucco + metal panels + glass', cost: '$25,000–60,000', valueIncrease: '+$45K–90K' }, { item: 'Circular or paver driveway with landscape lighting', cost: '$12,000–28,000', valueIncrease: '+$18K–35K' }, { item: 'Custom steel entry gate or architectural fence', cost: '$8,000–20,000', valueIncrease: '+$10K–22K' }, { item: 'Minimalist water feature or design element', cost: '$5,000–15,000', valueIncrease: '+$8K–18K' }, { item: 'Smart exterior lighting with app control', cost: '$6,000–14,000', valueIncrease: '+$8K–15K' }], valueRange: '$89,000–$180,000' },
  'high-ranch': { improvements: [{ item: 'Full exterior reimagination: new roofline + siding + stone', cost: '$20,000–50,000', valueIncrease: '+$35K–70K' }, { item: 'Attached garage addition or expansion', cost: '$20,000–45,000', valueIncrease: '+$25K–55K' }, { item: 'Professional landscape design with pool or water feature', cost: '$15,000–35,000', valueIncrease: '+$20K–45K' }, { item: 'Circular or extended driveway with pavers', cost: '$10,000–22,000', valueIncrease: '+$12K–25K' }, { item: 'Covered outdoor living extension off back', cost: '$15,000–35,000', valueIncrease: '+$18K–40K' }], valueRange: '$110,000–$235,000' },
};

export default function DFWCurbAppealGuide() {
  const [budget, setBudget] = useState<Budget>('mid');
  const [style, setStyle] = useState<HomeStyle>('traditional');
  const key: PlanKey = `${budget}-${style}`;
  const plan = plans[key];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <p style={{ color: '#F5E642', fontWeight: 700, letterSpacing: 2, fontSize: 12, textTransform: 'uppercase', marginBottom: 8 }}>🏡 DFW Curb Appeal</p>
        <h1 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>DFW Curb Appeal Guide</h1>
        <p style={{ fontSize: 16, color: '#9BB0CC', lineHeight: 1.7, marginBottom: 16, maxWidth: 680 }}>
          DFW buyers judge homes in 8 seconds from the street. In the Texas heat, a dead lawn or dated exterior can cost you $20,000+ in negotiation alone. Here's how to maximize first impressions by budget and home style.
        </p>
        <div style={{ display: 'inline-block', background: 'rgba(255,100,100,0.15)', border: '1px solid rgba(255,100,100,0.3)', borderRadius: 8, padding: '10px 16px', marginBottom: 36 }}>
          <span style={{ fontSize: 13, color: '#ff9999', fontWeight: 700 }}>⚠️ DFW #1 Curb Appeal Killer: Dead Lawn</span>
          <span style={{ fontSize: 13, color: '#ffcccc', marginLeft: 8 }}>DFW buyers walk away from brown grass. In summer heat, rock beds + drought-tolerant plants beat dead sod every time.</span>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: '#9BB0CC', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Budget Level</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {budgets.map(b => (
              <button key={b.id} onClick={() => setBudget(b.id)} style={{ padding: '12px 22px', borderRadius: 100, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, background: budget === b.id ? '#F5E642' : 'rgba(255,255,255,0.1)', color: budget === b.id ? '#0A1628' : '#ccc', transition: 'all 0.2s' }}>
                {b.label} <span style={{ fontWeight: 400, opacity: 0.75 }}>({b.range})</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, color: '#9BB0CC', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Home Style</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {homeStyles.map(s => (
              <button key={s.id} onClick={() => setStyle(s.id)} style={{ padding: '10px 20px', borderRadius: 100, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, background: style === s.id ? '#F5E642' : 'rgba(255,255,255,0.1)', color: style === s.id ? '#0A1628' : '#ccc', transition: 'all 0.2s' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: 'rgba(245,230,66,0.06)', border: '1px solid rgba(245,230,66,0.2)', borderRadius: 16, padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', margin: 0 }}>🏆 Top 5 Improvements</h2>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: '#9BB0CC', textTransform: 'uppercase', letterSpacing: 1 }}>Est. Value Increase</div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{plan.valueRange}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {plan.improvements.map((imp, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr 100px 100px', gap: 12, alignItems: 'center', padding: '14px 0', borderBottom: i < plan.improvements.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 6, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13 }}>{i + 1}</div>
                <div style={{ fontSize: 14, color: '#ddd' }}>{imp.item}</div>
                <div style={{ fontSize: 13, color: '#9BB0CC', textAlign: 'right' }}>{imp.cost}</div>
                <div style={{ fontSize: 13, color: '#6FCF97', fontWeight: 700, textAlign: 'right' }}>{imp.valueIncrease}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
