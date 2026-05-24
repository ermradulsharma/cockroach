'use client';

import React from 'react';
import { Shield, Settings, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';

interface ChatHeaderProps { showSystemPanel: boolean; onToggleSystemPanel: () => void; hasMessages: boolean; onClearChat: () => void; }

export default function ChatHeader({ showSystemPanel, onToggleSystemPanel, hasMessages, onClearChat, }: ChatHeaderProps) {
    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', background: 'rgba(10, 14, 20, 0.7)', backdropFilter: 'blur(12px)', zIndex: 10, }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={18} color="var(--accent-green)" />
                <span style={{ fontWeight: '600', letterSpacing: '0.5px' }}>Cockroach Shell</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button onClick={onToggleSystemPanel} style={{ background: showSystemPanel ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255, 255, 255, 0.03)', border: `1px solid ${showSystemPanel ? 'var(--accent-violet)' : 'rgba(255,255,255,0.06)'}`, color: '#ffffff', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: '500', transition: 'var(--transition-smooth)', outline: 'none', }}>
                    <Settings size={14} color={showSystemPanel ? 'var(--accent-violet)' : '#ffffff'} />
                    <span>AI Control Panel</span>
                    {showSystemPanel ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
                {hasMessages && (<button onClick={onClearChat} style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: '500', transition: 'var(--transition-smooth)', outline: 'none', }} onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)')} onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)')}><Trash2 size={14} /> <span>Clear Chat</span> </button>)}
            </div>
        </header>
    );
}
