'use client';

import React from 'react';
import { MessageSquare, Trash2 } from 'lucide-react';
import { ChatSession } from '../../types/chat';

interface ItemProps { session: ChatSession; isActive: boolean; isPending: boolean; onSelectSession: (id: string) => void; onDeleteSession: (id: string) => void; }
export default function Item({ session, isActive, isPending, onSelectSession, onDeleteSession, }: ItemProps) {
    return (
        <div className="session-row" style={{ display: 'flex', alignItems: 'center', padding: '0.7rem 0.75rem', borderRadius: '8px', background: isActive ? 'rgba(139, 92, 246, 0.08)' : 'transparent', border: `1px solid ${isActive ? 'rgba(139, 92, 246, 0.15)' : 'transparent'}`, cursor: 'pointer', transition: 'var(--transition-smooth)', position: 'relative', }} onClick={() => onSelectSession(session.id)}>
            <MessageSquare size={16} style={{ color: isActive ? 'var(--accent-violet)' : 'var(--text-secondary)', marginRight: '10px', flexShrink: 0, }} />
            <span style={{ color: isActive ? 'var(--text-secondary)' : 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: isActive ? '600' : '400', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', paddingRight: '25px', }}>{session.title}</span>
            <button className="delete-session-btn" disabled={isPending} onClick={(e) => { e.stopPropagation(); onDeleteSession(session.id); }} style={{ position: 'absolute', right: '6px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', opacity: 0, transition: 'var(--transition-smooth)', padding: '4px', borderRadius: '4px', outline: 'none', }} onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'none'; }}><Trash2 size={14} /></button>
        </div>
    );
}
