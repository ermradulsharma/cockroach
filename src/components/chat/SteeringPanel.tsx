'use client';

import React from 'react';
import { Terminal } from 'lucide-react';

interface SteeringPanelProps { systemPrompt: string; setSystemPrompt: (val: string) => void; temperature: number; setTemperature: (val: number) => void; }

export default function SteeringPanel({ systemPrompt, setSystemPrompt, temperature, setTemperature, }: SteeringPanelProps) {
    return (
        <div style={{ background: 'var(--bg-sidebar)', borderBottom: '1px solid var(--border-color)', padding: '1.25rem 1.5rem', animation: 'fadeIn 0.2s ease-out', display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 9 }}>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '250px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px', fontFamily: 'var(--font-secondary)', }}><Terminal size={12} color="var(--accent-green)" /> SYSTEM STEERING INSTRUCTIONS</label>
                    <textarea value={systemPrompt} onChange={(e) => setSystemPrompt(e.target.value)} style={{ width: '100%', height: '70px', background: 'var(--bg-app)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '8px 12px', color: '#ffffff', fontFamily: 'var(--font-primary)', fontSize: '0.85rem', resize: 'none', outline: 'none', transition: 'border 0.2s', }} onFocus={(e) => (e.target.style.borderColor = 'var(--accent-green)')} onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.06)')} />
                </div>
                <div style={{ width: '180px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', fontFamily: 'var(--font-secondary)', }}>
                        <span>TEMPERATURE</span>
                        <span style={{ color: 'var(--accent-green)' }}>{temperature}</span>
                    </label>
                    <input type="range" min="0.1" max="1.5" step="0.1" value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))} style={{ accentColor: 'var(--accent-green)', cursor: 'pointer', width: '100%', marginTop: '8px' }} />
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Higher = creative / wilder. Lower = deterministic.</span>
                </div>
            </div>
        </div>
    );
}
