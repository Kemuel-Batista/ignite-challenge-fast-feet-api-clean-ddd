import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface RecipientProps {
  name: string
  email: string
  phone: string
  address: {
    street: string
    number: string
    city: string
    state: string
    zipcode: string
    latitude: number
    longitude: number
  }
  createdAt: Date
  updatedAt?: Date | null
}

export class Recipient extends Entity<RecipientProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  get phone() {
    return this.props.phone
  }

  set phone(phone: string) {
    this.props.phone = phone
    this.touch()
  }

  get street() {
    return this.props.address.street
  }

  set street(street: string) {
    this.props.address.street = street
    this.touch()
  }

  get number() {
    return this.props.address.number
  }

  set number(number: string) {
    this.props.address.number = number
    this.touch()
  }

  get city() {
    return this.props.address.city
  }

  set city(city: string) {
    this.props.address.city = city
    this.touch()
  }

  get state() {
    return this.props.address.state
  }

  set state(state: string) {
    this.props.address.state = state
    this.touch()
  }

  get zipcode() {
    return this.props.address.zipcode
  }

  set zipcode(zipcode: string) {
    this.props.address.zipcode = zipcode
    this.touch()
  }

  get latitude() {
    return this.props.address.latitude
  }

  set latitude(latitude: number) {
    this.props.address.latitude = latitude
    this.touch()
  }

  get longitude() {
    return this.props.address.longitude
  }

  set longitude(longitude: number) {
    this.props.address.longitude = longitude
    this.touch()
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
    props: Optional<RecipientProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const recipient = new Recipient(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return recipient
  }
}
