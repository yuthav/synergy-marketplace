import { randomUUID } from 'crypto';

export function generateId(): string {
    return randomUUID();
}

export function generateApiKey(): { prefix: string; key: string; hash: string } {
    const prefix = `syn_${randomBytes(4)}`;
    const secret = randomBytes(32);
    const key = `${prefix}_${secret}`;
    // In production, hash with bcrypt before storing
    const hash = key; // Placeholder — use bcrypt in actual implementation
    return { prefix, key, hash };
}

function randomBytes(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const array = new Uint8Array(length);
    globalThis.crypto.getRandomValues(array);
    for (const byte of array) {
        result += chars[byte % chars.length];
    }
    return result;
}

export function generateCorrelationId(): string {
    return randomUUID();
}
