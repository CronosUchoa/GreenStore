import { HttpContext } from "@adonisjs/core/http"

import Category from "#models/category"

export default class CategoryController {
  async show({ view, params }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    await category.load('products')

    return view.render('pages/categories/show', { category })
  }

  async create ({ view }: HttpContext) {
    return view.render('pages/categories/create')
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.only(['name']) 

    const category = new Category()
    category.merge(payload)

    await category.save()

    return response.redirect().toRoute('categories.create')
  }
}