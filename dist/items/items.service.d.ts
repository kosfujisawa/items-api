import { Item, Prisma } from '@prisma/client';
import { CreateItemDto } from './dto/create-item.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class ItemsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(userId: string, { name, price, description }: CreateItemDto): Promise<Item>;
    readAll(): Promise<Item[]>;
    readById(id: string): Promise<Item>;
    updateAll(): Promise<Prisma.BatchPayload>;
    updateById(id: string): Promise<Item>;
    deleteAll(): Promise<Prisma.BatchPayload>;
    deleteById(userId: string, id: string): Promise<Item>;
}
