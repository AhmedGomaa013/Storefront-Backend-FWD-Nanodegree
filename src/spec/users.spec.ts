import request from 'supertest'
import app from '../app'
import { GeneralResponse, GeneralResponseList } from '../dtos/responses/general-responses'
import { UserInfo } from '../dtos/user-info'

describe('Users APIs', () => {
  it('should return 200 and new user', async () => {
    const user = new UserInfo()
    user.firstname = 'test'
    user.lastname = 'test'
    user.username = `userProfile${Math.floor(Math.random() * 100)}`
    user.password = '1234'

    const res = await request(app).post('/users/create').send(user).expect(200)
    const body = JSON.parse(JSON.stringify(res.body)) as GeneralResponse<UserInfo>

    expect(body.data.username).toBe(user.username)
  })

  it('should return 200 and token', async () => {
    const user = new UserInfo()
    user.firstname = 'test'
    user.lastname = 'test'
    user.username = `userProfile${Math.floor(Math.random() * 100)}`
    user.password = '1234'

    let res = await request(app).post('/users/create').send(user).expect(200)

    res = await request(app).post('/users/authenticate').send(user).expect(200)

    expect(res.body).toBeDefined()
  })

  it('should return 401 for get all users', async () => {
    await request(app).get('/users').expect(401)
  })

  it('should return 200 and get all users', async () => {
    const user = new UserInfo()
    user.firstname = 'test'
    user.lastname = 'test'
    user.username = `userProfile${Math.floor(Math.random() * 100)}`
    user.password = '1234'

    await request(app).post('/users/create').send(user).expect(200)

    let res = await request(app).post('/users/authenticate').send(user).expect(200)
    const token = res.text

    res = await request(app).get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const body = JSON.parse(JSON.stringify(res.body)) as GeneralResponseList<UserInfo>
    expect(body.count).toBeGreaterThan(0)
  })

  it('should return 401 for get specific user', async () => {
    const user = new UserInfo()
    user.firstname = 'test'
    user.lastname = 'test'
    user.username = `userProfile${Math.floor(Math.random() * 100)}`
    user.password = '1234'

    const createRes = await request(app).post('/users/create').send(user).expect(200)
    const createdBody = JSON.parse(JSON.stringify(createRes.body)) as GeneralResponse<UserInfo>
    await request(app).get(`/users/${createdBody.data.id}`).expect(401)
  })

  it('should return 200 and get specific user', async () => {
    const user = new UserInfo()
    user.firstname = 'test'
    user.lastname = 'test'
    user.username = `userProfile${Math.floor(Math.random() * 100)}`
    user.password = '1234'

    const createRes = await request(app).post('/users/create').send(user).expect(200)
    const createdBody = JSON.parse(JSON.stringify(createRes.body)) as GeneralResponse<UserInfo>

    let res = await request(app).post('/users/authenticate').send(user).expect(200)
    const token = res.text

    res = await request(app).get(`/users/${createdBody.data.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const body = JSON.parse(JSON.stringify(res.body)) as GeneralResponse<UserInfo>
    expect(body.data.username).toBe(user.username)
  })
})
