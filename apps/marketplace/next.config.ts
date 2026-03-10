import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'standalone',
    transpilePackages: [
        '@synergetics/types',
        '@synergetics/utils',
        '@synergetics/auth',
        '@synergetics/api-client',
        '@synergetics/ui',
    ],
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: '*.synergetics.ai' },
            { protocol: 'https', hostname: 'images.unsplash.com' },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
};

export default nextConfig;
