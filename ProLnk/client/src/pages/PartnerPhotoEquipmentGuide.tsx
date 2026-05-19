import { useState } from 'react';

export default function PartnerPhotoEquipmentGuide() {
  const [activeTab, setActiveTab] = useState('phones');

  const phones = [
    { rank: 1, name: 'iPhone 15 Pro / Pro Max', badge: '🥇 Best Overall', detail: 'Wide angle + main lens combo captures exactly what the AI needs. Excellent low-light for crawlspaces and attics.', price: '$999+' },
    { rank: 2, name: 'Samsung Galaxy S24 Ultra', badge: '🥈 Best Android', detail: 'Exceptional detail for panel reading and serial number capture. 200MP sensor is overkill but never a liability.', price: '$1,199+' },
    { rank: 3, name: 'Google Pixel 8 Pro', badge: '🥉 Best HDR', detail: 'Handles bright exterior and dark interior simultaneously — perfect for crawlspace openings and attic hatches.', price: '$799+' },
    { rank: 4, name: 'iPhone 14 / 15 (Standard)', badge: '✅ Excellent Value', detail: 'Excellent and affordable. 99% of ProLnk pros use one of these successfully. Fully supported.', price: '$599+' },
  ];

  const settings = [
    { setting: 'Auto-HDR', value: 'ON', reason: 'Balances bright/dark areas in a single shot — essential for exterior-to-interior transitions' },
    { setting: 'Live Photo', value: 'OFF', reason: 'Wastes storage and doesn’t help AI detection. Always turn this off.' },
    { setting: 'Portrait Mode', value: 'ONLY for close-ups', reason: 'Use for equipment tags and serial numbers. Not helpful for room shots.' },
    { setting: 'Aspect Ratio', value: '4:3', reason: 'Higher resolution than 16:9. More pixel data = better AI detection accuracy.' },
    { setting: 'Lens cleanliness', value: 'ALWAYS clean', reason: 'Single biggest impact on detection quality. Clean before every job, especially dusty sites.' },
  ];

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#1a2744' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📸</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
            The Best Phone Cameras and Settings for ProLnk Photos
          </h1>
          <p style={{ fontSize: 18, color: '#64748b', maxWidth: 560, margin: '0 auto' }}>
            Your phone is your most important ProLnk tool. The right device and settings double AI detection accuracy.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 32, background: '#f1f5f9', borderRadius: 12, padding: 4 }}>
          {[
            { id: 'phones', label: '📱 Phone Rankings' },
            { id: 'settings', label: '⚙️ Camera Settings' },
            { id: 'workflow', label: '📋 Upload Workflow' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{ flex: 1, padding: '12px 8px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: activeTab === tab.id ? 700 : 500, background: activeTab === tab.id ? '#1a2744' : 'transparent', color: activeTab === tab.id ? '#fff' : '#64748b', fontSize: 14, transition: 'all 0.2s' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'phones' && (
          <div style={{ display: 'grid', gap: 16 }}>
            {phones.map(phone => (
              <div key={phone.name} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ width: 48, height: 48, background: '#1a2744', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e8b400', fontWeight: 800, fontSize: 20, flexShrink: 0 }}>
                  {phone.rank}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <div style={{ fontWeight: 700, fontSize: 18, color: '#1a2744' }}>{phone.name}</div>
                    <div style={{ color: '#64748b', fontSize: 14, fontWeight: 600 }}>{phone.price}</div>
                  </div>
                  <div style={{ display: 'inline-block', background: '#f0f4ff', color: '#3b82f6', fontWeight: 600, fontSize: 13, padding: '3px 10px', borderRadius: 20, marginBottom: 10 }}>{phone.badge}</div>
                  <div style={{ color: '#64748b', lineHeight: 1.6, fontSize: 15 }}>{phone.detail}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden' }}>
            {settings.map((s, i) => (
              <div key={s.setting} style={{ padding: '20px 24px', borderBottom: i < settings.length - 1 ? '1px solid #f1f5f9' : 'none', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 160 }}>
                  <div style={{ fontWeight: 700, color: '#1a2744', fontSize: 15 }}>{s.setting}</div>
                  <div style={{ fontWeight: 700, color: '#3b82f6', fontSize: 14, marginTop: 4 }}>{s.value}</div>
                </div>
                <div style={{ color: '#64748b', lineHeight: 1.6, fontSize: 15 }}>{s.reason}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'workflow' && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 16, color: '#1a2744' }}>☁️ Photo Storage</h3>
              <p style={{ color: '#64748b', lineHeight: 1.7 }}>
                Use iCloud or Google Photos — not on-device only. ProLnk automatically processes photos as you upload them. Keep auto-backup enabled. Never rely solely on your phone's local storage for job documentation.
              </p>
            </div>
            <div style={{ background: '#fff', border: '2px solid #e8b400', borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 12, color: '#1a2744' }}>⏱️ Upload Timing</h3>
              <p style={{ color: '#64748b', lineHeight: 1.7 }}>
                Upload within 2 hours of job completion. Homeowners are most responsive to AI insights immediately after service — the home is fresh in their mind and they're in decision-making mode. Delayed uploads mean delayed engagement.
              </p>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 16, color: '#1a2744' }}>🧰 Quick Start Kit</h3>
              <div style={{ display: 'grid', gap: 12 }}>
                {[
                  { item: 'Phone mount for truck', price: '$20', icon: '🚚', why: 'Hands-free navigation between jobs without damaging your phone' },
                  { item: 'Compressed air for lens cleaning', price: '$8', icon: '💨', why: 'Single biggest quality improvement. Use before every job.' },
                  { item: 'Quality case with raised camera protection', price: '$25', icon: '🛡️', why: 'Protects your most important tool from job site drops and grit' },
                ].map(k => (
                  <div key={k.item} style={{ display: 'flex', gap: 12, padding: 16, background: '#f8f9fa', borderRadius: 10, alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 24, flexShrink: 0 }}>{k.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ fontWeight: 600, color: '#1a2744' }}>{k.item}</div>
                        <div style={{ color: '#3b82f6', fontWeight: 700 }}>{k.price}</div>
                      </div>
                      <div style={{ color: '#64748b', fontSize: 14, marginTop: 4 }}>{k.why}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 48, background: '#1a2744', borderRadius: 16, padding: 40 }}>
          <h3 style={{ fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 12 }}>
            Ready to Start Earning with ProLnk?
          </h3>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>
            Apply to join the network. Founding Pro status still available.
          </p>
          <a href="/apply" style={{ display: 'inline-block', background: '#e8b400', color: '#1a2744', fontWeight: 800, fontSize: 18, padding: '14px 40px', borderRadius: 50, textDecoration: 'none' }}>
            Apply Now →
          </a>
        </div>

      </div>
    </div>
  );
}
