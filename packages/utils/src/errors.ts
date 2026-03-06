export class AppError extends Error {
    constructor(
        public statusCode: number,
        message: string,
        public code?: string,
        public details?: Array<{ field?: string; message: string; code?: string }>,
    ) {
        super(message);
        this.name = 'AppError';
    }

    static badRequest(message: string, details?: AppError['details']) {
        return new AppError(400, message, 'BAD_REQUEST', details);
    }

    static unauthorized(message = 'Unauthorized') {
        return new AppError(401, message, 'UNAUTHORIZED');
    }

    static forbidden(message = 'Forbidden') {
        return new AppError(403, message, 'FORBIDDEN');
    }

    static notFound(resource = 'Resource') {
        return new AppError(404, `${resource} not found`, 'NOT_FOUND');
    }

    static conflict(message: string) {
        return new AppError(409, message, 'CONFLICT');
    }

    static validationError(details: AppError['details']) {
        return new AppError(422, 'Validation error', 'VALIDATION_ERROR', details);
    }

    static tooManyRequests(message = 'Too many requests') {
        return new AppError(429, message, 'RATE_LIMITED');
    }

    static internal(message = 'Internal server error') {
        return new AppError(500, message, 'INTERNAL_ERROR');
    }

    static maintenanceMode(portal: string) {
        return new AppError(503, `${portal} is currently under maintenance`, 'MAINTENANCE_MODE');
    }

    static geoBlocked(country: string) {
        return new AppError(
            403,
            `Access from ${country} is currently restricted`,
            'GEO_BLOCKED',
        );
    }

    toJSON() {
        return {
            statusCode: this.statusCode,
            error: this.code ?? this.name,
            message: this.message,
            details: this.details,
        };
    }
}
