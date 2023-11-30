import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order, OrderProps } from '@/domain/logistic/enterprise/entities/order'

export function makeOrder(
  override: Partial<OrderProps> = {},
  id?: UniqueEntityID,
) {
  const order = Order.create(
    {
      recipientId: new UniqueEntityID(),
      deliverymanId: new UniqueEntityID(),
      name: faker.person.firstName(),
      ...override,
    },
    id,
  )

  return order
}
