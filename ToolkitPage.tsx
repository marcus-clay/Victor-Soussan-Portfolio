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
  Rocket
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
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Project Meta Card */}
        <div
          className={`p-6 rounded-3xl border mb-10 ${
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

        {/* Hero Image */}
        <figure className="mb-12">
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

          <figure className="mb-8">
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

          <figure className="mb-8">
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
      </main>
    </motion.div>
  );
};

export default ToolkitPage;
