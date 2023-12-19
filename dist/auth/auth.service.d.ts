import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'src/accounts/accounts.service';
export declare class AuthService {
    private accountsService;
    private jwtService;
    constructor(accountsService: AccountsService, jwtService: JwtService);
    signIn(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
