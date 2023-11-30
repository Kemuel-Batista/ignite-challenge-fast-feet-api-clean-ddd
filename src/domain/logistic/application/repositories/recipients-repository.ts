import { PaginationParams } from '@/core/repositories/paginations-params'
import { Recipient } from '../../enterprise/entities/recipient'

export interface RecipientsRepository {
  findById(id: string): Promise<Recipient | null>
  findByEmail(email: string): Promise<Recipient | null>
  findMany(params: PaginationParams): Promise<Recipient[]>
  create(recipient: Recipient): Promise<void>
  save(recipient: Recipient): Promise<void>
  delete(recipient: Recipient): Promise<void>
}
