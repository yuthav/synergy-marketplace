import { z } from 'zod';
import {
    ListingCategory,
    ListingStatus,
    PurchaseModel,
    Currency,
    Blockchain,
    MediaType,
    SubscriptionInterval,
} from './enums';

// ─── Listing ───────────────────────────────────────────────────────────────
export const ListingSchema = z.object({
    id: z.string().uuid(),
    sellerId: z.string().uuid(),
    categoryId: z.string().uuid(),
    title: z.string().min(3).max(200),
    slug: z.string(),
    shortDescription: z.string().max(300),
    description: z.string(), // Rich text / HTML
    status: ListingStatus,
    purchaseModel: PurchaseModel,
    category: ListingCategory,
    tags: z.array(z.string()).max(20),
    version: z.string().default('1.0.0'),
    changelog: z.string().nullable(),
    supportedBlockchains: z.array(Blockchain),
    isVerified: z.boolean().default(false),
    isFeatured: z.boolean().default(false),
    viewCount: z.number().int().nonnegative().default(0),
    purchaseCount: z.number().int().nonnegative().default(0),
    avgRating: z.number().min(0).max(5).default(0),
    reviewCount: z.number().int().nonnegative().default(0),
    apiDocsUrl: z.string().url().nullable(),
    demoUrl: z.string().url().nullable(),
    repositoryUrl: z.string().url().nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    publishedAt: z.string().datetime().nullable(),
    deletedAt: z.string().datetime().nullable(),
});
export type Listing = z.infer<typeof ListingSchema>;

// ─── Listing Media ─────────────────────────────────────────────────────────
export const ListingMediaSchema = z.object({
    id: z.string().uuid(),
    listingId: z.string().uuid(),
    type: MediaType,
    url: z.string().url(),
    thumbnailUrl: z.string().url().nullable(),
    alt: z.string().max(200).nullable(),
    sortOrder: z.number().int().nonnegative(),
    metadata: z.record(z.unknown()).nullable(),
    createdAt: z.string().datetime(),
});
export type ListingMedia = z.infer<typeof ListingMediaSchema>;

// ─── Pricing ───────────────────────────────────────────────────────────────
export const PricingSchema = z.object({
    id: z.string().uuid(),
    listingId: z.string().uuid(),
    label: z.string().max(50), // e.g., "Basic", "Pro", "Enterprise"
    priceUsd: z.number().nonnegative(),
    cryptoPrices: z.record(Currency, z.number().nonnegative()).nullable(),
    interval: SubscriptionInterval.nullable(), // null for one-time
    features: z.array(z.string()),
    isPopular: z.boolean().default(false),
    maxUsage: z.number().int().positive().nullable(), // for pay-per-use
    sortOrder: z.number().int().nonnegative(),
    isActive: z.boolean().default(true),
    createdAt: z.string().datetime(),
});
export type Pricing = z.infer<typeof PricingSchema>;

// ─── Create Listing ────────────────────────────────────────────────────────
export const CreateListingSchema = z.object({
    title: z.string().min(3).max(200),
    shortDescription: z.string().max(300),
    description: z.string().min(10),
    categoryId: z.string().uuid(),
    category: ListingCategory,
    purchaseModel: PurchaseModel,
    tags: z.array(z.string()).max(20).default([]),
    supportedBlockchains: z.array(Blockchain).default([]),
    apiDocsUrl: z.string().url().nullable().optional(),
    demoUrl: z.string().url().nullable().optional(),
    repositoryUrl: z.string().url().nullable().optional(),
    pricing: z.array(
        z.object({
            label: z.string().max(50),
            priceUsd: z.number().nonnegative(),
            interval: SubscriptionInterval.nullable().optional(),
            features: z.array(z.string()).default([]),
            isPopular: z.boolean().default(false),
        }),
    ).min(1),
});
export type CreateListing = z.infer<typeof CreateListingSchema>;

// ─── Update Listing ────────────────────────────────────────────────────────
export const UpdateListingSchema = CreateListingSchema.partial();
export type UpdateListing = z.infer<typeof UpdateListingSchema>;

// ─── Listing Filters ───────────────────────────────────────────────────────
export const ListingFiltersSchema = z.object({
    q: z.string().optional(),
    category: ListingCategory.optional(),
    categoryId: z.string().uuid().optional(),
    purchaseModel: PurchaseModel.optional(),
    blockchain: Blockchain.optional(),
    minPrice: z.number().nonnegative().optional(),
    maxPrice: z.number().nonnegative().optional(),
    minRating: z.number().min(0).max(5).optional(),
    tags: z.array(z.string()).optional(),
    sellerId: z.string().uuid().optional(),
    status: ListingStatus.optional(),
    isFeatured: z.boolean().optional(),
    sortBy: z.enum(['newest', 'oldest', 'price_asc', 'price_desc', 'rating', 'popular']).default('newest'),
    cursor: z.string().optional(),
    limit: z.number().int().min(1).max(100).default(24),
});
export type ListingFilters = z.infer<typeof ListingFiltersSchema>;

// ─── Listing Version ──────────────────────────────────────────────────────
export const ListingVersionSchema = z.object({
    id: z.string().uuid(),
    listingId: z.string().uuid(),
    version: z.string(),
    changelog: z.string(),
    fileUrl: z.string().url().nullable(),
    fileSize: z.number().int().nonnegative().nullable(),
    createdAt: z.string().datetime(),
});
export type ListingVersion = z.infer<typeof ListingVersionSchema>;
