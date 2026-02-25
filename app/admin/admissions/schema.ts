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
