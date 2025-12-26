import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://lea4n.com';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/dashboard/',
                    '/admin/',
                    '/api/',
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
