import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

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

  async create(data: Prisma.NewsCreateInput) {
    return this.prisma.news.create({
      data,
    });
  }

  async update(id: string, data: Prisma.NewsUpdateInput) {
    return this.prisma.news.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.news.delete({
      where: { id },
    });
  }
}
