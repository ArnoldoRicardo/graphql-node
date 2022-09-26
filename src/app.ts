import jwt from 'jsonwebtoken'
import { gql, ApolloServer } from 'apollo-server'

import { findUser, findFriends } from './services/user'
import { personCount, allPerson, findPerson, me } from './queries'
import {
  addPerson,
  editNumber,
  login,
  createUser,
  addAsFriend
} from './mutation'

const typeDefs = gql`
  type Address {
    city: String!
    street: String!
  }

  type Person {
    name: String!
    phone: String!
    address: Address!
  }

  type User {
    username: String!
    friends: [Person]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    personCount: Int!
    allPerson(hadPhone: Boolean): [Person]
    findPerson(name: String!): Person
    me: User
  }
  type Mutation {
    addPerson(
      name: String!
      phone: String!
      street: String!
      city: String!
    ): Person
    editNumber(name: String!, phone: String!): Person
    createUser(username: String!, password: String!): User
    login(username: String!, password: String!): Token
    addAsFriend(name: String!): User
  }
  type Subcription {
    personAdded: Person!
  }
`

const resolvers = {
  Query: {
    personCount,
    allPerson,
    findPerson,
    me
  },
  Mutation: {
    addPerson,
    editNumber,
    login,
    createUser,
    addAsFriend
  },
  Person: {
    address: (root: Person): Address => {
      return {
        street: root.street,
        city: root.city
      }
    }
  },
  User: {
    friends: async (root: User): Promise<Person[]> => {
      return await findFriends(root.id)
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
      const token = auth.substring(7)
      const jwt_secret = process.env.JWT_SECRET
        ? process.env.JWT_SECRET
        : 'default'
      const decodedToken: User = jwt.verify(token, jwt_secret) as User
      const currentUser = await findUser(decodedToken.username)
      return { currentUser }
    }
  }
})

server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
