'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Copy, Check } from '@phosphor-icons/react';
import HomeBlock from './HomeBlock';

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

/** French typography: a no-break space before : ; ? ! */
const frTypo = (s: string) => s.replace(/ ([:;?!])/g, ' $1');

const ContactCTASection: React.FC<ContactCTASectionProps> = ({ lang, content }) => {
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

  const typo = (s: string) => (lang === 'fr' ? frTypo(s) : s);

  return (
    <HomeBlock id="contact" title={typo(content.contact.title)}>
      <p className="text-lead-lg text-gray-600 max-w-[54ch]">{typo(content.contact.subtitle)}</p>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={`mailto:${EMAIL}`}
          className="btn-dark inline-flex min-h-11 items-center rounded-full bg-gray-900 px-6 text-sm font-medium text-white shadow-sm transition-[background-color,box-shadow,transform] duration-150 hover:bg-black hover:shadow-md active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          {content.contact.email}
        </a>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex min-h-11 items-center text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150 cursor-pointer"
        >
          <span
            className={`inline-flex items-center gap-1.5 transition-[filter,opacity] duration-100 ease-out ${transitioning ? 'blur-[2px] opacity-70' : ''}`}
          >
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
    </HomeBlock>
  );
};

export default ContactCTASection;
