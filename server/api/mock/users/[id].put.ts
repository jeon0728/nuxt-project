import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const id = Number(event.context.params!.id)

  return {
    id,
    name: body.name,
    email: body.email
  }
})
