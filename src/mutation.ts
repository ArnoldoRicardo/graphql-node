import { pool } from './db'
import { findUser, addFriendtoUser } from './services/user'
import bcrypt from 'bcrypt'
import { UserInputError } from 'apollo-server'
import jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server'

export const addPerson = async (
  root: undefined,
  { name, phone, city, street }: Person,
  { currentUser }: Context
) => {
  if (!currentUser) throw new AuthenticationError('not authenticated')
  const sql = `
     --sql
        INSERT INTO public.person ("name",phone,city,street)
        VALUES ('${name}','${phone}','${city}','${street}')
        RETURNING *;
    `
  const client = await pool.connect()
  try {
    const res = await client.query(sql)
    const person = res.rows[0]
    await addFriendtoUser(currentUser.id, person.id)
    return person
  } catch (err: any) {
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
        WHERE name in (${name})
        RETURNING *;
    `
  const client = await pool.connect()
  try {
    const res = await client.query(sql)
    return res.rows[0]
  } catch (err: any) {
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
            VALUES ('${username}','${hasshed_password}')
            RETURNING *;
        `

  const client = await pool.connect()
  try {
    const res = await client.query(sql_insert)
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
