import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { AdministratorsRepository } from '../../repositories/administrators-repository'
import { DeliverymansRepository } from '../../repositories/deliverymans-repository'
import { DeliverymanAlreadyExistsError } from './errors/deliveryman-already-exists-error'
import { Either, failure, success } from '@/core/either'

interface DeleteDeliverymanUseCaseRequest {
  adminId: string
  deliverymanId: string
}

type DeleteDeliverymanUseCaseResponse = Either<
  ResourceNotFoundError | DeliverymanAlreadyExistsError,
  null
>

export class DeleteDeliverymanUseCase {
  constructor(
    private administratorsRepository: AdministratorsRepository,
    private deliverymansRepository: DeliverymansRepository,
  ) {}

  async execute({
    adminId,
    deliverymanId,
  }: DeleteDeliverymanUseCaseRequest): Promise<DeleteDeliverymanUseCaseResponse> {
    const deliveryman =
      await this.deliverymansRepository.findById(deliverymanId)

    if (!deliveryman) {
      return failure(new ResourceNotFoundError())
    }

    const administratorExists =
      await this.administratorsRepository.findById(adminId)

    if (!administratorExists) {
      return failure(new ResourceNotFoundError())
    }

    await this.deliverymansRepository.delete(deliveryman)

    return success(null)
  }
}
