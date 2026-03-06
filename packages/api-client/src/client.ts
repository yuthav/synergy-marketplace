import type { ApiResponse, RequestOptions } from './types';

export interface ApiClientConfig {
    baseUrl: string;
    portal: 'marketplace' | 'seller' | 'platform';
    getAccessToken?: () => Promise<string | null>;
    onUnauthorized?: () => void;
}

/**
 * Typed API client for all Synergetics API endpoints.
 * Each portal (marketplace, seller, platform) creates its own instance
 * with appropriate auth token injection.
 */
export class ApiClient {
    private baseUrl: string;
    private portal: string;
    private getAccessToken: () => Promise<string | null>;
    private onUnauthorized: () => void;

    constructor(config: ApiClientConfig) {
        this.baseUrl = config.baseUrl.replace(/\/$/, '');
        this.portal = config.portal;
        this.getAccessToken = config.getAccessToken ?? (() => Promise.resolve(null));
        this.onUnauthorized = config.onUnauthorized ?? (() => { });
    }

    private async request<T>(
        method: string,
        path: string,
        body?: unknown,
        options?: RequestOptions,
    ): Promise<ApiResponse<T>> {
        const token = await this.getAccessToken();

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'X-Portal': this.portal,
            ...options?.headers,
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${this.baseUrl}${path}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
            signal: options?.signal,
            cache: options?.cache,
        });

        if (response.status === 401) {
            this.onUnauthorized();
            throw new ApiError(401, 'Unauthorized');
        }

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Request failed' }));
            throw new ApiError(response.status, error.message ?? 'Request failed', error);
        }

        return response.json() as Promise<ApiResponse<T>>;
    }

    async get<T>(path: string, options?: RequestOptions): Promise<ApiResponse<T>> {
        return this.request<T>('GET', path, undefined, options);
    }

    async post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
        return this.request<T>('POST', path, body, options);
    }

    async put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
        return this.request<T>('PUT', path, body, options);
    }

    async patch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
        return this.request<T>('PATCH', path, body, options);
    }

    async delete<T>(path: string, options?: RequestOptions): Promise<ApiResponse<T>> {
        return this.request<T>('DELETE', path, undefined, options);
    }

    // ─── Typed Endpoint Methods ──────────────────────────────────────────
    // These are convenience wrappers — each returns properly typed data.

    get listings() {
        return {
            list: (params?: Record<string, string>) => {
                const qs = params ? `?${new URLSearchParams(params)}` : '';
                return this.get(`/api/v1/listings${qs}`);
            },
            get: (id: string) => this.get(`/api/v1/listings/${id}`),
            create: (data: unknown) => this.post('/api/v1/listings', data),
            update: (id: string, data: unknown) => this.patch(`/api/v1/listings/${id}`, data),
            delete: (id: string) => this.delete(`/api/v1/listings/${id}`),
            search: (q: string) => this.get(`/api/v1/listings/search?q=${encodeURIComponent(q)}`),
        };
    }

    get categories() {
        return {
            list: () => this.get('/api/v1/categories'),
            get: (id: string) => this.get(`/api/v1/categories/${id}`),
        };
    }

    get cart() {
        return {
            get: () => this.get('/api/v1/cart'),
            addItem: (data: unknown) => this.post('/api/v1/cart/items', data),
            updateItem: (id: string, data: unknown) => this.patch(`/api/v1/cart/items/${id}`, data),
            removeItem: (id: string) => this.delete(`/api/v1/cart/items/${id}`),
            clear: () => this.delete('/api/v1/cart'),
        };
    }

    get checkout() {
        return {
            create: (data: unknown) => this.post('/api/v1/checkout', data),
        };
    }

    get me() {
        return {
            profile: () => this.get('/api/v1/me/profile'),
            updateProfile: (data: unknown) => this.patch('/api/v1/me/profile', data),
            orders: (params?: Record<string, string>) => {
                const qs = params ? `?${new URLSearchParams(params)}` : '';
                return this.get(`/api/v1/me/orders${qs}`);
            },
            subscriptions: () => this.get('/api/v1/me/subscriptions'),
            wallet: () => this.get('/api/v1/me/wallet'),
            invoices: () => this.get('/api/v1/me/invoices'),
            apiKeys: () => this.get('/api/v1/me/api-keys'),
        };
    }
}

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
        public body?: unknown,
    ) {
        super(message);
        this.name = 'ApiError';
    }
}
