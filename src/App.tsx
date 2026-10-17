import { useEffect, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Check, CheckCircle2, Code2,
  Github, Globe2, Layers3, Linkedin, Mail, Menu, Monitor,
  Send, ShieldCheck, Sparkles, X, Workflow, AlertCircle, LoaderCircle
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
    category: 'Fashion / E-commerce',
    eyebrow: 'CLIENT WEBSITE · LIVE',
    headline: 'An engaging shopping experience with a clean visual story.',
    description: 'An e-commerce experience focused on presenting apparel beautifully, simplifying product discovery and maintaining a seamless responsive shopping interface.',
    services: ['E-commerce UI', 'Product Experience', 'Responsive Development'],
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

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
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

function Navigation() {
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
          <a className="nav-contact" href={'mailto:' + EMAIL + '?subject=Project%20enquiry'}>Let's talk <ArrowUpRight size={15}/></a>
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

function Mockup({ id }: { id: string }) {
  if (id === 'averon') return <div className="mockup mockup-averon">
    <div className="mock-nav"><strong>AVERON<span> FREIGHT</span></strong><span>OUR SERVICES　ABOUT　CONTACT</span></div>
    <div className="mock-main"><span>GLOBAL FREIGHT FORWARDING</span><h3>Connecting your cargo<br/>to global markets.</h3><i>EXPLORE OUR SERVICES　↗</i></div>
    <div className="mock-footer"><span>OCEAN FREIGHT</span><span>AIR FREIGHT</span><span>CUSTOMS</span></div>
  </div>;
  if (id === 'sreya') return <div className="mockup mockup-sreya">
    <div className="mock-nav"><strong>SREYA <span>DIGITAL WEAR</span></strong><span>SHOP　 COLLECTIONS　 CART</span></div>
    <div className="mock-sreya-body"><div className="fashion-art"><div className="fashion-orb"/><span>NEW SEASON</span></div><div className="fashion-copy"><small>THE COLLECTION / 2026</small><h3>Wear your<br/><em>own story.</em></h3><i>DISCOVER THE COLLECTION ↗</i></div></div>
  </div>;
  if (id === 'gudh') return <div className="mockup mockup-gudh">
    <div className="mock-nav"><strong>गूढ़ विद्यानुशासन केंद्र</strong><span>परिचय　 सेवाएँ　 संपर्क</span></div>
    <div className="mock-gudh-body"><span className="mandala">✺</span><small>ज्ञान • साधना • मार्गदर्शन</small><h3>प्राचीन ज्ञान,<br/>आधुनिक जीवन</h3><i>अधिक जानें　↗</i></div>
  </div>;
  return <div className="mockup mockup-workflow">
    <div className="dash-rail"><div className="dash-logo">W</div><span>▦</span><span>▤</span><span>◫</span><span>◷</span></div>
    <div className="dash-content"><div className="dash-top">Operations Overview <small>● LIVE WORKSPACE</small></div>
      <div className="dash-stats"><span><small>Active orders</small><b>128</b></span><span><small>In production</small><b>42</b></span><span><small>Ready to ship</small><b>18</b></span></div>
      <div className="dash-chart"><div className="dash-chart-head"><b>Production activity</b><small>Last 7 days</small></div><div className="dash-bars">{[37, 62, 49, 75, 59, 88, 70, 96, 65].map((n, i) => <i key={i} style={{ height: n + '%' }}/>)}</div></div>
    </div>
  </div>;
}

function ProjectPreview({ project, hero = false }: { project: Project; hero?: boolean }) {
  const [imageFailed, setImageFailed] = useState(false);
  const shot = project.url ? 'https://image.thum.io/get/width/1400/crop/920/noanimate/' + project.url : null;
  return <div className={'project-preview theme-' + project.id + (hero ? ' is-hero-preview' : '')}>
    <div className="preview-light preview-light-one"/><div className="preview-light preview-light-two"/>
    <div className="preview-browser">
      <div className="browser-toolbar">
        <div className="browser-dots"><span/><span/><span/></div>
        <div className="browser-url"><ShieldCheck size={10}/><span>{project.domain}</span></div>
        <div className="browser-menu"><span/><span/></div>
      </div>
      <div className="browser-content">
        <Mockup id={project.id}/>
        {shot && !imageFailed && <img src={shot} alt={'Website preview of ' + project.name} className="preview-screenshot"
          loading={hero ? 'eager' : 'lazy'} onError={() => setImageFailed(true)}/>}
      </div>
    </div>
    {!hero && <div className="preview-corner"><ArrowUpRight size={17}/></div>}
  </div>;
}

function Hero() {
  return <section className="hero-section" id="top">
    <div className="hero-grid" aria-hidden="true"/>
    <div className="hero-halo" aria-hidden="true"/>
    <div className="container hero-layout">
      <div className="hero-content">
        <Reveal><div className="availability"><span className="availability-dot"/> Available for select projects <span className="availability-line"/></div></Reveal>
        <Reveal delay={0.1}><div className="hero-kicker">INDEPENDENT DEVELOPER <span>/</span> DIGITAL CRAFTSMAN</div></Reveal>
        <Reveal delay={0.16}><h1>Websites that<br/><span>stand out.</span><br/>Software that<br/><em>works harder.</em></h1></Reveal>
        <Reveal delay={0.26}><p className="hero-description">I'm Dhruvin Tejani, a developer with <strong>5+ years of experience</strong> building thoughtful websites, custom web applications and digital experiences for real businesses.</p></Reveal>
        <Reveal delay={0.35}><div className="hero-ctas">
          <a className="button button-primary" href="#work">Explore selected work <ArrowUpRight size={18}/></a>
          <a className="button button-text" href="#contact">Let's work together <ArrowRight size={18}/></a>
        </div></Reveal>
        <Reveal delay={0.44}><div className="hero-proof">
          <div><strong>5<span>+</span></strong><span>Years building<br/>for the web</span></div>
          <div className="proof-divider"/><div><strong>03</strong><span>Featured live<br/>client websites</span></div>
          <div className="proof-divider"/><div><strong>100<span>%</span></strong><span>Custom-crafted<br/>approach</span></div>
        </div></Reveal>
      </div>
      <Reveal className="hero-art" delay={0.22}>
        <div className="hero-art-label"><span className="label-cross">✳</span> A SELECTION OF REAL WORK <span>↗</span></div>
        <div className="hero-feature-window"><ProjectPreview project={projects[0]} hero/></div>
        <div className="hero-float-card hero-float-top"><span><Sparkles size={15}/></span><div><strong>Thoughtful design</strong><small>Built with purpose</small></div></div>
        <div className="hero-float-card hero-float-bottom"><span><Code2 size={16}/></span><div><strong>Modern engineering</strong><small>Beautiful. Functional. Fast.</small></div></div>
        <div className="hero-art-footer"><span><span className="hero-index">01</span> / SELECTED CLIENT PROJECT</span><a href={projects[0].url} target="_blank" rel="noopener noreferrer">VIEW LIVE WEBSITE <ArrowUpRight size={14}/></a></div>
      </Reveal>
    </div>
    <div className="container hero-bottom"><span>SCROLL TO DISCOVER</span><ArrowDownRight size={17}/><span>DESIGNED TO MAKE AN IMPRESSION</span></div>
  </section>;
}

function SectionHeader({ eyebrow, title, description, right }: { eyebrow: string; title: React.ReactNode; description?: string; right?: React.ReactNode }) {
  return <Reveal><div className="section-heading">
    <div><div className="eyebrow"><span className="eyebrow-line"/>{eyebrow}</div><h2>{title}</h2>{description && <p>{description}</p>}</div>
    {right && <div className="section-heading-right">{right}</div>}
  </div></Reveal>;
}

function Work() {
  return <section id="work" className="section work-section">
    <div className="container">
      <SectionHeader eyebrow="01 / SELECTED WORK" title={<>Proof is in<br/><em>the projects.</em></>}
        description="A closer look at real websites I've delivered, alongside a software showcase that reflects the kind of business problems I enjoy solving." right={<span className="section-count">2024 — 2026 / PORTFOLIO</span>}/>
      <Reveal><article className="featured-project">
        <div className="featured-copy">
          <div className="project-meta"><span className="tiny-dot"/> {projects[0].eyebrow}</div>
          <div className="project-number">PROJECT / {projects[0].number}</div>
          <h3>{projects[0].name}</h3>
          <p className="featured-headline">{projects[0].headline}</p>
          <p className="project-description">{projects[0].description}</p>
          <div className="project-tags">{projects[0].services.map(x => <span key={x}>{x}</span>)}</div>
          <a className="project-link" href={projects[0].url} target="_blank" rel="noopener noreferrer">Explore live website <ArrowUpRight size={18}/></a>
        </div>
        <ProjectPreview project={projects[0]}/>
      </article></Reveal>
      <div className="projects-grid">
        {projects.slice(1).map((project, index) => <Reveal key={project.id} delay={index * 0.1}>
          <article className="project-card">
            <ProjectPreview project={project}/>
            <div className="card-details">
              <div className="project-meta"><span className="tiny-dot"/> {project.eyebrow}</div>
              <div className="card-title-line"><h3>{project.name}</h3><span>/{project.number}</span></div>
              <p className="card-headline">{project.headline}</p>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">{project.services.map(x => <span key={x}>{x}</span>)}</div>
              {project.url ? <a className="project-link" href={project.url} target="_blank" rel="noopener noreferrer">View live website <ArrowUpRight size={17}/></a> :
              <span className="project-note"><Monitor size={15}/> Interface concept — no public demo link</span>}
            </div>
          </article>
        </Reveal>)}
      </div>
      <Reveal className="work-bottom"><p>Each project is a combination of a specific problem, considered design and clean execution.</p><a href={'mailto:' + EMAIL + '?subject=Discuss%20a%20project'}>Have something similar in mind? <ArrowUpRight size={17}/></a></Reveal>
    </div>
  </section>;
}

const capabilities = [
  { number: '01', icon: Globe2, name: 'Websites that convert', description: 'Custom-designed, responsive business websites and commerce experiences that build trust and turn interest into conversations.', tags: 'CORPORATE · E-COMMERCE · LANDING PAGES' },
  { number: '02', icon: Workflow, name: 'Software that simplifies', description: 'Purpose-built web apps for business operations — from enquiry and quotation workflows to inventory, reporting and internal portals.', tags: 'PORTALS · WORKFLOWS · AUTOMATION' },
  { number: '03', icon: Layers3, name: 'Interfaces people enjoy', description: 'Thoughtful UI engineering that makes complex functionality feel straightforward, consistent and effortless to use.', tags: 'UI/UX · REACT · DESIGN SYSTEMS' }
];

function Expertise() {
  return <section className="section expertise-section" id="expertise">
    <div className="container">
      <SectionHeader eyebrow="02 / WHAT I DO" title={<>Good design.<br/><em>Even better function.</em></>}
        description="I focus on the work that makes a difference to a business: clarity, usability, performance and room to grow."/>
      <div className="capabilities">
        {capabilities.map((c, i) => <Reveal key={c.name} delay={i * .1}><div className="capability">
          <div className="capability-top"><span>{c.number} / 03</span><div className="capability-icon"><c.icon size={24} strokeWidth={1.5}/></div></div>
          <h3>{c.name}</h3><p>{c.description}</p><div className="capability-bottom">{c.tags} <ArrowUpRight size={18}/></div>
        </div></Reveal>)}
      </div>
      <Reveal><div className="stack-line">
        <span>THE TOOLKIT</span>
        <div>{['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Figma', 'Git'].map(x => <span key={x}>{x}</span>)}</div>
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
        <Reveal delay={.16}><a className="inline-link" href={'mailto:' + EMAIL + '?subject=Let%27s%20work%20together'}>Tell me what you're building <ArrowUpRight size={18}/></a></Reveal>
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

type ContactStatus = 'idle' | 'loading' | 'success' | 'error' | 'fallback';
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<ContactStatus>('idle');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'loading') return;
    const service = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!service || !template || !publicKey || service.startsWith('YOUR_')) {
      const subject = encodeURIComponent('Portfolio enquiry from ' + form.name);
      const body = encodeURIComponent('Name: ' + form.name + '\nEmail: ' + form.email + '\n\n' + form.message);
      window.location.href = 'mailto:' + EMAIL + '?subject=' + subject + '&body=' + body;
      setStatus('fallback');
      return;
    }
    setStatus('loading');
    try {
      await emailjs.send(service, template, {
        name: form.name, from_name: form.name, from_email: form.email,
        reply_to: form.email, to_email: EMAIL,
        message: 'Email: ' + form.email + '\n\n' + form.message,
        time: new Date().toLocaleString()
      }, publicKey);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  }
  return <section className="section contact-section" id="contact">
    <div className="container">
      <div className="contact-top"><Reveal>
        <div className="eyebrow"><span className="eyebrow-line"/>04 / LET'S MAKE SOMETHING GREAT</div>
        <h2>Have an idea?<br/><em>Let's make it real.</em></h2>
        <p>Need a website that earns trust or software that fixes a real problem? Tell me a little about it. I'll help you think through the next step.</p>
        <a href={'mailto:' + EMAIL} className="contact-email">{EMAIL} <ArrowUpRight size={21}/></a>
        <div className="contact-availability"><span className="availability-dot"/> OPEN TO RELEVANT PROJECT OPPORTUNITIES</div>
      </Reveal></div>
      <Reveal className="contact-form-wrap" delay={.1}>
        <div className="form-heading"><span>START A CONVERSATION</span><Send size={21}/></div>
        <form onSubmit={submit}>
          <div className="form-row">
            <label>Your name<input type="text" name="name" required minLength={2} maxLength={100} placeholder="How should I address you?" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}/></label>
            <label>Your email<input type="email" name="email" required maxLength={160} placeholder="you@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}/></label>
          </div>
          <label>Tell me about your project<textarea name="message" required minLength={10} maxLength={3000} rows={4} placeholder="A few details about what you need, your goals, or the problem you're trying to solve..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}/></label>
          <div className="form-bottom"><span>No lengthy forms. Just a good conversation.</span><button type="submit" className="button button-primary" disabled={status === 'loading'}>{status === 'loading' ? <>Sending <LoaderCircle size={17} className="loading-icon"/></> : <>Send enquiry <ArrowUpRight size={18}/></>}</button></div>
          {status === 'success' && <p role="status" className="form-status status-good"><CheckCircle2 size={17}/> Message sent. Thanks — I'll get back to you.</p>}
          {status === 'error' && <p role="alert" className="form-status status-error"><AlertCircle size={17}/> Sending failed. Please email me directly at <a href={'mailto:' + EMAIL}>{EMAIL}</a>.</p>}
          {status === 'fallback' && <p role="status" className="form-status">Your email application should open with the message filled in. If it doesn't, use the email address on the left.</p>}
        </form>
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
  return <div className="site-shell">
    <Navigation/>
    <main><Hero/><Work/><Expertise/><About/><Contact/></main>
    <Footer/>
  </div>;
}
