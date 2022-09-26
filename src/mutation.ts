import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserInputError, AuthenticationError } from 'apollo-server'

import {
  findUser,
  addFriendtoUser,
  newUser,
  checkFriendship
} from './services/user'
import { newPerson, updatePersonNumber, getPerson } from './services/person'

export const addPerson = async (
  root: undefined,
  { name, phone, city, street }: Person,
  { currentUser }: Context
) => {
  if (!currentUser) throw new AuthenticationError('not authenticated')

  try {
    const person = await newPerson(name, phone, city, street)
    await addFriendtoUser(currentUser.id, person.id)
    return person
  } catch (err: any) {
    throw new UserInputError(err.message)
  }
}

export const editNumber = async (
  root: undefined,
  { phone, name }: editNumberArgs
) => {
  try {
    return updatePersonNumber(name, phone)
  } catch (err: any) {
    throw new UserInputError(err.message)
  }
}

export const createUser = async (
  root: undefined,
  { username, password }: userArgs
) => {
  const hasshed_password = await bcrypt.hash(password, 10)
  return await newUser(username, hasshed_password)
}

export const login = async (
  root: undefined,
  { username, password }: userArgs
) => {
  const user = await findUser(username)
  const hasshed_password = user.hasshed_password
  if (!(await bcrypt.compare(password, hasshed_password))) {
    throw new UserInputError('wrong credentials')
  }
  const jwt_secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'default'
  return {
    value: jwt.sign(user, jwt_secret)
  }
}

export const addAsFriend = async (
  root: undefined,
  { name }: Pick<Person, 'name'>,
  { currentUser }: Context
) => {
  try {
    const person = await getPerson(name)
    const isFriend = await checkFriendship(currentUser.id, person.id)
    if (isFriend) return currentUser
    if (await addFriendtoUser(currentUser.id, person.id)) {
      return findUser(currentUser.username)
    }
  } catch (err: any) {
    throw new UserInputError(err.message)
  }
}
