import { Administrator } from '../../enterprise/entities/Administrator'

export interface AdministratorsRepository {
  findById(id: string): Promise<Administrator | null>
  findByCPF(cpf: string): Promise<Administrator | null>
  findByEmail(email: string): Promise<Administrator | null>
  create(Administrator: Administrator): Promise<void>
  save(Administrator: Administrator): Promise<void>
  delete(Administrator: Administrator): Promise<void>
}
