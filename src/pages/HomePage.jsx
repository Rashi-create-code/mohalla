import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Reveal } from '../hooks/useReveal';
import { Button, SectionTag, CircleBtn, StatBox, Badge, LiveDot } from '../components/UI';
import { ZONES, ZONE_META, SHOPS, FARES, INITIAL_MESSAGES } from '../data/constants';
import styles from './HomePage.module.css';

// src/pages/HomePage.jsx (or wherever HeroSection is defined)

function HeroSection() {
  const { setPage } = useApp();
  const [activeNow] = useState(Math.floor(Math.random() * 40) + 22);

  return (
    <section
      className={styles.hero}
      style={{
        // Reduced opacity from 0.8 to 0.5 so the photo is visible
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("/assets/bg2.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed' // This keeps the image steady as you scroll
      }}
    >
      <div className={styles.grain} />
      <div className={styles.heroContent}>
        <div className={styles.heroEyebrow}>
          <LiveDot /> {activeNow} locals active now
        </div>
        <h1 className={styles.heroTitle}>
          Know Your<br />
          <em className={styles.heroEm}>Street.</em><br />
          Before You<br />
          Walk It.
        </h1>
        {/* ... rest of your buttons and stats ... */}
      </div>
    </section>
  );
}

function AboutSection() {
  const { setPage } = useApp();
  const [aboutIdx, setAboutIdx] = useState(0);

  const aboutContents = [
    "We are a hyperlocal network passionate about real information, community trust, and making every neighbourhood easier to navigate. No ads, no algorithms — just neighbours helping neighbours.",
    "Verified auto and rickshaw rates calculated by the community. Stop overpaying and start commuting with confidence based on recent local data.",
    "Real-time shop price tracking. Compare milk, oil, and grocery prices across your local vendors anonymously to find the best deals.",
    "Live safety alerts and neighborhood happenings. Stay informed about road closures, utility updates, or local events from trusted sources.",
    "Complete anonymity. Your data stays yours. No phone number or personal tracking required — just local utility for everyone."
  ];

  const handleNext = () => setAboutIdx((prev) => (prev + 1) % aboutContents.length);
  const handlePrev = () => setAboutIdx((prev) => (prev - 1 + aboutContents.length) % aboutContents.length);

  // UPDATED: Using images from your "Build Local Trust" screenshot context
  // Updated with your local assets
  const cards = [
    {
      // Matches the "Build Local Trust" card (Top Wide Card)
      bg: '/assets/trust.jpg',
      title: 'Build Local Trust',
      sub: '  Shop ratings from real neighbours',
      big: true
    },
    {
      // Matches the "Know the Real Fare" card (Bottom Left)
      bg: '/assets/rickshaw.jpg',
      title: 'Know the Real Fare',
      sub: '  Verified auto & rickshaw rates',
      big: false
    },
    {
      // Matches the "Stay Safe" card (Bottom Right)
      bg: '/assets/safelock.jpg',
      title: 'Stay Safe',
      sub: '  Live alerts & safety warnings',
      big: false
    },
  ];

  return (
    <section className={`${styles.section} ${styles.sectionWhite}`}>
      <div className={styles.aboutGrid}>
        <div>
          <SectionTag>About Mohalla</SectionTag>
          <h2 className={styles.sectionTitle}>Your Hyperlocal<br />Community Hub</h2>
          <div className={styles.aboutPhotos}>
            {cards.map((c, i) => (
              <Reveal key={i} delay={i * 100} style={{ gridColumn: c.big ? '1 / -1' : 'auto' }}>
                <div
                  className={styles.photoCard}
                  style={{
                    // We use a slightly heavier gradient at the bottom (0.8) to make the white text pop
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(${c.bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    aspectRatio: c.big ? '16/7' : '4/3',
                    cursor: 'pointer',
                    borderRadius: '16px', // Matches your rounded-corner screenshot
                    overflow: 'hidden'
                  }}
                  onClick={() => setPage('shops')}
                >
                  <div className={styles.photoCardEmoji} style={{ fontSize: c.big ? 72 : 44 }}>
                    {c.emoji}
                  </div>
                  <div className={styles.photoCardOverlay}>
                    <div className={styles.photoCardTitle}>{c.title}</div>
                    <div className={styles.photoCardSub}>{c.sub}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className={styles.aboutRight}>
          <p className={styles.sectionSub}>
            {aboutContents[aboutIdx]}
          </p>
          <div className={styles.aboutNav}>
            <CircleBtn onClick={handlePrev}>←</CircleBtn>
            <CircleBtn accent onClick={handleNext}>→</CircleBtn>
            <span className={styles.aboutNavCount}>{aboutIdx + 1} / {aboutContents.length}</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.statsGrid}>
            <StatBox icon="🏪" num="2,140+" label="Shops Reviewed" />
            <StatBox icon="🛺" num="980+" label="Fares Verified" />
            <StatBox icon="⚠️" num="430+" label="Alerts Shared" />
            <StatBox icon="👥" num="6" label="Active Zones" />
          </div>
        </div>
      </div>
    </section>
  );
}

function HappeningsSection() {
  const { setPage } = useApp();
  return (
    <section className={`${styles.section} ${styles.sectionOff}`}>
      <SectionTag>Weekly Happenings</SectionTag>
      <div className={styles.evGrid}>
        <div>
          <h2 className={styles.sectionTitle} style={{ marginBottom: 8 }}>
            What's On in<br />Your Zone
          </h2>
          <p className={styles.evSub}>Community tips, alerts & questions posted today</p>
          <div className={styles.evList}>
            {INITIAL_MESSAGES.slice(0, 5).map((m, i) => (
              <Reveal key={m.id} delay={i * 70}>
                <div className={styles.evItem} onClick={() => setPage('chat')}>
                  <div className={styles.evNum}>0{i + 1}</div>
                  <div className={styles.evText}>
                    <div className={styles.evName}>
                      {m.text.length > 56 ? m.text.slice(0, 56) + '…' : m.text}
                    </div>
                    <div className={styles.evMeta}>{m.type} · {m.time}</div>
                  </div>
                  <div className={styles.evArrow}>→</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Button variant="primary" onClick={() => setPage('chat')} style={{ marginTop: 28 }}>
            See Full Chat →
          </Button>
        </div>

        <Reveal>
          <div className={styles.evPhoto} style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=1000")',
            backgroundSize: 'cover'
          }}>
            <div className={styles.evPhotoBadge}>
              <div className={styles.evBadgeNum}>50+ locals</div>
              <div className={styles.evBadgeLbl}>Active in your zone right now</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ZonesSection() {
  const { setPage } = useApp();

  // Helper to match photos to the specific zones in your "Across the City" screenshot
  const getZoneImage = (name) => {
    const images = {
      'Sector 12': '/assets/bg.jpg',
      'Lal Dora': 'https://images.unsplash.com/photo-1569416078500-3857b00616f8?q=80&w=800',
      'Civil Lines': 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800'
    };
    return images[name] || 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800';
  };

  return (
    <section className={`${styles.zoneSec}`}>
      <div className={styles.zoneBgTxt}>🗺️</div>
      <div className={styles.zoneInner}>
        <SectionTag dark>Where We Are</SectionTag>
        <h2 className={`${styles.sectionTitle} ${styles.sectionTitleWh}`} style={{ maxWidth: 480, margin: '0 auto 12px' }}>
          Our Communities<br />Across the City
        </h2>
        <p className={styles.zoneSub}>
          Mohalla is growing across your city. Find a community near you and join the neighbourhood.
        </p>
        <div className={styles.zonesRow}>
          {ZONES.slice(0, 3).map((z, i) => (
            <Reveal key={z} delay={i * 100}>
              <div
                className={styles.zoneCard}
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(${getZoneImage(z)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                onClick={() => setPage('map')}
              >
                <div className={styles.zoneCardEmoji}>{ZONE_META[z].emoji}</div>
                <div className={styles.zoneCardOverlay}>
                  <div className={styles.zoneCardName}>{z}</div>
                  <div className={styles.zoneCardCnt}>{ZONE_META[z].count} locals · Active</div>
                  <button className={styles.zoneArrBtn}>→</button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className={styles.zoneNav}>
          <CircleBtn style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>←</CircleBtn>
          <CircleBtn accent>→</CircleBtn>
        </div>
      </div>
    </section>
  );
}

function ExploreShopsSection() {
  const { setPage } = useApp();

  // Helper to assign a different photo to each shop card
  const getShopPhoto = (index) => {
    const photos = [
      "/assets/grocery.jpg",
      "/assets/electronics.jpg",
      "/assets/bakery.jpg",
      "/assets/pharmacy.jpg"
    ];
    return photos[index % photos.length];
  };

  return (
    <section className={`${styles.section} ${styles.sectionOff}`}>
      <SectionTag>Explore Shops</SectionTag>
      <div className={styles.exGrid}>
        {/* LEFT SIDE: Text and Mini-Cards */}
        <div>
          <h2 className={styles.sectionTitle}>Explore Shops<br />by the Community</h2>
          <p className={styles.sectionSub} style={{ marginTop: 12 }}>
            Browse nearby shops rated by real locals. We help you find trusted sellers and avoid overcharging — every single day.
          </p>
          <Button variant="primary" onClick={() => setPage('shops')} style={{ marginTop: 24 }}>
            See All Shops →
          </Button>

          <div className={styles.miniCards}>
            {SHOPS.slice(0, 4).map((s, i) => (
              <Reveal key={s.id || i} delay={i * 70}>
                <div
                  className={styles.miniCard}
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url("${getShopPhoto(i)}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  onClick={() => setPage('shops')}
                >
                  <div className={styles.miniCardEmoji}>{s.icon}</div>
                  <div className={styles.miniCardOverlay}>
                    <div className={styles.miniCardTitle}>{s.name}</div>
                    <div className={styles.miniCardSub}>{s.type} · {s.trust}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: Big Feature Card */}
        <Reveal style={{ height: '100%' }}>
          <div
            className={styles.exBig}
            style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url("/assets/grocery.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div className={styles.exBigEmoji}>🛒</div>
            <div className={styles.exBigCard}>
              <div className={styles.excTitle}>Sharma General Store</div>
              <div className={styles.excTags}>
                <Badge type="trusted">Trusted</Badge>
                <Badge type="info">Grocery</Badge>
                <span className={styles.excRating}>⭐ 4.7</span>
              </div>
              <p className={styles.excSub}>
                83 locals verified · Rice ₹44/kg · Dal ₹95/kg · Oil ₹145/L
              </p>
              <button className={styles.excBtn} onClick={() => setPage('shops')}>
                View All Details →
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ExploreFaresSection() {
  const { setPage } = useApp();

  return (
    <section className={`${styles.section} ${styles.sectionWhite}`}>
      <SectionTag>Explore Fares</SectionTag>
      <div className={`${styles.exGrid} ${styles.exGridReverse}`}>
        
        {/* PHOTO CARD (Left Side due to exGridReverse) */}
        <Reveal style={{ height: '100%' }}>
          <div 
            className={styles.exBig} 
            style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url("/assets/rickshaw.jpg")',
              backgroundSize: 'cover',
              /* This shifts the photo UP so the auto is visible */
              backgroundPosition: 'center 15%', 
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div className={styles.exBigEmoji}>🛺</div>
            
            {/* Details Card with Light Background */}
            <div className={styles.exBigCard}>
              <div className={styles.excTitle}>Bus Stand → Civil Hospital</div>
              <div className={styles.excTags}>
                <Badge type="info">Auto</Badge>
                <span className={styles.excRating}>91% accurate</span>
              </div>
              <div style={{ margin: '12px 0', display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span className={styles.fareBig}>₹40</span>
                <span className={styles.fareSmall}>verified fare</span>
              </div>
              <button className={styles.excBtn} onClick={() => setPage('fares')}>
                See All Fares →
              </button>
            </div>
          </div>
        </Reveal>

        {/* TEXT CONTENT (Right Side) */}
        <div>
          <h2 className={styles.sectionTitle}>Explore Fares<br />by the Community</h2>
          <p className={styles.sectionSub} style={{ marginTop: 12 }}>
            Browse crowd-sourced auto and rickshaw rates. We connect you with accurate prices — verified every week.
          </p>
          <Button variant="primary" onClick={() => setPage('fares')} style={{ marginTop: 24 }}>
            See All Fares →
          </Button>
          
          <div className={styles.fareList}>
            {FARES.slice(0, 4).map((f, i) => (
              <Reveal key={f.id || i} delay={i * 80}>
                <div className={styles.fareItem} onClick={() => setPage('fares')}>
                  <span className={styles.fareIdx}>0{i + 1}</span>
                  <div style={{ flex: 1 }}>
                    <div className={styles.fareRoute}>{f.from} → {f.to}</div>
                    <div className={styles.fareMeta}>{f.mode} · {f.upvotes + f.downvotes} votes</div>
                  </div>
                  <span className={styles.farePrice}>₹{f.price}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}


// Using local asset paths for varied backgrounds
const TESTIMONIALS = [
  {
    text: "I used to know nothing about my new area and got cheated twice at a repair shop. After joining Mohalla, I always know the right price before I walk in. This app changed how I navigate my neighbourhood.",
    chips: ['Trusted shops', 'No overcharging', 'Real neighbours', 'Anonymous'],
    bg: "/assets/test-bg-1.jpg" // Example: Blurred neighborhood street
  },
  {
    text: "The fare verification feature is a lifesaver. No more haggling for 15 minutes every morning; the community rates are spot on and verified weekly. It feels fair now.",
    chips: ['Fair Fares', 'Daily Commute', 'Verified', 'Anonymous'],
    bg: "/assets/test-bg-2.jpg" // Example: Blurred marketplace/auto stand
  },
  {
    text: "Found a local hidden gem bakery through a neighbor's recommendation. Much better than relying on generic, paid map reviews. Genuine community input.",
    chips: ['Hidden Gems', 'Local Food', 'Community Tips', 'Anonymous'],
    bg: "/assets/test-bg-3.jpg" // Example: Blurred local park/gathering spot
  }
];

function TestimonialSection() {
  const [active, setActive] = useState(0);

  const handleNext = () => setActive((prev) => (prev + 1) % TESTIMONIALS.length);
  const handlePrev = () => setActive((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className={styles.testiSec}>
      <div className={styles.testiHeader}>
        <div>
          <SectionTag>What They Say</SectionTag>
          <h2 className={styles.sectionTitle} style={{ marginTop: 10 }}>Locals Love<br />Mohalla</h2>
        </div>
        <div className={styles.testiNav}>
          <CircleBtn onClick={handlePrev}>←</CircleBtn>
          <CircleBtn accent onClick={handleNext}>→</CircleBtn>
        </div>
      </div>

      {/* Dynamic Background Banner for each testimonial */}
      <Reveal key={`banner-${active}`} delay={100}>
        <div 
          className={styles.testiBanner}
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4)), url("${TESTIMONIALS[active].bg}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Internal content is now inside the banner for better integration */}
          <div className={styles.testiBannerContent}>
            <div className={styles.testiQuote}>"</div>
            <blockquote className={styles.testiText}>
              {TESTIMONIALS[active].text}
            </blockquote>
            <div className={styles.testiChips}>
              {TESTIMONIALS[active].chips.map(t => (
                <span key={t} className={styles.testiChip}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

        function FooterCTA() {
  const {setPage} = useApp();
        return (
        <section className={styles.footerCTA}>
          <div className={styles.footerGrain} />
          <div className={styles.footerOrb} />
          <div className={styles.footerInner}>
            <SectionTag dark>Join Mohalla</SectionTag>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleWh}`} style={{ maxWidth: 480, margin: '0 auto 16px' }}>
              Start Knowing Your<br />Street Today
            </h2>
            <p className={styles.footerSub}>
              No account. No phone number. Just pick a zone and start contributing to your community.
            </p>
            <div className={styles.footerBtns}>
              <Button variant="primary" size="lg" onClick={() => setPage('profile')}>
                Create Your Avatar →
              </Button>
              <Button variant="outline" size="lg" onClick={() => setPage('chat')}>
                Browse Chat
              </Button>
            </div>
          </div>
          <div className={styles.footerBar}>
            <div className={styles.footerLogo}>
              Mohalla<span style={{ color: 'var(--orange)' }}>.</span>
            </div>
            <div className={styles.footerCopy}>No ads · No data collection · Built for neighbours</div>
          </div>
        </section>
        );
}


        // 2. Then comes your main HomePage component
        export default function HomePage() {
  return (
        <div className={styles.page}>
          <HeroSection />
          <AboutSection />
          <HappeningsSection />
          <ZonesSection />
          <ExploreShopsSection />
          <ExploreFaresSection /> {/* This will now work */}
          <TestimonialSection />
          <FooterCTA />
        </div>
        );
}
