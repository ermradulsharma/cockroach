'use client';

import React, { useState, useTransition, useEffect } from 'react';
import Sidebar from './Sidebar';
import Area from './Area';
import { Menu } from 'lucide-react';
import { ChatSession, Message } from '../types/chat';
import { useRouter } from 'next/navigation';
import { createSessionAction, deleteSessionAction } from '../lib/actions';

interface ShellProps { sessions: ChatSession[]; activeSessionId: string | null; initialMessages: Message[]; }

export default function Shell({ sessions, activeSessionId, initialMessages }: ShellProps) {
    const [localSessions, setLocalSessions] = useState<ChatSession[]>(sessions);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    useEffect(() => { setLocalSessions(sessions); }, [sessions]);
    const handleSelectSession = (id: string) => { startTransition(() => { router.push(`/?session=${id}`); }); };
    const handleCreateSession = async () => {
        if (isPending) return;
        try {
            const newSession = await createSessionAction();
            setLocalSessions((prev) => [newSession, ...prev]);
            startTransition(() => { router.push(`/?session=${newSession.id}`); });
        } catch (err) { console.error('Failed to create session:', err); }
    };
    const handleDeleteSession = async (id: string) => {
        setLocalSessions((prev) => prev.filter((s) => s.id !== id));
        deleteSessionAction(id).catch((err) => console.error('Failed to delete session in background:', err));
        if (id === activeSessionId) { startTransition(() => { router.push('/'); }); }
    };
    return (
        <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <Sidebar sessions={localSessions} activeSessionId={activeSessionId} onSelectSession={handleSelectSession} onCreateSession={handleCreateSession} onDeleteSession={handleDeleteSession} isSidebarOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                {!isSidebarOpen && (
                    <button onClick={() => setIsSidebarOpen(true)} style={{ position: 'absolute', left: '12px', top: '12px', background: 'var(--bg-sidebar)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '6px', borderRadius: '6px', cursor: 'pointer', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', transition: 'var(--transition-smooth)', outline: 'none', }} onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-green)')} onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}><Menu size={16} /></button>
                )}

                {activeSessionId ? (
                    <Area sessionId={activeSessionId} initialMessages={initialMessages} key={activeSessionId} />
                ) : (
                    <div style={{ flex: 1, background: 'var(--bg-chat)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', flexDirection: 'column', gap: '12px', }}>
                        <span>Welcome to Cockroach AI.</span>
                        <button onClick={handleCreateSession} disabled={isPending} style={{ padding: '0.6rem 1.2rem', background: 'var(--accent-violet)', border: 'none', color: '#ffffff', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', opacity: isPending ? 0.6 : 1, }}> {isPending ? 'Starting...' : 'Start a Conversation'}</button>
                    </div>
                )}
            </div>
        </div>
    );
}
