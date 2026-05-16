import { useState } from 'react';

const homeTypes = ['Single Family', 'Townhome', 'Condo', 'New Build'];
const repairScenarios = [
  'No repairs were requested',
  'Minor repairs only (paint, caulk, fixtures)',
  'HVAC service or repair agreed',
  'Foundation work was agreed',
  'Roof repair or replacement agreed',
  'Plumbing repair agreed',
  'Major renovation or multiple items',
];

function getWalkthroughPlan(homeType: string, repairs: string) {
  const hasRepairs = repairs !== 'No repairs were requested';
  const isComplex = ['Foundation work was agreed', 'Roof repair or replacement agreed', 'Major renovation or multiple items'].includes(repairs);
  const baseChecklist = [
    { item: 'All agreed repairs completed', check: 'Have written confirmation or receipts. Do not accept verbal assurance.', priority: hasRepairs ? '🔴 Critical' : '⬜ N/A' },
    { item: 'Appliances operational', check: 'Run dishwasher cycle, test oven burners, run garbage disposal, cycle refrigerator. All included appliances per contract must be present and working.', priority: '🔴 Critical' },
    { item: 'HVAC heating and cooling', check: 'Set thermostat to heat and cool. Listen for unusual sounds. Check all vents have airflow. Change should begin within 3 minutes.', priority: '🔴 Critical' },
    { item: 'All utilities active', check: 'Run every faucet, flush every toilet, check water heater temperature, test electrical at multiple outlets in each room. Sellers must keep utilities on for walkthrough.', priority: '🔴 Critical' },
    { item: 'No new damage since inspection', check: 'Compare photos from your inspection report. Check walls, floors, ceilings. Moving furniture out sometimes reveals damage or causes it.', priority: '🔴 Critical' },
    { item: 'Sellers fully vacated', check: 'All personal property removed unless specifically noted in contract as conveying. Check garage, attic, closets, and backyard shed.', priority: '🟡 Important' },
    { item: 'All keys, remotes, codes', check: 'Garage door openers, gate codes, mailbox key, alarm code, pool equipment key, HOA access fobs. Get everything at walkthrough.', priority: '🟡 Important' },
    { item: 'No visible water damage', check: 'Check under sinks, around toilets, around water heater, in garage ceiling if there is a bathroom above. DFW storms can cause issues between contract and closing.', priority: '🟡 Important' },
  ];
  const condoExtra = homeType === 'Condo' ? [{ item: 'HOA common area access', check: 'Test key fob for lobby, elevator, gym, parking garage. Confirm HOA has been notified of ownership transfer timeline.', priority: '🟡 Important' }] : [];
  const newBuildExtra = homeType === 'New Build' ? [{ item: 'Builder punch list complete', check: 'Walk with your punch list from the pre-closing builder walkthrough. Every item should be marked complete. Builder urgency to close is not your problem.', priority: '🔴 Critical' }] : [];
  const repairExtra = isComplex ? [{ item: 'Licensed contractor work verified', check: 'For foundation, roof, or major repairs: request permit documents, licensed contractor invoice, and warranty paperwork at walkthrough.', priority: '🔴 Critical' }] : [];
  const checklist = [...baseChecklist, ...condoExtra, ...newBuildExtra, ...repairExtra];
  const ifIssues = isComplex
    ? 'For major incomplete repairs: do not close. Request a written extension with a specific completion deadline and escrow holdback for the repair amount plus 25%. If seller refuses, your agent and attorney will advise on contract remedies.'
    : 'For minor issues found at walkthrough: request a closing credit or escrow holdback. Do not delay closing for cosmetic items unless there is clear contract breach. Document everything with photos before you leave.';
  return { checklist, ifIssues };
}

export default function DFWFinalWalkthroughGuide() {
  const [homeType, setHomeType] = useState('');
  const [repairs, setRepairs] = useState('');
  const result = homeType && repairs ? getWalkthroughPlan(homeType, repairs) : null;

  return (
    <div style={{ background: '#F8F6F1', minHeight: '100vh', color: '#1A2B3C', fontFamily: 'Georgia, serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ borderBottom: '3px solid #1A2B3C', paddingBottom: 24, marginBottom: 40 }}>
          <p style={{ color: '#5C7A9F', letterSpacing: 3, fontSize: 11, textTransform: 'uppercase', margin: '0 0 12px' }}>DFW Buyer Guide • 2026</p>
          <h1 style={{ fontSize: 38, fontWeight: 700, margin: '0 0 16px', lineHeight: 1.15 }}>Final Walkthrough Guide for DFW Buyers</h1>
          <p style={{ color: '#4A5568', fontSize: 17, margin: 0, lineHeight: 1.6 }}>What to check in the 24-48 hours before closing — and what to do if something is wrong.</p>
        </div>

        <div style={{ background: '#1A2B3C', color: '#F8F6F1', borderRadius: 6, padding: 20, marginBottom: 32 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 700, fontSize: 15 }}>⏰ When to Do Your Walkthrough</p>
          <p style={{ margin: 0, color: '#CBD5E0', fontSize: 14, lineHeight: 1.6 }}>Schedule 24-48 hours before closing — not morning-of. You need time to address issues without a closing delay emergency. Do it after the sellers have moved out. Bring your inspection report, repair amendment, and a phone for photos and video.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
          {[['🏠 Home Type', homeTypes, homeType, setHomeType], ['🔧 Repairs Agreed in Contract', repairScenarios, repairs, setRepairs]].map(([label, opts, val, setter]: any) => (
            <div key={label as string}>
              <label style={{ display: 'block', color: '#1A2B3C', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>{label}</label>
              <select value={val} onChange={e => setter(e.target.value)} style={{ width: '100%', background: '#fff', border: '1.5px solid #CBD5E0', color: '#1A2B3C', padding: '12px 16px', fontSize: 15, borderRadius: 4 }}>
                <option value=''>Select...</option>
                {(opts as string[]).map((o: string) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        {result && (
          <>
            <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 6, padding: 32, marginBottom: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h2 style={{ color: '#1A2B3C', fontSize: 20, margin: '0 0 24px', borderBottom: '2px solid #E2E8F0', paddingBottom: 12 }}>Your Walkthrough Checklist</h2>
              {result.checklist.map(({ item, check, priority }) => (
                <div key={item} style={{ borderLeft: '4px solid ' + (priority.includes('Critical') ? '#9B2335' : priority.includes('Important') ? '#1A4A8C' : '#CBD5E0'), paddingLeft: 16, marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#1A2B3C' }}>{item}</div>
                    <div style={{ fontSize: 11, color: '#6B7280', whiteSpace: 'nowrap', marginLeft: 12 }}>{priority}</div>
                  </div>
                  <div style={{ color: '#4A5568', lineHeight: 1.6, fontSize: 14 }}>{check}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 6, padding: 24, marginBottom: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h3 style={{ color: '#9B2335', margin: '0 0 12px', fontSize: 16 }}>If You Find Issues at Walkthrough</h3>
              <p style={{ color: '#4A5568', lineHeight: 1.7, margin: 0, fontSize: 14 }}>{result.ifIssues}</p>
            </div>
          </>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {[['📸 Photo Everything', 'Document condition at walkthrough — timestamped photos protect you post-closing'],['🔑 Get All Keys', 'Do not leave walkthrough without every key, fob, remote, and code'],['⏱️ 24-48 hrs Before', 'Ideal walkthrough window — leaves time to address issues before closing']].map(([title, desc]) => (
            <div key={title as string} style={{ background: '#1A2B3C', color: '#F8F6F1', borderRadius: 4, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>{title}</div>
              <div style={{ fontSize: 13, color: '#CBD5E0', lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
