import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  download?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  icon,
  download,
}: ButtonProps) {
  const styles = {
    primary: 'btn-primary',
    outline: 'btn-outline',
    ghost: 'px-6 py-2 text-foreground-secondary hover:text-foreground hover:bg-glass-light rounded-lg transition-all duration-300',
  };

  const content = (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${styles[variant]} inline-flex items-center justify-center ${className}`}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        download={download}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${styles[variant]} inline-flex items-center justify-center ${className}`}
    >
      {content}
    </motion.button>
  );
}
