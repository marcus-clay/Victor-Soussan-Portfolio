// IframeModal - Full screen modal with embedded iframe
// Used for external project URLs (Condamine Apps, Learning, etc.)
// Falls back to a landing page when iframe embedding is blocked

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, RefreshCw, Globe, ArrowUpRight } from 'lucide-react';

interface IframeModalProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  title: string;
  url: string;
  lang?: 'en' | 'fr';
  subtitle?: string;
  description?: string;
  color?: 'blue' | 'amber' | 'purple' | 'pink';
}

const TRANSLATIONS = {
  en: {
    openInNewTab: 'Open in new tab',
    loading: 'Loading...',
    refresh: 'Refresh',
    cannotEmbed: 'This content cannot be displayed in an embedded view',
    openExternally: 'Open Website',
    securityNote: 'For security reasons, some websites prevent embedding. Click below to view the full content.',
  },
  fr: {
    openInNewTab: 'Ouvrir dans un nouvel onglet',
    loading: 'Chargement...',
    refresh: 'Actualiser',
    cannotEmbed: 'Ce contenu ne peut pas être affiché dans une vue intégrée',
    openExternally: 'Ouvrir le site',
    securityNote: 'Pour des raisons de sécurité, certains sites empêchent l\'intégration. Cliquez ci-dessous pour voir le contenu.',
  },
};

// Sites known to block iframe embedding
const BLOCKED_DOMAINS = [
  'notion.site',
  'notion.so',
  'bolt.host',
  'bolt.new',
];

const COLOR_CLASSES = {
  blue: {
    icon: 'text-blue-400',
    iconBg: 'bg-blue-500/20',
    button: 'bg-blue-600 hover:bg-blue-700',
    glow: 'from-blue-600/20',
  },
  amber: {
    icon: 'text-amber-400',
    iconBg: 'bg-amber-500/20',
    button: 'bg-amber-600 hover:bg-amber-700',
    glow: 'from-amber-600/20',
  },
  purple: {
    icon: 'text-purple-400',
    iconBg: 'bg-purple-500/20',
    button: 'bg-purple-600 hover:bg-purple-700',
    glow: 'from-purple-600/20',
  },
  pink: {
    icon: 'text-pink-400',
    iconBg: 'bg-pink-500/20',
    button: 'bg-pink-600 hover:bg-pink-700',
    glow: 'from-pink-600/20',
  },
};

export const IframeModal: React.FC<IframeModalProps> = ({
  onClose,
  systemTheme,
  title,
  url,
  lang = 'en',
  subtitle,
  description,
  color = 'blue',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const t = TRANSLATIONS[lang];
  const isDark = systemTheme === 'dark';
  const colors = COLOR_CLASSES[color];

  // Check if URL is from a known blocked domain
  useEffect(() => {
    const isKnownBlocked = BLOCKED_DOMAINS.some(domain => url.includes(domain));
    if (isKnownBlocked) {
      setIsBlocked(true);
      setIsLoading(false);
    }
  }, [url]);

  const handleRefresh = () => {
    if (!isBlocked) {
      setIsLoading(true);
      setIframeKey(prev => prev + 1);
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsBlocked(true);
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 z-[100] flex flex-col ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}
    >
      {/* Header - Glass effect */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl ${
          isDark ? 'bg-[#0a0a0a]/80' : 'bg-white/80'
        }`}
      >
        <div className="max-w-full mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Left - Title */}
          <div className="flex-1">
            <h1
              className={`text-lg md:text-xl font-bold truncate ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {title}
            </h1>
          </div>

          {/* Center - Actions */}
          <div className="flex-1 flex justify-center gap-2">
            {/* Refresh button - only show if not blocked */}
            {!isBlocked && (
              <button
                onClick={handleRefresh}
                className={`p-2 rounded-full transition-colors ${
                  isDark
                    ? 'text-gray-400 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title={t.refresh}
              >
                <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
              </button>
            )}

            {/* Open in new tab */}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <ExternalLink size={16} />
              <span className="hidden sm:inline">{t.openInNewTab}</span>
            </a>
          </div>

          {/* Right - Close button */}
          <div className="flex-1 flex justify-end pr-2.5">
            <button
              onClick={onClose}
              className={`relative p-3 rounded-full before:absolute before:inset-[-12px] before:content-[''] ${
                isDark
                  ? 'text-gray-300 hover:bg-white/10'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 relative overflow-hidden">
        {isBlocked ? (
          /* Fallback landing page when iframe is blocked */
          <div className={`h-full flex items-center justify-center ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}>
            <div className="max-w-lg mx-auto px-6 py-12 text-center">
              {/* Animated background glow */}
              <div className={`absolute inset-0 bg-gradient-radial ${colors.glow} to-transparent opacity-30 blur-3xl`} />

              {/* Icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className={`relative mx-auto mb-8 w-24 h-24 rounded-3xl ${colors.iconBg} flex items-center justify-center`}
              >
                <Globe size={48} className={colors.icon} />
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                {title}
              </motion.h2>

              {/* Subtitle */}
              {subtitle && (
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className={`text-lg mb-4 ${colors.icon}`}
                >
                  {subtitle}
                </motion.p>
              )}

              {/* Description */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
              >
                {description || t.securityNote}
              </motion.p>

              {/* CTA Button */}
              <motion.a
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg ${colors.button}`}
              >
                {t.openExternally}
                <ArrowUpRight size={20} />
              </motion.a>

              {/* URL preview */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`mt-6 text-xs font-mono truncate max-w-full ${isDark ? 'text-gray-600' : 'text-gray-400'}`}
              >
                {url}
              </motion.p>
            </div>
          </div>
        ) : (
          /* Iframe view */
          <>
            {/* Loading indicator */}
            {isLoading && (
              <div
                className={`absolute inset-0 flex items-center justify-center z-10 ${
                  isDark ? 'bg-[#0a0a0a]' : 'bg-white'
                }`}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t.loading}
                  </p>
                </div>
              </div>
            )}

            {/* Iframe */}
            <iframe
              key={iframeKey}
              src={url}
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </>
        )}
      </div>
    </motion.div>
  );
};

export default IframeModal;
