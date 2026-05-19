import { useState } from 'react';

export default function DFWProLnk4700Pages2026() {
  const [role, setRole] = useState('');

  const recommendations: Record<string, { title: string; sections: { label: string; desc: string }[] }> = {
    homeowner: {
      title: '🏠 DFW Homeowner — Where to Start in 4,700+ Pages',
      sections: [
        { label: '🌡️ HVAC Library (900+ pages)', desc: 'Start with seasonal guides: spring tune-up, summer cooling efficiency, and DFW humidity control' },
        { label: '💧 Plumbing & Water (600+ pages)', desc: 'DFW water quality, hard water treatment, and emergency shutoff guides are most-read' },
        { label: '🏗️ Foundation & Structure (400+ pages)', desc: 'DFW expansive clay soil is unique — foundation movement guides are essential reading' },
        { label: '⚡ Electrical Safety (300+ pages)', desc: 'Panel upgrades, EV charger prep, and GFCI requirements for DFW’s newer homes' },
        { label: '🔗 ProLnk Homeowner Hub', desc: 'Join the waitlist and access your personalized DFW home maintenance calendar' },
      ],
    },
    pro: {
      title: '🔧 DFW Service Pro — Your Business Resource Library',
      sections: [
        { label: '💼 ProLnk Charter Guide', desc: 'Start here: Charter tier benefits, 5-stream income breakdown, and network building strategy' },
        { label: '📍 DFW Market Intelligence (200+ pages)', desc: 'Zip code demand maps, seasonal lead volume, and pricing benchmarks by trade' },
        { label: '🏦 Home Health Vault Pro Tools', desc: 'Origination rights mechanics, territory mapping, and permanent income stream setup' },
        { label: '⭐ Lead Conversion Guides (150+ pages)', desc: 'Response time benchmarks, review strategies, and profile optimization for DFW leads' },
        { label: '📊 Network Income Playbook', desc: '4-level cascade mechanics, recruiting scripts, and income projection calculators' },
      ],
    },
    investor: {
      title: '📈 DFW Real Estate Investor — Portfolio Resources',
      sections: [
        { label: '🏘️ Multi-Property Management (250+ pages)', desc: 'Home Health Vault for landlords: track maintenance history across your DFW portfolio' },
        { label: '💰 ROI-Focused Maintenance Guides', desc: 'Which repairs maximize DFW rental value and which to defer — data-driven decisions' },
        { label: '🔗 ProLnk Landlord Priority Access', desc: 'Charter pros prioritize rental calls — faster response, better tenant outcomes' },
        { label: '📊 DFW Market Data (300+ pages)', desc: 'Zip-level rental demand, maintenance cost averages, and cap rate impact of deferred work' },
        { label: '🏦 Vault for Portfolio Sales', desc: 'Health Vault reports command premium pricing in DFW investor-to-investor sales' },
      ],
    },
    agent: {
      title: '🏡 DFW Real Estate Agent — Transaction Support Library',
      sections: [
        { label: '📋 Pre-Listing Inspection Guides', desc: 'What DFW buyers inspect first and how Health Vault data speeds disclosure' },
        { label: '🔗 ProLnk Agent Partner Program', desc: 'Refer clients to ProLnk Charter — earn referral credit on every successful connection' },
        { label: '🏗️ Foundation Guide for Agents (100+ pages)', desc: 'How to explain DFW clay soil movement to out-of-state buyers — top agent tool' },
        { label: '💼 Vault as a Listing Tool', desc: 'Homes with Vault documentation sell 11% faster in DFW (2025 data)' },
        { label: '📊 Neighborhood Health Data', desc: 'Access aggregate Vault data by subdivision for hyper-local listing presentations' },
      ],
    },
  };

  const result = role ? recommendations[role] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', padding: '32px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>📚</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>
            ProLnk 4,700+ Pages of DFW Content
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            The most comprehensive DFW home service resource ever built — find your starting point
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 20, flexWrap: 'wrap' }}>
            {['🌡️ HVAC', '💧 Plumbing', '🏗️ Foundation', '⚡ Electrical', '🔧 General'].map(t => (
              <span key={t} style={{ color: '#F5E642', fontSize: 13, backgroundColor: '#F5E64215', padding: '4px 12px', borderRadius: 20 }}>{t}</span>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0d1f3c', borderRadius: 12, padding: 20, marginBottom: 32, border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0, lineHeight: 1.7 }}>
            Over three years of research, field expertise, and homeowner feedback — ProLnk has built the definitive DFW home services library. 
            From HVAC microbial control to foundation clay soil behavior, every guide is written specifically for the DFW climate, 
            Texas building codes, and local market realities. This is not generic home advice — it's DFW-specific intelligence at scale.
          </p>
        </div>

        <div>
          <label style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 12 }}>YOUR ROLE — GET A PERSONALIZED STARTING POINT</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
            {[
              { v: 'homeowner', l: '🏠 DFW Homeowner' },
              { v: 'pro', l: '🔧 Service Pro' },
              { v: 'investor', l: '📈 Real Estate Investor' },
              { v: 'agent', l: '🏡 Real Estate Agent' },
            ].map(o => (
              <button key={o.v} onClick={() => setRole(o.v)}
                style={{ padding: '16px', borderRadius: 10, border: '2px solid', cursor: 'pointer',
                  borderColor: role === o.v ? '#F5E642′ : '#1e3a5f',
                  backgroundColor: role === o.v ? '#F5E64220′ : '#0d1f3c',
                  color: '#fff', fontSize: 15 }}>
                {o.l}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ backgroundColor: '#0d1f3c', borderRadius: 12, padding: 24, border: '1px solid #F5E64240′ }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>{result.title}</h2>
            {result.sections.map((s, i) => (
              <div key={i} style={{ padding: '14px 0', borderBottom: i < result.sections.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 32, backgroundColor: '#F5E64215', borderRadius: 12, padding: 24, textAlign: 'center', border: '1px solid #F5E64240′ }}>
          <div style={{ fontSize: 32 }}>🏆</div>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, margin: '8px 0 4px' }}>4,700+ Pages. One Mission.</p>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>Make every DFW homeowner and service pro more informed, more connected, and more protected.</p>
        </div>
      </div>
    </div>
  );
}
