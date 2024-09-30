"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let ItemsService = class ItemsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(userId, { name, price, description }) {
        return await this.prismaService.item.create({
            data: {
                name,
                price,
                description,
                userId,
            },
        });
    }
    async readAll() {
        return await this.prismaService.item.findMany();
    }
    async readById(id) {
        const found = await this.prismaService.item.findUnique({
            where: {
                id,
            },
        });
        if (!found) {
            throw new common_1.NotFoundException();
        }
        return found;
    }
    async updateAll() {
        return await this.prismaService.item.updateMany({
            data: {
                status: client_1.ItemStatus.ON_SALE,
            },
        });
    }
    async updateById(id) {
        return await this.prismaService.item.update({
            data: {
                status: client_1.ItemStatus.SOLD_OUT,
            },
            where: {
                id,
            },
        });
    }
    async deleteAll() {
        return await this.prismaService.item.deleteMany();
    }
    async deleteById(userId, id) {
        return await this.prismaService.item.delete({
            where: {
                id,
                userId,
            },
        });
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ItemsService);
//# sourceMappingURL=items.service.js.map