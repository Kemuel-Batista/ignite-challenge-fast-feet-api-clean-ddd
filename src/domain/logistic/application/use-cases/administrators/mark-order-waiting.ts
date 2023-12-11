import { Either, failure, success } from '@/core/either'
import { AdministratorsRepository } from '../../repositories/administrators-repository'
import { OrdersRepository } from '../../repositories/orders-repository'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface MarkOrderWaitingUseCaseRequest {
  adminId: string
  orderId: string
}

type MarkOrderWaitingUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  null
>

export class MarkOrderWaitingUseCase {
  constructor(
    private administratorsRepository: AdministratorsRepository,
    private ordersRepository: OrdersRepository,
  ) {}

  async execute({
    adminId,
    orderId,
  }: MarkOrderWaitingUseCaseRequest): Promise<MarkOrderWaitingUseCaseResponse> {
    const administrator = await this.administratorsRepository.findById(adminId)

    if (!administrator) {
      return failure(new NotAllowedError())
    }

    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      return failure(new ResourceNotFoundError())
    }

    order.status = 'A'
    order.postedAt = new Date()

    await this.ordersRepository.save(order)

    return success(null)
  }
}
