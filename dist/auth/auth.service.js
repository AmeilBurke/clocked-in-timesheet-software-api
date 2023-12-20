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
const jwt_1 = require("@nestjs/jwt");
const accounts_service_1 = require("../accounts/accounts.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(accountsService, jwtService) {
        this.accountsService = accountsService;
        this.jwtService = jwtService;
    }
    async signIn(email, password) {
        const account = await this.accountsService.findOne(email);
        if (typeof account !== 'string') {
            if (await bcrypt.compare(password, account.account_password)) {
                const payload = {
                    sub: account.account_id,
                    accountEmail: account.account_email,
                };
                return { access_token: await this.jwtService.signAsync(payload) };
            }
            else {
                throw new common_1.UnauthorizedException();
            }
        }
        else {
            throw new Error();
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map