import { gql, ApolloServer } from "apollo-server"
import { testConexion as testPg, personCount, allPerson, findPerson } from './queries'


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
        allPerson: [Person]
        findPerson(name: String!): Person
        testPg: String!
    }
`

type Person =  {
    name: String
    telefono: string
    city: String
    street: String
}


const resolvers = {
    Query: {
        personCount,
        allPerson,
        findPerson,
        testPg,
    },
    Person: {
        address: (root: Person) => {
           return {
            street: root.street,
            city: root.city,
            }
        },
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
