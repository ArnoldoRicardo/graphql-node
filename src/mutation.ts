import { pool, findUser } from './db'
import bcrypt from 'bcrypt'
import { UserInputError } from 'apollo-server'
import jwt from 'jsonwebtoken'

export const addPerson = async (
  root: undefined,
  { name, phone, city, street }: Person
) => {
  const sql = `
     --sql
        INSERT INTO public.person ("name",phone,city,street)
        VALUES ('${name}','${phone}','${city}','${street}');
    `
  const client = await pool.connect()
  try {
    const res = await client.query(sql)
    console.log(res)
    return res.rows[0]
  } catch (err: any) {
    console.log(err)
    throw new UserInputError(err.message)
  } finally {
    client.release()
  }
}

export const editNumber = async (
  root: undefined,
  { phone, name }: editNumberArgs
) => {
  const sql = `
     --sql
        UPDATE public.person
        SET phone='${phone}'
        WHERE name in (${name});
    `
  const client = await pool.connect()
  try {
    const res = await client.query(sql)
    console.log(res)
    return res.rows[0]
  } catch (err: any) {
    console.log(err)
    throw new UserInputError(err.message)
  } finally {
    client.release()
  }
}

export const createUser = async (
  root: undefined,
  { username, password }: userArgs
) => {
  const hasshed_password = await bcrypt.hash(password, 10)
  const sql_insert = `
         --sql
            INSERT INTO public."User" (username,hasshed_password)
            VALUES ('${username}','${hasshed_password}');
        `

  const sql_select = `select * from public."User" where "username" = '${username}' limit 1`
  const client = await pool.connect()
  try {
    await client.query(sql_insert)
    const res = await client.query(sql_select)
    console.log(res)
    return res.rows[0]
  } catch (err: any) {
    console.log(err)
    throw new UserInputError(err.message)
  } finally {
    client.release()
  }
}

export const login = async (
  root: undefined,
  { username, password }: userArgs
) => {
  const user = await findUser(username)
  const hasshed_password = user.hasshed_password
  if (!(await bcrypt.compare(password, hasshed_password))) {
    throw new UserInputError('wrong credentials')
  }
  const jwt_secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'default'
  return {
    value: jwt.sign(user, jwt_secret)
  }
}
