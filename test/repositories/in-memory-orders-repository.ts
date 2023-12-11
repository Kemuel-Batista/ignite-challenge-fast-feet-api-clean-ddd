import { PaginationParams } from '@/core/repositories/paginations-params'
import { OrdersRepository } from '@/domain/logistic/application/repositories/orders-repository'
import { Order } from '@/domain/logistic/enterprise/entities/order'
import { InMemoryOrderAttachmentRepository } from './in-memory-order-attachment-repository'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  constructor(
    private orderAttachmentRepository: InMemoryOrderAttachmentRepository,
  ) {}

  async findById(id: string): Promise<Order | null> {
    const order = this.items.find((item) => item.id.toString() === id)

    if (!order) {
      return null
    }

    return order
  }

  async findMany({ page }: PaginationParams) {
    const orders = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return orders
  }

  async findManyByDeliverymanId(
    id: string,
    { page }: PaginationParams,
  ): Promise<Order[]> {
    const orders = this.items
      .filter((item) => item.deliverymanId.toString() === id)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return orders
  }

  async create(order: Order): Promise<void> {
    this.items.push(order)
  }

  async save(order: Order): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === order.id)

    this.items[itemIndex] = order

    if (
      order.status === 'E' &&
      order.photo !== null &&
      order.photo !== undefined
    ) {
      await this.orderAttachmentRepository.create(order.photo)
    }
  }

  async delete(order: Order): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === order.id)

    this.items.splice(itemIndex, 1)
  }
}
