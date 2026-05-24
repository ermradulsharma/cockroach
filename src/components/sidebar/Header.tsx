'use client';

import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface HeaderProps {
    onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
    return (
        <div style={{ padding: '0.70rem', borderBottom: '1px solid rgba(255, 255, 255, 0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }} >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: 'linear-gradient(135deg, var(--accent-green) 0%, var(--accent-violet) 100%)', width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', boxShadow: '0 0 15px rgba(0, 255, 135, 0.25)', }}>{"\u{1FAB3}"}</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: '700', fontSize: '1.15rem', letterSpacing: '1px', background: 'linear-gradient(90deg, #ffffff 0%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>COCKROACH</span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--accent-green)', fontWeight: '600', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '3px' }} >NEW ERA AI</span>
                </div>
            </div>
            <button onClick={onToggleSidebar} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition-smooth)', outline: 'none' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}><ChevronLeft size={16} /></button>
        </div>
    );
}
