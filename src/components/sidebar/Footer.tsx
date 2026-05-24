'use client';

import React from 'react';
import { Shield, Server, ShieldAlert } from 'lucide-react';

interface FooterProps { Status: 'online' | 'offline' | 'connecting' }

const CONFIG = {
    online: {
        color: 'var(--accent-green)',
        glow: '0 0 8px var(--accent-green)',
        animation: 'none',
        text: 'Online',
        icon: <Shield size={12} />,
    },
    offline: {
        color: 'var(--accent-red)',
        glow: '0 0 8px var(--accent-red)',
        animation: 'pulseGlow 2s infinite',
        text: 'Offline',
        icon: <ShieldAlert size={12} />,
    },
    connecting: {
        color: 'var(--text-muted)',
        glow: '0 0 8px var(--text-muted)',
        animation: 'pulseGlow 2s infinite',
        text: 'Connecting',
        icon: <ShieldAlert size={12} />,
    },
};

export default function Footer({ Status }: FooterProps) {
    return (
        <div style={{ padding: '0.70rem', borderTop: '1px solid rgba(255, 255, 255, 0.04)', background: 'rgba(0, 0, 0, 0.15)', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Server size={14} color="var(--text-secondary)" />
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Cloud Engine Status:
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: CONFIG[Status].color, boxShadow: CONFIG[Status].glow, animation: CONFIG[Status].animation, transition: 'var(--transition-smooth)', }}></span>
                            <span style={{ fontSize: '0.75rem', fontWeight: '500', color: CONFIG[Status].color, display: 'flex', alignItems: 'center', gap: '4px', transition: 'var(--transition-smooth)', }}> {CONFIG[Status].text} {CONFIG[Status].icon}</span>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    );
}
