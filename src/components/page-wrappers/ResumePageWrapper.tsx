'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DownloadSimple as Download,
  Copy,
  Envelope,
  Phone,
  LinkedinLogo,
  Globe,
  X,
} from '@phosphor-icons/react'
import { TRANSLATIONS } from '@/data/translations'

export default function ResumePageWrapper({ lang }: { lang: 'en' | 'fr' }) {
  const router = useRouter()
  const [resumeLang, setResumeLang] = useState<'fr' | 'en'>(lang)
  const [copiedResume, setCopiedResume] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [copiedLinkedin, setCopiedLinkedin] = useState(false)
  const [copiedPortfolio, setCopiedPortfolio] = useState(false)

  const resumeContent = TRANSLATIONS[resumeLang].resume

  const handleDownloadResume = useCallback(() => {
    const url = resumeLang === 'fr'
      ? 'https://docs.google.com/document/d/1DvCVcLllc-f7vD2sGni5sONVdyDY8hIG/edit?usp=sharing&ouid=102321755574001298179&rtpof=true&sd=true'
      : 'https://docs.google.com/document/d/1EOTBgcnhxcbxk6dYIt1ZAMrd9WqCceUY/edit?usp=sharing&ouid=102321755574001298179&rtpof=true&sd=true'
    window.open(url, '_blank')
  }, [resumeLang])

  const copyWithFeedback = useCallback(
    (text: string, setter: (v: boolean) => void) => {
      navigator.clipboard.writeText(text).then(() => {
        setter(true)
        setTimeout(() => setter(false), 2000)
      })
    },
    []
  )

  const handleCopyResume = useCallback(() => {
    const r = TRANSLATIONS[resumeLang].resume
    let text = `${r.title}\n${r.contact}\n\n`
    text += `${r.summary_title}\n${r.summary}\n\n`
    text += `${r.experience_title}\n`
    r.experience.forEach((exp) => {
      text += `\n${exp.period} | ${exp.role}\n${exp.company}\n`
      exp.achievements.forEach((ach) => (text += `\u2022 ${ach}\n`))
    })
    text += `\n${r.skills_title}\n${r.skills.join(', ')}\n\n`
    text += `${r.tools_title}\n${r.tools}\n\n`
    text += `${r.education_title}\n${r.education.join('\n')}\n\n`
    text += `${r.languages_title}\n${r.languages}`
    copyWithFeedback(text, setCopiedResume)
  }, [resumeLang, copyWithFeedback])

  const copiedLabel = resumeLang === 'fr' ? 'Copie !' : 'Copied!'

  return (
    <div className="min-h-screen bg-[#FDFDFC]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FCFCFD]/80 backdrop-blur-xl border-b border-gray-100">
        <div className="w-full max-w-5xl mx-auto px-6 sm:px-8 py-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 tracking-[-0.02em]">
                {resumeLang === 'fr' ? 'CV' : 'Resume'}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">Product Design Lead</p>
            </div>
            <button
              onClick={() => router.back()}
              className="relative p-3 hover:bg-gray-100 rounded-full transition-colors before:absolute before:inset-[-12px] before:content-['']"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            {/* Language Toggle */}
            <div className="relative flex items-center bg-gray-100 rounded-lg p-1">
              <motion.div
                className="absolute bg-gray-900 rounded-md"
                initial={false}
                animate={{
                  x: resumeLang === 'fr' ? 0 : '100%',
                  width: '50%',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 35,
                  mass: 0.8,
                }}
                style={{
                  height: 'calc(100% - 4px)',
                  top: '2px',
                  left: '2px',
                }}
              />
              <button
                onClick={() => setResumeLang('fr')}
                className={`relative z-10 px-4 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  resumeLang === 'fr' ? 'text-white' : 'text-gray-600'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setResumeLang('en')}
                className={`relative z-10 px-4 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  resumeLang === 'en' ? 'text-white' : 'text-gray-600'
                }`}
              >
                EN
              </button>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownloadResume}
              className="px-4 py-1.5 accent-blue text-white rounded-full text-xs font-medium btn-pill flex items-center gap-1.5"
            >
              <Download size={14} />
              {resumeContent.download_btn}
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopyResume}
              className="px-4 py-1.5 glass-effect text-gray-700 rounded-full text-xs font-medium btn-pill flex items-center gap-1.5"
            >
              <Copy size={14} />
              {copiedResume ? resumeContent.copied_message : resumeContent.copy_btn}
            </button>
          </div>
        </div>
      </header>

      {/* Resume Content */}
      <main className="max-w-5xl mx-auto bg-white border-x border-b border-gray-200/50">
        <div className="px-8 sm:px-12 py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={resumeLang}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Name & Title */}
              <div className="mb-10">
                <h1 className="text-3xl font-semibold text-gray-900 tracking-[-0.02em] mb-4">
                  {resumeContent.title}
                </h1>

                {/* Contact Info with Copy Buttons */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => copyWithFeedback('victorsoussan@gmail.com', setCopiedEmail)}
                    className="px-3 py-1.5 glass-effect text-gray-700 rounded-full text-xs font-medium btn-pill flex items-center gap-2 hover:text-blue-600"
                  >
                    <Envelope size={14} weight="bold" />
                    {copiedEmail ? (
                      <span className="text-green-600">{copiedLabel}</span>
                    ) : (
                      <>
                        victorsoussan@gmail.com
                        <Copy size={10} className="opacity-50" />
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => copyWithFeedback('+33 6 15 98 94 00', setCopiedPhone)}
                    className="px-3 py-1.5 glass-effect text-gray-700 rounded-full text-xs font-medium btn-pill flex items-center gap-2 hover:text-blue-600"
                  >
                    <Phone size={14} weight="bold" />
                    {copiedPhone ? (
                      <span className="text-green-600">{copiedLabel}</span>
                    ) : (
                      <>
                        +33 6 15 98 94 00
                        <Copy size={10} className="opacity-50" />
                      </>
                    )}
                  </button>

                  <button
                    onClick={() =>
                      copyWithFeedback('https://linkedin.com/in/victorsoussan', setCopiedLinkedin)
                    }
                    className="px-3 py-1.5 glass-effect text-gray-700 rounded-full text-xs font-medium btn-pill flex items-center gap-2 hover:text-blue-600"
                  >
                    <LinkedinLogo size={14} weight="bold" />
                    {copiedLinkedin ? (
                      <span className="text-green-600">{copiedLabel}</span>
                    ) : (
                      <>
                        LinkedIn
                        <Copy size={10} className="opacity-50" />
                      </>
                    )}
                  </button>

                  <button
                    onClick={() =>
                      copyWithFeedback('https://victorsoussan.com', setCopiedPortfolio)
                    }
                    className="px-3 py-1.5 glass-effect text-gray-700 rounded-full text-xs font-medium btn-pill flex items-center gap-2 hover:text-blue-600"
                  >
                    <Globe size={14} weight="bold" />
                    {copiedPortfolio ? (
                      <span className="text-green-600">{copiedLabel}</span>
                    ) : (
                      <>
                        Portfolio
                        <Copy size={10} className="opacity-50" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Professional Summary */}
              <section className="mb-10">
                <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">
                  {resumeContent.summary_title}
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {resumeContent.summary}
                </p>
              </section>

              {/* Professional Experience */}
              <section className="mb-10">
                <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-200">
                  {resumeContent.experience_title}
                </h2>
                <div className="space-y-6">
                  {resumeContent.experience.map((exp, idx) => (
                    <div
                      key={idx}
                      className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1 before:w-1.5 before:h-1.5 before:bg-gray-400 before:rounded-full"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">{exp.role}</h3>
                          <p className="text-xs text-gray-600 mt-0.5">{exp.company}</p>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-4 font-medium">
                          {exp.period}
                        </span>
                      </div>
                      <ul className="space-y-1.5 mt-2">
                        {exp.achievements.map((ach, i) => (
                          <li
                            key={i}
                            className="text-xs text-gray-700 leading-relaxed pl-3 relative before:content-['\2013'] before:absolute before:left-0 before:text-gray-400"
                          >
                            {ach}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills */}
              <section className="mb-10">
                <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">
                  {resumeContent.skills_title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {resumeContent.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Tools */}
              <section className="mb-10">
                <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">
                  {resumeContent.tools_title}
                </h2>
                <p className="text-xs text-gray-700 leading-relaxed">{resumeContent.tools}</p>
              </section>

              {/* Education */}
              <section className="mb-10">
                <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">
                  {resumeContent.education_title}
                </h2>
                <ul className="space-y-2">
                  {resumeContent.education.map((edu, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-gray-700 pl-3 relative before:content-['\2013'] before:absolute before:left-0 before:text-gray-400"
                    >
                      {edu}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Languages */}
              <section>
                <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">
                  {resumeContent.languages_title}
                </h2>
                <p className="text-xs text-gray-700">{resumeContent.languages}</p>
              </section>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
