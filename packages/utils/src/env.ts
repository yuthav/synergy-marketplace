import { z } from 'zod';

export function validateEnv<T extends z.ZodRawShape>(
    schema: z.ZodObject<T>,
    env: Record<string, string | undefined> = process.env as Record<string, string | undefined>,
): z.infer<z.ZodObject<T>> {
    const result = schema.safeParse(env);
    if (!result.success) {
        const formatted = result.error.issues
            .map((issue) => `  ${issue.path.join('.')}: ${issue.message}`)
            .join('\n');
        throw new Error(`❌ Invalid environment variables:\n${formatted}`);
    }
    return result.data;
}

export const baseEnvSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
});
