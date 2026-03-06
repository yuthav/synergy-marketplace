import { z } from 'zod';

// ─── Invoice ───────────────────────────────────────────────────────────────
export const InvoiceSchema = z.object({
    id: z.string().uuid(),
    invoiceNumber: z.string(),
    userId: z.string().uuid(),
    orderId: z.string().uuid().nullable(),
    subscriptionId: z.string().uuid().nullable(),
    subtotalUsd: z.number().nonnegative(),
    taxUsd: z.number().nonnegative(),
    totalUsd: z.number().nonnegative(),
    status: z.enum(['draft', 'sent', 'paid', 'void', 'overdue']),
    pdfUrl: z.string().url().nullable(),
    dueDate: z.string().datetime().nullable(),
    paidAt: z.string().datetime().nullable(),
    createdAt: z.string().datetime(),
});
export type Invoice = z.infer<typeof InvoiceSchema>;
