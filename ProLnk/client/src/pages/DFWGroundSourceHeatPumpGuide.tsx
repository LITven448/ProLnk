import { useState } from 'react';

const homeSizes = [
  { label: 'Under 2,000 sq ft', value: 'small' },
  { label: '2,000-3,500 sq ft', value: 'medium' },
  { label: '3,500-5,000 sq ft', value: 'large' },
  { label: 'Over 5,000 sq ft', value: 'xlarge' },
];

const lotSizes = [
  { label: 'Small lot (under 0.25 acre)', value: 'small' },
  { label: 'Medium lot (0.25-0.5 acre)', value: 'medium' },
  { label: 'Large lot (0.5-1 acre)', value: 'large' },
  { label: 'Acreage (1+ acres)', value: 'acreage' },
];

type LoopType = 'vertical' | 'horizontal' | 'pond' | 'none';

const geoData: Record<string, Record<string, { feasible: boolean; loopType: LoopType; cost: string; savings: string; payback: string; claySoilNote: string; details: string[] }>> = {
  small: {
    small: { feasible: true, loopType: 'vertical', cost: '\,000-\,000', savings: '\,200-\,800/yr', payback: '12-18 years', claySoilNote: 'DFW clay requires drilling -- 3-4 vertical bores at 200-250ft each for your home size. Clay has good conductivity once drilled.', details: ['3-4 vertical bores needed (200-250ft each)', 'Small lot makes horizontal loops impossible', 'Clay soil drilling cost: \-\/ft (higher than sandy soil)', 'System COP: 3.5-4.5 (3.5x-4.5x more efficient than air-source heat pump'] },
    medium: { feasible: true, loopType: 'horizontal', cost: '\,000-\,000', savings: '\,200-\,800/yr', payback: '9-14 years', claySoilNote: 'Medium lot allows horizontal loops for small home -- cheaper than drilling but DFW clay needs 500ft+ of trench.', details: ['Horizontal loops possible: 600-800 linear ft needed', 'DFW clay shrinks and swells -- loops must be deep (6-8ft)', 'Lower installation cost than vertical boring', 'Suitable for small home with medium lot'] },
    large: { feasible: true, loopType: 'horizontal', cost: '\,000-\,000', savings: '\,200-\,800/yr', payback: '8-12 years', claySoilNote: 'Large lot gives room for horizontal loops with margin. Clay soil depth requirement met at 6-8ft trench.', details: ['Horizontal loop field easy to install with large lot', 'DFW ground temp stable at 68-72F year-round at 6ft+ depth', 'Excavation cost lower than drilling in clay', 'Best ROI scenario for small home'] },
    acreage: { feasible: true, loopType: 'horizontal', cost: '\,000-\,000', savings: '\,200-\,800/yr', payback: '7-11 years', claySoilNote: 'Acreage with small home is ideal -- ample space for horizontal loops, low installation cost relative to savings.', details: ['Extensive horizontal loop options', 'Pond loop possible if pond exists on property', 'Lowest system cost scenario', 'Consider open-loop if well water available'] },
  },
  medium: {
    small: { feasible: true, loopType: 'vertical', cost: '\,000-\,000', savings: '\,800-\,800/yr', payback: '13-18 years', claySoilNote: 'Medium home on small lot requires vertical drilling -- 5-7 bores in DFW clay. Drilling is expensive but necessary.', details: ['5-7 vertical bores at 200-250ft each', 'DFW clay drilling: expect \,000-\,000 just for boring', 'High upfront cost but exceptional long-term savings', 'Eligible for federal 30% tax credit (reduces cost by \,000-\,000)'] },
    medium: { feasible: true, loopType: 'vertical', cost: '\,000-\,000', savings: '\,800-\,800/yr', payback: '11-16 years', claySoilNote: 'Borderline lot size for horizontal -- vertical boring more reliable for medium home in DFW clay.', details: ['Vertical boring recommended for reliability', 'Could attempt horizontal with careful design', 'DFW clay shrink-swell can damage shallow horizontal loops', '5-6 vertical bores most common for this size'] },
    large: { feasible: true, loopType: 'horizontal', cost: '\,000-\,000', savings: '\,800-\,800/yr', payback: '8-13 years', claySoilNote: 'Large lot enables horizontal loops -- more cost-effective than drilling for medium home. DFW clay trench at 7-8ft depth is stable.', details: ['1,000-1,400 linear ft of horizontal loop needed', '7-8ft trench depth required for DFW clay stability', 'Irrigation lines must be relocated away from loop field', 'Best medium-home scenario'] },
    acreage: { feasible: true, loopType: 'horizontal', cost: '\,000-\,000', savings: '\,800-\,800/yr', payback: '7-11 years', claySoilNote: 'Acreage gives maximum flexibility. Pond loop is cheapest if pond available. Otherwise horizontal at 7-8ft depth.', details: ['Pond loop if available (lowest cost option)', 'Open-loop possible if high-quality well water available', 'Horizontal loop as primary option', 'Consider slinky coil loops to reduce trench length'] },
  },
  large: {
    small: { feasible: true, loopType: 'vertical', cost: '\,000-\,000', savings: '\,800-\,200/yr', payback: '12-17 years', claySoilNote: 'Large home on small lot requires extensive vertical drilling in DFW clay -- 8-12 bores. High cost but strong savings.', details: ['8-12 vertical bores at 200-250ft each', 'DFW clay drilling dominates cost', '30% federal tax credit: reduces cost \,000-\,000', 'Annual savings approach \,000 -- strong long-term case'] },
    medium: { feasible: true, loopType: 'vertical', cost: '\,000-\,000', savings: '\,800-\,200/yr', payback: '11-16 years', claySoilNote: 'Medium lot insufficient for horizontal loops with large home. Vertical boring in DFW clay is the path.', details: ['7-10 vertical bores needed', 'Could supplement with small horizontal field if space allows', 'Zoned system recommended for large home', '30% IRS credit applies to full installation cost'] },
    large: { feasible: true, loopType: 'horizontal', cost: '\,000-\,000', savings: '\,800-\,200/yr', payback: '9-13 years', claySoilNote: 'Large home with large lot is a great geothermal candidate. Horizontal loops at 7-8ft depth in DFW clay work well.', details: ['1,600-2,200 linear ft of loop field', 'Slinky coil design reduces trench length by 40%', 'Zoned geothermal system highly effective for large homes', 'Best ROI at this home size with large lot'] },
    acreage: { feasible: true, loopType: 'horizontal', cost: '\,000-\,000', savings: '\,800-\,200/yr', payback: '7-11 years', claySoilNote: 'Acreage with large home is ideal. Multiple loop field zones possible. Pond loop if water available.', details: ['Multiple horizontal loop zones', 'Pond or lake loop is most efficient if available', 'Open-loop well system if water quality permits', 'Lowest cost per ton of capacity at this size'] },
  },
  xlarge: {
    small: { feasible: false, loopType: 'none', cost: '\,000-\,000+', savings: '\,200-\,500/yr', payback: '14-20 years', claySoilNote: 'Very large home on small lot may not have enough bore space even with vertical drilling. Engineering study required.', details: ['12-18 vertical bores needed -- may exceed lot footprint', 'DFW city setbacks limit bore placement', 'Engineering feasibility study required before committing', 'Alternative: high-efficiency air-source heat pump may be better ROI'] },
    medium: { feasible: true, loopType: 'vertical', cost: '\,000-\,000', savings: '\,200-\,500/yr', payback: '12-17 years', claySoilNote: 'Very large home requires extensive vertical boring on medium lot. Feasible but expensive in DFW clay.', details: ['10-15 vertical bores at 200-250ft', '30% federal tax credit applies -- significant offset', 'Zoned multi-unit geothermal system', 'Annual savings can exceed \,000 at current DFW electric rates'] },
    large: { feasible: true, loopType: 'vertical', cost: '\,000-\,000', savings: '\,200-\,500/yr', payback: '9-14 years', claySoilNote: 'Large lot allows partial horizontal loops but large home likely needs vertical boring supplement. Hybrid approach common.', details: ['Hybrid horizontal + vertical system', 'Large lot reduces boring requirement', '30% tax credit reduces effective cost significantly', 'Excellent 20-year NPV at this scale'] },
    acreage: { feasible: true, loopType: 'horizontal', cost: '\,000-\,000', savings: '\,200-\,500/yr', payback: '8-12 years', claySoilNote: 'Acreage with very large home is the ideal geothermal scenario. Multiple horizontal zones, pond loops, or open-loop options.', details: ['Multiple horizontal zone loop fields', 'Pond or lake loop most cost-effective if available', 'Open-loop system possible with adequate well capacity', 'Best geothermal ROI scenario in DFW'] },
  },
};

export default function DFWGroundSourceHeatPumpGuide() {
  const [homeSize, setHomeSize] = useState('medium');
  const [lotSize, setLotSize] = useState('medium');
  const data = geoData[homeSize][lotSize];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#94A3B8' }}>🏠 DFW Building Science</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
          Geothermal Heat Pumps for DFW
        </h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.7 }}>
          DFW ground temps stay 68-72F year-round -- perfect for geothermal. But DFW clay soil means horizontal trenches need to go 7-8ft deep, and smaller lots often require expensive vertical drilling. Here is what it means for your property.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem', fontSize: '1.1rem' }}>🏠 Home Size</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {homeSizes.map(opt => (
              <button key={opt.value} onClick={() => setHomeSize(opt.value)} style={{
                background: homeSize === opt.value ? '#F5E642' : '#1E3A5F',
                color: homeSize === opt.value ? '#0A1628' : '#E2E8F0',
                border: 'none', borderRadius: 8, padding: '0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', textAlign: 'left',
              }}>{opt.label}</button>
            ))}
          </div>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem', fontSize: '1.1rem' }}>🌿 Lot Size</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {lotSizes.map(opt => (
              <button key={opt.value} onClick={() => setLotSize(opt.value)} style={{
                background: lotSize === opt.value ? '#F5E642' : '#1E3A5F',
                color: lotSize === opt.value ? '#0A1628' : '#E2E8F0',
                border: 'none', borderRadius: 8, padding: '0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', textAlign: 'left',
              }}>{opt.label}</button>
            ))}
          </div>
        </div>

        <div style={{ background: data.feasible ? '#0F2040' : '#1A0A0A', borderRadius: 12, padding: '1.5rem', border: 'none', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.1rem', margin: 0 }}>📊 Geothermal Feasibility</h2>
            <span style={{ background: data.feasible ? '#065F46' : '#5F1E1E', color: data.feasible ? '#6EE7B7' : '#FCA5A5', borderRadius: 6, padding: '0.25rem 0.75rem', fontSize: '0.85rem', fontWeight: 700 }}>{data.feasible ? 'Feasible' : 'Challenging'}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ background: '#1E3A5F', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ color: '#94A3B8', fontSize: '0.75rem', marginBottom: '0.25rem' }}>System Cost</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem' }}>{data.cost}</div>
            </div>
            <div style={{ background: '#1E3A5F', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ color: '#94A3B8', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Annual Savings</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem' }}>{data.savings}</div>
            </div>
            <div style={{ background: '#1E3A5F', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ color: '#94A3B8', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Payback</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem' }}>{data.payback}</div>
            </div>
          </div>
          <div style={{ background: '#1E3A5F', borderRadius: 8, padding: '1rem', marginBottom: '1rem', fontSize: '0.9rem', color: '#CBD5E1', lineHeight: 1.6 }}>
            🌍 <strong style={{ color: '#F5E642' }}>DFW Clay Soil Note:</strong> {data.claySoilNote}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {data.details.map((d, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', fontSize: '0.875rem', color: '#E2E8F0' }}>⚙️ {d}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1.25rem', color: '#0A1628' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>💰 Federal Tax Credit</div>
          <div style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>Geothermal heat pumps qualify for a 30% federal tax credit (IRS Form 5695) through 2032. On a \,000 system, that is \,500 back on your taxes. This dramatically improves payback period and makes geothermal one of the strongest home energy investments available in DFW.</div>
        </div>
      </div>
    </div>
  );
}
