'use server';

import { revalidatePath } from 'next/cache';
import * as db from './db';
import { Message } from '../types/chat';

export async function createSessionAction() {
  const session = await db.createSession();
  return session;
}

export async function deleteSessionAction(id: string) {
  await db.deleteSession(id);
}

export async function clearSessionAction(id: string) {
  await db.clearSessionMessages(id);
  revalidatePath('/');
}

export async function saveMessagesAction(id: string, messages: Message[]) {
  await db.saveMessages(id, messages);
}

export async function updateSessionTitleAction(id: string, title: string) {
  await db.updateSessionTitle(id, title);
  revalidatePath('/');
}
