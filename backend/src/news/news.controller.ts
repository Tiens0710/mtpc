import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewsService } from './news.service';
import { Prisma } from '@prisma/client';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  async create(@Body() createNewsDto: Prisma.NewsCreateInput) {
    const data = await this.newsService.create(createNewsDto);
    return { success: true, message: 'Thêm tin tức thành công', data };
  }

  @Get()
  async findAll() {
    return this.newsService.findAll();
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.newsService.findBySlug(slug);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNewsDto: Prisma.NewsUpdateInput) {
    const data = await this.newsService.update(id, updateNewsDto);
    return { success: true, message: 'Cập nhật thành công', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.newsService.remove(id);
    return { success: true, message: 'Xóa tin tức thành công' };
  }
}
