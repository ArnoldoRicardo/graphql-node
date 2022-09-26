import { Pool } from 'pg'
import { UserInputError } from 'apollo-server'

export const pool = new Pool()

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

export const findUser = async (username: string): Promise<userInDb> => {
  const sql_select = `select * from public."User" where "username" = '${username}' limit 1`
  const client = await pool.connect()
  try {
    const res = await client.query(sql_select)
    return res.rows[0]
  } catch (err: any) {
    console.log(err)
    throw new UserInputError(err.message)
  } finally {
    client.release()
  }
}
