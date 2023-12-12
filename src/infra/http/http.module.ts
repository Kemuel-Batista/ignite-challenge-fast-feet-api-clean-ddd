import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { StorageModule } from '../storage/storage.module'
import { AuthModule } from '../auth/auth.module'
import { AuthenticateAdministratorController } from './controllers/administrators/authenticate-administrator.controller'
import { AuthenticateAdministratorUseCase } from '@/domain/logistic/application/use-cases/administrators/authenticate-administrator'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule, AuthModule],
  controllers: [AuthenticateAdministratorController],
  providers: [AuthenticateAdministratorUseCase],
})
export class HttpModule {}
