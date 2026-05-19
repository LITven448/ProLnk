import { useState } from 'react';

const sections = [
  {
    id: 'first-contact',
    title: 'Section 1 — First Contact (Within 4 Minutes)',
    subtitle: 'The 4-minute window is real. Response time is the #1 factor in winning the job.',
    content: [
      {
        heading: 'Phone Script',
        type: 'script',
        text: `"Hi, this is [Name] with [Company]. I just saw your request for [Service] on ProLnk and I wanted to reach out right away. I've been doing this in the DFW area for [X] years and I'd love to help. When's a good time for me to come take a look? I have openings tomorrow morning or Thursday afternoon — which works better for you?"`
      },
      {
        heading: 'Text Script (if no answer)',
        type: 'script',
        text: `"Hi [Name], this is [Your Name] from [Company]. I saw your request for [Service] on ProLnk. I'm available tomorrow or Thursday — want to set up a quick walkthrough? Reply here or call me at [number]. Happy to answer any questions."`
      },
      {
        heading: '5 Phrases That Kill Deals',
        type: 'donts',
        items: [
          '"We’ll get back to you." — Sets no expectation. You lose to the next pro who calls now.',
          '"It depends." — Homeowners hate uncertainty. Give a range, not a non-answer.',
          '"We’re really busy right now." — Signals you don’t value their job.',
          '"I’ll have someone call you." — They called you. Own the relationship.',
          '"That’s not really our thing but..." — Never qualify yourself down before a sale.'
        ]
      }
    ]
  },
  {
    id: 'estimate',
    title: 'Section 2 — During the Estimate',
    subtitle: 'The estimate is not a formality. It’s the moment you win or lose the job.',
    content: [
      {
        heading: 'Building Trust — Walk Through Your Findings',
        type: 'tips',
        items: [
          'Narrate what you’re doing: "I’m checking the capacitor because that’s the first thing to fail in heat..."',
          'Show, don’t just tell. Point at the problem while you explain it.',
          'Use comparison language: "This is similar to a transmission — if you wait, the engine goes next."',
          'Acknowledge what they’ve maintained well — don’t only point out problems.'
        ]
      },
      {
        heading: 'Handling Objections',
        type: 'objections',
        items: [
          {
            q: '"It’s too expensive."',
            a: '"I hear you — and I want to make sure we’re comparing the same thing. My price includes [specific items]. Can I ask what the other quote looked like?'
          },
          {
            q: '"I need to think about it."',
            a: '"Totally fair. What questions can I answer right now to help you feel confident? And should I check back with you in 24 hours or is there a better time?"'
          },
          {
            q: '"I have another quote."',
            a: '"That’s smart — you should get multiple opinions. Just make sure they’re including [key scope items] because that’s where the difference usually is."'
          }
        ]
      },
      {
        heading: 'The Walkthrough Close',
        type: 'tips',
        items: [
          'Always walk them through your proposal line by line before leaving.',
          'Ask: "Does this scope cover everything you were hoping to address?"',
          'Get verbal confirmation on timeline before you leave the driveway.',
          'Leave a printed or emailed copy before you drive away — never just verbal.'
        ]
      }
    ]
  },
  {
    id: 'during-job',
    title: 'Section 3 — During the Job',
    subtitle: 'Most contractors disappear once the job starts. That’s your competitive advantage.',
    content: [
      {
        heading: 'Daily Progress Updates',
        type: 'script',
        text: `Text at end of each day: "Hi [Name], quick update from today: [what was completed]. Tomorrow we'll be [next steps]. Everything is on track for [completion date]. Let me know if you have any questions!"`
      },
      {
        heading: 'Managing Scope Changes',
        type: 'tips',
        items: [
          'Stop work. Call immediately — never surprise them with a change on the invoice.',
          'Explain what you found in plain language, not trade jargon.',
          'Give them two options: address it now or document it for later.',
          'Get verbal approval and follow up with a quick text recap for documentation.'
        ]
      },
      {
        heading: 'Photo Updates Build Trust',
        type: 'tips',
        items: [
          'Send before/during/after photos via text — homeowners love this.',
          '"Here’s the old [part] we pulled out vs the new one going in."',
          'Photos reduce disputes, increase reviews, and generate referrals.',
          'Always ask permission before posting any home photos publicly.'
        ]
      }
    ]
  },
  {
    id: 'after-job',
    title: 'Section 4 — After the Job',
    subtitle: 'The job isn’t over when the work is done. The relationship has just begun.',
    content: [
      {
        heading: 'The Follow-Up Call Script',
        type: 'script',
        text: `"Hi [Name], this is [Your Name] — I wanted to check in a few days after the job to make sure everything is working perfectly. Is there anything you've noticed that we should take a look at? [Pause] Great — and was there anything about the experience we could have done better? I always want to improve."`
      },
      {
        heading: 'Asking for a Review',
        type: 'script',
        text: `"I'm really glad you're happy with the work. If you have 2 minutes, a Google review makes a huge difference for a small business like mine. I'll text you a direct link right now — it's literally just one click."`
      },
      {
        heading: 'The Referral Ask',
        type: 'script',
        text: `"One last thing — do you know anyone who might need [trade] work? A neighbor, family member, coworker? I give a $[50-100] thank-you for every job that comes from a referral. No pressure at all — just wanted to mention it."`
      }
    ]
  }
];

export default function HomeownerCommunicationGuide() {
  const [activeSection, setActiveSection] = useState<string>('first-contact');

  const current = sections.find(s => s.id === activeSection)!;

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', fontFamily: 'Georgia, serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ display: 'inline-block', background: '#FFC107', color: '#1E3A5F', fontFamily: 'sans-serif', fontWeight: 700, fontSize: 13, padding: '4px 14px', borderRadius: 20, marginBottom: 20, letterSpacing: 1 }}>
            PRO PLAYBOOK
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: '#1E3A5F', lineHeight: 1.2, marginBottom: 20, fontFamily: 'Georgia, serif' }}>
            How to Talk to Homeowners —<br />The Communication Playbook for DFW Pros
          </h1>
          <p style={{ fontSize: 18, color: '#444', maxWidth: 600, margin: '0 auto', lineHeight: 1.7, fontFamily: 'sans-serif' }}>
            <strong>74% of homeowners switch contractors due to poor communication</strong> — not poor work quality. This is the playbook that changes that.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 36, flexWrap: 'wrap' }}>
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                padding: '10px 20px',
                borderRadius: 8,
                border: activeSection === s.id ? '2px solid #1E3A5F' : '2px solid #E5E5E0',
                background: activeSection === s.id ? '#1E3A5F' : '#fff',
                color: activeSection === s.id ? '#FFC107' : '#666',
                fontFamily: 'sans-serif',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {s.title.split('—')[0].trim()}
            </button>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E5E5E0', padding: 40, marginBottom: 40, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1E3A5F', marginBottom: 10, fontFamily: 'Georgia, serif' }}>{current.title}</h2>
          <p style={{ color: '#666', fontFamily: 'sans-serif', marginBottom: 32, fontSize: 15, lineHeight: 1.6, borderBottom: '1px solid #F0F0E8', paddingBottom: 20 }}>{current.subtitle}</p>

          {current.content.map((block, i) => (
            <div key={i} style={{ marginBottom: 32 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1E3A5F', marginBottom: 14, fontFamily: 'Georgia, serif' }}>{block.heading}</h3>
              {block.type === 'script' && (
                <div style={{ background: '#F0F4F8', borderLeft: '4px solid #1E3A5F', borderRadius: 8, padding: 20 }}>
                  <p style={{ margin: 0, fontFamily: 'sans-serif', fontSize: 15, lineHeight: 1.8, color: '#333', fontStyle: 'italic' }}>
                    {(block as any).text}
                  </p>
                </div>
              )}
              {block.type === 'tips' && (
                <ul style={{ paddingLeft: 20, margin: 0 }}>
                  {(block as any).items.map((item: string, j: number) => (
                    <li key={j} style={{ fontFamily: 'sans-serif', fontSize: 15, color: '#333', marginBottom: 10, lineHeight: 1.7 }}>{item}</li>
                  ))}
                </ul>
              )}
              {block.type === 'donts' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {(block as any).items.map((item: string, j: number) => (
                    <div key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: '#FFF5F5', borderRadius: 8, padding: '12px 16px' }}>
                      <span style={{ color: '#C0392B', fontWeight: 700, flexShrink: 0, fontFamily: 'sans-serif' }}>✗</span>
                      <span style={{ fontFamily: 'sans-serif', fontSize: 14.5, color: '#444', lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              )}
              {block.type === 'objections' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {(block as any).items.map((obj: {q: string, a: string}, j: number) => (
                    <div key={j} style={{ border: '1px solid #E5E5E0', borderRadius: 10, overflow: 'hidden' }}>
                      <div style={{ background: '#FFF8E1', padding: '12px 16px', fontFamily: 'sans-serif', fontSize: 14.5, fontWeight: 600, color: '#7B4F2E' }}>
                        Homeowner: {obj.q}
                      </div>
                      <div style={{ background: '#F0F8F0', padding: '12px 16px', fontFamily: 'sans-serif', fontSize: 14.5, color: '#2D5016', fontStyle: 'italic' }}>
                        You: {obj.a}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#1E3A5F', borderRadius: 16, padding: '48px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#FFC107', marginBottom: 16, fontFamily: 'Georgia, serif' }}>
            Join ProLnk — Leads Come With Homeowner Context
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, marginBottom: 28, lineHeight: 1.7, fontFamily: 'sans-serif', maxWidth: 520, margin: '0 auto 28px' }}>
            Every ProLnk lead includes homeowner preferences, urgency level, and job details — so your first call is already more informed than your competitors'.
          </p>
          <a
            href="/apply"
            style={{ display: 'inline-block', background: '#FFC107', color: '#1E3A5F', fontWeight: 800, fontSize: 17, padding: '16px 40px', borderRadius: 10, textDecoration: 'none', fontFamily: 'sans-serif' }}
          >
            Apply for Pro Access →
          </a>
        </div>

      </div>
    </div>
  );
}
