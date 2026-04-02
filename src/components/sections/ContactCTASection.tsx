'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Copy, Check } from '@phosphor-icons/react';

interface ContactCTASectionProps {
  lang: 'en' | 'fr';
  content: {
    contact: {
      title: string;
      subtitle: string;
      email: string;
      copy_email: string;
      email_copied: string;
    };
  };
}

const EMAIL = 'victorsoussan@gmail.com';

const ContactCTASection: React.FC<ContactCTASectionProps> = ({
  lang,
  content,
}) => {
  const [copied, setCopied] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setTransitioning(true);
      // Brief blur bridge before swapping icon
      setTimeout(() => {
        setCopied(true);
        setTransitioning(false);
      }, 80);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setTransitioning(true);
        setTimeout(() => {
          setCopied(false);
          setTransitioning(false);
        }, 80);
      }, 2000);
    });
  }, []);

  return (
    <section className="py-24 md:py-40 px-6">
      <div className="max-w-[692px] mx-auto">
        <h2 className="text-base font-semibold tracking-[-0.01em] text-gray-900 mb-4">
          {content.contact.title}
        </h2>
        <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-8">
          {content.contact.subtitle}
        </p>

        <div className="flex items-center gap-6">
          <a
            href={`mailto:${EMAIL}`}
            className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors duration-150 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-500"
          >
            {content.contact.email}
          </a>

          <button
            onClick={handleCopy}
            className="text-sm text-gray-400 hover:text-gray-900 transition-colors duration-150 cursor-pointer"
          >
            <span className={`inline-flex items-center gap-1.5 transition-[filter,opacity] duration-100 ease-out ${transitioning ? 'blur-[2px] opacity-70' : ''}`}>
              {copied ? (
                <>
                  <Check size={14} className="text-gray-900" />
                  {content.contact.email_copied}
                </>
              ) : (
                <>
                  <Copy size={14} />
                  {content.contact.copy_email}
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactCTASection;
