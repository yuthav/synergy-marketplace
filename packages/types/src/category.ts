import { z } from 'zod';
import { ListingCategory } from './enums';

// ─── Category ──────────────────────────────────────────────────────────────
export const CategorySchema = z.object({
    id: z.string().uuid(),
    name: z.string().max(100),
    slug: z.string(),
    description: z.string().max(500).nullable(),
    icon: z.string().nullable(),
    type: ListingCategory,
    parentId: z.string().uuid().nullable(),
    listingCount: z.number().int().nonnegative().default(0),
    sortOrder: z.number().int().nonnegative(),
    isActive: z.boolean().default(true),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export type Category = z.infer<typeof CategorySchema>;

export const CreateCategorySchema = z.object({
    name: z.string().min(2).max(100),
    description: z.string().max(500).optional(),
    icon: z.string().optional(),
    type: ListingCategory,
    parentId: z.string().uuid().optional(),
    sortOrder: z.number().int().nonnegative().default(0),
});
export type CreateCategory = z.infer<typeof CreateCategorySchema>;

// ─── Collection ────────────────────────────────────────────────────────────
export const CollectionSchema = z.object({
    id: z.string().uuid(),
    name: z.string().max(100),
    slug: z.string(),
    description: z.string().max(500).nullable(),
    coverImage: z.string().url().nullable(),
    curatedBy: z.string().uuid(),
    isPublic: z.boolean().default(true),
    itemCount: z.number().int().nonnegative().default(0),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export type Collection = z.infer<typeof CollectionSchema>;
