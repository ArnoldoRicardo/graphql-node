type Person = {
    name: string
    telefono: string
    city: string
    street: string
}

type findPersonArgs = {
    name: string
}

type editNumberArgs = {
    name: string
    phone: string
}

type allPersonArgs = {
    hadPhone?: boolean
}
