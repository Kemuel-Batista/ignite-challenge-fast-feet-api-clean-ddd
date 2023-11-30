import { PaginationParams } from '@/core/repositories/paginations-params'
import { Order } from '../../enterprise/entities/order'

export interface OrdersRepository {
  findById(id: string): Promise<Order | null>
  findMany(params: PaginationParams): Promise<Order[]>
  create(order: Order): Promise<void>
  save(order: Order): Promise<void>
  delete(order: Order): Promise<void>
}
