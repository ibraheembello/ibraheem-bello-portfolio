import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/animations/variants';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import TiltCard from '@/components/ui/TiltCard';
import { HiClock, HiExternalLink } from 'react-icons/hi';
import { FaDev } from 'react-icons/fa';
import type { BlogPost } from '@/types';

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPosts(data.data);
      })
      .catch(console.error);
  }, []);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="section-padding glow-blog">
      <div className="container-max">
        <SectionHeading
          title="Blog & Writing"
          subtitle="Technical articles and insights from my engineering journey."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -1 : 1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <TiltCard className="h-full relative group" tiltMax={6}>
                <GlassCard glow="accent" className="h-full flex flex-col">
                  {/* Cover image */}
                  {post.coverImage && (
                    <div className="relative h-44 rounded-xl overflow-hidden mb-5 bg-gradient-to-br from-background-surface to-background-card">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                  )}

                  {/* No cover image fallback */}
                  {!post.coverImage && (
                    <div className="relative h-32 rounded-xl overflow-hidden mb-5 bg-gradient-to-br from-primary-900/40 via-accent-900/30 to-highlight-900/40 flex items-center justify-center">
                      <FaDev size={48} className="text-gray-600" />
                    </div>
                  )}

                  {/* Meta info */}
                  <div className="flex items-center gap-3 text-xs text-foreground-dim font-body mb-3">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                    <span className="flex items-center gap-1">
                      <HiClock size={12} />
                      {post.readingTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3 group-hover:text-accent-400 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-foreground-muted text-sm font-body leading-relaxed mb-5 flex-grow line-clamp-3">
                    {post.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-xs font-body bg-glass-light text-foreground-secondary border border-glass-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read more link */}
                  <div className="flex items-center gap-2 text-accent-400 text-sm font-body pt-4 border-t border-glass-border group-hover:text-accent-300 transition-colors">
                    <HiExternalLink size={16} />
                    Read on {post.platform}
                  </div>
                </GlassCard>
                </TiltCard>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Link to full blog */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <a
            href="https://dev.to/ibraheembello"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground text-sm font-body transition-colors duration-300"
          >
            <FaDev size={20} />
            View all articles on dev.to
          </a>
        </motion.div>
      </div>
    </section>
  );
}
