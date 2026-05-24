'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { ChatSession } from '../types/chat';
import Header from './sidebar/Header';
import ChatButton from './sidebar/ChatButton';
import Item from './sidebar/Item';
import Footer from './sidebar/Footer';

interface SidebarProps {
    sessions: ChatSession[];
    activeSessionId: string | null;
    onSelectSession: (id: string) => void;
    onCreateSession: () => void;
    onDeleteSession: (id: string) => void;
    isSidebarOpen: boolean;
    onToggleSidebar: () => void;
}

export default function Sidebar({
    sessions,
    activeSessionId,
    onSelectSession,
    onCreateSession,
    onDeleteSession,
    isSidebarOpen,
    onToggleSidebar,
}: SidebarProps) {
    const [status, setStatus] = useState<'online' | 'offline' | 'connecting'>('connecting');
    const [isPending, startTransition] = useTransition();
    useEffect(() => {
        const checkHealth = async () => {
            try {
                const res = await fetch('/api/health');
                if (res.ok) {
                    const data = await res.json();
                    setStatus(data.status === 'online' ? 'online' : 'offline');
                } else setStatus('offline');
            } catch {
                setStatus('offline');
            }
        };
        checkHealth();
        const interval = setInterval(checkHealth, 15000);
        return () => clearInterval(interval);
    }, []);

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this conversation?')) {
            onDeleteSession(id);
        }
    };

    return (
        <aside style={{ width: isSidebarOpen ? '280px' : '0px', opacity: isSidebarOpen ? 1 : 0, height: '100vh', background: 'var(--bg-sidebar)', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', transition: 'var(--transition-smooth)', overflow: 'hidden', zIndex: 50, position: 'relative', }}>
            <Header onToggleSidebar={onToggleSidebar} />
            <ChatButton onCreateSession={onCreateSession} />
            <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '6px', }}>
                {sessions.length === 0 ? (
                    <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', }}>No chat history</div>
                ) : (
                    sessions.map((session) => (
                        <Item key={session.id} session={session} isActive={session.id === activeSessionId} isPending={isPending} onSelectSession={onSelectSession} onDeleteSession={handleDelete} />
                    ))
                )}
            </div>
            <Footer Status={status} />
        </aside>
    );
}
