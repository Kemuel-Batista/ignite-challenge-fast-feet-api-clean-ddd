import { PaginationParams } from '@/core/repositories/paginations-params'
import { OrdersRepository } from '@/domain/logistic/application/repositories/orders-repository'
import { Order } from '@/domain/logistic/enterprise/entities/order'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  async findById(id: string): Promise<Order | null> {
    const order = this.items.find((item) => item.id.toString() === id)

    if (!order) {
      return null
    }

    return order
  }

  async findMany({ page }: PaginationParams) {
    const recipients = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return recipients
  }

  async create(order: Order): Promise<void> {
    this.items.push(order)
  }

  async save(order: Order): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === order.id)

    this.items[itemIndex] = order
  }

  async delete(order: Order): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === order.id)

    this.items.splice(itemIndex, 1)
  }
}
