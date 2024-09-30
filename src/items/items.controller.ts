import { ItemsService } from './items.service';
import { Item, Prisma } from '@prisma/client';
import { CreateItemDto } from './dto/create-item.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { RequestUser } from '../types/requestUser';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Request() req: ExpressRequest & { user: RequestUser },
    @Body() createItemDto: CreateItemDto,
  ): Promise<Item> {
    return await this.itemsService.create(req.user.id, createItemDto);
  }

  @Get()
  async readAll(): Promise<Item[]> {
    return await this.itemsService.readAll();
  }

  @Get(':id')
  async readById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.itemsService.readById(id);
  }

  @Put()
  async updateAll(): Promise<Prisma.BatchPayload> {
    return await this.itemsService.updateAll();
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.itemsService.updateById(id);
  }

  @Delete()
  async deleteAll(): Promise<Prisma.BatchPayload> {
    return await this.itemsService.deleteAll();
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteById(
    @Request() req: ExpressRequest & { user: RequestUser },
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Item> {
    return await this.itemsService.deleteById(req.user.id, id);
  }
}
