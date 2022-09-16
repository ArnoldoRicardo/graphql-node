import { gql, ApolloServer } from "apollo-server"
import AppController from './controller'

const persons = [
    {
        "name": "juan",
        "telefono": 1123,
        "city": 'conocido',
        'street': 'centro',
    },
    {
        "name": "pedro",
        "telefono": 1235,
        "city": 'conocido',
        'street': 'centro',
    }
]


const typeDefs = gql`
type Address {
    city: String!
    street: String!
}

type Person {
    name: String!
    telefono: Int!
    address: Address!
}

type Query {
    personCount: Int!
    allPerson: [Person]
    findPerson(name: String!): Person
}
`

type Person =  {
    name: String
    telefono: number
    city: String
    street: String
}

type findArgs = {
    name: String
}

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPerson: () => persons,
        findPerson: (root: undefined, args: findArgs) => {
            const { name } = args
            console.log(name)
            return persons.find(person => person.name === name)
        }
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
