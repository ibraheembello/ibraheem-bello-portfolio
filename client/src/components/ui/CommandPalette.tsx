import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '@/contexts/LenisProvider';
import { HiSearch, HiHome, HiUser, HiCode, HiCollection, HiBriefcase, HiPencilAlt, HiMail, HiDocumentDownload, HiExternalLink } from 'react-icons/hi';

interface Command {
  id: string;
  label: string;
  section?: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const lenis = useLenis();

  const scrollTo = useCallback((id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    setTimeout(() => {
      if (lenis) lenis.scrollTo(el, { offset: -80 });
      else el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  }, [lenis]);

  const commands: Command[] = [
    { id: 'home', label: 'Home', section: 'Navigation', icon: <HiHome size={18} />, action: () => scrollTo('home') },
    { id: 'about', label: 'About Me', section: 'Navigation', icon: <HiUser size={18} />, action: () => scrollTo('about') },
    { id: 'skills', label: 'Skills & Technologies', section: 'Navigation', icon: <HiCode size={18} />, action: () => scrollTo('skills') },
    { id: 'projects', label: 'Featured Projects', section: 'Navigation', icon: <HiCollection size={18} />, action: () => scrollTo('projects') },
    { id: 'experience', label: 'Experience', section: 'Navigation', icon: <HiBriefcase size={18} />, action: () => scrollTo('experience') },
    { id: 'blog', label: 'Blog & Writing', section: 'Navigation', icon: <HiPencilAlt size={18} />, action: () => scrollTo('blog') },
    { id: 'contact', label: 'Contact', section: 'Navigation', icon: <HiMail size={18} />, action: () => scrollTo('contact') },
    { id: 'resume', label: 'Download Resume', section: 'Actions', icon: <HiDocumentDownload size={18} />, action: () => { setOpen(false); window.open('/api/resume/download', '_blank'); } },
    { id: 'github', label: 'GitHub Profile', section: 'Links', icon: <HiExternalLink size={18} />, action: () => { setOpen(false); window.open('https://github.com/ibraheembello', '_blank'); } },
    { id: 'linkedin', label: 'LinkedIn Profile', section: 'Links', icon: <HiExternalLink size={18} />, action: () => { setOpen(false); window.open('https://linkedin.com/in/ibraheem-bello-049b34287', '_blank'); } },
  ];

  const filtered = query
    ? commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
    : commands;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((s) => (s + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((s) => (s - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter' && filtered[selected]) {
      filtered[selected].action();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-[71] glass-strong rounded-2xl border border-glass-border shadow-2xl overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-glass-border">
              <HiSearch size={20} className="text-foreground-dim shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-foreground font-body text-sm outline-none placeholder:text-foreground-dim"
              />
              <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono text-foreground-dim bg-glass-light border border-glass-border">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[320px] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="text-center text-foreground-dim text-sm py-8 font-body">No results found</p>
              )}
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelected(i)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-body transition-colors ${
                    i === selected
                      ? 'bg-primary-600/20 text-foreground'
                      : 'text-foreground-muted hover:text-foreground'
                  }`}
                >
                  <span className={i === selected ? 'text-primary-400' : 'text-foreground-dim'}>{cmd.icon}</span>
                  <span className="flex-1">{cmd.label}</span>
                  {cmd.section && (
                    <span className="text-[10px] text-foreground-dim uppercase tracking-wider">{cmd.section}</span>
                  )}
                </button>
              ))}
            </div>

            {/* Footer hint */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-glass-border text-[10px] text-foreground-dim font-body">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-glass-light border border-glass-border font-mono">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-glass-light border border-glass-border font-mono">↵</kbd>
                  Select
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-glass-light border border-glass-border font-mono">Ctrl</kbd>
                +
                <kbd className="px-1.5 py-0.5 rounded bg-glass-light border border-glass-border font-mono">K</kbd>
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
