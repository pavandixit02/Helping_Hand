import { prisma } from '../../infrastructure/prisma';

export class ConfigService {
  async setConfig(key: string, value: any, updatedBy?: string, description?: string) {
    return await prisma.systemConfig.upsert({
      where: { key },
      update: { value, updatedBy, description },
      create: { key, value, updatedBy, description }
    });
  }

  async getConfig(key: string) {
    const config = await prisma.systemConfig.findUnique({ where: { key } });
    return config?.value;
  }

  async getAllConfigs() {
    return await prisma.systemConfig.findMany();
  }
}
