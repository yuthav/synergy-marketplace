/**
 * SIWE (Sign-In with Ethereum) message creation and verification.
 * Used for Web3 wallet authentication.
 */

export interface SiweMessageParams {
    domain: string;
    address: string;
    statement: string;
    uri: string;
    version: string;
    chainId: number;
    nonce: string;
    issuedAt?: string;
    expirationTime?: string;
}

export function createSiweMessage(params: SiweMessageParams): string {
    const {
        domain, address, statement, uri, version, chainId, nonce,
        issuedAt = new Date().toISOString(),
        expirationTime,
    } = params;

    let message = `${domain} wants you to sign in with your Ethereum account:\n${address}\n\n`;
    message += `${statement}\n\n`;
    message += `URI: ${uri}\n`;
    message += `Version: ${version}\n`;
    message += `Chain ID: ${chainId}\n`;
    message += `Nonce: ${nonce}\n`;
    message += `Issued At: ${issuedAt}`;
    if (expirationTime) {
        message += `\nExpiration Time: ${expirationTime}`;
    }

    return message;
}

export async function verifySiweSignature(
    _message: string,
    _signature: string,
    _expectedAddress: string,
): Promise<boolean> {
    // In production, use viem's verifyMessage:
    // import { verifyMessage } from 'viem';
    // const isValid = await verifyMessage({ address: expectedAddress, message, signature });
    // return isValid;

    // Stub for local development
    console.log('[SIWE] Signature verification stubbed for development');
    return true;
}

export function generateNonce(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let nonce = '';
    for (let i = 0; i < 16; i++) {
        nonce += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return nonce;
}
