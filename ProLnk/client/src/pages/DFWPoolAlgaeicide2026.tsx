import { useState } from 'react';

export default function DFWPoolAlgaeicide2026() {
  const [poolType, setPoolType] = useState('');
  const [algaeConcern, setAlgaeConcern] = useState('');
  const [recommendation, setRecommendation] = useState<string[]>([]);

  const getRecommendation = () => {
    const recs: string[] = [];

    if (!poolType || !algaeConcern) {
      setRecommendation(['Please select both your pool type and algae concern.']);
      return;
    }

    if (algaeConcern === 'prevention') {
      recs.push('🛡️ PREVENTION MODE — Best choice for DFW pools:');
      if (poolType === 'plaster') {
        recs.push('✅ Recommended: Polyquat 60 — Will not stain light-colored plaster, safe for weekly use, long-lasting residual in DFW heat.');
        recs.push('⚠️ Avoid: Copper-based algaecides — can stain light plaster green or blue over time.');
      } else {
        recs.push('✅ Recommended: Polyquat 60 — Best overall for DFW climate. Add 3-4 oz per 10,000 gal weekly in summer.');
      }
      recs.push('📅 DFW schedule: Add algaecide every 7 days May-September, every 14 days October-April.');
    } else if (algaeConcern === 'active_green') {
      recs.push('🟢 ACTIVE GREEN ALGAE — Treatment protocol:');
      recs.push('1️⃣ Shock first (calcium hypochlorite), then add algaecide 24 hrs after shocking.');
      recs.push('✅ Recommended: Quaternary ammonium (quat) algaecide — effective, no staining risk, works well after chlorine shock.');
      if (poolType === 'plaster') recs.push('⚠️ Skip copper-based products on your plaster pool — staining risk is real.');
    } else if (algaeConcern === 'mustard') {
      recs.push('🟡 MUSTARD/YELLOW ALGAE — Requires stronger approach:');
      recs.push('✅ Recommended: Polymeric algaecide — specifically formulated for mustard algae, long-lasting protection.');
      recs.push('⚡ Apply before triple-shock treatment. Brush all surfaces aggressively first.');
    } else if (algaeConcern === 'black') {
      recs.push('⚫ BLACK ALGAE — Most difficult to treat:');
      recs.push('✅ Recommended: Copper-based algaecide applied directly to black spots with a brush.');
      if (poolType === 'plaster') recs.push('⚠️ Staining risk on plaster: apply copper algaecide precisely to spots only. Rinse brush immediately.');
      recs.push('🔁 Repeat treatment every 3 days. Black algae has roots — surface kill is not enough.');
    }

    recs.push('🌡️ DFW note: Heat above 90°F accelerates algae growth. Increase algaecide frequency during heat waves.');
    setRecommendation(recs);
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 8 }}>🧴 DFW Pool Algaecide Guide 2026</h1>
        <p style={{ color: '#aaa', marginBottom: 24 }}>Not all algaecides work the same way — and the wrong choice can stain your pool. Get a recommendation tailored to your DFW pool.</p>

        <div style={{ marginBottom: 20 }}>
          <label style={{ color: '#F5E642', display: 'block', marginBottom: 8 }}>Pool Surface Type</label>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[{v:'plaster',l:'🏊 Plaster/Gunite'},{v:'vinyl',l:'🔵 Vinyl Liner'},{v:'fiberglass',l:'⚪ Fiberglass'}].map(({v,l}) => (
              <button key={v} onClick={() => setPoolType(v)}
                style={{ padding: '10px 20px', borderRadius: 8, border: `2px solid ${poolType===v?'#F5E642':'#1e3a5f'}`, backgroundColor: poolType===v?'#F5E642':'#0d1e36', color: poolType===v?'#0A1628':'#fff', cursor: 'pointer', fontWeight: 600 }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ color: '#F5E642', display: 'block', marginBottom: 8 }}>Algae Concern</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[{v:'prevention',l:'🛡️ Prevention'},{v:'active_green',l:'🟢 Active Green'},{v:'mustard',l:'🟡 Mustard/Yellow'},{v:'black',l:'⚫ Black Algae'}].map(({v,l}) => (
              <button key={v} onClick={() => setAlgaeConcern(v)}
                style={{ padding: '12px', borderRadius: 8, border: `2px solid ${algaeConcern===v?'#F5E642':'#1e3a5f'}`, backgroundColor: algaeConcern===v?'#F5E642':'#0d1e36', color: algaeConcern===v?'#0A1628':'#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <button onClick={getRecommendation} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 24 }}>
          Get Algaecide Recommendation
        </button>

        {recommendation.length > 0 && (
          <div style={{ backgroundColor: '#0d1e36', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
            <h2 style={{ color: '#F5E642', marginBottom: 12, fontSize: 18 }}>💊 Your Algaecide Plan</h2>
            {recommendation.map((rec, i) => (
              <p key={i} style={{ marginBottom: 10, color: '#ddd', lineHeight: 1.6 }}>{rec}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
