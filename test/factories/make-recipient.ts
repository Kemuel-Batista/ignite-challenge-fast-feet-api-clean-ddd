import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Recipient } from '@/domain/logistic/enterprise/entities/recipient'

export function makeRecipient(id?: UniqueEntityID) {
  const recipient = Recipient.create(
    {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: {
        street: faker.location.streetAddress(),
        number: faker.location.buildingNumber(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipcode: faker.location.zipCode(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      },
    },
    id,
  )

  return recipient
}
