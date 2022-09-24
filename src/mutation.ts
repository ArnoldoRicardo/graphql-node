import { pool } from './db'

export const addPerson = async (
    root: undefined,
    { name, telefono, city, street }: Person
) => {
    const sql = `
     --sql
        INSERT INTO public.person ("name",phone,city,street)
        VALUES ('${name}','${telefono}','${city}','${street}');
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

export const editNumber = async (
    root: undefined,
    { phone, name }: editNumberArgs
) => {
    const sql = `
     --sql
        UPDATE public.person
        SET phone='${phone}'
        WHERE name=${name};
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
