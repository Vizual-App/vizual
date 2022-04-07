const { Pool } = require('pg');

export default async function handler(request, response) {

    const pool = new Pool({
        host: request.body.db.host,
        database: request.body.db.database,
        port: request.body.db.port,
        user: request.body.db.username,
        password: request.body.db.password,
        ssl: false
    });

    const client = await pool.connect();
    client.query(request.body.query, [])
        .then(res => {
            client.release();
            return response.status(200).json(res.rows);
        })
        .catch(err => {
            console.log('fetching data failed', err);
            client.release();
            return response.status(500).json({ err: "failed to fetch data for panel" });
        });
}