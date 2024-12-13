import { HttpContext } from "@adonisjs/core/http"

import Product from "#models/product"
import Category from "#models/category"
import Device from "#models/device"

import { createProductValidator } from "#validators/product"


export default class ProductsController {
  async index({ view, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 10

    const payload = request.only(['name'])

    const query = Product.query()

    if (payload.name && payload.name.length > 0) {
      query.where('name', 'like', `%${payload.name}%`)
    }

    const products = await query.paginate(page, limit)

    products.baseUrl('/products')

    return view.render('pages/products/index', { products })
  }

    async show({ view, params }: HttpContext) {
     const product = await Product.findOrFail(params.id)
     //await product.load('category')
     //console.log(product)

    return view.render('pages/products/show', { product })
  }
  async pc({ view }: HttpContext) {
    const products = await Product.query()
    .whereHas('device', (query) => {
        query.where('name', 'PC');  //precisa de ajuste para categoria correta quando popular o banco
    })
    .preload('category')
    .paginate(1, 4);

    return view.render('pages/products/PC/pc', { products });
  }
  async store({ request,response }: HttpContext) {

    const payload = request.only(['name', 'price', 'description','image','deviceId','categoryId'])//await request.validateUsing(createProductValidator)

    const product = new Product()
    product.merge(payload)
    await product.save()

    return response.redirect().toRoute('products.create')

  }

  async create({ view }: HttpContext) {
    const categories = await Category.all()
    const devices = await Device.all();

    return view.render('pages/products/create', { categories, devices })
  }

  async edit({ view }: HttpContext) {

    const products = await Product.all();
    const devices = await Device.all();


    return view.render('pages/products/edit',{products, devices})
  }

  async patch({ params, request,response}: HttpContext) {
    const product = await Product.findOrFail(params.id)

    const payload = request.only(['name', 'price', 'description','image','device','categoryId'])
    product.merge(payload)

    await product.save()

    return response.redirect().back()
 }

  async destroy({ params, session, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)

    await product.delete()

     session.flash({ success: 'Remoção feita com sucesso!'});
     return response.redirect().back()
  }

  async delete({ view }: HttpContext) {
    const categories = await Category.all()
    const devices = await Device.all();
    const products = await Product.all();

    return view.render('pages/products/delete', { categories, devices ,products })
  }

  //pc

  async epicGames({ request, view }: HttpContext) {
    const page = request.input('page', 1); 
    const limit = 4; 
    const products = await Product.query()
    .whereHas('category', (query) => {
        query.where('name', 'Epic Games');  //precisa de ajuste para categoria correta quando popular o banco
    })
    .preload('category')
    .paginate(page, limit);

    products.baseUrl('/products/epicGames');

    return view.render('pages/products/PC/epicGames', { products });
  }

  async roblox({ request, view }: HttpContext) {
    const page = request.input('page', 1); 
    const limit = 4; 
    const products = await Product.query()
    .whereHas('category', (query) => {
        query.where('name', 'Roblox');  //precisa de ajuste para categoria correta quando popular o banco
    })
    .preload('category')
    .paginate(page, limit);

    products.baseUrl('/products/roblox');

    return view.render('pages/products/PC/roblox', { products });
  }

  async rockstarSocialClub({ request, view }: HttpContext) {
    const page = request.input('page', 1); 
    const limit = 4;
    const products = await Product.query()
    .whereHas('category', (query) => {
        query.where('name', 'Rockstar Social Club');  //precisa de ajuste para categoria correta quando popular o banco
    })
    .preload('category')
    .paginate(page, limit);

    products.baseUrl('/products/rockstarSocialClub');

    return view.render('pages/products/PC/rockstarSocialClub', { products });
  }

  async stream({ request, view }: HttpContext) {
    const page = request.input('page', 1); 
    const limit = 4;
    const products = await Product.query()
    .whereHas('category', (query) => {
        query.where('name', 'Steam');
    })
    .preload('category')
    .paginate(page, limit);

    products.baseUrl('/products/stream');

    return view.render('pages/products/PC/stream', { products });
    }

    async ubisoftConnect({ request, view }: HttpContext) {
      const page = request.input('page', 1); 
      const limit = 4;
      const products = await Product.query()
      .whereHas('category', (query) => {
          query.where('name', 'Ubisoft Connect');  //precisa de ajuste para categoria correta quando popular o banco
      })
      .preload('category')
      .paginate(page, limit);

      products.baseUrl('/products/ubisoftConnect');

      return view.render('pages/products/PC/ubisoftConnect', { products });
    }

  //console
    async nintendo({ request, view }: HttpContext) {
      const page = request.input('page', 1); 
      const limit = 4;
      const products = await Product.query()
      .whereHas('category', (query) => {
          query.where('name', 'Nintendo');  //precisa de ajuste para categoria correta quando popular o banco
      })
      .preload('category')
      .paginate(page, limit);

      products.baseUrl('/products/nintendo');

      return view.render('pages/products/console/nintendo', { products });
    }
  async playStation({ request, view }: HttpContext) {
    const page = request.input('page', 1); 
    const limit = 4; 
    const products = await Product.query()
    .whereHas('category', (query) => {
        query.where('name', 'PlayStation');  //precisa de ajuste para categoria correta quando popular o banco
    })
    .preload('category')
    .paginate(page, limit);
    
    products.baseUrl('/products/playStation');
    return view.render('pages/products/console/playStation', { products });
  }
  async xbox({ request, view }: HttpContext) {
    const page = request.input('page', 1); 
    const limit = 4;
    const products = await Product.query()
    .whereHas('category', (query) => {
        query.where('name', 'Xbox');  //precisa de ajuste para categoria correta quando popular o banco
    })
    .preload('category')
    .paginate(page, limit);

    products.baseUrl('/products/xbox');
    return view.render('pages/products/console/xbox', { products });
  }

  //mobile
  async appStore({ request, view }: HttpContext) {
    const page = request.input('page', 1); 
    const limit = 4;
    const products = await Product.query()
    .whereHas('category', (query) => {
        query.where('name', 'App Store');  //precisa de ajuste para categoria correta quando popular o banco
    })
    .preload('category')
    .paginate(page, limit);

    products.baseUrl('/products/appStore');
    return view.render('pages/products/mobile/appStore', { products });
  }

  async googlePlay({ request, view }: HttpContext) {
    const page = request.input('page', 1); 
    const limit = 4;
    const products = await Product.query()
    .whereHas('category', (query) => {
        query.where('name', 'Google Play'); //precisa de ajuste para categoria correta quando popular o banco
    })
    .preload('category')
    .paginate(page, limit);

    products.baseUrl('/products/googlePlay');
    return view.render('pages/products/mobile/googlePlay', { products });
  }

  //Categoria
  async battleRoyale({ request, view }: HttpContext) {
    const page = request.input('page', 1); 
    const limit = 4;
    const products = await Product.query()
    .whereHas('category', (query) => {
        query.where('name', 'Battler Royale');  //precisa de ajuste para categoria correta quando popular o banco
    })
    .preload('category')
    .paginate(page, limit);

    products.baseUrl('/products/battleRoyale');
    return view.render('pages/products/categoria/battleRoyale', { products });
  }
  async fps({ request, view }: HttpContext) {
    const page = request.input('page', 1); 
    const limit = 4;
    const products = await Product.query()
    .whereHas('category', (query) => {
        query.where('name', 'FPS');  //precisa de ajuste para categoria correta quando popular o banco
    })
    .preload('category')
    .paginate(page, limit);

    products.baseUrl('/products/fps');
    return view.render('pages/products/categoria/fps', { products });
  }
  async mmorpg({ request, view }: HttpContext) {
    const page = request.input('page', 1); 
    const limit = 4;
    const products = await Product.query()
    .whereHas('category', (query) => {
        query.where('name', 'MMORPG');  //precisa de ajuste para categoria correta quando popular o banco
    })
    .preload('category')
    .paginate(page, limit);

    products.baseUrl('/products/mmorpg');
    return view.render('pages/products/categoria/mmorpg', { products });
  }
  async rpg({request, view }: HttpContext) {
    const page = request.input('page', 1); 
    const limit = 4;
    const products = await Product.query()
    .whereHas('category', (query) => {
        query.where('name', 'RPG');  //precisa de ajuste para categoria correta quando popular o banco
    })
    .preload('category')
    .paginate(page, limit);

    products.baseUrl('/products/rpg');
    return view.render('pages/products/categoria/rpg', { products });
  }
}
