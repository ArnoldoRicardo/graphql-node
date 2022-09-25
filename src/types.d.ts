interface Person {
  name: string
  telefono: string
  city: string
  street: string
}

interface findPersonArgs {
  name: string
}

interface editNumberArgs {
  name: string
  phone: string
}

interface allPersonArgs {
  hadPhone: boolean
}

type rootValue = null
