import { motion } from 'framer-motion';
import { staggerItem } from '@/lib/animations/variants';
import { getSkillIcon, getSkillIconColor } from '@/lib/skillIcons';

interface SkillBadgeProps {
  name: string;
  level: string;
  icon?: string;
}

const levelColors: Record<string, string> = {
  Advanced: 'from-primary-500 to-accent-500',
  Intermediate: 'from-accent-500 to-highlight-500',
  Beginner: 'from-highlight-500 to-primary-500',
};

export default function SkillBadge({ name, level, icon }: SkillBadgeProps) {
  const IconComponent = icon ? getSkillIcon(icon) : null;
  const iconColor = icon ? getSkillIconColor(icon) : undefined;

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ scale: 1.08, y: -4 }}
      className="glass-card rounded-xl px-4 py-3 flex items-center gap-3 cursor-default
                 transition-all duration-300 hover:border-primary-500/30 hover:shadow-glow group"
    >
      {IconComponent ? (
        <IconComponent
          size={16}
          className="shrink-0 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
          style={iconColor ? { color: iconColor } : undefined}
        />
      ) : (
        <div
          className={`w-2 h-2 rounded-full shrink-0 bg-gradient-to-r ${levelColors[level] || levelColors.Beginner}`}
        />
      )}
      <span className="text-sm font-body text-foreground-secondary group-hover:text-foreground transition-colors">
        {name}
      </span>
    </motion.div>
  );
}
