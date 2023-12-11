import { Either, failure, success } from '@/core/either'
import { DeliverymansRepository } from '../../repositories/deliverymans-repository'
import { OrdersRepository } from '../../repositories/orders-repository'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface PickUpOrderUseCaseRequest {
  deliverymanId: string
  orderId: string
}

type PickUpOrderUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  null
>

export class PickUpOrderUseCase {
  constructor(
    private deliverymansRepository: DeliverymansRepository,
    private ordersRepository: OrdersRepository,
  ) {}

  async execute({
    deliverymanId,
    orderId,
  }: PickUpOrderUseCaseRequest): Promise<PickUpOrderUseCaseResponse> {
    const deliveryman =
      await this.deliverymansRepository.findById(deliverymanId)

    if (!deliveryman) {
      return failure(new NotAllowedError())
    }

    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      return failure(new ResourceNotFoundError())
    }

    order.deliverymanId = deliveryman.id
    order.status = 'R'
    order.retiredAt = new Date()

    await this.ordersRepository.save(order)

    return success(null)
  }
}
