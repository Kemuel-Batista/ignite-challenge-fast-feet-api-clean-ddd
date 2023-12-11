import { PaginationParams } from '@/core/repositories/paginations-params'
import { Order } from '../../enterprise/entities/order'

export type FindManyNearbyParams = PaginationParams & {
  latitude: number
  longitude: number
}

export interface OrdersRepository {
  findById(id: string): Promise<Order | null>
  findMany(params: PaginationParams): Promise<Order[]>
  findManyByDeliverymanId(
    id: string,
    params: PaginationParams,
  ): Promise<Order[]>
  findManyByDeliverymanAndNearby(
    id: string,
    params: FindManyNearbyParams,
  ): Promise<Order[]>
  create(order: Order): Promise<void>
  save(order: Order): Promise<void>
  delete(order: Order): Promise<void>
}
