// Toolkit Case Study Page - Syncs with Notion
// Displays the Toolkit project case study with portfolio styling

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  RefreshCw,
  ExternalLink,
  Calendar,
  Briefcase,
  Layers,
  Sun,
  Moon,
  Rocket
} from 'lucide-react';
import { ArrowsClockwise } from '@phosphor-icons/react';
import { fetchNotionPageWithCache, NotionPage, NOTION_PAGES, clearPageCache } from './notionService';
import NotionRenderer from './NotionRenderer';

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
  const [page, setPage] = useState<NotionPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadPage = async (forceRefresh = false) => {
    try {
      if (forceRefresh) {
        clearPageCache(NOTION_PAGES.TOOLKIT);
        setRefreshing(true);
      }
      setError(null);

      const pageData = await fetchNotionPageWithCache(NOTION_PAGES.TOOLKIT);
      setPage(pageData);
    } catch (err) {
      setError('Failed to load page. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPage();
  }, []);

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
                {page?.title || 'Toolkit'}
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
            {/* Refresh button */}
            <button
              onClick={() => loadPage(true)}
              disabled={refreshing}
              className={`p-2 rounded-full transition-colors ${
                systemTheme === 'dark'
                  ? 'hover:bg-white/10 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-600'
              } ${refreshing ? 'animate-spin' : ''}`}
              title="Refresh from Notion"
            >
              <RefreshCw size={20} />
            </button>

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

            {/* External link to Notion */}
            <a
              href={`https://victor-soussan.notion.site/Toolkit-${NOTION_PAGES.TOOLKIT}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-colors ${
                systemTheme === 'dark'
                  ? 'hover:bg-white/10 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              title="View in Notion"
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

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div
              className={`w-8 h-8 border-2 border-t-transparent rounded-full animate-spin ${
                systemTheme === 'dark' ? 'border-blue-400' : 'border-blue-600'
              }`}
            />
            <p
              className={`mt-4 ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Loading from Notion...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div
            className={`p-6 rounded-2xl border text-center ${
              systemTheme === 'dark'
                ? 'bg-red-900/20 border-red-500/30'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <p
              className={
                systemTheme === 'dark' ? 'text-red-400' : 'text-red-600'
              }
            >
              {error}
            </p>
            <button
              onClick={() => loadPage(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Page Content */}
        {!loading && !error && page && (
          <NotionRenderer blocks={page.blocks} systemTheme={systemTheme} />
        )}

        {/* Sync indicator */}
        {!loading && page && (
          <div
            className={`mt-12 pt-6 border-t text-center ${
              systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}
          >
            <p
              className={`text-xs ${
                systemTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`}
            >
              Synced from Notion - Click refresh to update
            </p>
          </div>
        )}
      </main>
    </motion.div>
  );
};

export default ToolkitPage;
