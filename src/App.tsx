import { useEffect, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  ArrowUpRight, Check, CheckCircle2,
  Github, Globe2, Layers3, Linkedin, Mail, Menu, Monitor,
  Send, X, Workflow, AlertCircle, LoaderCircle, Sun, Moon
} from 'lucide-react';

type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  eyebrow: string;
  headline: string;
  description: string;
  services: string[];
  url?: string;
  github?: string;
  domain: string;
  client: boolean;
};

const EMAIL = 'dhruvintejani.work@gmail.com';
const GITHUB = 'https://github.com/dhruvintejani';
const LINKEDIN = 'https://www.linkedin.com/in/dhruvin-tejani-3155a1368/';

const projects: Project[] = [
  {
    id: 'averon',
    number: '01',
    name: 'AVERON Freight Solutions',
    category: 'Logistics / Corporate Website',
    eyebrow: 'CLIENT WEBSITE · LIVE',
    headline: 'A stronger digital presence for global logistics.',
    description: 'A confident, conversion-focused corporate experience for a freight forwarding company. Designed to communicate complex services clearly and make shipment enquiries easier.',
    services: ['Website Design', 'Frontend Development', 'Responsive UI'],
    url: 'https://www.averonfs.com/',
    domain: 'averonfs.com',
    client: true
  },
  {
    id: 'sreya',
    number: '02',
    name: 'Sreya Digital Wear',
    category: 'Fashion / Business Software',
    eyebrow: 'CLIENT SOFTWARE · PRIVATE APP',
    headline: 'A clearer way to manage inventory and production.',
    description: 'A private application built for managing fashion products, cloth inventory, stock visibility and production workflows. Shown with an illustrative dashboard using demonstration data.',
    services: ['Custom Business Software', 'Inventory', 'Production'],
    url: 'https://sreya-digital-wear.vercel.app/',
    domain: 'sreya-digital-wear.vercel.app',
    client: true
  },
  {
    id: 'gudh',
    number: '03',
    name: 'Gudh Vidyaanushasan Kendra',
    category: 'Education / Spiritual Website',
    eyebrow: 'CLIENT WEBSITE · LIVE',
    headline: 'A thoughtful digital home for traditional knowledge.',
    description: 'A content-first website for a specialized education and spiritual guidance practice, balancing approachability, clear information and a distinctive visual identity.',
    services: ['Custom Website', 'Content Structure', 'Responsive Design'],
    url: 'https://gudhvidyaanushasankendra.info/',
    domain: 'gudhvidyaanushasankendra.info',
    client: true
  },
  {
    id: 'workflow',
    number: '04',
    name: 'Manufacturing Operations Platform',
    category: 'Custom Software / Workflow Concept',
    eyebrow: 'SOFTWARE SHOWCASE · DEMO',
    headline: 'Less manual work. More visibility across operations.',
    description: 'A workflow-focused web application concept bringing enquiries, quotations, orders, production, inventory and reporting into a connected interface.',
    services: ['Business Workflows', 'Dashboard UI', 'Operations Systems'],
    domain: 'Internal product showcase',
    client: false
  }
];

type ThemeMode = 'dark' | 'light';

const THEME_STORAGE_KEY = 'dhruvin-portfolio-theme';

function initialTheme(): ThemeMode {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact-form' }
];

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function Mark({ small = false }: { small?: boolean }) {
  return <a className={'brand ' + (small ? 'brand-small' : '')} href="#top" aria-label="Dhruvin Tejani — go to top">
    <span className="brand-symbol">d<span>.</span></span>
    <span className="brand-name">dhruvin<span>tejani</span></span>
  </a>;
}

function Navigation({ theme, onToggleTheme }: {
  theme: ThemeMode;
  onToggleTheme: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => {
    const key = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);
  return <>
    <header className={'site-header ' + (scrolled ? 'is-scrolled' : '')}>
      <div className="container nav-inner">
        <Mark />
        <nav className="desktop-navigation" aria-label="Main navigation">
          {navItems.map(item => <a href={item.href} key={item.href}>{item.label}</a>)}
        </nav>
        <div className="nav-actions">
          <button type="button"
            className="theme-toggle" onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={theme === 'light'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            {theme === 'dark' ? <Sun size={17} strokeWidth={1.9}/> : <Moon size={17} strokeWidth={1.9}/>}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          <a className="nav-contact" href="#contact-form">Let's talk <ArrowUpRight size={15}/></a>
          <button type="button" className="mobile-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </div>
    </header>
    <AnimatePresence>
      {open && <motion.nav className="mobile-navigation" initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} aria-label="Mobile navigation">
        {navItems.map((item, i) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
          <span>0{i + 1}</span>{item.label}<ArrowUpRight size={20}/>
        </a>)}
      </motion.nav>}
    </AnimatePresence>
  </>;
}

const premiumCoverPaths: Record<string, string> = {
  averon: '/projects/averon-premium.webp',
  sreya: '/projects/sreya-premium.webp',
  gudh: '/projects/gudh-premium.webp',
  workflow: '/projects/manufacturing-premium.webp',
};

const coverPaths: Record<string, string> = {
  averon: '/projects/averon-cover.svg',
  sreya: '/projects/sreya-cover.svg',
  gudh: '/projects/gudh-cover.svg',
  workflow: '/projects/manufacturing-cover.svg',
};



/**
 * Decorative atmosphere only. This layer is hidden from assistive technology
 * and cannot interfere with navigation, projects, or the contact form.
 */
function AuroraBackground() {
  return <div className="aurora-backdrop" aria-hidden="true">
    <div className="aurora-grid"/>
    <span className="aurora-glow aurora-glow-hero"/>
    <span className="aurora-glow aurora-glow-work"/>
    <span className="aurora-glow aurora-glow-expertise"/>
    <span className="aurora-glow aurora-glow-contact"/>
    <span className="aurora-orb aurora-orb-upper"/>
    <span className="aurora-orb aurora-orb-side"/>
    <span className="aurora-orb aurora-orb-projects"/>
    <span className="aurora-orb aurora-orb-lower"/>
    <span className="aurora-orbit aurora-orbit-hero"/>
    <span className="aurora-orbit aurora-orbit-work"/>
    <span className="aurora-orbit aurora-orbit-bottom"/>
    <span className="aurora-trail aurora-trail-first"/>
    <span className="aurora-trail aurora-trail-second"/>
    <span className="aurora-trail aurora-trail-third"/>
    <span className="aurora-dots aurora-dots-hero"/>
    <span className="aurora-dots aurora-dots-work"/>
    <span className="aurora-dots aurora-dots-expertise"/>
    <span className="aurora-dots aurora-dots-contact"/>
    <span className="aurora-star aurora-star-one"/>
    <span className="aurora-star aurora-star-two"/>
    <span className="aurora-star aurora-star-three"/>
    <span className="aurora-star aurora-star-four"/>
    <span className="aurora-star aurora-star-five"/>
  </div>;
}

function Hero() {
  return <section className="hero-section premium-hero" id="top">
    <div className="hero-grid" aria-hidden="true"/>
    <div className="premium-ambient premium-ambient-a" aria-hidden="true"/>
    <div className="premium-ambient premium-ambient-b" aria-hidden="true"/>
    <div className="container hero-layout premium-hero-layout">
      <div className="hero-content premium-hero-content">
        <Reveal><div className="hero-kicker premium-eyebrow">INDEPENDENT DEVELOPER <span>/</span> DIGITAL CRAFTSMAN</div></Reveal>
        <Reveal delay={.09}><h1>Websites that<br/><span>stand out.</span><br/>Software that<br/><em>works harder.</em></h1></Reveal>
        <Reveal delay={.17}><p className="hero-description">I'm Dhruvin Tejani, a developer with <strong>5+ years of experience</strong> building thoughtful websites, custom web applications and digital experiences for real businesses.</p></Reveal>
        <Reveal delay={.24}><div className="hero-ctas">
          <a className="button button-primary" href="#contact-form">Let's build something <ArrowUpRight size={17}/></a>
          <a className="button premium-button-secondary" href="#work"><span className="premium-play-icon">↗</span> View my work</a>
        </div></Reveal>
        <Reveal delay={.32}><div className="premium-hero-proof" aria-label="Experience and approach">
          <div><span className="premium-proof-icon"><Check size={16}/></span><span><strong>5+ years</strong><small>Development experience</small></span></div>
          <div><span className="premium-proof-icon"><Globe2 size={16}/></span><span><strong>Real client work</strong><small>Business-first thinking</small></span></div>
          <div><span className="premium-proof-icon"><Workflow size={16}/></span><span><strong>End-to-end</strong><small>From idea to launch</small></span></div>
        </div></Reveal>
      </div>
      <Reveal className="hero-art premium-hero-art" delay={.16}>
        <div className="premium-hero-scene">
          <div className="premium-scene-artwork" aria-hidden="true"/>
          <div className="premium-scene-overlay" aria-hidden="true"/>
          <div className="premium-visual-laptop premium-visual-web">
            <div className="premium-screen-top"><span><i/><i/><i/></span><span>averonfs.com</span></div>
            <img src="/projects/averon-cover.svg" alt="Art-directed visual of AVERON Freight Solutions website" width={1600} height={1000} fetchPriority="high"/>
            <div className="premium-device-foot"><span>GLOBAL LOGISTICS</span><ArrowUpRight size={12}/></div>
          </div>
          <div className="premium-visual-laptop premium-visual-app">
            <div className="premium-screen-top"><span><i/><i/><i/></span><span>Operations platform</span></div>
            <img src="/projects/sreya-cover.svg" alt="Art-directed visual of Sreya Digital Wear inventory application" width={1600} height={1000} fetchPriority="high"/>
            <div className="premium-device-foot"><span>BUSINESS SOFTWARE</span><ArrowUpRight size={12}/></div>
          </div>
          <div className="premium-scene-floor" aria-hidden="true"/>
        </div>
        <div className="premium-scene-footnote">SELECTED VISUAL CONCEPTS <span>✳</span> REAL PROJECTS BELOW</div>
      </Reveal>
    </div>
  </section>;
}

function SectionHeader({ eyebrow, title, description, right }: { eyebrow: string; title: React.ReactNode; description?: string; right?: React.ReactNode }) {
  return <Reveal><div className="section-heading">
    <div><div className="eyebrow"><span className="eyebrow-line"/>{eyebrow}</div><h2>{title}</h2>{description && <p>{description}</p>}</div>
    {right && <div className="section-heading-right">{right}</div>}
  </div></Reveal>;
}

function Work() {
  const summaries: Record<string,string> = {
    averon: 'A corporate website for a global freight-forwarding business, designed for clarity, trust and service discovery.',
    sreya: 'A private fashion-business application for products, cloth inventory, stock and production. Sign-in is required.',
    gudh: 'A Hindi-first digital home for traditional knowledge, guidance and learning.',
    workflow: 'An illustrative concept for quotations, orders, production, inventory and reporting.'
  };
  return <section id="work" className="section work-section premium-work">
    <div className="container">
      <Reveal><div className="premium-section-header">
        <div><div className="premium-eyebrow premium-section-eyebrow">SELECTED WORK <span>✳</span></div>
          <h2>Real projects. <span>Real impact.</span></h2></div>
        <div className="premium-section-right"><p>Websites and applications crafted for businesses across different industries.</p>
          <a className="premium-outline-button" href="#contact-form">Discuss your project <ArrowUpRight size={16}/></a></div>
      </div></Reveal>
      <div className="premium-project-grid">
        {projects.map((project,i)=><Reveal key={project.id} delay={i*.06}>
          <article className={'premium-project-card premium-card-'+project.id}>
            <div className="premium-project-image">
              <div className="premium-image-glow" aria-hidden="true"/>
              <div className="premium-image-frame premium-image-cinematic">
                <img
                  src={premiumCoverPaths[project.id]}
                  alt={'Premium illustrative showcase of '+project.name}
                  width={1586}
                  height={992}
                  loading="lazy"
                  decoding="async"
                  onError={event => {
                    const fallback = coverPaths[project.id];
                    if (!event.currentTarget.src.endsWith(fallback)) event.currentTarget.src = fallback;
                  }}
                />
              </div>
            </div>
            <div className="premium-card-content">
              <div className="premium-project-category">{project.id==='sreya' ? 'CLIENT SOFTWARE / PRIVATE' : project.id==='workflow' ? 'SOFTWARE CONCEPT / DEMO' : project.id==='averon' ? 'WEBSITE / LOGISTICS' : 'WEBSITE / EDUCATION'}</div>
              <h3>{project.name}</h3>
              <p>{summaries[project.id]}</p>
              <div className="premium-card-bottom">
                <span>{project.client ? 'CLIENT PROJECT' : 'ILLUSTRATIVE CONCEPT'}</span>
                {project.url ? <a href={project.url} target="_blank" rel="noopener noreferrer" className="premium-project-link"
                  aria-label={project.id==='sreya' ? 'Open Sreya private app (sign-in required)' : 'Open '+project.name+' website'}><ArrowUpRight size={19}/></a> :
                <span className="premium-project-link premium-project-link-inactive" aria-label="No public demo"><Monitor size={16}/></span>}
              </div>
            </div>
          </article>
        </Reveal>)}
      </div>
      <Reveal><div className="premium-project-disclaimer">Project visuals are art-directed presentations. The Sreya application is private, and the manufacturing concept contains illustrative data.</div></Reveal>
    </div>
  </section>;
}

const capabilities = [
 { number:'01',icon:Globe2,name:'Websites & Web Applications',description:'Modern, fast, carefully crafted websites and web applications that help your business communicate and grow.',points:['Custom business websites','Responsive web applications','Conversion-focused interfaces','Performance-minded development'],illustration:'orbit' },
 { number:'02',icon:Workflow,name:'Custom Software Development',description:'Purpose-built software and internal tools that reduce manual work and make everyday operations easier.',points:['Business management tools','Inventory & workflow systems','Custom client portals','APIs & integrations'],illustration:'cubes' },
 { number:'03',icon:Layers3,name:'UI/UX & Digital Product Design',description:'Intuitive, distinctive interfaces that look considered and feel effortless across devices.',points:['Interface design','Dashboard design','Design systems','Responsive experiences'],illustration:'panels' }
];
function Expertise() {
  return <section className="section expertise-section premium-expertise" id="expertise">
    <div className="container">
      <Reveal><div className="premium-section-header">
        <div><div className="premium-eyebrow premium-section-eyebrow">EXPERTISE <span>✳</span></div><h2>Tools for <span>ambitious businesses.</span></h2></div>
        <div className="premium-section-right"><p>From engaging websites to practical software, I build digital products designed around real business needs.</p></div>
      </div></Reveal>
      <div className="premium-expertise-grid">
        {capabilities.map((c,i)=><Reveal key={c.number} delay={i*.08}>
          <div className={'premium-expertise-card premium-expertise-'+c.illustration}>
            <div className="premium-capability-icon"><c.icon size={25} strokeWidth={1.65}/></div>
            <h3>{c.name}</h3><p>{c.description}</p>
            <ul>{c.points.map(p=><li key={p}><Check size={13}/>{p}</li>)}</ul>
            <div className={'premium-decoration premium-decoration-'+c.illustration} aria-hidden="true">
              {c.illustration==='orbit' ? <><div className="decoration-sphere"/><div className="sphere-ring"/></> :
               c.illustration==='cubes' ? <><span/><span/><span/><span/></> : <><span/><span/><span/></>}
            </div>
          </div>
        </Reveal>)}
      </div>
      <Reveal><div className="premium-stack"><span>MY TOOLKIT</span>
        <div>{['React','TypeScript','JavaScript','Node.js','Express','MongoDB','Tailwind CSS','Figma','Git'].map(x=><span key={x}>{x}</span>)}</div>
      </div></Reveal>
    </div>
  </section>;
}

function About() {
  return <section className="section about-section" id="about">
    <div className="container about-layout">
      <div>
        <SectionHeader eyebrow="03 / THE PERSON BEHIND THE WORK" title={<>A developer who<br/><em>thinks beyond code.</em></>}/>
        <Reveal><p className="about-lead">Hi, I'm Dhruvin — a developer and the founder of PixelAura Technologies. I turn ideas, business challenges and rough requirements into well-crafted digital experiences.</p></Reveal>
        <Reveal delay={.1}><p className="about-description">With over five years of personal development experience, I care just as much about how a product feels as how it works. I work directly on the details: structure, interfaces, responsiveness, functionality and a smooth path from idea to launch.</p></Reveal>
        <Reveal delay={.16}><a className="inline-link" href="#contact-form">Tell me what you're building <ArrowUpRight size={18}/></a></Reveal>
      </div>
      <Reveal className="about-aside" delay={.18}>
        <div className="about-monogram">d<span>.</span></div>
        <div className="about-aside-text">
          <div className="about-mini-label">MY APPROACH</div>
          <h3>Care in the details.<br/>Confidence in the result.</h3>
          <div className="approach-lines">
            {['Understand the actual business need', 'Design around clarity and ease of use', 'Build clean, responsive experiences', 'Refine until the details feel right'].map((x,i) => <div key={x}><span>0{i+1}</span><p>{x}</p><Check size={17}/></div>)}
          </div>
        </div>
      </Reveal>
    </div>
  </section>;
}

type ContactStatus = 'idle' | 'loading' | 'success' | 'error' | 'activation';
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<ContactStatus>('idle');
  const [honeypot, setHoneypot] = useState('');
  const [feedback, setFeedback] = useState('');

  const update = (field: 'name' | 'email' | 'message', value: string) => {
    setForm(current => ({ ...current, [field]: value }));
    if (status !== 'loading') { setStatus('idle'); setFeedback(''); }
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'loading') return;
    if (honeypot.trim()) return;

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (name.length < 2 || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setFeedback('Please enter your name, a valid email address and a message of at least 10 characters.');
      return;
    }

    setStatus('loading');
    setFeedback('');

    const service = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const emailJSReady = service && template && publicKey && ![service, template, publicKey].some(v => String(v).startsWith('YOUR_'));

    try {
      if (emailJSReady) {
        await emailjs.send(service, template, {
          name, from_name: name, from_email: email, reply_to: email, to_email: EMAIL,
          message: 'Email: ' + email + '\n\n' + message,
          time: new Date().toLocaleString()
        }, publicKey);
      } else {
        // Static-site transport. The recipient must activate FormSubmit once
        // before messages can be delivered; never treat an activation response
        // as a successfully sent customer enquiry.
        const response = await fetch('https://formsubmit.co/ajax/' + EMAIL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name, email, message,
            _subject: 'New portfolio enquiry from ' + name,
            _honey: honeypot,
            _captcha: 'false',
            _template: 'table'
          })
        });
        // The provider can respond with an HTML error page (or a blocked
        // request) instead of JSON. Never display markup as an error message.
        const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';
        if (!contentType.includes('application/json')) {
          throw new Error('Unexpected non-JSON response from the contact service');
        }
        const payload: unknown = await response.json();
        const result: { success?: unknown; message?: unknown } =
          payload !== null && typeof payload === 'object'
            ? payload as { success?: unknown; message?: unknown }
            : {};
        const accepted = result.success === true || result.success === 'true';
        if (!response.ok || !accepted) {
          // Check only the activation keywords; never render raw error text.
          const details = typeof result.message === 'string' ? result.message : '';
          if (/activat|verif|confirm/i.test(details)) {
            setStatus('activation');
            setFeedback('The contact form is awaiting one-time email verification by the website owner. Your message has not been delivered yet. Please try again after activation.');
            return;
          }
          throw new Error('Contact service did not confirm submission');
        }
      }

      setStatus('success');
      setFeedback('Your enquiry has been submitted. Thank you — I’ll be in touch.');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
      setFeedback('Your message was not sent. Please try again in a moment, or email me directly using the address below. Your form details have been kept.');
    }
  }

  return <section className="section contact-section" id="contact">
    <div className="container">
      <div className="contact-top"><Reveal>
        <div className="eyebrow"><span className="eyebrow-line"/>04 / LET'S MAKE SOMETHING GREAT</div>
        <h2>Have a project<br/><em>in mind?</em></h2>
        <p>Let's talk about the website, custom software or digital experience your business needs. Tell me what you're working on.</p>
        <a href="#contact-form" className="contact-email">Let's discuss your idea <ArrowUpRight size={21}/></a>
        <div className="premium-contact-perks">
          <div><span><Check size={15}/></span><strong>Direct communication</strong><small>Work with the developer</small></div>
          <div><span><Workflow size={15}/></span><strong>Thoughtful approach</strong><small>From concept to launch</small></div>
          <div><span><Globe2 size={15}/></span><strong>Business-focused</strong><small>Built around your goals</small></div>
        </div>
      </Reveal></div>
      <Reveal className="contact-form-wrap" delay={.1}>
        <div id="contact-form" className="contact-form-anchor">
          <div className="form-heading"><span>TELL ME ABOUT YOUR PROJECT</span><Send size={21}/></div>
          <form onSubmit={submit}>
            <input type="text" name="_honey" value={honeypot} onChange={e => setHoneypot(e.target.value)}
              className="contact-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="form-row">
              <label>Your name<input type="text" name="name" required minLength={2} maxLength={100} placeholder="How should I address you?" value={form.name} onChange={e => update('name', e.target.value)} autoComplete="name"/></label>
              <label>Your email<input type="email" name="email" required maxLength={160} placeholder="you@company.com" value={form.email} onChange={e => update('email', e.target.value)} autoComplete="email"/></label>
            </div>
            <label>Tell me about your project<textarea name="message" required minLength={10} maxLength={3000} rows={4} placeholder="A few details about what you need, your goals, or the problem you're trying to solve..." value={form.message} onChange={e => update('message', e.target.value)}/></label>
            <div className="form-bottom"><span>Send your enquiry directly from this page.</span><button type="submit" className="button button-primary" disabled={status === 'loading'}>{status === 'loading' ? <>Sending <LoaderCircle size={17} className="loading-icon"/></> : <>Send enquiry <ArrowUpRight size={18}/></>}</button></div>
            {status !== 'idle' && status !== 'loading' && <p role={status === 'error' || status === 'activation' ? 'alert' : 'status'}
              className={'form-status ' + (status === 'success' ? 'status-good' : 'status-error')}>
              {status === 'success' ? <CheckCircle2 size={17}/> : <AlertCircle size={17}/>} {feedback}
              {status === 'error' && <a className="contact-error-email" href={'mailto:' + EMAIL}>{EMAIL}</a>}
            </p>}
          </form>
        </div>
      </Reveal>
    </div>
  </section>;
}

function Footer() {
  return <footer className="footer">
    <div className="container">
      <div className="footer-top"><Mark small/><p>Thoughtful digital experiences.<br/>Built with purpose.</p><a href="#top" className="back-top">Back to top ↑</a></div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Dhruvin Tejani. All rights reserved.</span>
        <div><a href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18}/></a><a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18}/></a><a href={'mailto:' + EMAIL} aria-label="Email"><Mail size={18}/></a></div>
        <span>Designed & built with intention <span className="foot-star">✳</span></span>
      </div>
    </div>
  </footer>;
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content', theme === 'light' ? '#eceef8' : '#090a0e'
    );
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Browsers that restrict local storage still support theme switching.
    }
  }, [theme]);

  return <div className={'site-shell' + (theme === 'light' ? ' theme-light' : '')}>
    <AuroraBackground/>
    <Navigation theme={theme} onToggleTheme={() => setTheme(current => current === 'dark' ? 'light' : 'dark')}/>
    <main><Hero/><Work/><Expertise/><About/><Contact/></main>
    <Footer/>
  </div>;
}
