import { ItemsService } from './items.service';
import { Item, Prisma } from '@prisma/client';
import { CreateItemDto } from './dto/create-item.dto';
import { Request as ExpressRequest } from 'express';
import { RequestUser } from '../types/requestUser';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    create(req: ExpressRequest & {
        user: RequestUser;
    }, createItemDto: CreateItemDto): Promise<Item>;
    readAll(): Promise<Item[]>;
    readById(id: string): Promise<Item>;
    updateAll(): Promise<Prisma.BatchPayload>;
    updateById(id: string): Promise<Item>;
    deleteAll(): Promise<Prisma.BatchPayload>;
    deleteById(req: ExpressRequest & {
        user: RequestUser;
    }, id: string): Promise<Item>;
}
