import { motion } from 'framer-motion';
import { useLenis } from '@/contexts/LenisProvider';
import { FaGithub, FaLinkedinIn, FaTwitter, FaDev } from 'react-icons/fa';
import { HiMail, HiHeart } from 'react-icons/hi';

const socialLinks = [
  { icon: <FaGithub size={20} />, href: 'https://github.com/ibraheembello', label: 'GitHub' },
  { icon: <FaLinkedinIn size={20} />, href: 'https://linkedin.com/in/ibraheem-bello-049b34287', label: 'LinkedIn' },
  { icon: <FaTwitter size={20} />, href: 'https://x.com/Officialibrosky', label: 'Twitter' },
  { icon: <FaDev size={20} />, href: 'https://dev.to/ibraheembello', label: 'Dev.to' },
  { icon: <HiMail size={20} />, href: 'mailto:belloibrahimolawale@gmail.com', label: 'Email' },
];

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const lenis = useLenis();

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -80 });
      else el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-glass-border" role="contentinfo">
      <div className="neon-line" />

      <div className="container-max px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-3 gap-10 items-start">
          {/* Logo & tagline */}
          <div>
            <motion.button
              onClick={() => scrollTo('#home')}
              whileHover={{ scale: 1.05 }}
              className="text-xl font-heading font-bold gradient-text"
            >
              {'<IB />'}
            </motion.button>
            <p className="text-foreground-dim text-sm mt-3 font-body leading-relaxed">
              Building scalable solutions,<br />one API at a time.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-foreground text-sm font-heading font-semibold mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-foreground-muted text-sm font-body hover:text-foreground hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h4 className="text-foreground text-sm font-heading font-semibold mb-4 uppercase tracking-wider">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center
                             text-foreground-muted hover:text-foreground hover:border-primary-500/30
                             hover:shadow-glow transition-all duration-300"
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-glass-border text-center">
          <p className="text-foreground-dim text-sm font-body flex items-center justify-center gap-1">
            &copy; {new Date().getFullYear()} Ibraheem Bello. Crafted with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <HiHeart className="text-highlight-500 inline" size={14} />
            </motion.span>
            and clean code.
          </p>
        </div>
      </div>
    </footer>
  );
}
