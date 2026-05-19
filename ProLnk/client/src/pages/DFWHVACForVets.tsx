import { useState } from 'react';

const vetSituations = [
  {
    label: "I own a DFW home with a VA loan",
    benefit: "VA loans require the home's HVAC system to be in working order at appraisal. A failing system can block your loan or require seller credit.",
    resource: "VA Minimum Property Requirements (MPRs) mandate functional heating and cooling. Get a pre-appraisal HVAC inspection to avoid delays.",
    savings: "If a seller-required HVAC repair is needed, negotiate a credit rather than a replacement — saves you cash at closing.",
  },
  {
    label: "I'm using VLB (Veterans Land Board) financing",
    benefit: "Texas VLB home loans offer below-market rates for Texas veterans. A high-efficiency HVAC system reduces monthly utility costs and improves your debt-to-income ratio.",
    resource: "VLB home improvement loans are available for qualifying veterans. HVAC replacement may qualify — call 1-800-252-8387.",
    savings: "Pair a VLB home improvement loan with Oncor rebates for 16+ SEER equipment. Stack savings across multiple programs.",
  },
  {
    label: "I have a Texas property tax exemption",
    benefit: "Texas veterans with 100% disability rating get a full property tax exemption — freeing budget for home maintenance including HVAC.",
    resource: "Apply through your county appraisal district. Dallas County, Tarrant County, and Collin County all have veteran services offices.",
    savings: "Property tax savings of $3,000–$8,000/year depending on your DFW county. Redirect that budget to planned HVAC maintenance.",
  },
  {
    label: "I'm looking for HVAC contractors who work with vets",
    benefit: "Some DFW HVAC contractors offer veteran discounts (5–15%). Always ask. ProLnk shows veteran-friendly ratings in contractor profiles.",
    resource: "Texas Vet programs through TWC and TDLR license trades vets — many serve their community with preferred pricing.",
    savings: "Ask for military discount upfront. Get it in writing on the quote. Typical savings: $50–$300 on major repairs.",
  },
  {
    label: "I have a VA disability that affects heat tolerance",
    benefit: "Some VA conditions (spinal cord injury, burns, certain medications) make extreme heat life-threatening. Your HVAC system is medical infrastructure.",
    resource: "Contact your VA social worker — some veterans qualify for VA-funded home modifications including HVAC upgrades through HISA or SAH programs.",
    savings: "VA HISA grant: up to $6,800 for home accessibility modifications. Some HVAC upgrades qualify if connected to your disability.",
  },
  {
    label: "I'm helping a veteran parent with their HVAC",
    benefit: "If your parent is a DFW veteran homeowner, they may qualify for programs they don't know about — especially if 65+ or disabled.",
    resource: "Texas Veterans Commission has county-level service officers who help navigate VA benefits + Texas programs. Free service.",
    savings: "Compound savings: property tax exemption + VA benefit + Oncor rebate + LIHEAP energy assistance = major HVAC cost reduction.",
  },
];

export default function DFWHVACForVets() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎖️</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            DFW HVAC Guide for Veterans
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            Texas benefits, VA resources, and DFW-specific HVAC savings for veterans who own or are buying a home.
          </p>
        </div>

        <div style={{ background: '#111f3a', border: '1.5px solid #60a5fa', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
          <p style={{ color: '#60a5fa', fontWeight: 700, marginBottom: '0.25rem', fontSize: '0.95rem' }}>🇺🇸 Texas Vet Advantage</p>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Texas has more veterans than any state except California — and more veteran-specific programs. DFW veterans can stack property tax exemptions, VLB loans, VA grants, and utility rebates to dramatically reduce HVAC costs.
          </p>
        </div>

        <p style={{ color: '#60a5fa', fontWeight: 600, marginBottom: '1rem', fontSize: '0.95rem' }}>
          👇 Select your situation:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {vetSituations.map((s, i) => (
            <div key={i}>
              <div
                onClick={() => setSelected(selected === i ? null : i)}
                style={{
                  background: selected === i ? '#1a3a5c' : '#111f3a',
                  border: selected === i ? '1.5px solid #F5E642′ : '1.5px solid #1e3a5f',
                  borderRadius: 10,
                  padding: '0.9rem 1.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.97rem' }}>🎖️ {s.label}</span>
                <span style={{ color: '#F5E642′ }}>{selected === i ? '▲' : '▼'}</span>
              </div>
              {selected === i && (
                <div style={{ background: '#0d1f38', borderRadius: '0 0 10px 10px', padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ background: '#0f2a4a', borderRadius: 8, padding: '0.7rem 1rem' }}>
                    <span style={{ color: '#F5E642', fontWeight: 700 }}>⭐ Benefit: </span>
                    <span style={{ color: '#e2e8f0', fontSize: '0.93rem' }}>{s.benefit}</span>
                  </div>
                  <div style={{ background: '#0f2a4a', borderRadius: 8, padding: '0.7rem 1rem' }}>
                    <span style={{ color: '#60a5fa', fontWeight: 700 }}>📋 Resource: </span>
                    <span style={{ color: '#e2e8f0', fontSize: '0.93rem' }}>{s.resource}</span>
                  </div>
                  <div style={{ background: '#0f2a4a', borderRadius: 8, padding: '0.7rem 1rem' }}>
                    <span style={{ color: '#34d399', fontWeight: 700 }}>💰 Savings Tip: </span>
                    <span style={{ color: '#94a3b8', fontSize: '0.93rem' }}>{s.savings}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', background: '#F5E642', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>🔧</div>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: '1.05rem' }}>
            ProLnk: veteran-friendly HVAC pros across all of DFW
          </p>
          <p style={{ color: '#1e3a5f', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Licensed, background-checked, and rated. Filter for veteran-owned or veteran-discount contractors in your zip code.
          </p>
        </div>
      </div>
    </div>
  );
}
