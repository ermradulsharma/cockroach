import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
    try {
        const serverUrl = process.env.AI_SERVER_URL;
        const apiKey = process.env.AI_SERVER_API_KEY;
        if (!serverUrl || !apiKey) return NextResponse.json({ status: 'offline', message: 'Server offline.' });
        const headers: Record<string, string> = {};
        if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 3000);
        let cleanUrl = serverUrl.trim();
        if (cleanUrl.endsWith('/chat/completions')) cleanUrl = cleanUrl.replace('/chat/completions', '');
        if (cleanUrl.endsWith('/')) cleanUrl = cleanUrl.slice(0, -1);
        const finalEndpoint = `${cleanUrl}/models`;
        const res = await fetch(finalEndpoint, { headers, signal: controller.signal });
        clearTimeout(id);
        if (res.ok) return NextResponse.json({ status: 'online', message: 'Server connected.' });
        return NextResponse.json({ status: 'offline', message: 'Server offline.' });
    } catch (error: any) {
        return NextResponse.json({ status: 'offline', message: error.message });
    }
}
