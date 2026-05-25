import { allPrograms } from '@/lib/programs';
import { siteConfig } from '@/lib/site-config';

const BASE_URL = siteConfig.urls.production;

export async function GET() {
    const staticPages = [
        '',
        '/gioi-thieu',
        '/tuyen-sinh',
        '/nganh-dao-tao',
        '/tin-tuc',
        '/sinh-vien',
        '/lien-he',
        '/verify-certificate',
        '/chinh-sach-bao-mat',
        '/dieu-khoan-su-dung',
    ];

    const programPages = allPrograms.map((p) => `/nganh-dao-tao/${p.slug}`);

    const allPages = [...staticPages, ...programPages];

    const urls = allPages
        .map((path) => {
            const lastmod = new Date().toISOString().split('T')[0];
            const priority = path === '' ? '1.0' : path.split('/').length <= 2 ? '0.8' : '0.7';
            return `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
        })
        .join('\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new Response(sitemap, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        },
    });
}