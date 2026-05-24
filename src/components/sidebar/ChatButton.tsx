'use client';

import React from 'react';
import { Plus } from 'lucide-react';

interface NewChatButtonProps { onCreateSession: () => void; }

export default function NewChatButton({ onCreateSession }: NewChatButtonProps) {
    return (
        <div style={{ padding: '1.25rem 1rem 0.5rem' }}>
            <button onClick={onCreateSession} style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(0, 255, 135, 0.04)', border: '1px solid rgba(0, 255, 135, 0.15)', borderRadius: '10px', color: '#ffffff', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'var(--transition-smooth)', outline: 'none', }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 255, 135, 0.08)'; e.currentTarget.style.borderColor = 'var(--accent-green)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 135, 0.15)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0, 255, 135, 0.04)'; e.currentTarget.style.borderColor = 'rgba(0, 255, 135, 0.15)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <Plus size={18} color="#00ff87" />
                <span>New Chat</span>
            </button>
        </div>
    );
}
