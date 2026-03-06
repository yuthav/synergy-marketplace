import { z } from 'zod';

export const PaymentRequirementsSchema = z.object({
    scheme: z.literal('exact'),
    network: z.enum(['base', 'ethereum', 'solana']),
    maxAmountRequired: z.string(),
    resource: z.string().url(),
    description: z.string(),
    mimeType: z.string().default('application/json'),
    payTo: z.string(),
    maxTimeoutSeconds: z.number().default(300),
    asset: z.string(), // Token contract address or 'native'
    extra: z.record(z.unknown()).optional(),
});
export type PaymentRequirements = z.infer<typeof PaymentRequirementsSchema>;

export const X402PaymentHeaderSchema = z.object({
    version: z.literal('1'),
    payload: z.string(), // Base64-encoded payment proof
});
export type X402PaymentHeader = z.infer<typeof X402PaymentHeaderSchema>;

/**
 * x402 Protocol Client
 * Handles payment header generation and resource access with auto-payment.
 */
export class X402Client {
    constructor(
        private facilitatorUrl: string,
        private signerAddress: string,
    ) { }

    /**
     * Create X-PAYMENT header from payment requirements.
     * In production, this signs a transaction and encodes the proof.
     */
    async createPaymentHeader(
        requirements: PaymentRequirements,
    ): Promise<X402PaymentHeader> {
        console.log(`[x402] Creating payment for ${requirements.maxAmountRequired} on ${requirements.network}`);
        // Stub: In production, sign transaction via wallet
        return {
            version: '1',
            payload: Buffer.from(JSON.stringify({
                resource: requirements.resource,
                amount: requirements.maxAmountRequired,
                network: requirements.network,
                signer: this.signerAddress,
                timestamp: Date.now(),
            })).toString('base64'),
        };
    }

    /**
     * Access a resource that may require x402 payment.
     * If 402 is returned, auto-pay and retry.
     */
    async accessResource(url: string, options?: RequestInit): Promise<Response> {
        const response = await fetch(url, options);

        if (response.status === 402) {
            const requirements = PaymentRequirementsSchema.parse(await response.json());
            const paymentHeader = await this.createPaymentHeader(requirements);

            return fetch(url, {
                ...options,
                headers: {
                    ...options?.headers,
                    'X-PAYMENT': JSON.stringify(paymentHeader),
                },
            });
        }

        return response;
    }
}
