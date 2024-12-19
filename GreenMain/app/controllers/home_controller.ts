import { HttpContext } from "@adonisjs/core/http"

import Product from "#models/product"
import Category from "#models/category"
import Device from "#models/device"


import { createProductValidator } from "#validators/product"


export default class HomeController {
  async show({ view, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 10

    const payload = request.only(['name'])

    const query = Product.query()

    if (payload.name && payload.name.length > 0) {
      query.where('name', 'like', `%${payload.name}%`)
    }

    const products = await query.paginate(page, limit)

    return view.render('pages/home/show', { products })
  }




}
