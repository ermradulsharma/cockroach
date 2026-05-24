import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Cockroach AI - The Uncensored, Resilient AI Assistant',
    description: 'An advanced, highly capable, and completely uncensored AI conversational interface driven by abliterated DeepSeek models.',
    icons: {
        icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220%22 width=%22100%22 height=%22100%22><text y=%220.9em%22 font-size=%2290%22>🪳</text></svg>',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
