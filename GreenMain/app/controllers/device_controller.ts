import { HttpContext } from "@adonisjs/core/http"

import Device from "#models/device"

export default class DeviceController {
  async show({ view, params }: HttpContext) {
    const device = await Device.findOrFail(params.id)
    await device.load('products')

    return view.render('pages/devices/show', { device })
  }

  async create ({ view }: HttpContext) {
    return view.render('pages/devices/create')
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.only(['name']) 

    const device = new Device()
    device.merge(payload)

    await device.save()

    return response.redirect().toRoute('devices.create')
  }
}