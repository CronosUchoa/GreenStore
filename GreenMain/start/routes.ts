/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const UsersController = () => import('#controllers/users_controller')
const ProductsController = () => import('#controllers/products_controller')
const AuthController = () => import('#controllers/auth_controller')
const CategoryController = () => import('#controllers/categories_controller')
const DeviceController = () => import('#controllers/device_controller')
const HomeController = () => import('#controllers/home_controller')
const CartController = () => import('#controllers/cart_controller')

router.get('/', [HomeController, 'show']).as('home.show')

router.get('/login', [AuthController, 'create']).as('auth.create')
router.post('/login', [AuthController, 'store']).as('auth.store')
router.get('/logout', [AuthController, 'destroy']).use(middleware.auth()).as('auth.destroy')

router.get('/user', [UsersController, 'create']).as('users.create')
router.post('/user', [UsersController, 'store']).as('users.store')
router.get('/user/edit', [UsersController, 'edit']).as('users.edit')
router.patch('/user/:id', [UsersController, 'patch']).as('users.patch')



router
  .group(() => {
    //Crud Produto
    router.get('/products', [ProductsController, 'index']).as('products.index')
    router.get('/products/new', [ProductsController, 'create']).as('products.create')
    router.get('/products/delete', [ProductsController, 'delete']).as('products.delete')
    router.get('/products/edit', [ProductsController, 'edit']).as('products.edit')

    router.delete('/products/:id', [ProductsController, 'destroy']).as('products.destroy')
    router.patch('/products/:id', [ProductsController, 'patch']).as('products.patch')
    router.post('/products', [ProductsController, 'store']).as('products.store')
  })
router.get('/products/pc', [ProductsController, 'pc']).as('products.pc')


    //PC
    router.get('/products/epicGames', [ProductsController, 'epicGames']).as('products.epicGames')
    router.get('/products/roblox', [ProductsController, 'roblox']).as('products.roblox')
    router.get('/products/rockstarSocialClub', [ProductsController, 'rockstarSocialClub']).as('products.rockstarSocialClub')
    router.get('/products/stream', [ProductsController, 'stream']).as('products.stream')
    router.get('/products/ubisoftConnect', [ProductsController, 'ubisoftConnect']).as('products.ubisoftConnect')


    //Console
    router.get('/products/nintendo', [ProductsController, 'nintendo']).as('products.nintendo')
    router.get('/products/playStation', [ProductsController, 'playStation']).as('products.playStation')
    router.get('/products/xbox', [ProductsController, 'xbox']).as('products.xbox')

    //mobile
    router.get('/products/appStore', [ProductsController, 'appStore']).as('products.appStore')
    router.get('/products/googlePlay', [ProductsController, 'googlePlay']).as('products.googlePlay')

    //categoria
    router.get('/products/battleRoyale', [ProductsController, 'battleRoyale']).as('products.batleRoyale')
    router.get('/products/fps', [ProductsController, 'fps']).as('products.fps')
    router.get('/products/mmorpg', [ProductsController, 'mmorpg']).as('products.mmorpg')
    router.get('/products/rpg', [ProductsController, 'rpg']).as('products.rpg')

    router.get('/products/:id', [ProductsController, 'show']).as('products.show')
.use(middleware.auth())

router.get('/categories/new', [CategoryController, 'create']).as('categories.create')
router.get('/categories/:id', [CategoryController, 'show']).as('categories.show')
router.post('/categories', [CategoryController, 'store']).as('categories.store')

router.get('/devices/new', [DeviceController, 'create']).as('devices.create')
router.get('/devices/:id', [DeviceController, 'show']).as('devices.show')
router.post('/devices', [DeviceController, 'store']).as('devices.store')

router
  .group(() => {
    router.get('/cart', [CartController, 'index']).as('car_items.index')
    router.post('/cart', [CartController, 'store']).as('car_items.store')
    router.put('/cart/:id', [CartController, 'update']).as('car_items.update')
    router.post('/cart/:id', [CartController, 'destroy']).as('car_items.destroy')
  })
  //.use(middleware.auth())
router.post('/cart-items', [CartController, 'store']).use(middleware.auth()).as('cart_items.store')

