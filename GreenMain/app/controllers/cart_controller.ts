import { HttpContext } from "@adonisjs/core/http"

import CartItem from '#models/carItem'
import Product from '#models/product'

export default class CartController {
  // Listar itens do carrinho
  public async index({ view, auth }: HttpContext) {
    const user = await auth.authenticate()

    // Buscar itens do carrinho e produtos disponíveis
    const cartItem = await CartItem.query()
      .where('user_id', user.id)
      .preload('product')
    const products = await Product.all()

    // Renderizar a página com dados
    return view.render('pages/users/carrinho', { cartItem, products })
  }

  // Adicionar item ao carrinho
  public async store({ params,auth, request, response, view }: HttpContext) {
    const user = await auth.authenticate(); // Verifica se o usuário está autenticado


    // Obtém o ID do produto do formulário
    const  {productId} = request.only(['productId']);
    console.log(productId.productId)
    // Verifica se o produto existe
    //const product = await Product.find(productId.productId);
    //if (!product) {
   //   return response.notFound({ message: 'Produto não encontrado' });
    //}

    // Atualiza ou cria um novo item no carrinho
    await CartItem.updateOrCreate(
      { userId: user.id,productId }, // Condição para encontrar o item no carrinho
      { quantity: 1 },
    );

    // Renderiza a página do carrinho (ou redireciona para ela)
    return response.redirect().back()
  }

  // Atualizar quantidade de um item
  public async update({ auth, request, response, params }: HttpContext) {
    const user = await auth.authenticate()
    const { quantity } = request.only(['quantity'])

    const cartItem = await CartItem.query()
      .where('id', params.id)
      .andWhere('user_id', user.id)
      .first()

    if (!cartItem) {
      return response.notFound({ message: 'Item not found in your cart' })
    }

    cartItem.quantity = quantity
    await cartItem.save()

    return response.ok(cartItem)
  }

  // Remover item do carrinho
  public async destroy({ auth, response, params }: HttpContext) {
    const user = await auth.authenticate()

    const cartItem = await CartItem.query()
      .where('id', params.id)
      .andWhere('user_id', user.id)
      .first()

    if (!cartItem) {
      return response.notFound({ message: 'Item not found in your cart' })
    }

    await cartItem.delete()
    return response.noContent()
  }
}
