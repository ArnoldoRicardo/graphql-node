import { UserInputError } from 'apollo-server'

import { countPersons, getAllPerson, getPerson } from './services/person'

export const personCount = async (): Promise<Number | undefined> => {
  try {
    return await countPersons()
  } catch (err: any) {
    throw new UserInputError(err.message)
  }
}

export const allPerson = async (
  root: undefined,
  { hadPhone }: allPersonArgs
) => {
  try {
    return getAllPerson(hadPhone)
  } catch (err: any) {
    throw new UserInputError(err.message)
  }
}

export const findPerson = async (root: undefined, { name }: findPersonArgs) => {
  try {
    return getPerson(name)
  } catch (err: any) {
    throw new UserInputError(err.message)
  }
}

export const me = async (
  root: undefined,
  args: undefined,
  { currentUser }: Context
) => {
  return currentUser
}
