import { pool } from '../db'

export const newPerson = async (
  name: string,
  phone: string,
  city: string,
  street: string
) => {
  const sql = `
     --sql
        INSERT INTO public.person ("name",phone,city,street)
        VALUES ('${name}','${phone}','${city}','${street}')
        RETURNING *;
    `
  const client = await pool.connect()
  try {
    const res = await client.query(sql)
    return res.rows[0]
  } catch (err) {
    console.log(err)
  } finally {
    client.release()
  }
}

export const updatePersonNumber = async (name: string, phone: string) => {
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
    console.log(err)
  } finally {
    client.release()
  }
}

export const countPersons = async () => {
  const sql = `
     --sql
     select count(*) from public.person;
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

export const getPerson = async (name: string) => {
  const sql = `
     --sql
     select * from public.person where "name" = '${name}' limit 1;
     `
  const client = await pool.connect()
  try {
    const res = await client.query(sql)
    return res.rows[0]
  } catch (err) {
    console.log(err)
  } finally {
    client.release()
  }
}

export const getAllPerson = async (hadPhone: boolean) => {
  const not = hadPhone ? 'not' : ''
  const sql = `
     --sql
     select * from public.person 
     where phone is ${not} null;
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
