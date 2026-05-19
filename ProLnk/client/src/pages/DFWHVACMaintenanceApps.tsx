import { useState } from 'react';

const apps = [
  {
    id: 'homezada',
    name: 'HomeZada',
    icon: '🏡',
    type: 'Full home management',
    cost: 'Free / $9.99/mo premium',
    platform: 'iOS, Android, Web',
    dfwFeatures: ['HVAC maintenance reminders', 'Document storage for manuals', 'Home inventory tracking', 'Service provider contacts'],
    bestFor: 'Homeowners who want a full home management system, not just HVAC',
    rating: 4,
  },
  {
    id: 'brightnest',
    name: 'BrightNest',
    icon: '✨',
    type: 'Home care tips + tasks',
    cost: 'Free',
    platform: 'iOS, Android',
    dfwFeatures: ['Seasonal task reminders', 'HVAC filter change alerts', 'DFW climate-adjusted suggestions', 'Simple task checklist UI'],
    bestFor: 'First-time homeowners who want simple guidance without complexity',
    rating: 3,
  },
  {
    id: 'prolnk',
    name: 'ProLnk Maintenance Tracker',
    icon: '🔧',
    type: 'HVAC-focused tracker',
    cost: 'Free for DFW homeowners',
    platform: 'Web (mobile coming soon)',
    dfwFeatures: ['DFW-specific maintenance calendar', 'Contractor booking integration', 'Service history log', 'R-410A phase-out alerts', 'ERCOT peak season reminders'],
    bestFor: 'DFW homeowners who want HVAC-first tracking with local pro access built in',
    rating: 5,
  },
];

const needs: { id: string; label: string; appId: string; howTo: string }[] = [
  {
    id: 'reminders',
    label: '🔔 I keep forgetting filter changes and service dates',
    appId: 'brightnest',
    howTo: 'Set up BrightNest task reminders for the 1st of every month June–September. Create a custom task: "Replace HVAC filter" with monthly repeat.',
  },
  {
    id: 'history',
    label: '📋 I want to track all my service history in one place',
    appId: 'homezada',
    howTo: 'Use HomeZada\’s Maintenance Log. Create an HVAC appliance entry, then add each service visit with date, tech name, cost, and what was done. Upload invoices as attachments.',
  },
  {
    id: 'booking',
    label: '🛠️ I want reminders AND easy access to DFW pros',
    appId: 'prolnk',
    howTo: 'ProLnk\’s tracker sends DFW-specific alerts in April (pre-season tune-up), June (summer prep), and October (fall check). One tap connects you to available local pros.',
  },
  {
    id: 'documents',
    label: '📄 I need to store HVAC manuals and warranty docs',
    appId: 'homezada',
    howTo: 'HomeZada\’s document vault is ideal. Upload your equipment manual, original invoice, and warranty card. Tag them with your HVAC system for instant retrieval during service calls.',
  },
];

export default function DFWHVACMaintenanceApps() {
  const [need, setNeed] = useState<string | null>(null);
  const selected = needs.find((n) => n.id === need);
  const recApp = selected ? apps.find((a) => a.id === selected.appId) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK • DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>HVAC Maintenance Tracking<br />Apps for DFW Homeowners</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          The best HVAC system in DFW still fails if maintenance is skipped. These apps help you stay on top of filter changes, tune-ups, and service history — without relying on memory.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
          {apps.map((app) => (
            <div key={app.id} style={{ background: '#112240', borderRadius: 12, padding: '22px', borderTop: `3px solid ${app.id === 'prolnk' ? '#F5E642' : '#1E3A5F'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 18 }}>{app.icon} {app.name}</div>
                  <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 2 }}>{app.type} · {app.cost}</div>
                </div>
                <div style={{ color: '#F5E642', fontSize: 18 }}>{'⭐'.repeat(app.rating)}</div>
              </div>
              <div style={{ fontSize: 13, color: '#64748B', marginBottom: 10 }}>📱 {app.platform}</div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>DFW-RELEVANT FEATURES</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {app.dfwFeatures.map((f, i) => (
                    <div key={i} style={{ fontSize: 13, color: '#CBD5E1′ }}>✓ {f}</div>
                  ))}
                </div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#94A3B8′ }}>
                <strong style={{ color: '#fff' }}>Best for:</strong> {app.bestFor}
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>🎯 What's Your Tracking Need?</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {needs.map((n) => (
            <button key={n.id} onClick={() => setNeed(n.id)} style={{
              background: need === n.id ? '#F5E642′ : '#1E3A5F', color: need === n.id ? '#0A1628' : '#fff',
              border: 'none', borderRadius: 8, padding: '14px 18px', textAlign: 'left', cursor: 'pointer', fontSize: 14, fontWeight: 600,
            }}>{n.label}</button>
          ))}
        </div>

        {selected && recApp && (
          <div style={{ background: '#112240', borderRadius: 12, padding: '24px', marginBottom: 32, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Recommended: {recApp.icon} {recApp.name}</div>
            <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{selected.howTo}</p>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '24px', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Ready to Book a DFW HVAC Pro?</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>ProLnk connects you with pre-vetted local HVAC techs — free quotes, no pressure.</div>
        </div>
      </div>
    </div>
  );
}
