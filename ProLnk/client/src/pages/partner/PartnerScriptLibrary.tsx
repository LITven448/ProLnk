import { useState } from 'react';

const scripts = [
  {
    category: 'Cold Approach',
    emoji: '🧊',
    items: [
      {
        title: 'The Neighborhood Intro',
        intro: '"Hey [Name], I live right around the corner from you and I wanted to share something that’s been really helpful for homeowners in our area."',
        body: 'I’m a ProLnk partner — it’s a free platform that connects homeowners with vetted local pros for any home service need. Instead of guessing on Google or Angi, you get real quotes from licensed pros in under 24 hours. I’ve seen neighbors save $400–$1,200 on single projects just by getting 3 competing bids.',
        close: '"Would it make sense to sign up and see what’s available for your next project? It takes about 90 seconds."',
        dos: ['Mention a specific savings example', 'Reference someone they know who uses it', 'Offer to walk them through signup together'],
        donts: ['Lead with your income opportunity', 'Talk about commission before they understand the product', 'Rush past their questions'],
      },
      {
        title: 'The Facebook Group Post',
        intro: '"Anyone else frustrated by getting ghosted by contractors? I found a fix."',
        body: 'I’ve been using ProLnk to connect homeowners in [City] with vetted local pros who actually respond. It’s free for homeowners, and you get 3 competing quotes fast. I’m a local partner — happy to answer any questions.',
        close: '"Drop a 👋 below and I’ll DM you the link — takes 2 mins to sign up."',
        dos: ['Use a relatable pain point in the opener', 'Respond to every comment within 30 min', 'DM everyone who reacts'],
        donts: ['Post your referral link directly in the post (gets flagged)', 'Make it sound like an ad', 'Ignore comments'],
      },
      {
        title: 'The Door Hanger Follow-Up',
        intro: '"Hi, I left a flyer on your door last week about ProLnk — just wanted to do a quick 30-second follow-up."',
        body: 'A lot of homeowners on your block have been using it to get quotes for HVAC, roofing, plumbing — whatever comes up. No fees, no pressure. You just post what you need and licensed pros reach out.',
        close: '"Do you have any projects coming up where this might help? I can show you how to sign up right now if you want."',
        dos: ['Be warm and conversational, not salesy', 'Have your phone ready to show the signup page', 'Reference a specific trade they might need'],
        donts: ["Stay if they're clearly not interested", 'Block the door or driveway', "Pitch your partnership role on the first visit"],
      },
    ],
  },
  {
    category: 'Warm Referral',
    emoji: '🤝',
    items: [
      {
        title: 'The Friend Text',
        intro: '"Hey [Name], random question — do you use anything to find contractors when stuff breaks at home?"',
        body: 'I’ve been a partner with ProLnk for a few months and honestly I think of you every time I see a homeowner save a ton of money on a repair. It’s free for you — you post your project and get competing quotes from vetted pros.',
        close: '"I can send you the link right now if you want to check it out. No pressure at all."',
        dos: ['Start with a question, not a pitch', 'Mention the free aspect early', 'Follow up 3 days later if no reply'],
        donts: ["Say 'I'm making money off this' in the opener", 'Send a wall of text', "Forward a group message — make it personal"],
      },
      {
        title: 'The Community Leader Ask',
        intro: '"I know you\’re connected to a lot of people in [neighborhood/church/HOA]. I wanted to run something by you."',
        body: 'I’m working with a platform called ProLnk that helps homeowners find trusted local contractors. I’m looking for a few people who genuinely care about the community to help spread the word. There’s a real income opportunity too, but honestly the most important thing is that it helps people.',
        close: '"Would you be open to a 15-minute call to see if it’s a fit?"',
        dos: ['Lead with community value', 'Acknowledge their influence genuinely', 'Let them ask about the income side'],
        donts: ["Start with the money — it sounds MLM if framed wrong", 'Overload with info before they say yes to a call', 'Underestimate their network'],
      },
      {
        title: 'The Past Client Reconnect',
        intro: '"Hey [Name], it\’s been a while! Hope you\’re doing well. Quick question — have you had any work done on the house lately?"',
        body: 'I thought of you because I’m now a partner with ProLnk — it’s a platform that makes it way easier for homeowners to get real quotes from trustworthy pros. I wish I’d had it back when we worked together.',
        close: '"I can set you up with a free account right now. And if you ever want to earn on the side by referring others, that’s an option too."',
        dos: ['Warm up before mentioning ProLnk', 'Reference shared history', 'Offer value first (free homeowner account) then mention partner option'],
        donts: ["Make it feel transactional", "Skip the small talk", "Ask them to sign up as a partner before they understand the platform"],
      },
    ],
  },
  {
    category: 'Objection Handling',
    emoji: '🛡️',
    items: [
      {
        title: '"Is this a pyramid scheme?"',
        intro: '"That\’s a fair question and I\’m glad you asked it."',
        body: 'ProLnk is a two-sided marketplace — like Airbnb or Uber but for home services. Partners earn commissions by connecting homeowners and pros. There’s a referral component too, but the income comes from real transactions — homeowners paying for real projects. No one earns anything without actual service delivery.',
        close: '"Does that make sense? Happy to walk you through the income breakdown — it\’s pretty straightforward."',
        dos: ['Stay calm — the question is normal', 'Be specific about where the money comes from', 'Offer to show the income structure'],
        donts: ["Get defensive", "Deny the network structure — own it and explain it", "Promise income without showing the math"],
      },
      {
        title: '"I don\’t have time."',
        intro: '"I totally get it — you\’re busy. Let me ask you this:"',
        body: 'Most of our best partners started with just 3–5 hours a week. The conversations happen naturally — text messages, social posts, a comment here and there. And once your sub-partners are active, the system runs with less effort from you.',
        close: '"What if we just started with one conversation this week — I\’ll coach you through it?"',
        dos: ['Validate the concern', 'Reframe the time investment', "Offer a concrete low-stakes first step"],
        donts: ["Dismiss their concern", "Promise passive income too early", "Overwhelm them with a full onboarding plan right now"],
      },
      {
        title: '"I\’m not a salesperson."',
        intro: '"Neither am I — and honestly, that\’s what makes this work."',
        body: 'You\’re not selling anything — you\’re sharing a free tool with homeowners who need it and a real income opportunity with people who are looking for one. The best partners are just genuine people who care about helping others.',
        close: '"The scripts I use took me 10 minutes to learn. Want me to send you three to start?"',
        dos: ['Normalize not being a "salesperson"', 'Shift the frame from selling to helping', 'Offer a low-barrier next step (scripts)'],
        donts: ["Tell them it's easy — that sounds dismissive", "Promise they'll be great without evidence", "Skip directly to sign-up"],
      },
      {
        title: '"Let me think about it."',
        intro: '"Of course — what\’s the main thing you want to think through?"',
        body: 'I ask because sometimes people say that and they\’re actually wondering about the time, the money, or whether it\’s legit — and I can answer all three pretty quickly. I\’d rather help you decide than have you sit with unanswered questions.',
        close: '"What would make you feel 100% confident saying yes?"',
        dos: ['Draw out the real objection', 'Be direct and confident', 'Ask for a specific next step or follow-up time'],
        donts: ["Say 'okay, no problem' and disappear", "Push too hard and create pressure", "Accept vague follow-up timelines without setting a call"],
      },
    ],
  },
  {
    category: 'Closing',
    emoji: '✍️',
    items: [
      {
        title: 'The Simple Ask',
        intro: '"It sounds like you\’re interested — what would it take to get started today?"',
        body: 'The signup takes about 4 minutes. I can walk you through it right now or send you the link and follow up tomorrow. Either way, there\’s no risk — you can cancel anytime.',
        close: '"Want to do it now while we\’re talking?"',
        dos: ['Make it easy and low-pressure', 'Offer to do it together', 'Emphasize no risk'],
        donts: ["Create artificial urgency", "Leave without a clear next step", "Make it complicated"],
      },
      {
        title: 'The Deadline Close',
        intro: '"I want to be straight with you — the Charter tier closes at 500 partners."',
        body: 'We\’re getting close to that number. Charter partners lock in the best rates permanently — $149/month and higher commission percentages. Once we\’re full, new partners come in at higher prices. I can\’t hold a spot, but I can walk you through signup right now.',
        close: '"Do you want to lock in your spot today?"',
        dos: ['Only use when true — check real waitlist count', 'Be honest and factual', 'Have the signup page ready to share'],
        donts: ["Exaggerate or lie about capacity", "Use pressure tactics if the deadline is not real", "Make it feel manipulative"],
      },
      {
        title: 'The Social Proof Close',
        intro: '"I want to share something real with you before you decide."',
        body: 'Here\’s a screenshot of my commission dashboard from last month. [Show income screenshot]. I started exactly where you are — just testing it. Three months in I recruited my first sub-partner. Six months in I was earning more from ProLnk than from my day job side work.',
        close: '"I think you could do the same. Want to start the application?"',
        dos: ['Show real numbers — never fake', 'Tell your personal story authentically', 'Pause after the close and let them respond'],
        donts: ["Show someone else's numbers as your own", "Oversell the timeline", "Fill the silence — let them think"],
      },
    ],
  },
  {
    category: 'Follow-Up',
    emoji: '📬',
    items: [
      {
        title: '48-Hour Follow-Up Text',
        intro: '"Hey [Name], just checking in — did you get a chance to look at the ProLnk info I sent?"',
        body: 'No worries if not — life gets busy. I just wanted to make sure you didn\’t have any questions stuck in your head. Happy to do a quick 10-minute call this week if that helps.',
        close: '"Does Tuesday or Wednesday work for you?"',
        dos: ["Keep it short and casual", "Offer specific time options", "Assume positive intent"],
        donts: ["Send more than one follow-up per week", "Sound needy or desperate", "Guilt-trip for not responding"],
      },
      {
        title: '30-Day Re-Engagement',
        intro: '"Hey [Name], it\’s been a few weeks — I wanted to reach back out with some news."',
        body: 'Our team just hit a new milestone — [share a real achievement: new partner joined, team earnings record, etc.]. I thought of you because you\’d mentioned being interested. We have a few open spots before our next cohort closes.',
        close: '"Is now a better time to talk than it was a month ago?"',
        dos: ["Lead with a new hook — give them a reason to re-engage", "Reference their specific interest from before", "Be warm, not pushy"],
        donts: ["Start with an apology for following up", "Rehash everything you said before", "Make them feel bad for going quiet"],
      },
    ],
  },
];

export default function PartnerScriptLibrary() {
  const [openCategory, setOpenCategory] = useState<string>('Cold Approach');
  const [openScript, setOpenScript] = useState<string | null>(null);

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0A1628', margin: 0 }}>Partner Script Library</h1>
          <p style={{ color: '#64748B', fontSize: 15, marginTop: 10 }}>15 ready-to-use scripts organized by situation. Copy, adapt, and make them your own.</p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
          {scripts.map(cat => (
            <button
              key={cat.category}
              onClick={() => { setOpenCategory(cat.category); setOpenScript(null); }}
              style={{
                background: openCategory === cat.category ? '#0A1628′ : '#fff',
                color: openCategory === cat.category ? '#F5E642′ : '#0A1628',
                border: '2px solid ' + (openCategory === cat.category ? '#0A1628′ : '#E2E8F0'),
                borderRadius: 999,
                padding: '8px 18px',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              {cat.emoji} {cat.category} ({cat.items.length})
            </button>
          ))}
        </div>

        {scripts.filter(c => c.category === openCategory).map(cat => (
          <div key={cat.category}>
            {cat.items.map((script, i) => {
              const key = `${cat.category}-${i}`;
              const isOpen = openScript === key;
              return (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    borderRadius: 14,
                    marginBottom: 16,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    border: isOpen ? '2px solid #F5E642′ : '2px solid transparent',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    onClick={() => setOpenScript(isOpen ? null : key)}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', cursor: 'pointer' }}
                  >
                    <div style={{ fontWeight: 700, color: '#0A1628', fontSize: 15 }}>{script.title}</div>
                    <span style={{ color: '#94A3B8', fontSize: 18 }}>{isOpen ? '▲' : '▼'}</span>
                  </div>

                  {isOpen && (
                    <div style={{ borderTop: '1px solid #F1F5F9', padding: '20px 22px' }}>
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', marginBottom: 6 }}>OPENING LINE</div>
                        <div style={{ background: '#F0FDF4', borderRadius: 10, padding: '12px 16px', fontSize: 14, color: '#15803D', fontWeight: 600, lineHeight: 1.5 }}>
                          {script.intro}
                        </div>
                      </div>
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', marginBottom: 6 }}>BODY</div>
                        <div style={{ background: '#F8FAFC', borderRadius: 10, padding: '12px 16px', fontSize: 14, color: '#334155', lineHeight: 1.6 }}>
                          {script.body}
                        </div>
                      </div>
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', marginBottom: 6 }}>CLOSE</div>
                        <div style={{ background: '#FEF9C3', borderRadius: 10, padding: '12px 16px', fontSize: 14, color: '#854D0E', fontWeight: 600, lineHeight: 1.5 }}>
                          {script.close}
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: '#16A34A', marginBottom: 8 }}>✅ DO</div>
                          {script.dos.map((d, j) => (
                            <div key={j} style={{ fontSize: 13, color: '#334155', marginBottom: 6, display: 'flex', gap: 6 }}>
                              <span style={{ color: '#22C55E' }}>→</span> {d}
                            </div>
                          ))}
                        </div>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: '#DC2626', marginBottom: 8 }}>❌ DON'T</div>
                          {script.donts.map((d, j) => (
                            <div key={j} style={{ fontSize: 13, color: '#334155', marginBottom: 6, display: 'flex', gap: 6 }}>
                              <span style={{ color: '#EF4444′ }}>→</span> {d}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
