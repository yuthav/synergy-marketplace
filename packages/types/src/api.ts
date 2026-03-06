import { z } from 'zod';

// ─── Pagination ────────────────────────────────────────────────────────────
export const PaginationSchema = z.object({
    cursor: z.string().nullable(),
    limit: z.number().int().min(1).max(100).default(20),
});
export type Pagination = z.infer<typeof PaginationSchema>;

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
    z.object({
        items: z.array(itemSchema),
        nextCursor: z.string().nullable(),
        totalCount: z.number().int().nonnegative().optional(),
        hasMore: z.boolean(),
    });

// ─── API Error Response ───────────────────────────────────────────────────
export const ApiErrorSchema = z.object({
    statusCode: z.number().int(),
    error: z.string(),
    message: z.string(),
    details: z.array(
        z.object({
            field: z.string().optional(),
            message: z.string(),
            code: z.string().optional(),
        }),
    ).optional(),
    correlationId: z.string().uuid(),
    timestamp: z.string().datetime(),
});
export type ApiError = z.infer<typeof ApiErrorSchema>;

// ─── API Success Response ─────────────────────────────────────────────────
export const ApiSuccessSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.object({
        success: z.literal(true),
        data: dataSchema,
        meta: z
            .object({
                requestId: z.string().uuid(),
                timestamp: z.string().datetime(),
            })
            .optional(),
    });

// ─── Health Check Response ────────────────────────────────────────────────
export const HealthCheckSchema = z.object({
    status: z.enum(['healthy', 'degraded', 'unhealthy']),
    version: z.string(),
    uptime: z.number().nonnegative(),
    services: z.record(
        z.object({
            status: z.enum(['up', 'down', 'degraded']),
            latencyMs: z.number().nonnegative().optional(),
            message: z.string().optional(),
        }),
    ),
    timestamp: z.string().datetime(),
});
export type HealthCheck = z.infer<typeof HealthCheckSchema>;

// ─── Rate Limit Headers ──────────────────────────────────────────────────
export const RateLimitInfoSchema = z.object({
    limit: z.number().int().positive(),
    remaining: z.number().int().nonnegative(),
    reset: z.number().int(), // Unix timestamp
});
export type RateLimitInfo = z.infer<typeof RateLimitInfoSchema>;

// ─── Search Autocomplete ──────────────────────────────────────────────────
export const SearchSuggestionSchema = z.object({
    text: z.string(),
    type: z.enum(['listing', 'category', 'seller']),
    id: z.string().uuid(),
    slug: z.string(),
    image: z.string().url().nullable(),
});
export type SearchSuggestion = z.infer<typeof SearchSuggestionSchema>;

// ─── Bulk Operation ───────────────────────────────────────────────────────
export const BulkOperationResultSchema = z.object({
    totalProcessed: z.number().int().nonnegative(),
    successful: z.number().int().nonnegative(),
    failed: z.number().int().nonnegative(),
    errors: z.array(
        z.object({
            index: z.number().int(),
            message: z.string(),
        }),
    ),
});
export type BulkOperationResult = z.infer<typeof BulkOperationResultSchema>;
