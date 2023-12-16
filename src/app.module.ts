import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TradesModule } from './trades/trades.module';
import { RolesModule } from './roles/roles.module';
import { EstablishmentsModule } from './establishments/establishments.module';
import { AccountsModule } from './accounts/accounts.module';
import { JobsModule } from './jobs/jobs.module';
import { TimesheetsModule } from './timesheets/timesheets.module';

@Module({
  imports: [TradesModule, RolesModule, EstablishmentsModule, AccountsModule, JobsModule, TimesheetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
