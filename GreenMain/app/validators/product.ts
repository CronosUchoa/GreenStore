import vine from '@vinejs/vine'

/**
 * Validates the product's creation action
 */
export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    price: vine.number().min(0),
    image: vine.string().trim(),
    description: vine.string().trim(),
    categoryId:vine.number().min(0),
    device_id : vine.number().min(0),
  })
)

