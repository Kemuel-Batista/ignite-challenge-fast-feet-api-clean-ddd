import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { AdministratorsRepository } from '../../repositories/administrators-repository'
import { OrdersRepository } from '../../repositories/orders-repository'
import { Either, failure, success } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface DeleteOrderUseCaseRequest {
  adminId: string
  orderId: string
}

type DeleteOrderUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteOrderUseCase {
  constructor(
    private administratorsRepository: AdministratorsRepository,
    private ordersRepository: OrdersRepository,
  ) {}

  async execute({
    adminId,
    orderId,
  }: DeleteOrderUseCaseRequest): Promise<DeleteOrderUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      return failure(new ResourceNotFoundError())
    }

    const administrator = await this.administratorsRepository.findById(adminId)

    if (!administrator) {
      return failure(new NotAllowedError())
    }

    await this.ordersRepository.delete(order)

    return success(null)
  }
}
