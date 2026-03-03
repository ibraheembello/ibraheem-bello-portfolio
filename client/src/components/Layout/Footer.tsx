import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

const socialLinks = [
  { icon: <FaGithub size={20} />, href: 'https://github.com/ibraheembello', label: 'GitHub' },
  { icon: <FaLinkedinIn size={20} />, href: 'https://linkedin.com/in/ibraheem-bello-049b34287', label: 'LinkedIn' },
  { icon: <FaTwitter size={20} />, href: 'https://x.com/Officialibrosky', label: 'Twitter' },
  { icon: <HiMail size={20} />, href: 'mailto:belloibrahimolawale@gmail.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-glass-border">
      {/* Gradient line on top */}
      <div className="neon-line" />

      <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & tagline */}
          <div className="text-center md:text-left">
            <span className="text-xl font-heading font-bold gradient-text">
              {'<IB />'}
            </span>
            <p className="text-foreground-dim text-sm mt-2 font-body">
              Building scalable solutions, one API at a time.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
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

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-glass-border text-center">
          <p className="text-foreground-dim text-sm font-body">
            &copy; {new Date().getFullYear()} Ibraheem Bello. Crafted with passion and clean code.
          </p>
        </div>
      </div>
    </footer>
  );
}
