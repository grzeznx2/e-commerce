import redisCache from '@shared/cache/RedisCache'
import { getCustomRepository } from 'typeorm'
import Product from '../typeorm/entities/Product'
import { ProductRepository } from '../typeorm/repositories/ProductsRepository'

export class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRespository = getCustomRepository(ProductRepository)

    // const redisCache = new RedisCache()

    let products = await redisCache.recover<Product[]>('api-vendas-PRODUCT_LIST')

    if (!products) {
      products = await productsRespository.find()

      await redisCache.save('api-vendas-PRODUCT_LIST', products)
    }

    return products
  }
}

export default ListProductService
