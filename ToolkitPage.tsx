// Toolkit Case Study Page - Static content with instant loading
// Displays the Toolkit project case study with portfolio styling

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Briefcase,
  Layers,
  Sun,
  Moon,
  Rocket,
  Quote
} from 'lucide-react';

interface ToolkitPageProps {
  onClose: () => void;
  systemTheme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const ToolkitPage: React.FC<ToolkitPageProps> = ({
  onClose,
  systemTheme,
  onToggleTheme
}) => {
  // Project metadata
  const projectMeta = {
    type: 'Product Design',
    scope: 'Web, App, Branding',
    phase: 'Zero to One',
    period: '2023-2025',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 overflow-y-auto ${
        systemTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#F5F5F7]'
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-xl border-b ${
          systemTheme === 'dark'
            ? 'bg-[#0a0a0a]/80 border-white/10'
            : 'bg-[#F5F5F7]/80 border-gray-200'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors ${
                systemTheme === 'dark'
                  ? 'hover:bg-white/10 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1
                className={`text-lg md:text-xl font-bold ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Toolkit
              </h1>
              <p
                className={`text-sm ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Case Study
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-full transition-colors ${
                systemTheme === 'dark'
                  ? 'hover:bg-white/10 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {systemTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* External link */}
            <a
              href="https://toolkit-app.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-colors ${
                systemTheme === 'dark'
                  ? 'hover:bg-white/10 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              title="Visit Toolkit"
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Hero Section - Title + Logo + Testimonial */}
        <section className="mb-12">
          <div className="grid md:grid-cols-5 gap-8 items-start">
            {/* Left Column - Title and Description */}
            <div className="md:col-span-3">
              {/* Meta tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Product Design, web, app, branding
                </span>
                <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  -
                </span>
                <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Zero to one
                </span>
                <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  -
                </span>
                <span className={`text-sm ${systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  2023-2025
                </span>
              </div>

              {/* Main Title */}
              <h1
                className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Designing construction management software that works
              </h1>

              {/* Subtitle */}
              <h2
                className={`text-xl md:text-2xl font-bold mb-6 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                From Prototype to 2,000 Customers
              </h2>

              {/* Description */}
              <p
                className={`text-base leading-relaxed ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Toolkit needed product design to secure funding and reach market fit in construction tech. Over 12 months, I led end-to-end design in a lean CEO-Dev-Designer team with continuous user validation. We shipped three major releases: funding prototype (3 months), feature-rich V2 (5 months), and mobile-optimized V3 (4 months). The product reached 2,000 paying customers within 24 months, secured enterprise adoption at launch, and raised Series A funding in November 2025.
              </p>
            </div>

            {/* Right Column - Logo + Testimonial */}
            <div className="md:col-span-2">
              {/* Testimonial Card */}
              <div
                className={`p-6 rounded-2xl border ${
                  systemTheme === 'dark'
                    ? 'bg-yellow-900/20 border-yellow-500/20'
                    : 'bg-yellow-50 border-yellow-200'
                }`}
              >
                <Quote
                  size={24}
                  className={`mb-4 ${
                    systemTheme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                  }`}
                />
                <p
                  className={`text-sm italic leading-relaxed mb-4 ${
                    systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Victor worked with Toolkit as our UX/UI designer from the earliest stages. We ran discovery workshops together before even building the product, allowing him to deeply understand the construction industry. He transformed complex business requirements into perfectly adapted user flows, exactly what a startup like ours needed. Thanks to his experience, Victor also established foundational systems (UI kit, interaction patterns) that saved us considerable development time down the line.
                </p>
                <div className="flex items-center space-x-3">
                  <img
                    src="/images/pierre-marie-nigay.png"
                    alt="Pierre-Marie Nigay"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Pierre-Marie Nigay
                    </p>
                    <p
                      className={`text-xs ${
                        systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      Founder @ Toolkit
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <figure className="mb-16">
          <div
            className={`rounded-2xl overflow-hidden border ${
              systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}
          >
            <img
              src="/images/toolkit/hero.webp"
              alt="Toolkit App Overview"
              className="w-full h-auto"
            />
          </div>
        </figure>

        {/* Overview Section */}
        <section className="mb-16">
          <h1
            className={`text-2xl md:text-3xl font-bold mb-2 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Overview
          </h1>
          <hr
            className={`mb-8 ${
              systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}
          />

          <div className="grid md:grid-cols-3 gap-8">
            {/* Introduction */}
            <div>
              <h2
                className={`text-lg font-bold mb-4 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Introduction
              </h2>
              <p
                className={`text-sm leading-relaxed mb-4 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Construction software is overwhelming. Legacy tools pack every feature into dense interfaces, forcing users through complex workflows to complete basic tasks. Site managers juggle multiple projects, field workers need quick status updates, and office teams require detailed planning. One interface cannot serve all needs equally.
              </p>
              <p
                className={`text-sm leading-relaxed ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Toolkit approached this differently. Rather than building another feature-complete solution, we focused on core workflows that construction teams use daily: planning tasks across zones, tracking progress, managing documents, coordinating teams. The challenge was delivering sophistication without complexity.
              </p>
            </div>

            {/* My Role */}
            <div>
              <h2
                className={`text-lg font-bold mb-4 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                My role
              </h2>
              <p
                className={`text-sm leading-relaxed ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                I joined as sole designer in a three-person team. The CEO brought domain expertise from years researching construction workflows. The lead developer built the technical foundation. My role: transform business requirements into a scalable product that users would actually adopt. No design team, no researchers, no product managers. Just tight collaboration, continuous validation, and rapid iteration.
              </p>
            </div>

            {/* Project and Impact */}
            <div>
              <h2
                className={`text-lg font-bold mb-4 ${
                  systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Project and impact
              </h2>
              <p
                className={`text-sm leading-relaxed mb-4 ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Over 12 months, we evolved from funding prototype to platform maturity. Each phase added sophistication while maintaining simplicity. Progressive disclosure hid complexity until needed. Context-aware interfaces adapted to user tasks. Batch operations reduced repetitive actions. Visual hierarchy prevented information overload at scale.
              </p>
              <p
                className={`text-sm leading-relaxed ${
                  systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                The approach worked. Enterprise customers deployed at launch. Users managing 15+ construction sites adopted the platform. The product reached 2,000 paying customers in 24 months and secured Series A funding. This case study shows how we got there.
              </p>
            </div>
          </div>
        </section>

        {/* Context and Approach Section */}
        <section className="mb-16">
          <h1
            className={`text-2xl md:text-3xl font-bold mb-6 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Context and approach
          </h1>

          <figure className="mb-8">
            <div
              className={`rounded-2xl overflow-hidden border ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img
                src="/images/toolkit/product-evolution.svg"
                alt="Product Evolution - 12 months roadmap"
                className="w-full h-auto"
              />
            </div>
          </figure>
        </section>

        {/* Divider */}
        <hr
          className={`my-12 ${
            systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`}
        />

        {/* Phase 1 - Foundation */}
        <section className="mb-16">
          <h1
            className={`text-2xl md:text-3xl font-bold mb-8 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Phase 1 - Foundation
          </h1>

          {/* 1st Time Experience */}
          <h2
            className={`text-xl md:text-2xl font-bold mb-6 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            1st time experience
          </h2>

          <figure className="mb-12">
            <div
              className={`rounded-2xl overflow-hidden border ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img
                src="/images/toolkit/chantier-detail.svg"
                alt="Chantier Detail v2"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>Chantier Detail v2</strong> - Removed the metadata informations to the edit view. We only kept contact information display at 1st sight.
            </figcaption>
          </figure>

          {/* Divider */}
          <hr
            className={`my-12 ${
              systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}
          />

          {/* Tasks */}
          <h2
            className={`text-xl md:text-2xl font-bold mb-6 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Tasks
          </h2>

          <figure className="mb-12">
            <div
              className={`rounded-2xl overflow-hidden border ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img
                src="/images/toolkit/tasks-list.svg"
                alt="Task creation interface"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>Task creation</strong> - Assisted task creation for quick addition and task setting for each phase of the project
            </figcaption>
          </figure>

          {/* Sequences */}
          <h2
            className={`text-xl md:text-2xl font-bold mb-6 ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Sequences
          </h2>

          <figure className="mb-8">
            <div
              className={`rounded-2xl overflow-hidden border ${
                systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <img
                src="/images/toolkit/tasks-sequence.svg"
                alt="Tasks sequences interface"
                className="w-full h-auto"
              />
            </div>
            <figcaption
              className={`mt-3 text-sm ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <strong>Tasks sequences</strong> - Templating is part of Toolkit DNA. So as to speed up the process of site planning, the construction planner can set and save task sequences in a library. When working on the planning canvas, the library helps you set the projects blocks in seconds.
            </figcaption>
          </figure>
        </section>

        {/* Project Meta Card - Bottom */}
        <div
          className={`p-6 rounded-3xl border mt-12 ${
            systemTheme === 'dark'
              ? 'bg-[#1D1D1F] border-white/10'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-xl ${
                  systemTheme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-50'
                }`}
              >
                <Layers
                  size={20}
                  className={
                    systemTheme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }
                />
              </div>
              <div>
                <p
                  className={`text-xs ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Type
                </p>
                <p
                  className={`text-sm font-medium ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {projectMeta.type}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-xl ${
                  systemTheme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-50'
                }`}
              >
                <Briefcase
                  size={20}
                  className={
                    systemTheme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                  }
                />
              </div>
              <div>
                <p
                  className={`text-xs ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Scope
                </p>
                <p
                  className={`text-sm font-medium ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {projectMeta.scope}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-xl ${
                  systemTheme === 'dark' ? 'bg-green-500/20' : 'bg-green-50'
                }`}
              >
                <Calendar
                  size={20}
                  className={
                    systemTheme === 'dark' ? 'text-green-400' : 'text-green-600'
                  }
                />
              </div>
              <div>
                <p
                  className={`text-xs ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Period
                </p>
                <p
                  className={`text-sm font-medium ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {projectMeta.period}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-xl ${
                  systemTheme === 'dark' ? 'bg-orange-500/20' : 'bg-orange-50'
                }`}
              >
                <Rocket
                  size={20}
                  className={
                    systemTheme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                  }
                />
              </div>
              <div>
                <p
                  className={`text-xs ${
                    systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Phase
                </p>
                <p
                  className={`text-sm font-medium ${
                    systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {projectMeta.phase}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default ToolkitPage;
