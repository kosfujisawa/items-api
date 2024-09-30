import { Injectable, NotFoundException } from '@nestjs/common';
import { Item, ItemStatus, Prisma } from '@prisma/client';
import { CreateItemDto } from './dto/create-item.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    userId: string,
    { name, price, description }: CreateItemDto,
  ): Promise<Item> {
    return await this.prismaService.item.create({
      data: {
        name,
        price,
        description,
        userId,
      } as Prisma.ItemUncheckedCreateInput,
    } as Prisma.ItemCreateArgs);
  }

  async readAll(): Promise<Item[]> {
    return await this.prismaService.item.findMany();
  }

  async readById(id: string): Promise<Item> {
    const found: Item = await this.prismaService.item.findUnique({
      where: {
        id,
      } as Prisma.ItemWhereUniqueInput,
    } as Prisma.ItemFindUniqueArgs);
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async updateAll(): Promise<Prisma.BatchPayload> {
    return await this.prismaService.item.updateMany({
      data: {
        status: ItemStatus.ON_SALE,
      } as Prisma.ItemUpdateManyMutationInput,
    } as Prisma.ItemUpdateManyArgs);
  }

  async updateById(id: string): Promise<Item> {
    return await this.prismaService.item.update({
      data: {
        status: ItemStatus.SOLD_OUT,
      } as Prisma.ItemUpdateInput,
      where: {
        id,
      } as Prisma.ItemWhereInput,
    } as Prisma.ItemUpdateArgs);
  }

  async deleteAll(): Promise<Prisma.BatchPayload> {
    return await this.prismaService.item.deleteMany();
  }

  async deleteById(userId: string, id: string): Promise<Item> {
    return await this.prismaService.item.delete({
      where: {
        id,
        userId,
      } as Prisma.ItemWhereUniqueInput,
    } as Prisma.ItemDeleteArgs);
  }
}
