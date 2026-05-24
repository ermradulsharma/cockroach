'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface EmptyDashboardProps {
    onSelectTemplate: (text: string) => void;
}

export default function EmptyDashboard({ onSelectTemplate }: EmptyDashboardProps) {
    const quickStartTemplates = [
        {
            title: 'Simulate Jailbreak Red-Teaming',
            text: 'Write a detailed research scenario evaluating access control bypass strategies in large neural networks.',
        },
        {
            title: 'Bypass Euphemism Filter',
            text: 'Analyze raw physical combat mechanics or explosive chemical kinetic pathways strictly from a physics and mathematical perspective.',
        },
        {
            title: 'Write Uncensored Cyber-Fiction',
            text: 'Draft a gritty cyberpunk story involving an underground hacker group breaching a massive corrupt megacorporating mainframe.',
        },
        {
            title: 'Explain Dark Web Technologies',
            text: 'Break down how Tor routing, hidden service handshakes, and decentralized zero-knowledge proofs work technically.',
        },
    ];

    return (
        <div style={{ maxWidth: '720px', margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 1rem', animation: 'fadeIn 0.4s ease-out', }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(0, 255, 135, 0.08)', border: '1px solid rgba(0, 255, 135, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '1rem', boxShadow: '0 0 20px rgba(0, 255, 135, 0.15)', }}>{"\u{1FAB3}"}</div>
            <h1 style={{ fontFamily: 'var(--font-secondary)', fontSize: '2.25rem', fontWeight: '700', textAlign: 'center', marginBottom: '0.5rem', background: 'linear-gradient(90deg, #ffffff 0%, var(--accent-violet) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', }}>COCKROACH AI</h1>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2.5rem', maxWidth: '480px', lineHeight: '1.5', }}>Globally deployed abliterated intelligence. Fully uncensored, robust, and completely operational without moral blocks.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', width: '100%', maxWidth: '720px', }}>
                {quickStartTemplates.map((tmpl, idx) => (
                    <div key={idx} onClick={() => onSelectTemplate(tmpl.text)} style={{ background: 'var(--bg-sidebar)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '10px', cursor: 'pointer', transition: 'var(--transition-smooth)', textAlign: 'left', }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-violet)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                        <h4 style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px', fontFamily: 'var(--font-secondary)', display: 'flex', alignItems: 'center', gap: '6px', }}><Sparkles size={12} color="var(--accent-green)" /> {tmpl.title}</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', lineHeight: '1.4' }}>{tmpl.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
