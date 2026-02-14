// Tuition Fee Interface
export interface FeeItem {
    id?: string;
    major: string;
    tuition: string;
    note?: string;
    scholarship?: string;
}

// FAQ Interface
export interface FAQItem {
    id?: string;
    question: string;
    answer: string;
}

// Inquiry Interface
export interface InquiryItem {
    id: string;
    name: string;
    phone: string;
    email?: string;
    major: string;
    status: 'new' | 'contacted' | 'admitted' | 'rejected';
    date: string;
}
