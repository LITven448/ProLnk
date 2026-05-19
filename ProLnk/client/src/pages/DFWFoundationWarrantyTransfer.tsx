import { useState } from 'react';

const companies = ['Perma-Pier Foundation Repair', 'Ram Jack Texas', 'Foundation Repair of Texas', 'Alpha Foundation Specialists', 'Other Company'];
const repairTypes = ['Pier Underpinning', 'Slab Leveling', 'Pressed Pilings', 'Steel Pier System', 'Drainage Correction'];

type TransferInfo = { transferable: boolean; cost: string; buyerRequires: string[]; process: string[]; tip: string };
const transferData: Record<string, TransferInfo> = {
  'Perma-Pier Foundation Repair': { transferable: true, cost: '$150-$250 transfer fee', buyerRequires: ['Copy of original warranty', 'Completed transfer form', 'Proof of closing date'], process: ['Contact Perma-Pier 30 days before closing', 'Submit transfer application online', 'Pay transfer fee at closing', 'New owner receives updated warranty certificate'], tip: 'Perma-Pier offers lifetime transferable warranties on most pier systems — strong selling point.' },
  'Ram Jack Texas': { transferable: true, cost: '$200-$300 transfer fee', buyerRequires: ['Original warranty document', 'Signed transfer agreement', 'Inspection may be required'], process: ['Request transfer packet from Ram Jack 45 days out', 'Schedule optional re-inspection ($150-300)', 'Submit signed transfer at closing', 'Buyer receives warranty continuation letter'], tip: 'Ram Jack may require a re-inspection for transfers over 5 years old. Budget accordingly.' },
  'Foundation Repair of Texas': { transferable: true, cost: '$100-$200', buyerRequires: ['Copy of repair permit', 'Original invoice and warranty', 'Transfer request form'], process: ['Download transfer form from their website', 'Complete and notarize if required', 'Submit with payment before closing', 'Allow 5-7 business days for processing'], tip: 'Texas law requires foundation repair permits — ensure your permit was pulled and closed properly.' },
  'Alpha Foundation Specialists': { transferable: true, cost: '$175-$250', buyerRequires: ['Warranty registration number', 'Completed buyer application', 'Closing disclosure or contract'], process: ['Call Alpha at least 30 days before closing', 'Complete online buyer registration', 'Pay fee and receive confirmation', 'Certificate emailed to buyer within 3 days'], tip: 'Alpha offers a 5-year workmanship extension at transfer — worth asking about at closing.' },
  'Other Company': { transferable: false, cost: 'Varies — call company directly', buyerRequires: ['Original warranty document', 'Proof of ownership transfer', 'Company-specific requirements'], process: ['Contact company foundation repair department', 'Request their transfer policy in writing', 'Follow company-specific process', 'Document everything for buyer'], tip: 'Not all companies offer transferable warranties. If non-transferable, disclose to buyer and negotiate accordingly.' },
};

export default function DFWFoundationWarrantyTransfer() {
  const [company, setCompany] = useState('');
  const [repairType, setRepairType] = useState('');
  const [showResults, setShowResults] = useState(false);

  const info = company ? transferData[company] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>🏠 DFW Real Estate</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Foundation Warranty Transfer Guide</h1>
        <p style={{ color: '#9BA3B4', fontSize: 16, marginBottom: 32 }}>Selling your DFW home with a repaired foundation? A transferable warranty can be your strongest selling point — if you handle the transfer correctly.</p>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>⚠️ Why Warranty Transfer Matters in DFW</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7 }}>Dallas-Fort Worth clay soil causes foundation movement in nearly 40% of homes. Buyers know this and will ask for foundation documentation. A properly transferred, active warranty — especially from a reputable company — can actually increase buyer confidence and reduce repair credit demands at closing.</p>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 20 }}>🔍 Look Up Your Warranty Transfer Process</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#9BA3B4', fontSize: 13, marginBottom: 8 }}>Foundation Repair Company</label>
              <select value={company} onChange={e => { setCompany(e.target.value); setShowResults(false); }} style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14 }}>
                <option value="">Select company...</option>
                {companies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#9BA3B4', fontSize: 13, marginBottom: 8 }}>Type of Repair Completed</label>
              <select value={repairType} onChange={e => setRepairType(e.target.value)} style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14 }}>
                <option value="">Select repair type...</option>
                {repairTypes.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowResults(true)} disabled={!company || !repairType} style={{ backgroundColor: company && repairType ? '#F5E642′ : '#1E3A5F', color: company && repairType ? '#0A1628' : '#4A5568', padding: '12px 28px', borderRadius: 8, border: ’none', fontWeight: 700, fontSize: 15, cursor: company && repairType ? 'pointer' : 'default' }}>
            Get Transfer Process →
          </button>
        </div>

        {showResults && info && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ backgroundColor: info.transferable ? '#0D2918′ : '#2D0A0A', border: `1px solid ${info.transferable ? '#10B981' : '#EF4444'}`, borderRadius: 12, padding: 20 }}>
              <div style={{ color: info.transferable ? '#10B981′ : '#EF4444', fontSize: 18, fontWeight: 700 }}>
                {info.transferable ? '✅ Warranty Is Transferable' : '❌ Warranty May Not Be Transferable'}
              </div>
              <div style={{ color: '#CBD5E1', marginTop: 8 }}>Transfer Cost: <span style={{ color: '#F5E642', fontWeight: 700 }}>{info.cost}</span></div>
            </div>

            <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20 }}>
              <h3 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>📋 What Buyer Needs to Receive</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {info.buyerRequires.map((item, i) => <li key={i} style={{ color: '#CBD5E1', fontSize: 14, padding: '5px 0', borderBottom: '1px solid #1E3A5F' }}>📄 {item}</li>)}
              </ul>
            </div>

            <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20 }}>
              <h3 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>🗂️ Transfer Process Steps</h3>
              <ol style={{ padding: '0 0 0 20px', margin: 0 }}>
                {info.process.map((step, i) => <li key={i} style={{ color: '#CBD5E1', fontSize: 14, padding: '5px 0′ }}>{step}</li>)}
              </ol>
            </div>

            <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>💡 Pro Tip</div>
              <div style={{ color: '#CBD5E1', fontSize: 14 }}>{info.tip}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
