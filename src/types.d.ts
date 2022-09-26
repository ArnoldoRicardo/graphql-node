interface Person {
  name: string
  phone: string
  city: string
  street: string
}

interface Address {
  street?: string
  city?: string
}

type findPersonArgs = Pick<Person, 'name'>

type editNumberArgs = Pick<Person, 'name' | 'phone'>

interface allPersonArgs {
  hadPhone: boolean
}

interface User {
  id: number
  username: string
  password?: string
  hasshed_password?: string
}

type userInDb = Required<Omit<User, 'password'>>

type userArgs = Required<Pick<User, 'username' | 'password'>>

interface Context {
  currentUser: userInDb
}
