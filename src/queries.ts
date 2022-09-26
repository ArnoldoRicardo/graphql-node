import { pool } from './db'

export const personCount = async (): Promise<Number | undefined> => {
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

export const allPerson = async (
  root: undefined,
  { hadPhone }: allPersonArgs
) => {
  const not = hadPhone ? 'not' : ''
  const sql = `
     --sql
     select * from public.person 
     where phone is ${not} null
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

export const findPerson = async (root: undefined, { name }: findPersonArgs) => {
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

export const me = async (
  root: undefined,
  args: undefined,
  { currentUser }: Context
) => {
  return currentUser
}
