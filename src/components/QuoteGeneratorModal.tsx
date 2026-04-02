import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EMAILJS_CONFIG } from '../config/emailConfig';
import {
  CaretRight as ChevronRight,
  CheckCircle as CheckCircle2,
  Target,
  X,
  DownloadSimple as Download,
  Lightning as Zap,
  FileText,
  PaperPlaneTilt as Send,
  Upload,
  CheckSquare,
  Square,
  Clock,
  Check,
  ArrowRight,
  Rocket,
  HandHeart,
  ArrowsClockwise,
  ChatCircleDots,
  ChartLineUp,
} from '@phosphor-icons/react';

// --- Types ---

interface QuoteData {
  clientNeed: 'new-product' | 'optimize-existing' | 'long-term' | 'other' | '';
  projectStatus: 'early-stage' | 'scale-complex' | 'long-term-mission' | '';
  briefFile: File | null;
  briefFileName: string;
  briefFileSize: number;
  services: string[];
  needIdea: string;
  projectDescription: string;
  budget: string;
  startDate: string;
  endDate: string;
  name: string;
  email: string;
  company: string;
  phone: string;
}

const INITIAL_QUOTE_DATA: QuoteData = {
  clientNeed: '',
  projectStatus: '',
  briefFile: null,
  briefFileName: '',
  briefFileSize: 0,
  services: [],
  needIdea: '',
  projectDescription: '',
  budget: '',
  startDate: '',
  endDate: '',
  name: '',
  email: '',
  company: '',
  phone: '',
};

interface QuoteGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  systemTheme: string;
  lang: 'en' | 'fr';
  content: any;
  onToast: (message: string) => void;
}

export default function QuoteGeneratorModal({
  isOpen,
  onClose,
  systemTheme,
  lang,
  content,
  onToast,
}: QuoteGeneratorModalProps) {
  const [quoteStep, setQuoteStep] = useState(0);
  const [quoteData, setQuoteData] = useState<QuoteData>({ ...INITIAL_QUOTE_DATA });
  const [quoteValidationErrors, setQuoteValidationErrors] = useState<{[key: string]: string}>({});
  const [isQuoteSending, setIsQuoteSending] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [, setUploadProgress] = useState(0);

  // Pre-fill user data from localStorage when opening
  useEffect(() => {
    if (isOpen && quoteStep === 0) {
      const savedEmail = localStorage.getItem('user_email');
      const savedName = localStorage.getItem('user_name');
      if (savedEmail || savedName) {
        setQuoteData(prev => ({
          ...prev,
          email: savedEmail || '',
          name: savedName || '',
        }));
      }
    }
  }, [isOpen]);

  // Autosave quote data to localStorage
  useEffect(() => {
    if (isOpen && !quoteSuccess) {
      const hasData = quoteData.clientNeed || quoteData.services.length > 0 ||
                     quoteData.projectDescription || quoteData.name || quoteData.email;
      if (hasData) {
        localStorage.setItem('quoteDraft', JSON.stringify({ quoteData, quoteStep }));
      }
    }
  }, [quoteData, quoteStep, isOpen, quoteSuccess]);

  const handleClose = () => {
    const hasData = quoteData.clientNeed || quoteData.services.length > 0 ||
                   quoteData.projectDescription || quoteData.name || quoteData.email;
    if (hasData && !quoteSuccess && quoteStep > 0) {
      if (window.confirm(content.contact.quote_confirm_close)) {
        localStorage.setItem('quoteDraft', JSON.stringify({ quoteData, quoteStep }));
        onClose();
      }
    } else {
      onClose();
    }
  };

  const resetState = () => {
    setQuoteSuccess(false);
    setQuoteStep(0);
    setQuoteData({ ...INITIAL_QUOTE_DATA });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`absolute inset-0 backdrop-blur-md ${
          systemTheme === 'dark'
            ? 'bg-black/80'
            : 'bg-black/50'
        }`}
        onClick={handleClose}
      />

      {/* Modal Content - Fixed height */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`relative w-full max-w-4xl h-[85vh] flex flex-col backdrop-blur-2xl rounded-3xl shadow-2xl shadow-blue-600/5 border ${
          systemTheme === 'dark'
            ? 'bg-[#1D1D1F]/95 border-white/10'
            : 'bg-white/95 border-gray-200/50'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        {quoteStep > 0 && !quoteSuccess && (
          <div className={`flex-shrink-0 px-8 pt-6 pb-4 border-b ${
            systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                {/* Small Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-600/20 shadow-lg">
                  <img loading="lazy"
                    src={systemTheme === 'dark' ? '/images/victor_soussan_dark.webp' : '/images/victor-soussan.webp'}
                    alt="Victor Soussan"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title & Step */}
                <div>
                  <h2 id="quote-modal-title" className={`text-xl font-bold ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {lang === 'en' ? 'Project Estimate' : 'Estimation de Projet'}
                  </h2>
                  <p className={`text-sm ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {lang === 'en' ? `Step ${quoteStep} of 8` : `Étape ${quoteStep} sur 8`}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                aria-label="Close"
                className={`relative p-3 rounded-full transition-all duration-200 before:absolute before:inset-[-12px] before:content-[''] ${
                  systemTheme === 'dark'
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <X size={24} />
              </button>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className={`w-full h-1.5 rounded-full transition-all duration-300 ${
                    step <= quoteStep ? 'bg-[#2D5CF3]' : systemTheme === 'dark' ? 'bg-white/20' : 'bg-gray-200'
                  }`} />
                  {step < 8 && <div className="w-2" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {quoteStep === 0 && !quoteSuccess && (
          <div className="absolute top-6 right-2.5 z-20">
            <button
              onClick={() => onClose()}
              className={`relative p-3 backdrop-blur-xl rounded-full transition-all duration-200 before:absolute before:inset-[-12px] before:content-[''] ${
                systemTheme === 'dark'
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-gray-100/80 hover:bg-gray-200'
              }`}
            >
              <X size={24} />
            </button>
          </div>
        )}

        {/* Content Area - Scrollable with fixed height */}
        <div className="flex-1 overflow-y-auto px-8 py-8 pb-24">
          <AnimatePresence mode="wait">
            {/* Step 0: Welcome Screen */}
            {quoteStep === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="text-center py-12 px-8 max-w-3xl mx-auto"
              >
                {/* Portrait */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="mb-8 inline-block"
                >
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600/20 shadow-2xl shadow-blue-600/10 mx-auto">
                      <img loading="lazy"
                        src={systemTheme === 'dark' ? '/images/victor_soussan_dark.webp' : '/images/victor-soussan.webp'}
                        alt="Victor Soussan"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg" />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`text-4xl font-bold mb-4 ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {lang === 'en' ? 'Get Your Project Estimate' : 'Obtenez votre Estimation'}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`text-xl mb-10 leading-relaxed ${
                    systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {lang === 'en'
                    ? 'This quick questionnaire will help me understand your needs and provide a tailored response.'
                    : 'Ce questionnaire rapide m\'aidera à comprendre vos besoins et à vous proposer une réponse calibrée.'}
                </motion.p>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="grid md:grid-cols-3 gap-6 mb-12"
                >
                  <div className={`p-6 backdrop-blur-xl rounded-2xl border hover:shadow-lg hover:shadow-blue-600/10 transition-all duration-200 ${
                    systemTheme === 'dark'
                      ? 'bg-blue-900/20 border-blue-600/20'
                      : 'bg-blue-50/50 border-blue-100'
                  }`}>
                    <Clock className="w-8 h-8 text-blue-600 mb-3 mx-auto" />
                    <h3 className={`font-semibold mb-2 ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {lang === 'en' ? '5 minutes' : '5 minutes'}
                    </h3>
                    <p className={`text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {lang === 'en' ? 'Quick and easy' : 'Rapide et simple'}
                    </p>
                  </div>

                  <div className={`p-6 backdrop-blur-xl rounded-2xl border hover:shadow-lg hover:shadow-blue-600/10 transition-all duration-200 ${
                    systemTheme === 'dark'
                      ? 'bg-blue-900/20 border-blue-600/20'
                      : 'bg-blue-50/50 border-blue-100'
                  }`}>
                    <Target className="w-8 h-8 text-blue-600 mb-3 mx-auto" />
                    <h3 className={`font-semibold mb-2 ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {lang === 'en' ? 'Tailored estimate' : 'Estimation sur-mesure'}
                    </h3>
                    <p className={`text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {lang === 'en' ? 'Based on your needs' : 'Selon vos besoins'}
                    </p>
                  </div>

                  <div className={`p-6 backdrop-blur-xl rounded-2xl border hover:shadow-lg hover:shadow-blue-600/10 transition-all duration-200 ${
                    systemTheme === 'dark'
                      ? 'bg-blue-900/20 border-blue-600/20'
                      : 'bg-blue-50/50 border-blue-100'
                  }`}>
                    <Zap className="w-8 h-8 text-blue-600 mb-3 mx-auto" />
                    <h3 className={`font-semibold mb-2 ${
                      systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {lang === 'en' ? 'Fast response' : 'Réponse rapide'}
                    </h3>
                    <p className={`text-sm ${
                      systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {lang === 'en' ? 'Within 24 hours' : 'Sous 24 heures'}
                    </p>
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setQuoteStep(1)}
                  className="inline-flex items-center px-12 py-5 bg-[#2D5CF3] hover:bg-[#2450d9] text-white rounded-full font-semibold text-xl shadow-lg shadow-[#2D5CF3]/30 hover:shadow-xl hover:shadow-[#2D5CF3]/50 transition-all duration-200"
                >
                  {lang === 'en' ? 'Start Now' : 'Démarrer'}
                  <ArrowRight className="ml-2" size={24} />
                </motion.button>
              </motion.div>
            )}

            {/* Step 1: Client Need */}
            {quoteStep === 1 && !quoteSuccess && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.15 }}
                className="space-y-6 max-w-3xl mx-auto"
              >
                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {lang === 'en' ? 'What brings you here?' : 'Qu\'est-ce qui vous amène ?'}
                  </h3>
                  <p className={`text-base ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {lang === 'en' ? 'Select the option that best describes your need' : 'Sélectionnez l\'option qui décrit le mieux votre besoin'}
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      type: 'new-product' as const,
                      icon: <Rocket size={32} weight="duotone" />,
                      title: lang === 'en'
                        ? 'I want to create a new app, service, or prototype a new product'
                        : 'Je souhaite créer une nouvelle app, un nouveau service, prototyper un nouveau produit'
                    },
                    {
                      type: 'optimize-existing' as const,
                      icon: <ArrowsClockwise size={32} weight="duotone" />,
                      title: lang === 'en'
                        ? 'I need to optimize an existing product, refresh the UI, or simplify complex user journeys'
                        : 'Je dois optimiser un produit existant, rafraîchir l\'UI, ou simplifier des parcours devenus trop complexes'
                    },
                    {
                      type: 'long-term' as const,
                      icon: <HandHeart size={32} weight="duotone" />,
                      title: lang === 'en'
                        ? 'I\'m looking for a long-term partnership'
                        : 'Je recherche une mission long terme'
                    },
                    {
                      type: 'other' as const,
                      icon: <ChatCircleDots size={32} weight="duotone" />,
                      title: lang === 'en'
                        ? 'Other (I\'ll explain in the description)'
                        : 'Autre (je préciserai dans la description)'
                    }
                  ].map((option) => (
                    <motion.button
                      key={option.type}
                      onClick={() => {
                        setQuoteData({ ...quoteData, clientNeed: option.type });
                        setQuoteValidationErrors({ ...quoteValidationErrors, clientNeed: '' });
                      }}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full flex items-center space-x-4 p-5 border-2 rounded-2xl text-left transition-all duration-200 ${
                        quoteData.clientNeed === option.type
                          ? 'border-blue-600 bg-blue-50/70 shadow-lg shadow-blue-600/10'
                          : systemTheme === 'dark'
                            ? 'border-white/10 bg-white/5 hover:border-blue-600/50 hover:bg-blue-900/20'
                            : 'border-gray-200 bg-white/50 hover:border-blue-300 hover:bg-blue-50/30'
                      }`}
                    >
                      <div className={`flex-shrink-0 ${quoteData.clientNeed === option.type ? 'text-blue-600' : systemTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                        {option.icon}
                      </div>
                      <span className={`text-base font-medium leading-relaxed ${
                        systemTheme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                      }`}>{option.title}</span>
                    </motion.button>
                  ))}
                </div>

                {quoteValidationErrors.clientNeed && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600 text-center font-medium"
                  >
                    {quoteValidationErrors.clientNeed}
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* Step 2: Project Status */}
            {quoteStep === 2 && !quoteSuccess && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.15 }}
                className="space-y-6 max-w-3xl mx-auto"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {lang === 'en' ? 'What is your situation?' : 'Quelle est votre situation ?'}
                  </h3>
                  <p className="text-base text-gray-600">
                    {lang === 'en' ? 'This helps us understand where you are in your journey' : 'Cela nous aide à comprendre où vous en êtes dans votre parcours'}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    {
                      type: 'early-stage' as const,
                      icon: <Rocket size={40} weight="duotone" />,
                      title: lang === 'en' ? 'Early Stage Product' : 'Produit en phase de démarrage, early stage',
                      desc: lang === 'en' ? 'MVP, startup, or new product launch' : 'MVP, startup, ou lancement de nouveau produit'
                    },
                    {
                      type: 'scale-complex' as const,
                      icon: <ChartLineUp size={40} weight="duotone" />,
                      title: lang === 'en' ? 'Optimize & Scale' : 'Optimiser et scaler un produit complexe',
                      desc: lang === 'en' ? 'Improve existing product, increase performance' : 'Améliorer un produit existant, augmenter les performances'
                    },
                    {
                      type: 'long-term-mission' as const,
                      icon: <HandHeart size={40} weight="duotone" />,
                      title: lang === 'en' ? 'Long-term Mission' : 'Mission pour un engagement long terme',
                      desc: lang === 'en' ? 'Ongoing partnership, 6+ months commitment' : 'Partenariat continu, engagement 6+ mois'
                    }
                  ].map((option) => (
                    <motion.button
                      key={option.type}
                      onClick={() => {
                        setQuoteData({ ...quoteData, projectStatus: option.type });
                        setQuoteValidationErrors({ ...quoteValidationErrors, projectStatus: '' });
                      }}
                      whileHover={{ scale: 1.01, y: -2 }}
                      whileTap={{ scale: 0.99 }}
                      className={`p-6 border-2 rounded-2xl text-left transition-all duration-200 ${
                        quoteData.projectStatus === option.type
                          ? 'border-blue-600 bg-blue-50/70 shadow-lg shadow-blue-600/10'
                          : 'border-gray-200 bg-white/50 hover:border-blue-300 hover:bg-blue-50/30'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 ${quoteData.projectStatus === option.type ? 'text-blue-600' : 'text-gray-400'}`}>
                          {option.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900 mb-1">{option.title}</h4>
                          <p className="text-sm text-gray-600">{option.desc}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {quoteValidationErrors.projectStatus && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600 text-center font-medium"
                  >
                    {quoteValidationErrors.projectStatus}
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* Step 3: Upload Brief (Optional) */}
            {quoteStep === 3 && !quoteSuccess && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.15 }}
                className="space-y-6 max-w-2xl mx-auto"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {lang === 'en' ? 'Share your project brief' : 'Partagez votre brief de projet'}
                  </h3>
                  <p className="text-base text-gray-600">
                    {lang === 'en' ? 'Optional - Help us understand your project better' : 'Optionnel - Aidez-nous à mieux comprendre votre projet'}
                  </p>
                </div>

                {/* Upload Zone */}
                <div
                  className={`relative p-10 rounded-2xl border-2 border-dashed transition-all duration-200 text-center ${
                    isDragging
                      ? 'border-blue-600 bg-blue-50/70'
                      : quoteData.briefFile
                      ? 'border-green-400 bg-green-50/30'
                      : 'border-gray-300 bg-gray-50/50 hover:border-blue-400'
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const file = e.dataTransfer.files[0];
                    if (file) {
                      if (file.size > 3 * 1024 * 1024) {
                        setQuoteValidationErrors({ ...quoteValidationErrors, briefFile: content.contact.quote_validation_file_size });
                        return;
                      }
                      if (!file.name.match(/\.(pdf|docx)$/i)) {
                        setQuoteValidationErrors({ ...quoteValidationErrors, briefFile: content.contact.quote_validation_file_type });
                        return;
                      }
                      // Simulate upload progress
                      setIsUploading(true);
                      setUploadProgress(0);
                      const interval = setInterval(() => {
                        setUploadProgress(prev => {
                          if (prev >= 100) {
                            clearInterval(interval);
                            setIsUploading(false);
                            setQuoteData({ ...quoteData, briefFile: file, briefFileName: file.name, briefFileSize: file.size });
                            setQuoteValidationErrors({ ...quoteValidationErrors, briefFile: '' });
                            return 100;
                          }
                          return prev + 10;
                        });
                      }, 100);
                    }
                  }}
                >
                  {!quoteData.briefFile && !isUploading ? (
                    <>
                      <Upload className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                      <p className="text-lg font-semibold text-gray-900 mb-1">
                        {lang === 'en' ? 'Drag & drop your file here' : 'Glissez-déposez votre fichier ici'}
                      </p>
                      <p className="text-base text-gray-600 mb-5">
                        {lang === 'en' ? 'or browse from your computer' : 'ou parcourez depuis votre ordinateur'}
                      </p>
                      <label className="inline-block">
                        <input
                          type="file"
                          accept=".pdf,.docx"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 3 * 1024 * 1024) {
                                setQuoteValidationErrors({ ...quoteValidationErrors, briefFile: content.contact.quote_validation_file_size });
                                return;
                              }
                              // Simulate upload progress (faster)
                              setIsUploading(true);
                              setUploadProgress(0);
                              const interval = setInterval(() => {
                                setUploadProgress(prev => {
                                  if (prev >= 100) {
                                    clearInterval(interval);
                                    setIsUploading(false);
                                    setQuoteData({ ...quoteData, briefFile: file, briefFileName: file.name, briefFileSize: file.size });
                                    setQuoteValidationErrors({ ...quoteValidationErrors, briefFile: '' });
                                    return 100;
                                  }
                                  return prev + 20;
                                });
                              }, 50);
                            }
                          }}
                        />
                        <motion.span
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-5 py-2.5 bg-white border-2 border-[#2D5CF3] text-[#2D5CF3] rounded-full font-medium text-sm hover:bg-[#2D5CF3]/5 transition-all cursor-pointer inline-block btn-pill"
                        >
                          {lang === 'en' ? 'Browse Files' : 'Parcourir les fichiers'}
                        </motion.span>
                      </label>
                      <p className="text-xs text-gray-500 mt-3">
                        PDF or DOCX • Max 3MB
                      </p>
                    </>
                  ) : isUploading ? (
                    <div className="py-4">
                      <div className="w-16 h-16 mx-auto mb-3 relative">
                        <div className="w-full h-full rounded-full border-4 border-gray-200"></div>
                        <div
                          className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-blue-600 border-t-transparent animate-spin"
                          style={{ animationDuration: '0.8s' }}
                        ></div>
                      </div>
                      <p className="text-base font-semibold text-gray-900">
                        {lang === 'en' ? 'Uploading...' : 'Téléchargement...'}
                      </p>
                    </div>
                  ) : (
                    <div className="py-2">
                      <div className="flex items-center justify-center space-x-3 mb-3">
                        <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                          <Check className="w-7 h-7 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="text-base font-semibold text-gray-900">
                            {quoteData.briefFileName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {(quoteData.briefFileSize / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <motion.button
                        onClick={() => {
                          setQuoteData({ ...quoteData, briefFile: null, briefFileName: '', briefFileSize: 0 });
                          setUploadProgress(0);
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-5 py-2 bg-red-50 text-red-600 rounded-full text-sm font-semibold hover:bg-red-100 transition-all"
                      >
                        {lang === 'en' ? 'Remove File' : 'Supprimer le fichier'}
                      </motion.button>
                    </div>
                  )}
                </div>

                {quoteValidationErrors.briefFile && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600 text-center font-medium mt-4"
                  >
                    {quoteValidationErrors.briefFile}
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* Step 4: Services Selection */}
            {quoteStep === 4 && !quoteSuccess && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.15 }}
                className="space-y-6 max-w-3xl mx-auto"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{content.contact.quote_step_3_title}</h3>
                  <p className="text-base text-gray-600">
                    {lang === 'en' ? 'Select all services that apply to your project' : 'Sélectionnez tous les services qui s\'appliquent à votre projet'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    content.contact.quote_step_3_service_1,
                    content.contact.quote_step_3_service_2,
                    content.contact.quote_step_3_service_3,
                    content.contact.quote_step_3_service_4,
                    content.contact.quote_step_3_service_5,
                    content.contact.quote_step_3_service_6,
                    content.contact.quote_step_3_service_7,
                    content.contact.quote_step_3_service_8
                  ].map((service, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => {
                        const services = quoteData.services.includes(service)
                          ? quoteData.services.filter(s => s !== service)
                          : [...quoteData.services, service];
                        setQuoteData({ ...quoteData, services });
                        setQuoteValidationErrors({ ...quoteValidationErrors, services: '' });
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center space-x-4 p-5 border-2 rounded-2xl text-left transition-all duration-200 ${
                        quoteData.services.includes(service)
                          ? 'border-blue-600 bg-blue-50/70 shadow-lg shadow-blue-600/20 ring-2 ring-blue-600/20'
                          : 'border-gray-200 bg-white/50 hover:border-blue-400 hover:bg-blue-50/30 hover:shadow-lg'
                      }`}
                    >
                      {quoteData.services.includes(service) ? (
                        <CheckSquare size={28} className="text-blue-600 flex-shrink-0" />
                      ) : (
                        <Square size={28} className="text-gray-400 flex-shrink-0" />
                      )}
                      <span className="text-base font-semibold text-gray-900">{service}</span>
                    </motion.button>
                  ))}
                </div>

                {quoteValidationErrors.services && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600 text-center font-medium mt-4"
                  >
                    {quoteValidationErrors.services}
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* Step 5: Project Details */}
            {quoteStep === 5 && !quoteSuccess && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.15 }}
                className="space-y-6 max-w-3xl mx-auto"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{content.contact.quote_step_4_title}</h3>
                  <p className="text-base text-gray-600">
                    {lang === 'en' ? 'Tell us more about your vision and goals' : 'Parlez-nous de votre vision et de vos objectifs'}
                  </p>
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-3">
                    {content.contact.quote_step_4_need_label}
                  </label>
                  <textarea
                    value={quoteData.needIdea}
                    onChange={(e) => setQuoteData({ ...quoteData, needIdea: e.target.value })}
                    className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 transition-all duration-200 resize-none bg-white/50 backdrop-blur-xl"
                    rows={4}
                    placeholder={content.contact.quote_step_4_need_placeholder}
                  />
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-3">
                    {content.contact.quote_step_4_desc_label}
                  </label>
                  <textarea
                    value={quoteData.projectDescription}
                    onChange={(e) => {
                      setQuoteData({ ...quoteData, projectDescription: e.target.value });
                      if (e.target.value.length >= 50) {
                        setQuoteValidationErrors({ ...quoteValidationErrors, projectDescription: '' });
                      }
                    }}
                    className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 transition-all duration-200 resize-none bg-white/50 backdrop-blur-xl"
                    rows={6}
                    placeholder={content.contact.quote_step_4_desc_placeholder}
                  />
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-gray-600 font-medium">
                      {quoteData.projectDescription.length} {content.contact.quote_step_4_chars}
                    </span>
                    {quoteData.projectDescription.length < 50 && (
                      <span className="text-sm text-gray-500">{content.contact.quote_step_4_min_chars}</span>
                    )}
                  </div>
                  {quoteValidationErrors.projectDescription && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-600 font-medium mt-2"
                    >
                      {quoteValidationErrors.projectDescription}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 6: Timeline */}
            {quoteStep === 6 && !quoteSuccess && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.15 }}
                className="space-y-6 max-w-3xl mx-auto"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{lang === 'en' ? 'Timeline' : 'Planning'}</h3>
                  <p className="text-base text-gray-600">
                    {lang === 'en' ? 'Help us understand your timeline expectations' : 'Aidez-nous à comprendre vos délais'}
                  </p>
                </div>

                {/* Start/End Date fields removed */}
              </motion.div>
            )}

            {/* Step 7: Contact Information */}
            {quoteStep === 7 && !quoteSuccess && (
              <motion.div
                key="step7"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.15 }}
                className="space-y-6 max-w-3xl mx-auto"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{content.contact.quote_step_6_title}</h3>
                  <p className="text-base text-gray-600">
                    {lang === 'en' ? 'How can we reach you with your personalized estimate?' : 'Comment pouvons-nous vous joindre avec votre estimation personnalisée ?'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-semibold text-gray-900 mb-3">
                      {content.contact.quote_step_6_name_label}
                    </label>
                    <input
                      type="text"
                      value={quoteData.name}
                      onChange={(e) => {
                        setQuoteData({ ...quoteData, name: e.target.value });
                        setQuoteValidationErrors({ ...quoteValidationErrors, name: '' });
                        localStorage.setItem('user_name', e.target.value);
                      }}
                      className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 transition-all duration-200 bg-white/50 backdrop-blur-xl"
                      placeholder={content.contact.quote_step_6_name_placeholder}
                    />
                    {quoteValidationErrors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-600 font-medium mt-2"
                      >
                        {quoteValidationErrors.name}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-gray-900 mb-3">
                      {content.contact.quote_step_6_email_label}
                    </label>
                    <input
                      type="email"
                      value={quoteData.email}
                      onChange={(e) => {
                        setQuoteData({ ...quoteData, email: e.target.value });
                        setQuoteValidationErrors({ ...quoteValidationErrors, email: '' });
                        localStorage.setItem('user_email', e.target.value);
                      }}
                      className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 transition-all duration-200 bg-white/50 backdrop-blur-xl"
                      placeholder={content.contact.quote_step_6_email_placeholder}
                    />
                    {quoteValidationErrors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-600 font-medium mt-2"
                      >
                        {quoteValidationErrors.email}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-semibold text-gray-900 mb-3">
                      {content.contact.quote_step_6_company_label} <span className="text-gray-500 font-normal">({lang === 'en' ? 'Optional' : 'Optionnel'})</span>
                    </label>
                    <input
                      type="text"
                      value={quoteData.company}
                      onChange={(e) => setQuoteData({ ...quoteData, company: e.target.value })}
                      className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 transition-all duration-200 bg-white/50 backdrop-blur-xl"
                      placeholder={content.contact.quote_step_6_company_placeholder}
                    />
                  </div>

                  <div>
                    <label className="block text-base font-semibold text-gray-900 mb-3">
                      {content.contact.quote_step_6_phone_label} <span className="text-gray-500 font-normal">({lang === 'en' ? 'Optional' : 'Optionnel'})</span>
                    </label>
                    <input
                      type="tel"
                      value={quoteData.phone}
                      onChange={(e) => setQuoteData({ ...quoteData, phone: e.target.value })}
                      className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-2xl focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 transition-all duration-200 bg-white/50 backdrop-blur-xl"
                      placeholder={content.contact.quote_step_6_phone_placeholder}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 8: Review & Send */}
            {quoteStep === 8 && !quoteSuccess && (
              <motion.div
                key="step8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.15 }}
                className="space-y-6 max-w-3xl mx-auto"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{content.contact.quote_step_7_title}</h3>
                  <p className="text-base text-gray-600">
                    {lang === 'en' ? 'Review your information before sending' : 'Vérifiez vos informations avant d\'envoyer'}
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Client Need */}
                  <div className="p-5 bg-gradient-to-br from-blue-50/80 to-white rounded-2xl border border-blue-100/50 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-base font-bold text-gray-900">
                        {lang === 'en' ? 'Your Need' : 'Votre Besoin'}
                      </h4>
                      <button
                        onClick={() => setQuoteStep(1)}
                        className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                      >
                        {content.contact.quote_step_7_edit}
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {quoteData.clientNeed === 'new-product' && (lang === 'en'
                        ? 'I want to create a new app, service, or prototype a new product'
                        : 'Je souhaite créer une nouvelle app, un nouveau service, prototyper un nouveau produit')}
                      {quoteData.clientNeed === 'optimize-existing' && (lang === 'en'
                        ? 'I need to optimize an existing product, refresh the UI, or simplify user journeys'
                        : 'Je dois optimiser un produit existant, rafraîchir l\'UI d\'une app, faire évoluer les parcours')}
                      {quoteData.clientNeed === 'long-term' && (lang === 'en'
                        ? 'Long-term mission'
                        : 'Mission long terme')}
                      {quoteData.clientNeed === 'other' && (lang === 'en'
                        ? 'Other'
                        : 'Autre')}
                    </p>
                  </div>

                  {/* Project Status */}
                  <div className="p-5 bg-gradient-to-br from-purple-50/80 to-white rounded-2xl border border-purple-100/50 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-base font-bold text-gray-900">
                        {lang === 'en' ? 'Project Status' : 'Statut du Projet'}
                      </h4>
                      <button
                        onClick={() => setQuoteStep(2)}
                        className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                      >
                        {content.contact.quote_step_7_edit}
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {quoteData.projectStatus === 'early-stage' && (lang === 'en'
                        ? 'Early Stage Product - MVP, startup, or new product launch'
                        : 'Produit en phase de démarrage, early stage - MVP, startup, ou lancement')}
                      {quoteData.projectStatus === 'scale-complex' && (lang === 'en'
                        ? 'Optimize & Scale Complex Product'
                        : 'Optimiser et scaler un produit complexe')}
                      {quoteData.projectStatus === 'long-term-mission' && (lang === 'en'
                        ? 'Long-term Mission'
                        : 'Mission pour un engagement long terme')}
                    </p>
                  </div>

                  {/* Brief File */}
                  {quoteData.briefFile && (
                    <div className="p-5 bg-gradient-to-br from-green-50/80 to-white rounded-2xl border border-green-100/50 shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-base font-bold text-gray-900">{content.contact.quote_step_7_brief}</h4>
                        <button
                          onClick={() => setQuoteStep(3)}
                          className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                        >
                          {content.contact.quote_step_7_edit}
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText size={18} className="text-green-600" />
                        <p className="text-sm text-gray-700">{quoteData.briefFileName} <span className="text-gray-500">({(quoteData.briefFileSize / 1024).toFixed(1)} KB)</span></p>
                      </div>
                    </div>
                  )}

                  {/* Services */}
                  <div className="p-5 bg-gradient-to-br from-amber-50/80 to-white rounded-2xl border border-amber-100/50 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-base font-bold text-gray-900">{content.contact.quote_step_7_services}</h4>
                      <button
                        onClick={() => setQuoteStep(4)}
                        className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                      >
                        {content.contact.quote_step_7_edit}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {quoteData.services.map((service, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-white border border-amber-200 rounded-full text-sm text-gray-700 font-medium shadow-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-5 bg-gradient-to-br from-indigo-50/80 to-white rounded-2xl border border-indigo-100/50 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-base font-bold text-gray-900">{content.contact.quote_step_7_project_details}</h4>
                      <button
                        onClick={() => setQuoteStep(5)}
                        className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                      >
                        {content.contact.quote_step_7_edit}
                      </button>
                    </div>
                    <div className="space-y-3">
                      {quoteData.needIdea && (
                        <div>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{content.contact.quote_step_7_need}:</p>
                          <p className="text-sm text-gray-700 leading-relaxed">{quoteData.needIdea}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{content.contact.quote_step_7_description}:</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{quoteData.projectDescription}</p>
                      </div>
                    </div>
                  </div>

                  {/* Budget & Timeline */}
                  {(quoteData.budget || quoteData.startDate || quoteData.endDate) && (
                    <div className="p-5 bg-gradient-to-br from-rose-50/80 to-white rounded-2xl border border-rose-100/50 shadow-sm hover:shadow-md transition-all duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-base font-bold text-gray-900">{content.contact.quote_step_7_budget_timeline}</h4>
                        <button
                          onClick={() => setQuoteStep(6)}
                          className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                        >
                          {content.contact.quote_step_7_edit}
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {quoteData.budget && (
                          <div className="p-3 bg-white rounded-xl border border-rose-100">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{content.contact.quote_step_7_budget}</p>
                            <p className="text-sm font-semibold text-gray-900">{quoteData.budget}</p>
                          </div>
                        )}
                        {quoteData.startDate && (
                          <div className="p-3 bg-white rounded-xl border border-rose-100">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{content.contact.quote_step_7_start}</p>
                            <p className="text-sm font-semibold text-gray-900">{quoteData.startDate}</p>
                          </div>
                        )}
                        {quoteData.endDate && (
                          <div className="p-3 bg-white rounded-xl border border-rose-100">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{content.contact.quote_step_7_end}</p>
                            <p className="text-sm font-semibold text-gray-900">{quoteData.endDate}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="p-5 bg-gradient-to-br from-teal-50/80 to-white rounded-2xl border border-teal-100/50 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-base font-bold text-gray-900">{content.contact.quote_step_7_contact}</h4>
                      <button
                        onClick={() => setQuoteStep(7)}
                        className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                      >
                        {content.contact.quote_step_7_edit}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 bg-white rounded-xl border border-teal-100">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{lang === 'en' ? 'Name' : 'Nom'}</p>
                        <p className="text-sm font-semibold text-gray-900">{quoteData.name}</p>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-teal-100">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Email</p>
                        <p className="text-sm font-semibold text-gray-900">{quoteData.email}</p>
                      </div>
                      {quoteData.company && (
                        <div className="p-3 bg-white rounded-xl border border-teal-100">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{lang === 'en' ? 'Company' : 'Entreprise'}</p>
                          <p className="text-sm font-semibold text-gray-900">{quoteData.company}</p>
                        </div>
                      )}
                      {quoteData.phone && (
                        <div className="p-3 bg-white rounded-xl border border-teal-100">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{lang === 'en' ? 'Phone' : 'Téléphone'}</p>
                          <p className="text-sm font-semibold text-gray-900">{quoteData.phone}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <motion.button
                    onClick={async () => {
                      // Dynamic import jsPDF for code splitting
                      const { default: jsPDF } = await import('jspdf');
                      // Generate Professional PDF with Linear/Apple Style
                      const pdf = new jsPDF();
                      const pageWidth = pdf.internal.pageSize.getWidth();
                      const pageHeight = pdf.internal.pageSize.getHeight();
                      let y = 25;

                      // Colors - Linear/Apple style
                      const colors = {
                        black: [0, 0, 0] as const,
                        gray900: [17, 24, 39] as const,
                        gray700: [55, 65, 81] as const,
                        gray500: [107, 114, 128] as const,
                        gray300: [209, 213, 219] as const,
                        gray100: [243, 244, 246] as const,
                        blue: [59, 130, 246] as const,
                        white: [255, 255, 255] as const
                      };

                      // Title
                      pdf.setTextColor(...colors.black);
                      pdf.setFontSize(28);
                      pdf.setFont('helvetica', 'bold');
                      pdf.text(lang === 'en' ? 'Project Estimate Request' : 'Demande d\'Estimation de Projet', 20, y);
                      y += 8;

                      // Date
                      pdf.setFontSize(10);
                      pdf.setFont('helvetica', 'normal');
                      pdf.setTextColor(...colors.gray500);
                      const requestDate = new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      });
                      pdf.text(requestDate, 20, y);
                      y += 15;

                      // Divider line
                      pdf.setDrawColor(...colors.gray300);
                      pdf.setLineWidth(0.5);
                      pdf.line(20, y, pageWidth - 20, y);
                      y += 15;

                      // Contact Card - Victor's Information (Top Right)
                      const cardX = pageWidth - 75;
                      const cardY = 20;
                      const cardWidth = 55;
                      const cardHeight = 45;

                      // Card background
                      pdf.setFillColor(...colors.gray100);
                      pdf.roundedRect(cardX, cardY, cardWidth, cardHeight, 2, 2, 'F');

                      // Card border
                      pdf.setDrawColor(...colors.gray300);
                      pdf.setLineWidth(0.3);
                      pdf.roundedRect(cardX, cardY, cardWidth, cardHeight, 2, 2, 'S');

                      // Victor's info
                      pdf.setFontSize(9);
                      pdf.setFont('helvetica', 'bold');
                      pdf.setTextColor(...colors.black);
                      pdf.text('Victor Soussan', cardX + 3, cardY + 6);

                      pdf.setFontSize(7);
                      pdf.setFont('helvetica', 'normal');
                      pdf.setTextColor(...colors.gray700);
                      pdf.text('Senior Product Designer', cardX + 3, cardY + 10);

                      pdf.setFontSize(7);
                      pdf.setTextColor(...colors.gray500);
                      pdf.text('victorsoussan.fr', cardX + 3, cardY + 16);
                      pdf.text('victor@soussan.fr', cardX + 3, cardY + 20);
                      pdf.text('linkedin.com/in/victor-soussan', cardX + 3, cardY + 24);

                      // Blue accent line on card
                      pdf.setFillColor(...colors.blue);
                      pdf.rect(cardX, cardY, 2, cardHeight, 'F');

                      // Main content sections
                      // Section helper function
                      const addSection = (title: string, sectionContent: string, isFirst = false) => {
                        if (!isFirst) {
                          y += 10;
                          // Subtle divider
                          pdf.setDrawColor(...colors.gray300);
                          pdf.setLineWidth(0.3);
                          pdf.line(20, y, pageWidth - 95, y);
                          y += 10;
                        }

                        // Section title
                        pdf.setFontSize(10);
                        pdf.setFont('helvetica', 'bold');
                        pdf.setTextColor(...colors.gray900);
                        pdf.text(title, 20, y);
                        y += 7;

                        // Section content
                        pdf.setFontSize(10);
                        pdf.setFont('helvetica', 'normal');
                        pdf.setTextColor(...colors.gray700);
                        const lines = pdf.splitTextToSize(sectionContent, pageWidth - 100);
                        pdf.text(lines, 20, y);
                        y += lines.length * 5;
                      };

                      // Your Request
                      const clientNeedText = quoteData.clientNeed === 'new-product'
                        ? (lang === 'en' ? 'Create new app/service/prototype' : 'Créer nouvelle app/service/prototype')
                        : quoteData.clientNeed === 'optimize-existing'
                        ? (lang === 'en' ? 'Optimize existing product/refresh UI' : 'Optimiser produit existant/rafraîchir UI')
                        : quoteData.clientNeed === 'long-term'
                        ? (lang === 'en' ? 'Long-term mission' : 'Mission long terme')
                        : (lang === 'en' ? 'Other' : 'Autre');
                      addSection(lang === 'en' ? 'Your Request' : 'Votre Demande', clientNeedText, true);

                      // Project Status
                      const statusText = quoteData.projectStatus === 'early-stage'
                        ? (lang === 'en' ? 'Early Stage Product (MVP/Startup)' : 'Produit early stage (MVP/Startup)')
                        : quoteData.projectStatus === 'scale-complex'
                        ? (lang === 'en' ? 'Optimize & Scale Complex Product' : 'Optimiser et scaler produit complexe')
                        : (lang === 'en' ? 'Long-term Mission' : 'Mission long terme');
                      addSection(lang === 'en' ? 'Project Status' : 'Statut du Projet', statusText);

                      // Services
                      if (quoteData.services.length > 0) {
                        const servicesText = quoteData.services.join(', ');
                        addSection(lang === 'en' ? 'Services Requested' : 'Services Demandés', servicesText);
                      }

                      // Project Details
                      let projectDetails = '';
                      if (quoteData.needIdea) {
                        projectDetails += `${lang === 'en' ? 'Need/Idea' : 'Besoin/Idée'}: ${quoteData.needIdea}\n\n`;
                      }
                      projectDetails += quoteData.projectDescription;
                      addSection(lang === 'en' ? 'Project Details' : 'Détails du Projet', projectDetails);

                      // Budget & Timeline
                      if (quoteData.budget || quoteData.startDate || quoteData.endDate) {
                        let budgetText = '';
                        if (quoteData.budget) budgetText += `${lang === 'en' ? 'Budget' : 'Budget'}: ${quoteData.budget}`;
                        if (quoteData.startDate) budgetText += `\n${lang === 'en' ? 'Start' : 'Début'}: ${quoteData.startDate}`;
                        if (quoteData.endDate) budgetText += `\n${lang === 'en' ? 'End' : 'Fin'}: ${quoteData.endDate}`;
                        addSection(lang === 'en' ? 'Budget & Timeline' : 'Budget & Calendrier', budgetText);
                      }

                      // Client Contact
                      let contactText = `${quoteData.name}\n${quoteData.email}`;
                      if (quoteData.company) contactText += `\n${quoteData.company}`;
                      if (quoteData.phone) contactText += `\n${quoteData.phone}`;
                      if (quoteData.briefFile) contactText += `\n\n${lang === 'en' ? 'Brief File' : 'Fichier Brief'}: ${quoteData.briefFileName}`;
                      addSection(lang === 'en' ? 'Client Contact' : 'Contact Client', contactText);

                      // Footer
                      pdf.setFontSize(8);
                      pdf.setTextColor(...colors.gray500);
                      pdf.text(`Generated on ${requestDate}`, 20, pageHeight - 10);

                      pdf.save(`project-estimate-${quoteData.name.replace(/\s+/g, '-').toLowerCase()}.pdf`);
                    }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center space-x-2 px-5 py-2.5 border-2 border-[#2D5CF3] text-[#2D5CF3] rounded-full font-medium text-sm hover:bg-[#2D5CF3]/5 transition-all duration-200 btn-pill"
                  >
                    <Download size={16} />
                    <span>{content.contact.quote_step_7_download}</span>
                  </motion.button>

                  <motion.button
                    onClick={async () => {
                      setIsQuoteSending(true);
                      try {
                        // Send via EmailJS
                        const templateParams = {
                          from_name: quoteData.name,
                          from_email: quoteData.email,
                          company: quoteData.company || 'N/A',
                          phone: quoteData.phone || 'N/A',
                          client_need: quoteData.clientNeed || 'N/A',
                          project_status: quoteData.projectStatus || 'N/A',
                          services: quoteData.services.join(', '),
                          need_idea: quoteData.needIdea || 'N/A',
                          project_description: quoteData.projectDescription,
                          budget: quoteData.budget || 'N/A',
                          start_date: quoteData.startDate || 'N/A',
                          end_date: quoteData.endDate || 'N/A',
                          brief_attached: quoteData.briefFile ? `Yes - ${quoteData.briefFileName}` : 'No',
                          to_email: 'victorsoussan@gmail.com'
                        };

                        // Dynamic import emailjs for code splitting
                        const emailjs = await import('@emailjs/browser');

                        // Send email to Victor (quote request)
                        await emailjs.send(
                          EMAILJS_CONFIG.SERVICE_ID,
                          EMAILJS_CONFIG.TEMPLATE_ID,
                          templateParams,
                          EMAILJS_CONFIG.PUBLIC_KEY
                        );

                        // Send confirmation email to client
                        await emailjs.send(
                          EMAILJS_CONFIG.SERVICE_ID,
                          EMAILJS_CONFIG.CONFIRMATION_TEMPLATE_ID,
                          templateParams,
                          EMAILJS_CONFIG.PUBLIC_KEY
                        );

                        // Success
                        setQuoteSuccess(true);
                        localStorage.removeItem('quoteDraft');

                        // Auto-close after 5 seconds
                        setTimeout(() => {
                          onClose();
                          resetState();
                        }, 5000);
                      } catch (error) {
                        console.error('Failed to send quote:', error);
                        onToast('Failed to send quote. Please try again.');
                      } finally {
                        setIsQuoteSending(false);
                      }
                    }}
                    disabled={isQuoteSending}
                    whileHover={!isQuoteSending ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!isQuoteSending ? { scale: 0.98 } : {}}
                    className="flex-1 flex items-center justify-center space-x-2 px-5 py-2.5 accent-blue text-white rounded-full font-medium text-sm btn-pill shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isQuoteSending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{content.contact.simple_form_sending}</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>{content.contact.quote_step_7_send}</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Success State */}
            {quoteSuccess && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <CheckCircle2 size={48} className="text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{content.contact.quote_success_title}</h3>
                <p className="text-lg text-gray-600 mb-8">{content.contact.quote_success_message}</p>
                <motion.button
                  onClick={resetState}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2.5 accent-blue text-white rounded-full font-medium text-sm btn-pill shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/50 transition-all duration-200"
                >
                  {content.contact.quote_success_new}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation - Fixed */}
        {!quoteSuccess && quoteStep > 0 && (
          <div className="flex-shrink-0 relative z-20 bg-white/95 backdrop-blur-xl border-t border-gray-200 px-8 py-5 flex items-center justify-between shadow-lg shadow-gray-900/5">
            {quoteStep > 1 ? (
              <motion.button
                onClick={() => setQuoteStep(quoteStep - 1)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 px-5 py-2.5 border-2 border-gray-200 text-gray-900 rounded-full font-medium text-sm btn-pill hover:border-blue-600 hover:bg-blue-50/50 transition-all duration-200"
                style={{ pointerEvents: 'auto', position: 'relative', zIndex: 20 }}
              >
                <ChevronRight size={16} className="rotate-180" />
                <span>{content.contact.quote_back}</span>
              </motion.button>
            ) : (
              <div />
            )}

            <div className="flex items-center space-x-3">
              {quoteStep === 3 && (
                <motion.button
                  onClick={() => setQuoteStep(4)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 text-gray-600 hover:text-[#2D5CF3] font-semibold transition-colors"
                  style={{ pointerEvents: 'auto', position: 'relative', zIndex: 20 }}
                >
                  {content.contact.quote_skip}
                </motion.button>
              )}

              {quoteStep < 8 ? (
                <motion.button
                  onClick={() => {
                    // Validation
                    const errors: {[key: string]: string} = {};

                    if (quoteStep === 1 && !quoteData.clientNeed) {
                      errors.clientNeed = lang === 'en' ? 'Please select an option' : 'Veuillez sélectionner une option';
                    }

                    if (quoteStep === 2 && !quoteData.projectStatus) {
                      errors.projectStatus = lang === 'en' ? 'Please select your situation' : 'Veuillez sélectionner votre situation';
                    }

                    if (quoteStep === 4 && quoteData.services.length === 0) {
                      errors.services = content.contact.quote_validation_select_service;
                    }

                    if (quoteStep === 5 && quoteData.projectDescription.length < 50) {
                      errors.projectDescription = content.contact.quote_validation_min_chars;
                    }

                    if (quoteStep === 7) {
                      if (!quoteData.name) errors.name = content.contact.quote_validation_required;
                      if (!quoteData.email) {
                        errors.email = content.contact.quote_validation_required;
                      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quoteData.email)) {
                        errors.email = content.contact.quote_validation_email;
                      }
                    }

                    if (Object.keys(errors).length > 0) {
                      setQuoteValidationErrors(errors);
                      return;
                    }

                    setQuoteValidationErrors({});
                    setQuoteStep(quoteStep + 1);
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-2 px-8 py-3.5 bg-[#2D5CF3] hover:bg-[#2450d9] text-white rounded-full font-semibold shadow-lg shadow-[#2D5CF3]/25 hover:shadow-xl hover:shadow-[#2D5CF3]/40 transition-all duration-200"
                  style={{ pointerEvents: 'auto', position: 'relative', zIndex: 20 }}
                >
                  <span>{content.contact.quote_next}</span>
                  <ChevronRight size={18} />
                </motion.button>
              ) : null}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
