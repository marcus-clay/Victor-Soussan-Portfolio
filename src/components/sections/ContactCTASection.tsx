'use client';

import React, { useState, useCallback } from 'react';
import { EnvelopeSimple, Copy, Check } from '@phosphor-icons/react';

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

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <section className="py-16 md:py-32 px-6 md:px-10 bg-[#FCFCFD]">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Victor photo */}
          <div className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden">
            <img
              src="/images/photos victor/image-victor-linkedin.png"
              alt="Victor Soussan"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Text + buttons */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.02em] text-gray-900 mb-4">
              {content.contact.title}
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
              {content.contact.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              {/* Primary: send email */}
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium bg-[#2D5CF3] text-white hover:bg-[#2450d9] shadow-sm hover:shadow-md transition-all"
              >
                <EnvelopeSimple size={18} weight="bold" />
                {content.contact.email}
              </a>

              {/* Secondary: copy email */}
              <button
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 shadow-sm transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={18} weight="bold" className="text-green-600" />
                    {content.contact.email_copied}
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    {content.contact.copy_email}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTASection;
