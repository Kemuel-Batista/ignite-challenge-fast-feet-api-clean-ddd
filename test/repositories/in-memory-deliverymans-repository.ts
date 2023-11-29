import { DeliverymansRepository } from '@/domain/logistic/application/repositories/deliverymans-repository'
import { Deliveryman } from '@/domain/logistic/enterprise/entities/deliveryman'

export class InMemoryDeliverymansRepository implements DeliverymansRepository {
  public items: Deliveryman[] = []

  async findById(id: string): Promise<Deliveryman | null> {
    const deliveryman = this.items.find((item) => item.id.toString() === id)

    if (!deliveryman) {
      return null
    }

    return deliveryman
  }

  async findByIdentifier(cpf: string): Promise<Deliveryman | null> {
    const deliveryman = this.items.find((item) => item.cpf === cpf)

    if (!deliveryman) {
      return null
    }

    return deliveryman
  }

  async findByEmail(email: string): Promise<Deliveryman | null> {
    const deliveryman = this.items.find((item) => item.email === email)

    if (!deliveryman) {
      return null
    }

    return deliveryman
  }

  async create(deliveryman: Deliveryman): Promise<void> {
    this.items.push(deliveryman)
  }

  async save(deliveryman: Deliveryman): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === deliveryman.id)

    this.items[itemIndex] = deliveryman
  }

  async delete(deliveryman: Deliveryman): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === deliveryman.id)

    this.items.splice(itemIndex, 1)
  }
}
