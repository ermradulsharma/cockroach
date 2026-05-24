import React from 'react';
import * as db from '../lib/db';
import Shell from '../components/Shell';

export const revalidate = 0; // Force dynamic server rendering for real-time consistency

interface PageProps {
    searchParams?: {
        session?: string;
    };
}

export default async function Home({ searchParams }: PageProps) {
    const sessions = await db.getSessions();
    const activeSessionId = searchParams?.session || (sessions[0]?.id || null);
    const activeMessages = activeSessionId ? await db.getSessionMessages(activeSessionId) : [];

    return (
        <Shell sessions={sessions} activeSessionId={activeSessionId} initialMessages={activeMessages} />
    );
}
