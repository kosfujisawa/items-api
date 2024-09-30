import { Test, TestingModule } from '@nestjs/testing';
import { Item, Prisma } from '@prisma/client';
import { ItemsService } from '../src/items/items.service';
import { PrismaService } from '../src/prisma/prisma.service';
import {
  ModuleMetadata,
  NotFoundException,
  ValueProvider,
} from '@nestjs/common';

const mockPrismaService = {
  item: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
};

describe('ItemsServiceTest', () => {
  let itemsService: ItemsService;
  let prismaService: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        } as ValueProvider,
      ],
    } as ModuleMetadata).compile();

    itemsService = module.get(ItemsService);
    prismaService = module.get(PrismaService);
  });

  describe('readAll', () => {
    it('正常系', async () => {
      prismaService.item.findMany.mockReturnValue([]);
      const received: Item[] = await itemsService.readAll();
      const expected: Item[] = [];

      expect(received).toEqual(expected);
      expect(prismaService.item.findMany).toHaveBeenCalledWith();
    });
  });

  describe('readById', () => {
    it('正常系', async () => {
      prismaService.item.findUnique.mockReturnValue({} as Item);
      const received: Item = await itemsService.readById('test-id1');
      const expected: Item = {} as Item;

      expect(received).toEqual(expected);
      expect(prismaService.item.findUnique).toHaveBeenCalledWith({
        where: {
          id: 'test-id1',
        } as Prisma.ItemWhereUniqueInput,
      } as Prisma.ItemFindUniqueArgs);
    });

    it('異常系: 商品が存在しない', async () => {
      prismaService.item.findUnique.mockResolvedValue(null);

      await expect(itemsService.readById('test-id1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
