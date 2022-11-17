import { User } from '../models/user'
import { UsersService } from '../services/users.services'

describe('Users Service', () => {
  const usersService = new UsersService()
  it('should create new user', async () => {
    const user = new User()
    user.firstname = 'test'
    user.lastname = 'test'
    user.username = `userProfile${Math.floor(Math.random() * 100)}`
    user.password = '1234'

    const returnedUser = await usersService.create(user)

    expect(returnedUser).toBeDefined()
    expect(returnedUser?.firstname).toBe(user.firstname)
    expect(returnedUser?.lastname).toBe(user.lastname)
    expect(returnedUser?.username).toBe(user.username)
  })

  it('should create and return new user', async () => {
    const user = new User()
    user.firstname = 'test'
    user.lastname = 'test'
    user.username = `userProfile${Math.floor(Math.random() * 100)}`
    user.password = '1234'

    const returnedUser = await usersService.create(user)
    expect(returnedUser).toBeDefined()
    const showUser = await usersService.show(returnedUser?.id as number)
    expect(showUser).toBeDefined()
    expect(showUser?.firstname).toBe(user.firstname)
    expect(showUser?.lastname).toBe(user.lastname)
    expect(showUser?.username).toBe(user.username)
  })

  it('should create and return list of users', async () => {
    const user = new User()
    user.firstname = 'test'
    user.lastname = 'test'
    user.username = `userProfile${Math.floor(Math.random() * 100)}`
    user.password = '1234'

    const returnedUser = await usersService.create(user)
    expect(returnedUser).toBeDefined()
    const allUsers = await usersService.index()
    expect(allUsers).toBeDefined()

    expect(allUsers?.length).toBeGreaterThan(0)
  })

  it('should create new user and the token', async () => {
    const user = new User()
    user.firstname = 'test'
    user.lastname = 'test'
    user.username = `userProfile${Math.floor(Math.random() * 100)}`
    user.password = '1234'

    const returnedUser = await usersService.create(user)
    expect(returnedUser).toBeDefined()
    const token = await usersService.authenticate(user)
    expect(token).toBeDefined()
    const tokenParts = token?.split('.')
    expect(tokenParts?.length).toEqual(3)
  })
})
