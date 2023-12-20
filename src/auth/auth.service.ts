import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'src/accounts/accounts.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const account = await this.accountsService.findOne(email);

    if (typeof account !== 'string') {

      if (await bcrypt.compare(password, account.account_password)) {
        const payload = {
          sub: account.account_id,
          accountEmail: account.account_email,
        };
        return { access_token: await this.jwtService.signAsync(payload) };
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new Error();
    }
  }
}
