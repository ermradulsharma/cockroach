'use client';

import React from 'react';
import { User, Bot } from 'lucide-react';
import MarkdownRenderer from '../MarkdownRenderer';

interface MessageItemProps { role: 'user' | 'assistant'; content: string; isStreamingPlaceholder?: boolean; }

export default function MessageItem({ role, content, isStreamingPlaceholder = false }: MessageItemProps) {
    const isUser = role === 'user';

    return (
        <div style={{ display: 'flex', gap: '14px', alignSelf: isUser ? 'flex-end' : 'flex-start', maxWidth: '85%', animation: 'fadeIn 0.25s ease-out', flexDirection: isUser ? 'row-reverse' : 'row', }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: isUser ? 'rgba(139, 92, 246, 0.15)' : 'rgba(0, 255, 135, 0.12)', border: `1px solid ${isUser ? 'rgba(139, 92, 246, 0.25)' : 'rgba(0, 255, 135, 0.25)'}`, boxShadow: isUser ? 'none' : '0 0 10px rgba(0, 255, 135, 0.1)', }}>{isUser ? (<User size={16} color="var(--accent-violet)" />) : (<Bot size={16} color="var(--accent-green)" />)}</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start' }}>
                <div style={{ padding: '0.85rem 1.15rem', borderRadius: isUser ? '16px 16px 2px 16px' : '16px 16px 16px 2px', background: isUser ? 'var(--bg-bubble-user)' : 'var(--bg-bubble-ai)', border: `1px solid ${isUser ? 'rgba(255,255,255,0.03)' : 'var(--border-color)'}`, color: 'var(--text-primary)', boxShadow: isUser ? 'none' : '0 2px 10px rgba(0,0,0,0.2)', }}>
                    {isStreamingPlaceholder ? (<div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 0' }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-green)', animation: 'typing 1s infinite 0.1s' }} /><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-green)', animation: 'typing 1s infinite 0.2s' }} /><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-green)', animation: 'typing 1s infinite 0.3s' }} /></div>) : isUser ? (<p style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: '0.95rem', margin: 0 }}>{content}</p>) : (<MarkdownRenderer content={content} />)}
                </div>
            </div>
        </div>
    );
}
