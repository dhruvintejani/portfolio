export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const socialLinks = {
  github: 'https://github.com/dhruvintejani',
  linkedin: '#',
  email: 'mailto:dhruvintejani58242@gmail.com',
};

export const heroData = {
  headline: 'I build modern, fast, responsive web experiences.',
  subtext: 'React • TypeScript • Tailwind • UI Engineering',
  cta: { primary: 'View Projects', secondary: 'Download Resume' },
};

export const aboutData = {
  bio: 'I am a Frontend Developer with 3+ years of experience building modern, responsive, and high-performance web applications using React, TypeScript, JavaScript, HTML, CSS, and Tailwind CSS. I specialize in converting Figma designs into pixel-perfect scalable frontends and building clean reusable component architectures.',
  stats: [
    { value: '3+', label: 'Years Experience' },
    { value: 'React', label: '& TypeScript Specialist' },
    { value: 'UI', label: 'Performance-Focused Engineer' },
  ],
};

export const skillsData = {
  frontend: [
    { name: 'React', level: 92 },
    { name: 'TypeScript', level: 88 },
    { name: 'JavaScript', level: 90 },
    { name: 'Tailwind CSS', level: 95 },
    { name: 'HTML', level: 95 },
    { name: 'CSS', level: 93 },
  ],
  tools: [
    { name: 'Git', level: 85 },
    { name: 'Vercel', level: 88 },
    { name: 'Figma', level: 80 },
    { name: 'VS Code', level: 92 },
  ],
};

export const projectsData = [
  {
    id: 1,
    title: 'Shoply — React E-Commerce UI',
    description:
      'Modern responsive e-commerce frontend built using React and Tailwind CSS. Includes product listing UI, cart system interface, reusable components, responsive design, and optimized performance.',
    highlights: [
      'Component-based architecture',
      'Mobile-first responsive design',
      'Clean folder structure',
      'Optimized rendering',
      'Production-ready UI',
    ],
    tech: ['React', 'Tailwind CSS', 'JavaScript'],
    liveUrl: 'https://react-ecommerce-demo-three.vercel.app/',
    githubUrl: '#',
    image: '',
    emoji: '🛒',
  },
  {
    id: 2,
    title: 'Business Landing Page',
    description:
      'A clean, modern business landing page built with React and Tailwind CSS. Features responsive design, smooth animations, and optimized performance for a professional web presence.',
    highlights: [
      'Responsive layout design',
      'Modern UI components',
      'Performance optimized',
      'SEO-friendly structure',
      'Clean codebase',
    ],
    tech: ['React', 'Tailwind CSS', 'TypeScript'],
    liveUrl: '#',
    githubUrl: '#',
    image: '',
    emoji: '🏢',
  },
];

export const experienceData = [
  {
    title: 'Frontend Developer',
    type: 'Freelance',
    period: '2022 – Present',
    items: [
      'Built modern responsive e-commerce UI using React & Tailwind',
      'Designed scalable component architecture',
      'Implemented cart interface and responsive layout',
      'Ensured performance optimization and clean code standards',
      'Deployed production-ready frontend',
    ],
  },
];

export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
};
