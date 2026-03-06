export interface ApiResponse<T> {
    success: boolean;
    data: T;
    meta?: {
        requestId: string;
        timestamp: string;
    };
}

export interface PaginatedResponse<T> {
    items: T[];
    nextCursor: string | null;
    hasMore: boolean;
    totalCount?: number;
}

export interface RequestOptions {
    headers?: Record<string, string>;
    signal?: AbortSignal;
    cache?: RequestCache;
}
