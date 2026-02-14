export interface Program {
    id?: string;
    name: string;
    description: string;
    image: string;
    duration: string;
    quota: number;
    tuition?: string;
    admissionConditions?: string;
}
