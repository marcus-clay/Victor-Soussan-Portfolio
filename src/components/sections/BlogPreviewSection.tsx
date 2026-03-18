import React from 'react';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import type { Signal, SignalCategory } from '@/data/signalsData';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '@/data/signalsData';

interface BlogPreviewSectionProps {
  lang: 'en' | 'fr';
  content: {
    signals: {
      title: string;
      subtitle: string;
      cta: string;
    };
  };
  featuredSignals: Signal[];
  onNavigate: (path: string) => void;
}

const BlogPreviewSection: React.FC<BlogPreviewSectionProps> = ({
  lang,
  content,
  featuredSignals,
}) => {
  return (
    <section className="py-16 md:py-32 px-6 md:px-10 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-[-0.02em] mb-4 md:mb-6 text-gray-900">
            {content.signals.title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-gray-500">
            {content.signals.subtitle}
          </p>
        </div>

        {/* 2-column grid of signal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 md:mb-12">
          {featuredSignals.slice(0, 2).map((signal) => {
            const title = lang === 'fr' ? signal.title_fr : signal.title_en;
            const body = lang === 'fr' ? signal.body_fr : signal.body_en;
            const categoryLabel = CATEGORY_LABELS[signal.category]?.[lang] ?? signal.category;
            const categoryColor = CATEGORY_COLORS[signal.category as SignalCategory];

            return (
              <Link
                key={signal.id}
                href={`/${lang}/signal/${signal.id}`}
                className="group bg-white border border-gray-100 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all duration-300"
              >
                {/* Category badge */}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${categoryColor?.bg ?? 'bg-gray-100'} ${categoryColor?.text ?? 'text-gray-700'}`}>
                  {categoryLabel}
                </span>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold tracking-[-0.02em] text-gray-900 mb-3 group-hover:text-[#2D5CF3] transition-colors">
                  {title}
                </h3>

                {/* Body excerpt */}
                <p className="text-base md:text-lg text-gray-600 leading-relaxed line-clamp-3 mb-4">
                  {body}
                </p>

                {/* Read more */}
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2D5CF3]">
                  {lang === 'fr' ? 'Lire la suite' : 'Read more'}
                  <ArrowRight size={14} weight="bold" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={`/${lang}/ressources`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium bg-[#2D5CF3] text-white hover:bg-[#2450d9] shadow-sm hover:shadow-md transition-all"
          >
            {content.signals.cta}
            <ArrowRight size={18} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
