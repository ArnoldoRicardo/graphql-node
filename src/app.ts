import { gql, ApolloServer } from 'apollo-server'
import {
    testConexion as testPg,
    personCount,
    allPerson,
    findPerson,
} from './queries'
import { addPerson, editNumber } from './mutation'

const typeDefs = gql`
    type Address {
        city: String!
        street: String!
    }

    type Person {
        name: String!
        telefono: String!
        address: Address!
    }

    type Query {
        personCount: Int!
        allPerson(hadPhone: Boolean): [Person]
        findPerson(name: String!): Person
        testPg: String!
    }
    type Mutation {
        addPerson(
            name: String!
            telefono: String!
            street: String!
            city: String!
        ): Person
        editNumber(name: String!, phone: String!): Person
    }
`

const resolvers = {
    Query: {
        personCount,
        allPerson,
        findPerson,
        testPg,
    },
    Mutation: {
        addPerson,
        editNumber,
    },
    Person: {
        address: (root: Person) => {
            return {
                street: root.street,
                city: root.city,
            }
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen({ port: process.env.PORT }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
})
