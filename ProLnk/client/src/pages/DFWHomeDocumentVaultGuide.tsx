import { useState } from 'react';

const DOC_TYPES = ['Deed & Title', 'Insurance', 'Mortgage', 'Warranties', 'Permits', 'HOA', 'Utility Accounts', 'Tax Records'];

interface DocInfo {
  storage: 'physical' | 'digital' | 'both';
  location: string;
  keepFor: string;
  ifLost: string;
  wallet?: boolean;
}

const DOC_INFO: Record<string, DocInfo> = {
  'Deed & Title': { storage: 'both', location: 'Fireproof safe (original) + cloud scan', keepFor: 'Forever — never discard', ifLost: 'Request certified copy from county clerk. In DFW: Dallas/Tarrant/Collin/Denton county records office.', },
  Insurance: { storage: 'both', location: 'Fireproof safe + insurer app/portal', keepFor: 'Keep current policy + 3 prior years', ifLost: 'Call your agent — they can reissue. Your insurer has digital copies.', wallet: true },
  Mortgage: { storage: 'both', location: 'Cloud + physical file folder', keepFor: 'Duration of loan + 7 years after payoff', ifLost: 'Request copy from lender. Final payoff letter: get from county records.' },
  Warranties: { storage: 'both', location: 'Binder + cloud folder per item', keepFor: 'Duration of warranty + 2 years', ifLost: 'Contact manufacturer with model/serial number. Roofing: check permit records.' },
  Permits: { storage: 'both', location: 'Physical binder + city portal account', keepFor: 'Forever — affects resale', ifLost: 'Request from city building dept. DFW cities maintain permit history online.' },
  HOA: { storage: 'digital', location: 'Cloud storage — HOA portal usually has copies', keepFor: 'While you own the home', ifLost: 'Contact HOA management company. CC&Rs always on file with the HOA.' },
  'Utility Accounts': { storage: 'digital', location: 'Utility account portals — download annual statements', keepFor: '3 years for dispute resolution', ifLost: 'Login to utility portal. Oncor, Atmos, NTMWD all have account history.' },
  'Tax Records': { storage: 'both', location: 'Cloud + physical folder', keepFor: '7 years minimum (IRS statute)', ifLost: 'IRS: get transcript at irs.gov. County appraisal: DCAD, TCAD, CCAD, DCAD websites.' },
};

const STORAGE_LABELS = { physical: '📁 Physical Only', digital: '☁️ Digital Only', both: '📁☁️ Physical + Digital' };
const STORAGE_COLORS = { physical: '#3B82F6', digital: '#8B5CF6', both: '#22C55E' };

export default function DFWHomeDocumentVaultGuide() {
  const [selected, setSelected] = useState('Deed & Title');
  const info = DOC_INFO[selected];

  return (
    <div style={{ background: '#F8F9FB', minHeight: '100vh', color: '#0A1628', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#1D4ED8', letterSpacing: 1, fontWeight: 700 }}>DFW HOMEOWNER TOOLS</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6, color: '#0A1628' }}>🗄️ Home Document Vault Guide</h1>
        <p style={{ color: '#5A7A9A', marginBottom: 28 }}>Know exactly where to keep every document — physical, digital, or both.</p>

        <div style={{ background: '#FFF8E1', border: '2px solid #F5E642', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>👛 Always Keep in Your Wallet</div>
          <div style={{ fontSize: 14, color: '#5A7A9A' }}>Insurance declarations page (1 page summary), Mortgage servicer phone number, HOA emergency contact — photograph and store in phone too.</div>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {DOC_TYPES.map(d => (
            <button key={d} onClick={() => setSelected(d)}
              style={{ padding: '8px 16px', borderRadius: 20, border: '2px solid', cursor: 'pointer', fontWeight: 700, fontSize: 13,
                borderColor: selected === d ? '#0A1628' : '#D1D9E6',
                background: selected === d ? '#0A1628' : '#fff',
                color: selected === d ? '#fff' : '#5A7A9A' }}>
              {d}
            </button>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: '0 4px 24px rgba(10,22,40,0.08)', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>{selected}</h2>
            {info.wallet && <span style={{ background: '#FEF3C7', color: '#D97706', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>👛 KEEP IN WALLET</span>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div style={{ background: '#F8F9FB', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 12, color: '#5A7A9A', fontWeight: 700, marginBottom: 6 }}>STORAGE METHOD</div>
              <div style={{ fontWeight: 800, fontSize: 16, color: STORAGE_COLORS[info.storage] }}>{STORAGE_LABELS[info.storage]}</div>
            </div>
            <div style={{ background: '#F8F9FB', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 12, color: '#5A7A9A', fontWeight: 700, marginBottom: 6 }}>HOW LONG TO KEEP</div>
              <div style={{ fontWeight: 800, fontSize: 15, color: '#0A1628' }}>{info.keepFor}</div>
            </div>
          </div>

          <div style={{ background: '#F0F4FF', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: '#1D4ED8', fontWeight: 700, marginBottom: 6 }}>📍 WHERE TO STORE</div>
            <div style={{ color: '#0A1628', lineHeight: 1.6 }}>{info.location}</div>
          </div>

          <div style={{ background: '#FFF0F0', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 12, color: '#DC2626', fontWeight: 700, marginBottom: 6 }}>🚨 WHAT IF YOU LOSE IT?</div>
            <div style={{ color: '#0A1628', lineHeight: 1.6 }}>{info.ifLost}</div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(10,22,40,0.06)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>🔥 Fireproof Safe Essentials</h2>
          {['Deed and title (original)', 'Birth certificates + passports', 'Insurance policy documents', 'Vehicle titles', 'Wills and trusts', 'Social Security cards', 'Medical records summaries'].map((item, i) => (
            <div key={i} style={{ fontSize: 14, padding: '8px 0', borderBottom: i < 6 ? '1px solid #F0F2F5' : 'none', color: '#0A1628' }}>
              ✅ {item}
            </div>
          ))}
          <div style={{ marginTop: 14, fontSize: 13, color: '#5A7A9A', background: '#F8F9FB', borderRadius: 8, padding: 12 }}>
            💡 DFW tip: After hail season (April–June), scan your roof inspection reports and add to cloud immediately while contractor details are fresh.
          </div>
        </div>
      </div>
    </div>
  );
}
