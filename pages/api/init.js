const { Client } = require('pg');

const credentials = {
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    }
};

const client = new Client(credentials);

export default async function handler(request, response) {
    return new Promise(async (resolve, reject) => {
        try {
            await client.connect();

            // create datasource
            await client.query(`
            CREATE TABLE IF NOT EXISTS datasource (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
                name TEXT NOT NULL, 
                type TEXT NOT NULL,
                metadata JSONB
            )`, []);

            // create dashboard
            await client.query(`
                CREATE TABLE IF NOT EXISTS dashboard (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
                    name TEXT NOT NULL, 
                    panels JSONB,
                    datasource_id UUID REFERENCES datasource(id)
                )`, []);

            // create sample data for vizual
            await client.query(`
                CREATE TABLE IF NOT EXISTS node_packages (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
                    name TEXT NOT NULL, 
                    visitors INT,
                    count INT
                )`, []);

            // insert datasource
            await client.query("INSERT INTO datasource (id, name, type, metadata) VALUES ($1, $2, $3, $4)", ["c0ef09a4-c978-4911-b80d-6c643150bb2b", "Postgres", "POSTGRES", credentials]);

            const panels = [
                {
                    id: 1,
                    name: 'Node Packages',
                    type: 'DATA_TABLE',
                    query: 'SELECT name, visitors, count FROM node_packages'
                },
                {
                    id: 2,
                    name: 'Node Packages Bar Chart',
                    type: 'BAR_CHART',
                    query: 'SELECT name, count FROM node_packages'
                },
                {
                    id: 3,
                    name: 'Node Packages Area Chart',
                    type: 'AREA_CHART',
                    query: 'SELECT * FROM node_packages'
                }
            ];

            // insert dashboard
            await client.query("INSERT INTO dashboard (name, datasource_id, panels) VALUES ($1, $2, $3)", ["Crystal", "c0ef09a4-c978-4911-b80d-6c643150bb2b", { panels: panels }]);

            // insert sample data
            await client.query("INSERT INTO node_packages (name, visitors, count) VALUES ($1, $2, $3)", ["Axios", 12564, 23]);
            await client.query("INSERT INTO node_packages (name, visitors, count) VALUES ($1, $2, $3)", ["Superagent", 571, 48]);
            await client.query("INSERT INTO node_packages (name, visitors, count) VALUES ($1, $2, $3)", ["Fetch", 3107, 12]);
            await client.query("INSERT INTO node_packages (name, visitors, count) VALUES ($1, $2, $3)", ["Request", 10480, 60]);

            await client.end();
            response.status(200).json({ 'message': 'Vizual db initialized' });
            resolve();
        } catch (err) {
            await client.end();
            console.log('failed to initialize schema', err);
            response.status(400).json({ 'message': 'failed to initialize schema' });
            reject();
        }
    });
}