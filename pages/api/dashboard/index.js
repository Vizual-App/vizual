const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    ssl: false
});

const getDashboards = async () => {
    const client = await pool.connect();
    return client.query('SELECT * from dashboard', [])
        .then(res => {
            client.release();
            return res.rows;
        })
        .catch(err => {
            console.log('fetching dashboards failed', err);
            client.release();
            return err;
        });
};

const createDashboard = async (request) => {
    if (!request.name) {
        return response.status(400).json({ error: 'dashboard name is mandatory' });
    }

    if (!request.datasource_id) {
        return response.status(400).json({ error: 'datasource is mandatory' });
    }

    const client = await pool.connect();
    return client.query('INSERT INTO dashboard(name, datasource_id, panels) VALUES ($1, $2, $3)',
        [request.name, request.datasource_id, { panels: [] }])
        .then(res => {
            client.release();
            return res;
        })
        .catch(err => {
            console.log('creating dashboard failed', err);
            client.release();
            return err;
        });
};

export default async function handler(request, response) {
    let result = {};

    switch (request.method) {
        case 'GET':
            result = await getDashboards();
            return response.status(200).json(result);
        case 'POST':
            result = await createDashboard(request.body);
            return response.status(200).json(result);
    }
}