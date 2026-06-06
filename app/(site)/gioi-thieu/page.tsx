import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import GioiThieuContent from './GioiThieuContent';

export const metadata: Metadata = {
    title: 'Giới thiệu',
    description: `${siteConfig.school.nameFull} - ${siteConfig.school.description}`,
};

export default function GioiThieuPage() {
    return <GioiThieuContent />;
}