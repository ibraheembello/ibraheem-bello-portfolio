import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem, fadeUp } from '@/lib/animations/variants';
import SectionHeading from '@/components/ui/SectionHeading';
import SkillBadge from '@/components/ui/SkillBadge';
import type { SkillsData } from '@/types';

const categoryLabels: Record<string, { label: string; color: string }> = {
  languages: { label: 'Languages', color: 'from-primary-500 to-primary-700' },
  backend: { label: 'Backend & Frameworks', color: 'from-accent-500 to-accent-700' },
  databases: { label: 'Databases & ORMs', color: 'from-highlight-500 to-highlight-700' },
  tools: { label: 'DevOps & Tools', color: 'from-green-500 to-green-700' },
};

export default function Skills() {
  const [skills, setSkills] = useState<SkillsData | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('languages');

  useEffect(() => {
    fetch('/api/skills')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSkills(data.data);
      })
      .catch(console.error);
  }, []);

  if (!skills) return null;

  const categories = Object.keys(categoryLabels);

  return (
    <section id="skills" className="section-padding">
      <div className="container-max">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="The tools and technologies I use to bring ideas to life."
        />

        {/* Category tabs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-5 py-2.5 rounded-xl font-body text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'text-foreground'
                  : 'text-foreground-muted hover:text-foreground glass hover:bg-glass-strong'
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeSkillTab"
                  className={`absolute inset-0 bg-gradient-to-r ${categoryLabels[cat].color} opacity-20 rounded-xl border border-white/10`}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{categoryLabels[cat].label}</span>
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto"
          >
            {skills[activeCategory as keyof SkillsData].map((skill) => (
              <motion.div key={skill.name} variants={staggerItem}>
                <SkillBadge name={skill.name} level={skill.level} icon={skill.icon} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Level legend */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex justify-center gap-8 mt-10"
        >
          {['Advanced', 'Intermediate', 'Beginner'].map((level) => {
            const colors: Record<string, string> = {
              Advanced: 'from-primary-500 to-accent-500',
              Intermediate: 'from-accent-500 to-highlight-500',
              Beginner: 'from-highlight-500 to-primary-500',
            };
            return (
              <div key={level} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colors[level]}`} />
                <span className="text-xs text-foreground-dim font-body">{level}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
