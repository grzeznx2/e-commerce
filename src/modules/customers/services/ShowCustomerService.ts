import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import Customer from '../typeorm/entities/Entity'
import CustomersRepository from '../typeorm/repositories/CustomersRespository'

interface IRequest {
  id: string
}

export default class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository)

    const customer = await customersRepository.findById(id)

    if (!customer) throw new AppError('Customer does not exist')

    return customer
  }
}
