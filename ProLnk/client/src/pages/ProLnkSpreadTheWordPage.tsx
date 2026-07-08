import { useState } from 'react';

const SUBURBS = ['Frisco', 'Plano', 'McKinney', 'Allen', 'Prosper', 'Celina', 'Little Elm', 'Wylie', 'Denton', 'Carrollton'];

const TEMPLATES: Record<string, Record<string, string>> = {
  facebook: {
    homeowner: (suburb: string) => `🏠 Hey {suburb} neighbors — found a game-changer for home services. ProLnk matches you with vetted local pros (no more random Google searches). Free for homeowners. If you're in {suburb}, get on the list now → prolnk.xyz #DFW #HomeServices #{suburb}`.replace(/{suburb}/g, suburb),
    partner: (suburb: string) => `🔧 Fellow pros in {suburb} — I just joined the ProLnk waitlist. This is the lead platform I've been waiting for. No bidding wars, no fake leads. Early access is open → prolnk.xyz/apply #HomePro #{suburb}`.replace(/{suburb}/g, suburb),
  },
  instagram: {
    homeowner: (suburb: string) => `Stop guessing which contractor to call 🔧\nProLnk matches {suburb} homeowners with trusted local pros — fast.\n👇 Link in bio\n#DFWHomes #{suburb}Life #HomeServices #ProLnk #DFW`.replace(/{suburb}/g, suburb),
    partner: (suburb: string) => `Building my business in {suburb} 💼\nJust joined the @ProLnk waitlist — exclusive AI-matched leads, no pay-per-lead fees, referral rewards.\nEarly access is open. I'm in. Are you?\n#HomePro #ProLnk #{suburb}`.replace(/{suburb}/g, suburb),
  },
  linkedin: {
    homeowner: (suburb: string) => `Sharing something useful for anyone who owns a home in the {suburb}/DFW area:\n\nProLnk is launching a homeowner matching platform — you describe your service need, and vetted local pros compete for your job.\n\nNo cold calls. No guessing. Free for homeowners.\n\nI'm on the waitlist → prolnk.xyz`.replace(/{suburb}/g, suburb),
    partner: (suburb: string) => `I've been in home services in {suburb} for years. What's broken: finding quality leads without paying per click for garbage.\n\nProLnk changes that — I just joined the waitlist. Exclusive AI-matched leads piped directly to my dashboard, with no pay-per-click fees.\n\nEarly access is open. Apply → prolnk.xyz/apply`.replace(/{suburb}/g, suburb),
  },
  text: {
    homeowner: (suburb: string) => `Hey! If you need any home repairs in {suburb}, check out ProLnk. It matches you with real local pros, totally free for homeowners. prolnk.xyz`.replace(/{suburb}/g, suburb),
    partner: (suburb: string) => `Hey, are you still doing home services in {suburb}? You should get on the ProLnk waitlist — early access is open and DFW pros go first. prolnk.xyz/apply`.replace(/{suburb}/g, suburb),
  },
};

export default function ProLnkSpreadTheWordPage() {
  const [audience, setAudience] = useState<'homeowner' | 'partner'>('homeowner');
  const [suburb, setSuburb] = useState('Frisco');
  const [platform, setPlatform] = useState('facebook');
  const [copied, setCopied] = useState(false);

  const templateFn = TEMPLATES[platform]?.[audience];
  const message = typeof templateFn === 'function' ? templateFn(suburb) : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(message).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1f3c 100%)', color: '#fff', padding: '72px 24px 52px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📢</div>
        <h1 style={{ fontSize: '42px', fontWeight: 900, lineHeight: 1.1, marginBottom: '16px' }}>Spread the Word</h1>
        <p style={{ fontSize: '17px', color: '#94a3b8', maxWidth: '500px', margin: '0 auto' }}>
          Copy a ready-made message personalized for your suburb and audience. One click, done.
        </p>
      </div>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '32px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>I am a...</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['homeowner', 'partner'] as const).map(a => (
                <button key={a} onClick={() => setAudience(a)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `2px solid ${audience === a ? '#f59e0b' : '#e2e8f0'}`, background: audience === a ? '#fffbeb' : '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer', color: audience === a ? '#92400e' : '#64748b' }}>
                  {a === 'homeowner' ? '🏠 Owner' : '🔧 Pro'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>My DFW Suburb</label>
            <select value={suburb} onChange={e => setSuburb(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #e2e8f0', fontSize: '14px', background: '#fff' }}>
              {SUBURBS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '2px solid #e2e8f0', fontSize: '14px', background: '#fff' }}>
              {[['facebook','📘 Facebook'],['instagram','📸 Instagram'],['linkedin','💼 LinkedIn'],['text','💬 Text']].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '32px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontWeight: 800, fontSize: '16px', color: '#0f172a', margin: 0 }}>Your personalized message</h3>
            <button onClick={handleCopy} style={{ background: copied ? '#22c55e' : '#f59e0b', color: copied ? '#fff' : '#0a0f1e', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s' }}>
              {copied ? '✅ Copied!' : '📋 Copy'}
            </button>
          </div>
          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '20px', fontSize: '14px', lineHeight: 1.7, color: '#334155', whiteSpace: 'pre-wrap', minHeight: '100px' }}>
            {message}
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
          💡 Customize freely — this is just a starting point. The more personal, the better it performs.
        </div>
      </div>
    </div>
  );
}
