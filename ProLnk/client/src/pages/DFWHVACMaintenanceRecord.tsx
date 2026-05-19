import { useState } from 'react';

type CompletionLevel = 'complete' | 'partial' | 'none';

const completionLevels: { id: CompletionLevel; label: string; icon: string }[] = [
  { id: 'complete', label: 'I have all records', icon: '✅' },
  { id: 'partial', label: 'I have some records', icon: '🟡' },
  { id: 'none', label: 'I have no records', icon: '❌' },
];

const recordTypes = [
  { id: 'install', icon: '📋', title: 'Installation Record', why: 'Establishes equipment serial numbers, install date, and contractor who pulled permits. Required to start warranty clock and prove registration window.', reconstruct: 'Request copy from installing contractor (required to keep records 3 years in Texas). Check city permit office for your address — mechanical permits are public record.' },
  { id: 'epa', icon: '🧪', title: 'EPA 608 Refrigerant Service Records', why: 'Any technician who adds or removes refrigerant must be EPA 608 certified and document the work. Without records, refrigerant-related warranty claims can be denied and you have no legal protection if illegal venting occurred.', reconstruct: 'Request service invoices from all contractors who serviced the system. Invoices should show technician name, certification number, and refrigerant amounts.' },
  { id: 'maintenance', icon: '🔧', title: 'Annual Maintenance Records', why: 'In DFW, biannual maintenance (spring + fall) is the industry standard and some manufacturers require proof for warranty claims. Records show filter changes, coil cleaning, capacitor checks, and refrigerant status.', reconstruct: 'Contact your HVAC contractor for service history. Many keep digital records. If you moved into the home, ask seller for maintenance history as part of disclosure.' },
  { id: 'warranty', icon: '📝', title: 'Warranty Registration Confirmation', why: 'Registration within 60 days of install is required for extended parts warranties. Without confirmation, manufacturer assumes unregistered status (typically 5-yr instead of 10-yr coverage).', reconstruct: 'Check manufacturer website — most allow warranty lookup by serial number. If not registered, some manufacturers allow late registration with proof of install date.' },
  { id: 'permit', icon: '🏛️', title: 'Permit and Inspection Records', why: 'Unpermitted HVAC work can complicate home sales, void homeowner insurance claims, and leave you liable for code violations. DFW city inspectors require mechanical permits for all full replacements.', reconstruct: 'Contact your city or county building department. Permit records are public and searchable by address. Most DFW municipalities have online permit portals.' },
];

const riskByCompletion: Record<CompletionLevel, { level: string; color: string; summary: string }> = {
  complete: { level: '✅ Low Risk', color: '#22c55e', summary: 'You are well protected. Keep records in a dedicated folder (physical and digital). Update at every service visit. Consider sharing location with your real estate agent for future sale disclosure.' },
  partial: { level: '🟡 Moderate Risk', color: '#F5E642', summary: 'You have some exposure. Warranty claims may be delayed or denied for undocumented service. Reconstruct missing records now while contractors and permits are findable. Priority: EPA service records and warranty registration.' },
  none: { level: '❌ High Risk', color: '#ef4444', summary: 'Significant warranty and legal exposure. Without records you cannot prove compliance, warranty eligibility, or legal refrigerant handling. Begin reconstruction immediately using the steps below for each record type.' },
};

export default function DFWHVACMaintenanceRecord() {
  const [completion, setCompletion] = useState<CompletionLevel | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const risk = completion ? riskByCompletion[completion] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>PROLNK · DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>DFW HVAC Maintenance Records Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          Why keeping HVAC maintenance records matters in DFW — for warranty validity, EPA compliance, home sale disclosure, and diagnostic history.
        </p>

        <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>How complete are your current HVAC records?</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {completionLevels.map(l => (
            <button key={l.id} onClick={() => setCompletion(l.id === completion ? null : l.id)}
              style={{ background: completion === l.id ? '#F5E642′ : '#0f2240', color: completion === l.id ? '#0A1628' : '#fff', border: '1px solid', borderColor: completion === l.id ? '#F5E642' : '#1e3a5f', borderRadius: 10, padding: '0.8rem 1.25rem', cursor: ’pointer', fontWeight: 700, fontSize: '0.9rem' }}>
              {l.icon} {l.label}
            </button>
          ))}
        </div>

        {risk && (
          <div style={{ background: '#0f2240', border: `1px solid ${risk.color}`, borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ color: risk.color, fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{risk.level}</div>
            <p style={{ color: '#e2e8f0', lineHeight: 1.7, margin: 0 }}>{risk.summary}</p>
          </div>
        )}

        <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>Records to keep — select each to see why it matters and how to reconstruct it:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {recordTypes.map(r => (
            <div key={r.id} style={{ background: '#0f2240', border: '1px solid #1e3a5f', borderRadius: 10, overflow: 'hidden' }}>
              <button onClick={() => setExpanded(r.id === expanded ? null : r.id)}
                style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', padding: '1rem 1.25rem', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, fontSize: '0.9rem' }}>
                <span style={{ fontSize: '1.3rem' }}>{r.icon}</span>
                <span style={{ flex: 1 }}>{r.title}</span>
                <span style={{ color: '#F5E642′ }}>{expanded === r.id ? '▲' : '▼'}</span>
              </button>
              {expanded === r.id && (
                <div style={{ padding: '0 1.25rem 1.25rem' }}>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, letterSpacing: 1, marginBottom: '0.3rem' }}>WHY IT MATTERS</div>
                    <p style={{ color: '#e2e8f0', lineHeight: 1.6, margin: 0, fontSize: '0.9rem' }}>{r.why}</p>
                  </div>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
                    <div style={{ color: '#F5E642', fontSize: '0.75rem', fontWeight: 700, letterSpacing: 1, marginBottom: '0.3rem' }}>HOW TO RECONSTRUCT</div>
                    <p style={{ color: '#94a3b8', lineHeight: 1.6, margin: 0, fontSize: '0.85rem' }}>{r.reconstruct}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2240', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontWeight: 800, marginBottom: '0.75rem' }}>🏠 Get a Record-Keeping HVAC Pro in DFW</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>ProLnk DFW HVAC contractors provide detailed service invoices, EPA documentation, and digital record-keeping to protect your warranty and compliance status.</p>
        </div>
      </div>
    </div>
  );
}