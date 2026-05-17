import { useState } from 'react';

const BASE_FRAUD_SAVED = 5000;
const BASE_QUOTE_SAVINGS_PCT = 0.15;
const VAULT_PREMIUM_LOW = 5000;
const VAULT_PREMIUM_HIGH = 15000;
const ANNUAL_SERVICES = 3;

export default function DFWProLnkValueCalculator2026() {
  const [homeValue, setHomeValue] = useState('');
  const [yearsOwned, setYearsOwned] = useState('');
  const [servicesPerYear, setServicesPerYear] = useState(ANNUAL_SERVICES);
  const [avgServiceCost, setAvgServiceCost] = useState(1200);
  const [calculated, setCalculated] = useState(false);

  const hv = parseFloat(homeValue.replace(/,/g, '')) || 0;
  const years = parseInt(yearsOwned) || 0;

  const fraudSaved = BASE_FRAUD_SAVED;
  const quoteSavings = servicesPerYear * avgServiceCost * BASE_QUOTE_SAVINGS_PCT * Math.min(years, 3);
  const vaultPremium = hv > 0 ? Math.min(hv * 0.025, VAULT_PREMIUM_HIGH) : VAULT_PREMIUM_LOW;
  const totalValue = fraudSaved + quoteSavings + vaultPremium;

  const formatMoney = (n: number) => '$' + Math.round(n).toLocaleString();

  const rows = [
    { label: 'Contractor Fraud Avoided', emoji: '🛡️', value: fraudSaved, desc: 'Avg DFW homeowner loss to unlicensed/fraudulent contractors', color: '#22c55e' },
    { label: 'Competitive Quote Savings', emoji: '📋', value: quoteSavings, desc: `${servicesPerYear} services/yr × $${avgServiceCost} avg × 15% savings × ${Math.min(years, 3)} yrs`, color: '#3b82f6' },
    { label: 'ProLnk Vault Resale Premium', emoji: '🏠', value: vaultPremium, desc: `Documented home history adds ${hv > 0 ? '~2.5%' : '$5K–$15K'} to DFW resale value`, color: '#F5E642' },
    { label: 'Peace of Mind', emoji: '❤️', value: 0, desc: 'Knowing your home is documented, protected, and connected to verified pros — priceless', color: '#ec4899', priceless: true },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>💰</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>ProLnk Value Calculator for DFW Homeowners 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>How much value does ProLnk deliver over 3 years?</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 16, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>📊 Your DFW Home Details</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Estimated Home Value ($)</label>
              <input type="text" value={homeValue} onChange={e => setHomeValue(e.target.value)} placeholder="e.g. 450000"
                style={{ width: '100%', background: '#1e3a5f', border: '1px solid #334155', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Years of Homeownership (for calculation)</label>
              <input type="number" value={yearsOwned} onChange={e => setYearsOwned(e.target.value)} placeholder="e.g. 3" min={1} max={30}
                style={{ width: '100%', background: '#1e3a5f', border: '1px solid #334155', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Home Services Per Year: <span style={{ color: '#F5E642' }}>{servicesPerYear}</span></label>
              <input type="range" min={1} max={8} value={servicesPerYear} onChange={e => setServicesPerYear(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#475569' }}><span>1 (minimal)</span><span>8 (active)</span></div>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Average Service Cost: <span style={{ color: '#F5E642' }}>${avgServiceCost.toLocaleString()}</span></label>
              <input type="range" min={200} max={5000} step={100} value={avgServiceCost} onChange={e => setAvgServiceCost(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#475569' }}><span>$200</span><span>$5,000</span></div>
            </div>
          </div>
          <button onClick={() => setCalculated(true)}
            style={{ width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 0', fontWeight: 700, fontSize: 16, cursor: 'pointer', marginTop: 20 }}>
            Calculate My ProLnk Value →
          </button>
        </div>

        {calculated && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {rows.map((r, i) => (
                <div key={i} style={{ background: '#0f2040', borderRadius: 12, padding: 16, border: `1px solid ${r.color}33`, display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ fontSize: 32 }}>{r.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{r.label}</div>
                    <div style={{ color: '#94a3b8', fontSize: 12 }}>{r.desc}</div>
                  </div>
                  <div style={{ color: r.color, fontWeight: 800, fontSize: r.priceless ? 16 : 22, textAlign: 'right', minWidth: 90 }}>
                    {r.priceless ? 'Priceless ❤️' : formatMoney(r.value)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'linear-gradient(135deg, #0f2040, #1e3a5f)', borderRadius: 16, padding: 24, textAlign: 'center', border: '2px solid #F5E642' }}>
              <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 4 }}>Estimated 3-Year ProLnk Value for Your DFW Home</p>
              <div style={{ fontSize: 48, fontWeight: 800, color: '#F5E642' }}>{formatMoney(totalValue)}</div>
              <p style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>Based on your inputs · Does not include peace of mind 😄</p>
              <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: '12px 20px', fontSize: 13 }}>
                  <div style={{ color: '#22c55e', fontWeight: 700 }}>Fraud Protection</div>
                  <div style={{ color: '#F5E642', fontWeight: 800 }}>{formatMoney(fraudSaved)}</div>
                </div>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: '12px 20px', fontSize: 13 }}>
                  <div style={{ color: '#3b82f6', fontWeight: 700 }}>Quote Savings</div>
                  <div style={{ color: '#F5E642', fontWeight: 800 }}>{formatMoney(quoteSavings)}</div>
                </div>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: '12px 20px', fontSize: 13 }}>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>Vault Premium</div>
                  <div style={{ color: '#F5E642', fontWeight: 800 }}>{formatMoney(vaultPremium)}</div>
                </div>
              </div>
            </div>

            <div style={{ background: '#0f2040', borderRadius: 12, padding: 16, marginTop: 16, border: '1px solid #1e3a5f', textAlign: 'center' }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🚀 Ready to Protect Your DFW Home?</p>
              <p style={{ color: '#94a3b8', fontSize: 13 }}>Join the ProLnk waitlist — free for homeowners. The Vault starts building your home\'s documented value from day one.</p>
            </div>
          </div>
        )}
        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 24 }}>Powered by ProLnk · Dallas–Fort Worth Home Intelligence · Values are estimates based on DFW market averages</p>
      </div>
    </div>
  );
}
