import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class AuthService {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const account = await this.accountsService.findOne(email);

    // need to change stored password from plain text to bcypt hashed password
    if (typeof account !== 'string') {
      if (account.account_password !== password) {
        throw new UnauthorizedException();
      }

      const payload = {
        sub: account.account_id,
        accountEmail: account.account_email,
      };
      return { access_token: await this.jwtService.signAsync(payload) };
    } else {
      throw new Error();
    }
  }
}
