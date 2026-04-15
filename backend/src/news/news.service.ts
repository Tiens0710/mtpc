import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

export function generateSlug(text: string): string {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.news.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.news.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.news.findUnique({
      where: { slug },
    });
  }

  async create(data: Prisma.NewsCreateInput) {
    const baseSlug = generateSlug(data.title);
    const timestamp = Date.now().toString().slice(-6); // Lấy 6 số cuối cho gọn
    const slug = `${baseSlug}-${timestamp}`;

    return this.prisma.news.create({
      data: { ...data, slug },
    });
  }

  async update(id: string, data: Prisma.NewsUpdateInput) {
    let slug;
    if (data.title && typeof data.title === 'string') {
      const baseSlug = generateSlug(data.title);
      const timestamp = Date.now().toString().slice(-6);
      slug = `${baseSlug}-${timestamp}`;
    }

    return this.prisma.news.update({
      where: { id },
      data: slug ? { ...data, slug } : data,
    });
  }

  async remove(id: string) {
    return this.prisma.news.delete({
      where: { id },
    });
  }
}
