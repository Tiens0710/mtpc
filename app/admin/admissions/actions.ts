'use server';

import { FAQItem, InquiryItem } from './schema';

import { mockFAQs } from './mockData';

// Mock Data - FAQs
let faqData: FAQItem[] = [...mockFAQs];

// Mock Data - Inquiries
let inquiryData: InquiryItem[] = [
    { id: '1', name: 'Nguyễn Văn A', phone: '0901234567', major: 'Y sĩ đa khoa', status: 'new', date: '2026-02-14' },
    { id: '2', name: 'Trần Thị B', phone: '0912345678', major: 'Dược sĩ', status: 'contacted', date: '2026-02-13' },
];


// --- FAQ ACTIONS ---
export async function getFAQs(): Promise<FAQItem[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return faqData;
}

export async function createFAQ(data: FAQItem): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    faqData.push({ ...data, id: Math.random().toString(36).substr(2, 9) });
    return { success: true, message: 'Thêm FAQ thành công' };
}

export async function deleteFAQ(id: string): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 300));
    faqData = faqData.filter(i => i.id !== id);
    return { success: true, message: 'Xóa thành công' };
}

// --- INQUIRY ACTIONS ---
export async function getInquiries(): Promise<InquiryItem[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return inquiryData;
}

export async function updateInquiryStatus(id: string, status: InquiryItem['status']): Promise<{ success: boolean }> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const idx = inquiryData.findIndex(i => i.id === id);
    if (idx !== -1) {
        inquiryData[idx].status = status;
        return { success: true };
    }
    return { success: false };
}
