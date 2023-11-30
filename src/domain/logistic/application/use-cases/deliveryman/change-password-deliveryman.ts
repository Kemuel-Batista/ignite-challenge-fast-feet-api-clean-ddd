import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { HashGenerator } from '../../cryptography/hash-generator'
import { AdministratorsRepository } from '../../repositories/administrators-repository'
import { DeliverymansRepository } from '../../repositories/deliverymans-repository'
import { DeliverymanAlreadyExistsError } from './errors/deliveryman-already-exists-error'
import { Deliveryman } from '@/domain/logistic/enterprise/entities/deliveryman'
import { Either, failure, success } from '@/core/either'
import { PasswordsNotEqualsError } from './errors/passwords-not-equals-error'

interface ChangePasswordDeliverymanUseCaseRequest {
  adminId: string
  deliverymanId: string
  password: string
  confirmPassword: string
}

type ChangePasswordDeliverymanUseCaseResponse = Either<
  | ResourceNotFoundError
  | DeliverymanAlreadyExistsError
  | PasswordsNotEqualsError,
  {
    deliveryman: Deliveryman
  }
>

export class ChangePasswordDeliverymanUseCase {
  constructor(
    private administratorsRepository: AdministratorsRepository,
    private deliverymansRepository: DeliverymansRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    adminId,
    deliverymanId,
    password,
    confirmPassword,
  }: ChangePasswordDeliverymanUseCaseRequest): Promise<ChangePasswordDeliverymanUseCaseResponse> {
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

    if (password !== confirmPassword) {
      return failure(new PasswordsNotEqualsError())
    }

    const hashedPassword = await this.hashGenerator.hash(password)
    deliveryman.password = hashedPassword

    await this.deliverymansRepository.save(deliveryman)

    return success({
      deliveryman,
    })
  }
}
