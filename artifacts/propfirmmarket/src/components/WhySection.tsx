export function WhySection() {
  const items = [
    { ico: '🤖', title: 'AI Finder', desc: 'Filter public firm profiles by your preferences' },
    { ico: '⚖️', title: 'Firm Comparison', desc: 'Compare listed prices, terms, and features' },
    { ico: '📋', title: 'Challenge Profiles', desc: 'Explore available challenge structures' },
    { ico: '🔎', title: 'Firm Directory', desc: 'Browse firms by market and listed details' },
    { ico: '📊', title: 'Public Information', desc: 'Review the information currently listed' },
    { ico: '🎁', title: 'Giveaways', desc: 'Not yet available on the public site' },
    { ico: '🇮🇳', title: 'Payment Options', desc: 'Filter by payment methods listed in profiles' },
    { ico: '🏷️', title: 'Promotions', desc: 'View codes and offers listed in firm profiles' },
  ];

  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontFamily: "'Space Grotesk'", fontSize: 'clamp(1.3rem,2.4vw,1.9rem)', fontWeight: 900 }}>
          Why <span className="grad">PropFirmMarket</span>?
        </h2>
      </div>
      <div className="why-g">
        {items.map(item => (
          <div key={item.title} className="wc">
            <div className="wc-i">{item.ico}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
