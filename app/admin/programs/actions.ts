'use server';

import { Program } from './schema';

// Mock database
let programs: Program[] = [
    {
        id: '1',
        name: 'Y sĩ đa khoa',
        description: 'Đào tạo Y sĩ đa khoa chất lượng cao, đáp ứng nhu cầu y tế cộng đồng.',
        image: '/images/program-y-si.jpg',
        duration: '2 năm',
        quota: 100,
        tuition: '12.000.000đ/năm',
        scholarship: 'Giảm 30% năm đầu',
    },
    {
        id: '2',
        name: 'Dược sĩ',
        description: 'Chương trình đào tạo Dược sĩ trung cấp, kỹ năng bán thuốc và quản lý dược.',
        image: '/images/program-duoc-si.jpg',
        duration: '2 năm',
        quota: 80,
        tuition: '13.000.000đ/năm',
        scholarship: 'Giảm 25% năm đầu',
    }
];

export async function getPrograms(): Promise<Program[]> {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return programs;
}

export async function getProgramById(id: string): Promise<Program | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return programs.find(p => p.id === id);
}

export async function createProgram(data: Program): Promise<{ success: boolean; message: string; data?: Program }> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const newProgram = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
    };

    programs.push(newProgram);
    return { success: true, message: 'Thêm chương trình thành công', data: newProgram };
}

export async function updateProgram(id: string, data: Program): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const index = programs.findIndex(p => p.id === id);
    if (index === -1) {
        return { success: false, message: 'Không tìm thấy chương trình' };
    }

    programs[index] = { ...data, id };
    return { success: true, message: 'Cập nhật thành công' };
}

export async function deleteProgram(id: string): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 500));

    programs = programs.filter(p => p.id !== id);
    return { success: true, message: 'Xóa chương trình thành công' };
}
