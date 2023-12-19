import { AuthService } from './auth.service';
import { AuthDto } from './dto/authDto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: AuthDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
}
