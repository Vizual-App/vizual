const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    ssl: false
});

const getSources = async () => {
    const client = await pool.connect();
    return client.query('SELECT * from datasource', [])
        .then(res => {
            client.release();
            return res.rows;
        })
        .catch(err => {
            console.log('fetching datasources failed', err);
            client.release();
            return err;
        });
};

const createSource = async (request) => {
    if (!request.name) {
        return response.status(400).json({ error: 'datasource name is mandatory' });
    }

    const client = await pool.connect();
    return client.query('INSERT INTO datasource(name, type, metadata) VALUES ($1, $2, $3)', [request.name, request.type, request.metadata])
        .then(res => {
            client.release();
            return res;
        })
        .catch(err => {
            console.log('creating datasource failed', err);
            client.release();
            return err;
        });
};

const deleteSource = async (request) => {
    if (!request.id) {
        return response.status(400).json({ error: 'datasource id is mandatory' });
    }

    const client = await pool.connect();
    return client.query('DELETE FROM datasource WHERE id = $1', [request.id])
        .then(res => {
            client.release();
            return res;
        })
        .catch(err => {
            console.log('deleting datasource failed', err);
            client.release();
            return err;
        });
};

const updateSouce = async (request) => {
    if (!request.id) {
        return response.status(400).json({ error: 'datasource id is mandatory' });
    }

    if (!request.name) {
        return response.status(400).json({ error: 'datasource name is mandatory' });
    }

    const client = await pool.connect();
    return client.query('UPDATE datasource SET name = $1, type=$2, metadata = $3 WHERE id = $4', [request.name, request.type, request.metadata, request.id])
        .then(res => {
            client.release();
            return res;
        })
        .catch(err => {
            console.log(`updating datasource failed with id ${request.id}`, err);
            client.release();
            return err;
        });
};

export default async function handler(request, response) {
    let result = {};

    switch (request.method) {
        case 'GET':
            result = await getSources();
            return response.status(200).json(result);
        case 'POST':
            result = await createSource(request.body);
            return response.status(200).json(result);
        case 'DELETE':
            result = await deleteSource(request.body);
            return response.status(200).json(result);
        case 'PUT':
            result = await updateSouce(request.body);
            return response.status(200).json(result);
    }
}