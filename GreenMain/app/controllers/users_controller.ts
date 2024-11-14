import User from '#models/user'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import { Console } from 'console'

export default class UsersController {
  index() {
    //TODO: Implementar
  }

  create({ view }: HttpContext) {
    return view.render('pages/users/create')
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)

    const user = new User()
    user.merge(payload)

    await user.save()

    return response.redirect().toRoute('auth.create')
  }

  async edit({ view, auth}: HttpContext) {
    const user = await  User.findOrFail(auth.user?.id);
    return view.render('pages/users/update', { user })
  }
  
  async patch({ params, request, session, response }: HttpContext) {

      const user = await User.findOrFail(params.id)
      
      const data = request.only(['full_name', 'email', 'password'])
      
      if (!data.password) {
        data.password = user.password;
      }
      user.merge(data)
      await user.save()
    
     session.flash({ success: 'Gravação feita com sucesso!' });
     return response.redirect().back()

  }
}
