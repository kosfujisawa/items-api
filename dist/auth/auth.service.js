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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
let AuthService = class AuthService {
    constructor(prismaService, jwtService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
    }
    async signUp({ name, email, password, status, }) {
        return await this.prismaService.user.create({
            data: {
                name,
                email,
                password: await (0, bcrypt_1.hash)(password, 10),
                status,
            },
        });
    }
    async signIn({ email, password }) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email,
            },
        });
        if (user && (await (0, bcrypt_1.compare)(password, user.password))) {
            return this.jwtService.sign({
                sub: user.id,
                username: user.name,
                status: user.status,
            });
        }
        throw new common_1.UnauthorizedException();
    }
    async readAll() {
        return await this.prismaService.user.findMany();
    }
    async readById(id) {
        return await this.prismaService.user.findUnique({
            where: {
                id,
            },
        });
    }
    async deleteAll() {
        return await this.prismaService.user.deleteMany();
    }
    async deleteById(id) {
        return await this.prismaService.user.delete({
            where: {
                id,
            },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map