import { Pool } from 'pg'

const pool = new Pool()

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})


export const personCount = async () => {
  const sql = `
     --sql
     select count(*) from public.person 
    `
 const client = await pool.connect()
  try {
    const res = await client.query(sql)
    return res.rows[0].count
  } catch (err) {
    console.log(err)
  } finally {
    client.release()
  }
}


export const allPerson = async () => {
  const sql = `
     --sql
     select * from public.person 
    `
 const client = await pool.connect()
  try {
    const res = await client.query(sql)
    return res.rows
  } catch (err) {
    console.log(err)
  } finally {
    client.release()
  }
}

type findArgs = {
    name: String
}

export const findPerson = async (root: undefined, { name }: findArgs) => {
  const sql = `
     --sql
     select * from public.person where "name" = '${name}' limit 1
    `
 const client = await pool.connect()
  try {
    const res = await client.query(sql)
    console.log(res)
    return res.rows[0]
  } catch (err) {
    console.log(err)
  } finally {
    client.release()
  }
}

export const testConexion = async () => {
 const client = await pool.connect()
  try {
    const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    return res.rows[0].message
  } catch (err) {
    console.log(err)
  } finally {
    client.release()
  }
}
