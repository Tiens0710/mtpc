/**
 * FAQForm Component
 * 
 * Form component để thêm câu hỏi thường gặp (FAQ) mới
 * 
 * Features:
 * - Create-only mode
 * - Fields: question (câu hỏi), answer (câu trả lời)
 * - Simple validation: cả 2 fields đều required
 * - Auto redirect về /admin/admissions/faqs sau khi save
 * 
 * @component Client Component
 */

'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { FAQItem } from '../admissions/schema';
import { createFAQ } from '../admissions/actions';

export default function FAQForm() {
    const router = useRouter();

    // State management
    const [formData, setFormData] = useState<FAQItem>({
        question: '',
        answer: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * Handle input/textarea changes
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    /**
     * Handle form submit
     * Validate: question và answer không empty
     */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.question || !formData.answer) {
            alert('Vui lòng điền đầy đủ câu hỏi và câu trả lời');
            return;
        }

        setIsSubmitting(true);
        try {
            await createFAQ(formData);
            // Redirect về FAQs list
            router.push('/admin/admissions/faqs');
            router.refresh();
        } catch (error) {
            alert('Có lỗi xảy ra');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="admin-form">
            {/* Câu hỏi - required */}
            <div className="form-group">
                <label className="form-label">Câu hỏi</label>
                <input
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Nhập câu hỏi..."
                    required
                />
            </div>

            {/* Câu trả lời - required */}
            <div className="form-group">
                <label className="form-label">Câu trả lời</label>
                <textarea
                    name="answer"
                    value={formData.answer}
                    onChange={handleChange}
                    className="form-textarea"
                    rows={4}
                    placeholder="Nhập câu trả lời..."
                    required
                />
            </div>

            {/* Form actions */}
            <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => router.back()}>Hủy</button>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>Lưu</button>
            </div>
        </form>
    );
}
