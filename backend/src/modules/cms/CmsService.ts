import { prisma } from '../../infrastructure/prisma';

export class CmsService {
  async createArticle(data: { title: string; content: string; authorId: string; status?: string }) {
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    return await prisma.article.create({
      data: { ...data, slug }
    });
  }

  async getArticles(status?: string) {
    const where = status ? { status } : {};
    return await prisma.article.findMany({ where, orderBy: { createdAt: 'desc' } });
  }

  async updateArticleStatus(id: string, status: string) {
    return await prisma.article.update({
      where: { id },
      data: { status }
    });
  }

  async createFAQ(data: { category: string; question: string; answer: string; order?: number }) {
    return await prisma.fAQ.create({ data });
  }

  async getFAQs() {
    return await prisma.fAQ.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } });
  }
}
