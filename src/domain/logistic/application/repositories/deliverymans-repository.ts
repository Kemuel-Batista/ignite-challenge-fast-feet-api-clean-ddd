import { PaginationParams } from '@/core/repositories/paginations-params'
import { Deliveryman } from '../../enterprise/entities/deliveryman'

export interface DeliverymansRepository {
  findById(id: string): Promise<Deliveryman | null>
  findByIdentifier(cpf: string): Promise<Deliveryman | null>
  findByEmail(email: string): Promise<Deliveryman | null>
  findMany(params: PaginationParams): Promise<Deliveryman[]>
  create(deliveryman: Deliveryman): Promise<void>
  save(deliveryman: Deliveryman): Promise<void>
  delete(deliveryman: Deliveryman): Promise<void>
}
