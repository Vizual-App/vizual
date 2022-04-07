const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    ssl: false
});

const getSource = async (id) => {
    const client = await pool.connect();
    return client.query('SELECT * from datasource WHERE id = $1', [id])
        .then(res => {
            client.release();
            return res.rows;
        })
        .catch(err => {
            console.log('fetching datasource info failed', err);
            client.release();
            return err;
        });
};

export default async function handler(request, response) {
    const result = await getSource(request.body.source);

    const db = {
        host: result[0].metadata.host ? result[0].metadata.host : "",
        database: result[0].metadata.database ? result[0].metadata.database : "",
        port: result[0].metadata.port ? result[0].metadata.port : "",
        username: result[0].metadata.user ? result[0].metadata.user : "",
        password: result[0].metadata.password ? result[0].metadata.password : "",
    };

    const req = await fetch("http://localhost:5556/api/connector/" + result[0].type.toLowerCase(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ db: db, query: request.body.query })
    });

    const json = await req.json();
    return response.status(200).json(json);
}