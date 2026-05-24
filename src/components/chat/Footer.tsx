'use client';

import React from 'react';
import { Send, Square, ArrowDown } from 'lucide-react';

interface ChatFooterProps { input: string; setInput: (val: string) => void; isGenerating: boolean; autoScroll: boolean; onStopGeneration: () => void; onSend: () => void; onScrollToBottom: () => void; textareaRef: React.RefObject<HTMLTextAreaElement>; }

export default function ChatFooter({ input, setInput, isGenerating, autoScroll, onStopGeneration, onSend, onScrollToBottom, textareaRef }: ChatFooterProps) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <footer style={{ padding: '1.5rem', background: 'linear-gradient(0deg, var(--bg-chat) 70%, transparent 100%)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <div style={{ maxWidth: '800px', width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {!autoScroll && isGenerating && (<button onClick={onScrollToBottom} style={{ alignSelf: 'center', display: 'flex', alignItems: 'center', gap: '6px', padding: '0.4rem 0.8rem', borderRadius: '20px', background: 'var(--accent-violet)', border: 'none', color: '#ffffff', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)', transform: 'translateY(-10px)', transition: 'var(--transition-smooth)', zIndex: 15, }}><ArrowDown size={12} /><span>Auto-Scroll Paused</span></button>)}
                {isGenerating && (<button onClick={onStopGeneration} style={{ alignSelf: 'center', display: 'flex', alignItems: 'center', gap: '6px', padding: '0.5rem 1rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', transition: 'var(--transition-smooth)', marginBottom: '8px', outline: 'none', }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}><Square size={12} style={{ fill: '#ffffff' }} /><span>Stop Generating</span></button>)}
                <div className="chat-input-wrapper" style={{ position: 'relative', background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '8px 48px 8px 16px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', transition: 'var(--transition-smooth)', }}>
                    <textarea ref={textareaRef} rows={1} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask Cockroach Anything..." style={{ width: '100%', background: 'none', border: 'none', outline: 'none', color: '#ffffff', fontFamily: 'var(--font-primary)', fontSize: '0.95rem', resize: 'none', maxHeight: '200px', padding: '8px 0', lineHeight: '1.4', }} />
                    <button onClick={onSend} disabled={!input.trim() || isGenerating} style={{ position: 'absolute', right: '12px', bottom: '12px', background: input.trim() && !isGenerating ? 'var(--accent-violet)' : 'rgba(255, 255, 255, 0.03)', border: 'none', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() && !isGenerating ? 'pointer' : 'default', color: input.trim() && !isGenerating ? '#ffffff' : 'var(--text-muted)', transition: 'var(--transition-smooth)', outline: 'none', }}><Send size={14} /></button>
                </div>
                <span style={{ alignSelf: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center' }}>Cockroach AI</span>
            </div>
        </footer>
    );
}
