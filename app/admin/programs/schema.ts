export interface Program {
    id?: string;
    name: string;
    description: string;
    image: string;
    duration: string;
    quota: number;
    tuition: string;              // Bắt buộc - thông tin học phí
    scholarship?: string;         // Optional - học bổng/ưu đãi
    admissionConditions?: string;
}
