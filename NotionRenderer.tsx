// Notion Block Renderer Component
// Renders Notion blocks with portfolio styling (Inter font, dark/light mode, cards)

import React from 'react';
import { NotionBlock, RichText, extractPlainText } from './notionService';
import { Quote } from 'lucide-react';

interface NotionRendererProps {
  blocks: NotionBlock[];
  systemTheme: 'light' | 'dark';
}

interface RichTextRendererProps {
  richText: RichText[];
  systemTheme: 'light' | 'dark';
}

// Render rich text with annotations
const RichTextRenderer: React.FC<RichTextRendererProps> = ({ richText, systemTheme }) => {
  if (!richText || richText.length === 0) return null;

  return (
    <>
      {richText.map((text, index) => {
        let content: React.ReactNode = text.plain_text;

        // Apply annotations
        if (text.annotations.bold) {
          content = <strong key={`bold-${index}`}>{content}</strong>;
        }
        if (text.annotations.italic) {
          content = <em key={`italic-${index}`}>{content}</em>;
        }
        if (text.annotations.strikethrough) {
          content = <s key={`strike-${index}`}>{content}</s>;
        }
        if (text.annotations.underline) {
          content = <u key={`underline-${index}`}>{content}</u>;
        }
        if (text.annotations.code) {
          content = (
            <code
              key={`code-${index}`}
              className={`px-1.5 py-0.5 rounded text-sm font-mono ${
                systemTheme === 'dark'
                  ? 'bg-white/10 text-pink-400'
                  : 'bg-gray-100 text-pink-600'
              }`}
            >
              {content}
            </code>
          );
        }

        // Apply color
        if (text.annotations.color && text.annotations.color !== 'default') {
          const colorMap: Record<string, string> = {
            gray: systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500',
            brown: 'text-amber-700',
            orange: 'text-orange-500',
            yellow: 'text-yellow-500',
            green: 'text-green-500',
            blue: 'text-blue-500',
            purple: 'text-purple-500',
            pink: 'text-pink-500',
            red: 'text-red-500',
          };
          const colorClass = colorMap[text.annotations.color] || '';
          if (colorClass) {
            content = <span className={colorClass}>{content}</span>;
          }
        }

        // Apply link
        if (text.href) {
          content = (
            <a
              key={`link-${index}`}
              href={text.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 underline underline-offset-2"
            >
              {content}
            </a>
          );
        }

        return <React.Fragment key={index}>{content}</React.Fragment>;
      })}
    </>
  );
};

// Single block renderer
interface BlockRendererProps {
  block: NotionBlock;
  systemTheme: 'light' | 'dark';
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ block, systemTheme }) => {
  const renderChildren = (children: NotionBlock[]) => {
    if (!children || children.length === 0) return null;
    return (
      <div className="ml-4">
        {children.map((child) => (
          <BlockRenderer key={child.id} block={child} systemTheme={systemTheme} />
        ))}
      </div>
    );
  };

  switch (block.type) {
    case 'paragraph':
      const paragraphText = block.paragraph?.rich_text;
      if (!paragraphText || paragraphText.length === 0) {
        return <div className="h-4" />; // Empty paragraph = spacer
      }
      return (
        <p
          className={`text-base leading-relaxed mb-4 ${
            systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          <RichTextRenderer richText={paragraphText} systemTheme={systemTheme} />
        </p>
      );

    case 'heading_1':
      return (
        <h1
          className={`text-2xl md:text-3xl font-bold mb-6 mt-10 ${
            systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          <RichTextRenderer
            richText={block.heading_1?.rich_text}
            systemTheme={systemTheme}
          />
        </h1>
      );

    case 'heading_2':
      return (
        <h2
          className={`text-xl md:text-2xl font-bold mb-4 mt-8 ${
            systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          <RichTextRenderer
            richText={block.heading_2?.rich_text}
            systemTheme={systemTheme}
          />
        </h2>
      );

    case 'heading_3':
      return (
        <h3
          className={`text-lg md:text-xl font-semibold mb-3 mt-6 ${
            systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          <RichTextRenderer
            richText={block.heading_3?.rich_text}
            systemTheme={systemTheme}
          />
        </h3>
      );

    case 'bulleted_list_item':
      return (
        <li
          className={`text-base leading-relaxed mb-2 flex items-start ${
            systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          <span className="mr-2 mt-2 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
          <span>
            <RichTextRenderer
              richText={block.bulleted_list_item?.rich_text}
              systemTheme={systemTheme}
            />
          </span>
        </li>
      );

    case 'numbered_list_item':
      return (
        <li
          className={`text-base leading-relaxed mb-2 list-decimal ml-4 ${
            systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          <RichTextRenderer
            richText={block.numbered_list_item?.rich_text}
            systemTheme={systemTheme}
          />
        </li>
      );

    case 'to_do':
      const isChecked = block.to_do?.checked;
      return (
        <div className="flex items-start mb-2">
          <input
            type="checkbox"
            checked={isChecked}
            readOnly
            className="mt-1 mr-3 w-4 h-4"
          />
          <span
            className={`text-base ${isChecked ? 'line-through opacity-60' : ''} ${
              systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            <RichTextRenderer
              richText={block.to_do?.rich_text}
              systemTheme={systemTheme}
            />
          </span>
        </div>
      );

    case 'toggle':
      return (
        <details
          className={`mb-4 p-4 rounded-xl border ${
            systemTheme === 'dark'
              ? 'bg-white/5 border-white/10'
              : 'bg-gray-50 border-gray-200'
          }`}
        >
          <summary
            className={`font-medium cursor-pointer ${
              systemTheme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            <RichTextRenderer
              richText={block.toggle?.rich_text}
              systemTheme={systemTheme}
            />
          </summary>
          {block.children && renderChildren(block.children)}
        </details>
      );

    case 'callout':
      const calloutColor = block.callout?.color || 'default';
      const bgColorMap: Record<string, string> = {
        default_background: systemTheme === 'dark' ? 'bg-white/5' : 'bg-gray-50',
        gray_background: systemTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-100',
        brown_background: systemTheme === 'dark' ? 'bg-amber-900/30' : 'bg-amber-50',
        orange_background: systemTheme === 'dark' ? 'bg-orange-900/30' : 'bg-orange-50',
        yellow_background: systemTheme === 'dark' ? 'bg-yellow-900/30' : 'bg-yellow-50',
        green_background: systemTheme === 'dark' ? 'bg-green-900/30' : 'bg-green-50',
        blue_background: systemTheme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50',
        purple_background: systemTheme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-50',
        pink_background: systemTheme === 'dark' ? 'bg-pink-900/30' : 'bg-pink-50',
        red_background: systemTheme === 'dark' ? 'bg-red-900/30' : 'bg-red-50',
      };
      const bgClass = bgColorMap[calloutColor] || bgColorMap.default_background;

      return (
        <div
          className={`p-5 rounded-2xl mb-6 border ${bgClass} ${
            systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`}
        >
          <div className="flex items-start">
            {block.callout?.icon?.emoji && (
              <span className="text-2xl mr-3">{block.callout.icon.emoji}</span>
            )}
            {!block.callout?.icon && (
              <Quote
                size={20}
                className={`mr-3 mt-1 flex-shrink-0 ${
                  systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              />
            )}
            <div className="flex-1">
              <RichTextRenderer
                richText={block.callout?.rich_text}
                systemTheme={systemTheme}
              />
              {block.children && renderChildren(block.children)}
            </div>
          </div>
        </div>
      );

    case 'quote':
      return (
        <blockquote
          className={`border-l-4 pl-4 py-2 mb-4 italic ${
            systemTheme === 'dark'
              ? 'border-blue-500 text-gray-300'
              : 'border-blue-500 text-gray-600'
          }`}
        >
          <RichTextRenderer
            richText={block.quote?.rich_text}
            systemTheme={systemTheme}
          />
        </blockquote>
      );

    case 'divider':
      return (
        <hr
          className={`my-8 ${
            systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`}
        />
      );

    case 'image':
      const imageUrl =
        block.image?.type === 'file'
          ? block.image.file.url
          : block.image?.external?.url;
      const caption = block.image?.caption;

      return (
        <figure className="mb-6">
          <div
            className={`rounded-2xl overflow-hidden border ${
              systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}
          >
            <img
              src={imageUrl}
              alt={extractPlainText(caption) || 'Image'}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          {caption && caption.length > 0 && (
            <figcaption
              className={`mt-2 text-sm text-center ${
                systemTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <RichTextRenderer richText={caption} systemTheme={systemTheme} />
            </figcaption>
          )}
        </figure>
      );

    case 'video':
      const videoUrl =
        block.video?.type === 'file'
          ? block.video.file.url
          : block.video?.external?.url;

      return (
        <div
          className={`mb-6 rounded-2xl overflow-hidden border ${
            systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`}
        >
          <video src={videoUrl} controls className="w-full" />
        </div>
      );

    case 'code':
      return (
        <pre
          className={`p-4 rounded-xl mb-6 overflow-x-auto text-sm font-mono ${
            systemTheme === 'dark'
              ? 'bg-[#1a1a1a] text-gray-300'
              : 'bg-gray-900 text-gray-100'
          }`}
        >
          <code>
            {extractPlainText(block.code?.rich_text)}
          </code>
        </pre>
      );

    case 'column_list':
      const columns = block.children || [];
      const columnCount = columns.length;

      return (
        <div
          className={`grid gap-6 mb-6 ${
            columnCount === 2 ? 'md:grid-cols-2' :
            columnCount === 3 ? 'md:grid-cols-3' :
            'md:grid-cols-2'
          }`}
        >
          {columns.map((column: NotionBlock) => (
            <div key={column.id}>
              {column.children && (
                <NotionRenderer blocks={column.children} systemTheme={systemTheme} />
              )}
            </div>
          ))}
        </div>
      );

    case 'column':
      // Columns are rendered by column_list
      return null;

    case 'table':
      // Simplified table rendering
      return (
        <div
          className={`mb-6 overflow-x-auto rounded-xl border ${
            systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`}
        >
          <table className="w-full">
            <tbody>
              {block.children?.map((row: NotionBlock) => (
                <tr
                  key={row.id}
                  className={`border-b ${
                    systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  {row.table_row?.cells?.map((cell: RichText[], cellIndex: number) => (
                    <td
                      key={cellIndex}
                      className={`p-3 ${
                        systemTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      <RichTextRenderer richText={cell} systemTheme={systemTheme} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'bookmark':
      const bookmarkUrl = block.bookmark?.url;
      return (
        <a
          href={bookmarkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`block p-4 rounded-xl border mb-4 hover:shadow-lg transition-shadow ${
            systemTheme === 'dark'
              ? 'bg-white/5 border-white/10 hover:border-blue-500/50'
              : 'bg-gray-50 border-gray-200 hover:border-blue-300'
          }`}
        >
          <span className="text-blue-500 text-sm break-all">{bookmarkUrl}</span>
        </a>
      );

    case 'embed':
      const embedUrl = block.embed?.url;
      return (
        <div
          className={`mb-6 rounded-2xl overflow-hidden border ${
            systemTheme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`}
        >
          <iframe
            src={embedUrl}
            className="w-full h-96"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      );

    default:
      // Unknown block type - render nothing but log for debugging
      console.log('Unknown block type:', block.type);
      return null;
  }
};

// Main renderer component
export const NotionRenderer: React.FC<NotionRendererProps> = ({
  blocks,
  systemTheme,
}) => {
  return (
    <div className="notion-content">
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} systemTheme={systemTheme} />
      ))}
    </div>
  );
};

export default NotionRenderer;
