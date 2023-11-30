import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface OrderProps {
  recipientId: UniqueEntityID
  deliverymanId: UniqueEntityID
  name: string
  status: string
  photo?: string | null
  postedAt?: Date | null
  retiredAt?: Date | null
  deliveryAt?: Date | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Order extends Entity<OrderProps> {
  get recipientId() {
    return this.props.recipientId
  }

  get deliverymanId() {
    return this.props.deliverymanId
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get status() {
    return this.props.status
  }

  set status(status: string) {
    this.props.status = status
    this.touch()
  }

  get photo() {
    return this.props.photo
  }

  set photo(photo: string | null | undefined) {
    this.props.photo = photo
    this.touch()
  }

  get postedAt() {
    return this.props.postedAt
  }

  get retiredAt() {
    return this.props.retiredAt
  }

  get deliveryAt() {
    return this.props.deliveryAt
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<OrderProps, 'createdAt' | 'status'>,
    id?: UniqueEntityID,
  ) {
    const order = new Order(
      {
        ...props,
        status: props.status ?? 'A',
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return order
  }
}
