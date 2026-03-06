import { z } from 'zod';

// ─── Cart ──────────────────────────────────────────────────────────────────
export const CartSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    itemCount: z.number().int().nonnegative().default(0),
    totalUsd: z.number().nonnegative().default(0),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export type Cart = z.infer<typeof CartSchema>;

// ─── Cart Item ─────────────────────────────────────────────────────────────
export const CartItemSchema = z.object({
    id: z.string().uuid(),
    cartId: z.string().uuid(),
    listingId: z.string().uuid(),
    pricingId: z.string().uuid(),
    quantity: z.number().int().positive().default(1),
    unitPriceUsd: z.number().nonnegative(),
    createdAt: z.string().datetime(),
});
export type CartItem = z.infer<typeof CartItemSchema>;

export const AddToCartSchema = z.object({
    listingId: z.string().uuid(),
    pricingId: z.string().uuid(),
    quantity: z.number().int().positive().default(1),
});
export type AddToCart = z.infer<typeof AddToCartSchema>;

export const UpdateCartItemSchema = z.object({
    quantity: z.number().int().positive(),
});
export type UpdateCartItem = z.infer<typeof UpdateCartItemSchema>;
