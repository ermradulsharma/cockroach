'use client';

import React, { useState } from 'react';
import { Clipboard, Check } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  // Split text by fenced code blocks (fenced with triple backticks)
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="markdown-container" style={{ lineHeight: '1.6', fontSize: '0.975rem', color: 'var(--text-primary)' }}>
      {parts.map((part, index) => {
        if (part.startsWith('```')) {
          // Parse code block details
          const lines = part.split('\n');
          const firstLine = lines[0].replace('```', '').trim();
          const language = firstLine || 'code';
          const codeContent = lines.slice(1, lines.length - 1).join('\n');
          
          return (
            <CodeBlock key={index} language={language} code={codeContent} />
          );
        } else {
          // Parse standard paragraphs and inline elements
          return <RichText key={index} text={part} />;
        }
      })}
    </div>
  );
}

/* --- Code Block Syntax Highlighters (Zero Dependency & Safe) --- */
function highlightJS(code: string) {
  const tokens = code.split(/(\/\/.*$|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b(?:const|let|var|function|return|import|export|class|async|await|if|else|for|while|new|try|catch|finally|from|default|default_api|as)\b|\b\d+\b)/gm);
  return (
    <>
      {tokens.map((token, i) => {
        if (token.startsWith('//')) {
          return <span key={i} style={{ color: '#8b949e', fontStyle: 'italic' }}>{token}</span>;
        }
        if (token.startsWith('"') || token.startsWith("'") || token.startsWith('`')) {
          return <span key={i} style={{ color: '#a5d6ff' }}>{token}</span>;
        }
        if (/^(?:const|let|var|function|return|import|export|class|async|await|if|else|for|while|new|try|catch|finally|from|default|default_api|as)$/.test(token)) {
          return <span key={i} style={{ color: '#ff7b72', fontWeight: 'bold' }}>{token}</span>;
        }
        if (/^\d+$/.test(token)) {
          return <span key={i} style={{ color: '#d2a8ff' }}>{token}</span>;
        }
        return <span key={i}>{token}</span>;
      })}
    </>
  );
}

function highlightPython(code: string) {
  const tokens = code.split(/(#.*$|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b(?:def|class|return|import|from|if|else|elif|for|while|print|as|with|try|except|finally|in|and|or|not|is|lambda|None|True|False)\b|\b\d+\b)/gm);
  return (
    <>
      {tokens.map((token, i) => {
        if (token.startsWith('#')) {
          return <span key={i} style={{ color: '#8b949e', fontStyle: 'italic' }}>{token}</span>;
        }
        if (token.startsWith('"') || token.startsWith("'")) {
          return <span key={i} style={{ color: '#a5d6ff' }}>{token}</span>;
        }
        if (/^(?:def|class|return|import|from|if|else|elif|for|while|print|as|with|try|except|finally|in|and|or|not|is|lambda|None|True|False)$/.test(token)) {
          return <span key={i} style={{ color: '#ff7b72', fontWeight: 'bold' }}>{token}</span>;
        }
        if (/^\d+$/.test(token)) {
          return <span key={i} style={{ color: '#d2a8ff' }}>{token}</span>;
        }
        return <span key={i}>{token}</span>;
      })}
    </>
  );
}

function highlightBash(code: string) {
  const tokens = code.split(/(#.*$|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b(?:npm|run|dev|git|clone|commit|push|pull|add|checkout|status|cd|ls|curl|wget|pip|python|mkdir|rm|cp|mv|sudo|echo|cat|grep|node)\b)/gm);
  return (
    <>
      {tokens.map((token, i) => {
        if (token.startsWith('#')) {
          return <span key={i} style={{ color: '#8b949e', fontStyle: 'italic' }}>{token}</span>;
        }
        if (token.startsWith('"') || token.startsWith("'")) {
          return <span key={i} style={{ color: '#a5d6ff' }}>{token}</span>;
        }
        if (/^(?:npm|run|dev|git|clone|commit|push|pull|add|checkout|status|cd|ls|curl|wget|pip|python|mkdir|rm|cp|mv|sudo|echo|cat|grep|node)$/.test(token)) {
          return <span key={i} style={{ color: '#ff7b72', fontWeight: 'bold' }}>{token}</span>;
        }
        return <span key={i}>{token}</span>;
      })}
    </>
  );
}

function highlightJSON(code: string) {
  const tokens = code.split(/("(?:[^"\\]|\\.)*"\s*:|"(?:[^"\\]|\\.)*"|\b(?:true|false|null)\b|\b\d+\b)/g);
  return (
    <>
      {tokens.map((token, i) => {
        if (token.endsWith(':')) {
          return <span key={i} style={{ color: '#7ee787', fontWeight: '600' }}>{token}</span>;
        }
        if (token.startsWith('"')) {
          return <span key={i} style={{ color: '#a5d6ff' }}>{token}</span>;
        }
        if (/^(?:true|false|null)$/.test(token)) {
          return <span key={i} style={{ color: '#ff7b72', fontWeight: 'bold' }}>{token}</span>;
        }
        if (/^\d+$/.test(token)) {
          return <span key={i} style={{ color: '#d2a8ff' }}>{token}</span>;
        }
        return <span key={i}>{token}</span>;
      })}
    </>
  );
}

function highlightCode(code: string, language: string) {
  const lang = language.toLowerCase().trim();
  if (lang === 'js' || lang === 'javascript' || lang === 'ts' || lang === 'typescript') {
    return highlightJS(code);
  }
  if (lang === 'python' || lang === 'py') {
    return highlightPython(code);
  }
  if (lang === 'bash' || lang === 'sh' || lang === 'shell' || lang === 'terminal') {
    return highlightBash(code);
  }
  if (lang === 'json') {
    return highlightJSON(code);
  }
  return <span>{code}</span>;
}

/* --- Code Block Wrapper Component --- */
interface CodeBlockProps {
  language: string;
  code: string;
}

function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div 
      style={{
        margin: '1.2rem 0',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid var(--border-violet)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        background: '#0d1117'
      }}
    >
      {/* Code Header Bar */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 1rem',
          background: '#161b22',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          fontFamily: 'var(--font-secondary)',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)'
        }}
      >
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
          {language}
        </span>
        <button
          onClick={handleCopy}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.75rem',
            transition: 'color 0.2s',
            outline: 'none'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-green)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          {copied ? (
            <>
              <Check size={14} color="var(--accent-green)" />
              <span style={{ color: 'var(--accent-green)' }}>Copied</span>
            </>
          ) : (
            <>
              <Clipboard size={14} />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>
      
      {/* Pre/Code body */}
      <pre 
        style={{
          margin: 0,
          border: 'none',
          borderRadius: 0,
          background: 'none',
          padding: '1rem',
          overflowX: 'auto',
          fontFamily: 'Consolas, monospace'
        }}
      >
        <code style={{ color: '#c9d1d9', fontFamily: 'Consolas, monospace' }}>
          {highlightCode(code, language)}
        </code>
      </pre>
    </div>
  );
}

/* --- Inline Elements & Paragraphs Parser --- */
interface RichTextProps {
  text: string;
}

function RichText({ text }: RichTextProps) {
  if (!text) return null;

  const lines = text.split('\n');
  const renderedElements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let tableRows: string[][] = [];
  let isTable = false;

  const flushList = (key: number) => {
    if (listItems.length > 0 && listType) {
      const ListTag = listType;
      renderedElements.push(
        <ListTag key={`list-${key}`} style={{ paddingLeft: '1.8rem', margin: '0.8rem 0', color: 'var(--text-primary)' }}>
          {listItems.map((item, i) => (
            <li key={i} style={{ marginBottom: '0.4rem' }}>
              <InlineParser text={item} />
            </li>
          ))}
        </ListTag>
      );
      listItems = [];
      listType = null;
    }
  };

  const flushTable = (key: number) => {
    if (tableRows.length > 0) {
      const headers = tableRows[0];
      const rows = tableRows.slice(1);
      renderedElements.push(
        <div key={`table-${key}`} style={{ overflowX: 'auto', margin: '1rem 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {headers.map((h, i) => (
                  <th key={i} style={{ border: '1px solid var(--border-color)', padding: '0.6rem 0.8rem', background: 'var(--bg-bubble-user)', textAlign: 'left', fontWeight: '600' }}>
                    <InlineParser text={h.trim()} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} style={{ background: rowIndex % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} style={{ border: '1px solid var(--border-color)', padding: '0.6rem 0.8rem' }}>
                      <InlineParser text={cell.trim()} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      isTable = false;
    }
  };

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    const trimmed = line.trim();

    // Check if line is a table divider like |---|---|
    if (trimmed.startsWith('|') && trimmed.includes('-') && isTable) {
      continue;
    }

    // Check if it's a table row
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList(idx);
      isTable = true;
      const cells = trimmed.split('|').slice(1, -1);
      tableRows.push(cells);
      continue;
    } else if (isTable) {
      flushTable(idx);
    }

    // Header 1 (# Title)
    if (trimmed.startsWith('# ')) {
      flushList(idx);
      renderedElements.push(
        <h1 key={idx} style={{ fontSize: '1.75rem', fontWeight: '700', margin: '1.5rem 0 0.8rem', color: '#ffffff', fontFamily: 'var(--font-secondary)' }}>
          <InlineParser text={trimmed.substring(2)} />
        </h1>
      );
    }
    // Header 2 (## Subtitle)
    else if (trimmed.startsWith('## ')) {
      flushList(idx);
      renderedElements.push(
        <h2 key={idx} style={{ fontSize: '1.35rem', fontWeight: '600', margin: '1.3rem 0 0.7rem', color: '#f3f4f6', fontFamily: 'var(--font-secondary)' }}>
          <InlineParser text={trimmed.substring(3)} />
        </h2>
      );
    }
    // Header 3 (### Small header)
    else if (trimmed.startsWith('### ')) {
      flushList(idx);
      renderedElements.push(
        <h3 key={idx} style={{ fontSize: '1.15rem', fontWeight: '600', margin: '1.1rem 0 0.6rem', color: '#e5e7eb', fontFamily: 'var(--font-secondary)' }}>
          <InlineParser text={trimmed.substring(4)} />
        </h3>
      );
    }
    // Unordered List (- item or * item)
    else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (listType !== 'ul') {
        flushList(idx);
        listType = 'ul';
      }
      listItems.push(trimmed.substring(2));
    }
    // Ordered List (1. item)
    else if (/^\d+\.\s/.test(trimmed)) {
      if (listType !== 'ol') {
        flushList(idx);
        listType = 'ol';
      }
      const match = trimmed.match(/^\d+\.\s(.*)/);
      if (match) listItems.push(match[1]);
    }
    // Blockquote (> text)
    else if (trimmed.startsWith('> ')) {
      flushList(idx);
      renderedElements.push(
        <blockquote 
          key={idx} 
          style={{
            borderLeft: '4px solid var(--accent-violet)',
            padding: '0.4rem 1rem',
            margin: '0.8rem 0',
            color: 'var(--text-secondary)',
            background: 'rgba(139, 92, 246, 0.05)',
            fontStyle: 'italic',
            borderRadius: '0 4px 4px 0'
          }}
        >
          <InlineParser text={trimmed.substring(2)} />
        </blockquote>
      );
    }
    // Empty Line
    else if (trimmed === '') {
      flushList(idx);
      renderedElements.push(<div key={idx} style={{ height: '0.6rem' }} />);
    }
    // Paragraph
    else {
      flushList(idx);
      renderedElements.push(
        <p key={idx} style={{ margin: '0.7rem 0', color: 'var(--text-primary)', wordBreak: 'break-word', fontSize: '0.95rem' }}>
          <InlineParser text={line} />
        </p>
      );
    }
  }

  // Flush lists and tables
  flushList(lines.length);
  flushTable(lines.length);

  return <>{renderedElements}</>;
}

/* --- Inline Text elements Parser (Bold, Italics, Code) --- */
function InlineParser({ text }: { text: string }) {
  if (!text) return null;

  // Split by inline code blocks `code`
  const parts = text.split(/(`[^`]+`)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          const content = part.slice(1, -1);
          return (
            <code 
              key={index} 
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                padding: '0.15rem 0.35rem',
                borderRadius: '4px',
                color: 'var(--accent-green)',
                fontSize: '0.85em',
                fontFamily: 'Consolas, monospace'
              }}
            >
              {content}
            </code>
          );
        } else {
          return <BoldItalicParser key={index} text={part} />;
        }
      })}
    </>
  );
}

function BoldItalicParser({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} style={{ fontWeight: '700', color: '#ffffff' }}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={index} style={{ fontStyle: 'italic', color: 'var(--text-primary)' }}>{part.slice(1, -1)}</em>;
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
