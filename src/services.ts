import { Client } from 'pg'

const client = new Client()

export const testConexion = async () => {
  await client.connect()
  const res = await client.query('SELECT $1::text as message', ['Hello world!'])
  await client.end()
  
  return res.rows[0].message
}
