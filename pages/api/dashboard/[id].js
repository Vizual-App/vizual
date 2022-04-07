const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    ssl: false
});

const getDashboard = async (request) => {
    const client = await pool.connect();
    return client.query('SELECT * from dashboard where id = $1 limit 1', [request.id])
        .then(res => {
            client.release();
            return res.rows.length > 0 ? res.rows[0] : {};
        })
        .catch(err => {
            console.log('fetching dashboards failed', err);
            client.release();
            return err;
        });
};

const deleteDashboard = async (request) => {
    if (!request.id) {
        return response.status(400).json({ error: 'dashboard id is mandatory' });
    }

    const client = await pool.connect();
    return client.query('DELETE FROM dashboard WHERE id = $1', [request.id])
        .then(res => {
            client.release();
            return res;
        })
        .catch(err => {
            console.log('deleting dashboard failed', err);
            client.release();
            return err;
        });
};


const updateDashboard = async (request) => {
    if (!request.id) {
        return response.status(400).json({ error: 'dashboard id is mandatory' });
    }

    if (!request.name) {
        return response.status(400).json({ error: 'dashboard name is mandatory' });
    }

    if (!request.datasource_id) {
        return response.status(400).json({ error: 'datasource is mandatory' });
    }

    const client = await pool.connect();
    return client.query('UPDATE dashboard SET name = $1, panels = $2, datasource_id = $3 WHERE id = $4',
        [request.name, request.panels, request.datasource_id, request.id])
        .then(res => {
            client.release();
            return res;
        })
        .catch(err => {
            console.log(`updating dashboard failed with id ${request.id}`, err);
            client.release();
            return err;
        });
};

export default async function handler(request, response) {
    let result = {};

    switch (request.method) {
        case 'GET':
            result = await getDashboard(request.query);
            return response.status(200).json(result);
        case 'DELETE':
            result = await deleteDashboard(request.query);
            return response.status(200).json(result);
        case 'PUT':
            result = await updateDashboard(request.body);
            return response.status(200).json(result);
    }
}