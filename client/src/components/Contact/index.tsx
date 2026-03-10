import { useState, useId, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideInLeft, slideInRight } from '@/lib/animations/variants';
import { useScrollReveal } from '@/lib/animations/hooks';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { HiMail, HiLocationMarker, HiPhone } from 'react-icons/hi';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import ParallaxBg from '@/components/ui/ParallaxBg';

function FloatingInput({ label, value, onChange, type = 'text', ...props }: {
  label: string; value: string; onChange: (v: string) => void; type?: string;
  required?: boolean; minLength?: number; maxLength?: number;
}) {
  const id = useId();
  const hasValue = value.length > 0;
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-glass-light border border-glass-border
                   text-foreground font-body focus:outline-none focus:border-primary-500/50
                   focus:shadow-glow transition-all duration-300"
        {...props}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 font-body pointer-events-none
          ${hasValue ? 'top-1.5 text-[10px] text-primary-400' : 'top-3.5 text-sm text-foreground-dim'}
          peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary-400`}
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({ label, value, onChange, rows = 6, ...props }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number;
  required?: boolean; minLength?: number; maxLength?: number;
}) {
  const id = useId();
  const hasValue = value.length > 0;
  return (
    <div className="relative">
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        rows={rows}
        className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-glass-light border border-glass-border
                   text-foreground font-body focus:outline-none focus:border-primary-500/50
                   focus:shadow-glow transition-all duration-300 resize-none"
        {...props}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 font-body pointer-events-none
          ${hasValue ? 'top-1.5 text-[10px] text-primary-400' : 'top-3.5 text-sm text-foreground-dim'}
          peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary-400`}
      >
        {label}
      </label>
    </div>
  );
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

const contactInfo = [
  { icon: <HiMail size={22} />, label: 'Email', value: 'belloibrahimolawale@gmail.com', href: 'mailto:belloibrahimolawale@gmail.com' },
  { icon: <HiLocationMarker size={22} />, label: 'Location', value: 'Lagos, Nigeria' },
  { icon: <HiPhone size={22} />, label: 'Phone', value: '08065426444', href: 'tel:08065426444' },
];

const socials = [
  { icon: <FaGithub size={20} />, href: 'https://github.com/ibraheembello', label: 'GitHub' },
  { icon: <FaLinkedinIn size={20} />, href: 'https://linkedin.com/in/ibraheem-bello-049b34287', label: 'LinkedIn' },
  { icon: <FaTwitter size={20} />, href: 'https://x.com/Officialibrosky', label: 'Twitter' },
];

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const { ref, controls } = useScrollReveal();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.errors?.join(', ') || data.message || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again later.');
    }
  };

  return (
    <section id="contact" className="section-padding glow-contact relative">
      <ParallaxBg src="/images/backgrounds/bg-contact.webp" speed={0.2} overlay={0.85} />
      <div className="container-max relative z-10">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a project in mind or want to collaborate? I'd love to hear from you."
        />

        <div
          ref={ref}
          className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto"
        >
          {/* Contact info */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={slideInLeft}
            className="lg:col-span-2 space-y-6"
          >
            <GlassCard hover={false} className="space-y-6">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Let&apos;s Connect
              </h3>
              <p className="text-foreground-muted text-sm font-body leading-relaxed">
                Whether you have a question, a project idea, or just want to say hello,
                feel free to reach out. I&apos;m always open to new opportunities.
              </p>

              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-primary-400 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-foreground-dim font-body">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-foreground-secondary hover:text-foreground transition-colors font-body">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-foreground-secondary font-body">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="pt-4 border-t border-glass-border">
                <p className="text-xs text-foreground-dim font-body mb-3">Follow me</p>
                <div className="flex gap-3">
                  {socials.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -3 }}
                      className="w-10 h-10 rounded-xl glass flex items-center justify-center
                                 text-foreground-muted hover:text-foreground hover:shadow-glow transition-all duration-300"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={slideInRight}
            className="lg:col-span-3"
          >
            <GlassCard hover={false}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <FloatingInput
                    label="Your Name"
                    type="text"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    required
                    minLength={2}
                    maxLength={100}
                  />
                  <FloatingInput
                    label="Your Email"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    required
                  />
                </div>

                <FloatingTextarea
                  label="Your Message"
                  value={form.message}
                  onChange={(v) => setForm({ ...form, message: v })}
                  required
                  minLength={10}
                  maxLength={1000}
                  rows={6}
                />

                <div className="flex items-center justify-between">
                  <Button
                    variant="primary"
                    className={status === 'loading' ? 'opacity-70 pointer-events-none' : ''}
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>

                {/* Status messages */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      {/* Animated checkmark */}
                      <motion.svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="shrink-0"
                      >
                        <motion.circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="#4ade80"
                          strokeWidth="2"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                        <motion.path
                          d="M8 12l3 3 5-6"
                          stroke="#4ade80"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.3, delay: 0.5, ease: 'easeOut' }}
                        />
                      </motion.svg>
                      <p className="text-green-400 text-sm font-body">
                        Message sent successfully! I&apos;ll get back to you soon.
                      </p>
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-sm font-body"
                    >
                      {errorMsg}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
