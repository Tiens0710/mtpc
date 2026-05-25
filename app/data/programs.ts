// Re-export từ lib/programs.ts — single source of truth mới
// Các component hiện tại vẫn dùng format {id, name, description, duration, image, quota}
// nên tạo adapter ở dưới

import { programs as libPrograms, formatTuition } from '@/lib/programs';
import type { Program as LibProgram } from '@/lib/programs';

// Adapter: chuyển từ format lib/programs sang format cũ mà components đang dùng
export const programs = libPrograms.map((p, index) => ({
    id: index + 1,
    name: p.name,
    description: p.description,
    duration: p.duration,
    image: p.image,
    quota: p.enrollment,
    slug: p.slug,
    code: p.code,
    tuitionPerYear: p.tuitionPerYear,
    tuitionNote: p.tuitionNote,
    certificate: p.certificate,
    highlights: p.highlights,
    careerPaths: p.careerPaths,
}));

export type Program = typeof programs[number];

export { formatTuition };
export type { LibProgram };
