import { Request, Response } from 'express'
import CreateProductService from '../services/CreateProductService'
import DeleteProductService from '../services/DeleteProductService'
import ListProductService from '../services/ListProductService'
import ShowProductService from '../services/ShowProductService'
import UpdateProductService from '../services/UpdateProductService'

export default class ProductsController {
  // nie obsługujemy nigdzie błędów, nie ma trycatch!
  public async index(req: Request, res: Response): Promise<Response> {
    const listProducts = new ListProductService()

    // products to promise, ponieważ nigdzie nie odczekujemy!
    // jednak odczekujemy
    const products = await listProducts.execute()

    return res.json(products)
  }

  public async show(req: Request, res: Response): Promise<Response> {
    //   uwaga => zrobić z SG TS => body może nie zawierać 'id', ale tutaj nie mamy sygnalizacji błędu!
    const { id } = req.params
    const showProduct = new ShowProductService()

    const product = await showProduct.execute({ id })

    return res.json(product)
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body

    const createProduct = new CreateProductService()

    const product = await createProduct.execute({ name, price, quantity })

    return res.json(product)
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body
    const { id } = req.params

    const updateProduct = new UpdateProductService()

    const product = await updateProduct.execute({ id, name, price, quantity })

    return res.json(product)
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const deleteProduct = new DeleteProductService()

    await deleteProduct.execute({ id })

    return res.json([])
  }
}
