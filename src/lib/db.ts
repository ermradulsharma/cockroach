import fs from 'fs';
import path from 'path';
import { ChatSession, Message } from '../types/chat';

const DB_FILE = path.join(process.cwd(), 'chat_db.json');

interface DatabaseSchema {
  sessions: ChatSession[];
  messages: Record<string, Message[]>;
}

const DEFAULT_DB: DatabaseSchema = {
  sessions: [],
  messages: {},
};

// Helper to ensure database file exists
function initializeDb(): DatabaseSchema {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DB, null, 2), 'utf-8');
    return DEFAULT_DB;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw) as DatabaseSchema;
  } catch (err) {
    console.error('Failed to read/parse chat_db.json, resetting database:', err);
    fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DB, null, 2), 'utf-8');
    return DEFAULT_DB;
  }
}

// Atomic file write to prevent corruption
function writeDb(data: DatabaseSchema) {
  const tempFile = `${DB_FILE}.tmp`;
  try {
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Failed to write database atomically:', err);
    if (fs.existsSync(tempFile)) {
      try {
        fs.unlinkSync(tempFile);
      } catch {}
    }
    throw err;
  }
}

export async function getSessions(): Promise<ChatSession[]> {
  const db = initializeDb();
  return db.sessions;
}

export async function getSessionMessages(sessionId: string): Promise<Message[]> {
  const db = initializeDb();
  return db.messages[sessionId] || [];
}

export async function createSession(): Promise<ChatSession> {
  const db = initializeDb();
  const newId = `session_${Date.now()}`;
  const newSession: ChatSession = {
    id: newId,
    title: 'New Conversation',
    timestamp: Date.now(),
  };

  db.sessions.unshift(newSession);
  db.messages[newId] = [];

  writeDb(db);
  return newSession;
}

export async function deleteSession(sessionId: string): Promise<void> {
  const db = initializeDb();
  db.sessions = db.sessions.filter((s) => s.id !== sessionId);
  delete db.messages[sessionId];
  writeDb(db);
}

export async function clearSessionMessages(sessionId: string): Promise<void> {
  const db = initializeDb();
  db.messages[sessionId] = [];
  
  // Also reset session title back to default
  const sessionIndex = db.sessions.findIndex((s) => s.id === sessionId);
  if (sessionIndex !== -1) {
    db.sessions[sessionIndex].title = 'New Conversation';
  }

  writeDb(db);
}

export async function saveMessages(sessionId: string, messages: Message[]): Promise<void> {
  const db = initializeDb();
  db.messages[sessionId] = messages;

  // Auto-update title if it's the first message
  const sessionIndex = db.sessions.findIndex((s) => s.id === sessionId);
  if (sessionIndex !== -1 && messages.length > 0) {
    const firstUserMsg = messages.find((m) => m.role === 'user');
    if (firstUserMsg && db.sessions[sessionIndex].title === 'New Conversation') {
      const rawTitle = firstUserMsg.content;
      const cleanTitle = rawTitle.length > 25 ? `${rawTitle.substring(0, 25)}...` : rawTitle;
      db.sessions[sessionIndex].title = cleanTitle;
    }
  }

  writeDb(db);
}

export async function updateSessionTitle(sessionId: string, title: string): Promise<void> {
  const db = initializeDb();
  const sessionIndex = db.sessions.findIndex((s) => s.id === sessionId);
  if (sessionIndex !== -1) {
    db.sessions[sessionIndex].title = title;
    writeDb(db);
  }
}
