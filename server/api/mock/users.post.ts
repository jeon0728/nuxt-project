import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // body = { name: '홍길동', email: 'hong@test.com' }

  return {
    id: Date.now(), // 임시 ID
    name: body.name,
    email: body.email
  }
})
