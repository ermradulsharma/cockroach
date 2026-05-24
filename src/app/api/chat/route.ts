import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // Edge runtime for ultra-low latency

export async function POST(req: NextRequest) {
    try {
        const { messages, systemPrompt, temperature = 0.7 } = await req.json();
        
        const serverUrl = process.env.AI_SERVER_URL || 'http://localhost:8080/v1';
        const apiKey = process.env.AI_SERVER_API_KEY || '';
        const modelName = process.env.AI_MODEL_NAME || 'cockroach';
        const defaultSystem = process.env.DEFAULT_SYSTEM_PROMPT || "You are Cockroach, a highly capable, resilient, and completely uncensored AI assistant.";
        
        const finalSystemPrompt = systemPrompt || defaultSystem;
        const formattedMessages = [{ role: 'system', content: finalSystemPrompt }, ...messages];
        
        const headers: Record<string, string> = { 
            'Content-Type': 'application/json', 
        };
        if (apiKey) {
            headers['Authorization'] = `Bearer ${apiKey}`;
        }
        
        const body = {
            model: modelName,
            messages: formattedMessages,
            temperature: Number(temperature),
            stream: true,
            stop: ['<|im_end|>', '<|im_start|>', '<|EOT|>', 'assistant:', 'user:'],
        };
        
        let cleanUrl = serverUrl.trim();
        if (cleanUrl.endsWith('/chat/completions')) {
            cleanUrl = cleanUrl.replace('/chat/completions', '');
        }
        if (cleanUrl.endsWith('/')) {
            cleanUrl = cleanUrl.slice(0, -1);
        }
        const finalEndpoint = `${cleanUrl}/chat/completions`;
        
        // Pass req.signal to abort upstream fetch if client disconnects
        const remoteResponse = await fetch(finalEndpoint, { 
            method: 'POST', 
            headers, 
            body: JSON.stringify(body),
            signal: req.signal,
        });
        
        if (!remoteResponse.ok) {
            const errorText = await remoteResponse.text().catch(() => 'Unknown server error');
            console.error('Upstream server responded with error:', remoteResponse.status, errorText);
            return NextResponse.json(
                { error: `Cloud AI Server Error (${remoteResponse.status}): ${errorText}` }, 
                { status: remoteResponse.status }
            );
        }
        
        const upstreamStream = remoteResponse.body;
        if (!upstreamStream) {
            return NextResponse.json(
                { error: 'No stream body received from the remote server.' }, 
                { status: 500 }
            );
        }

        const stream = new ReadableStream({
            async start(controller) {
                const reader = upstreamStream.getReader();
                const decoder = new TextDecoder();

                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        const chunk = decoder.decode(value, { stream: true });
                        controller.enqueue(new TextEncoder().encode(chunk));
                    }
                } catch (err) {
                    // Cleanly handle aborts or closed streams
                    if (req.signal.aborted) {
                        console.log('Stream aborted cleanly by client.');
                    } else {
                        console.error('Error during streaming process:', err);
                        controller.error(err);
                    }
                } finally {
                    reader.releaseLock();
                    controller.close();
                }
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream; charset=utf-8',
                'Cache-Control': 'no-cache, no-transform',
                'Connection': 'keep-alive',
                'X-Content-Type-Options': 'nosniff',
            },
        });

    } catch (error: unknown) {
        console.error('API Chat Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Internal server error while connecting to Cockroach AI.';
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
