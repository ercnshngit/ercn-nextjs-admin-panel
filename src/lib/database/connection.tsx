import mysql from 'mysql2/promise';

export const db = {
    connection: connect,
    initialized: false,
};

// initialize db and models, called on first api request from /helpers/api/api-handler.js

async function connect() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? +process.env.DB_PORT : 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        db.initialized = true;
        return connection;
    } catch (error) {
        console.log("Connection error :" + error);
        db.initialized = false;
        return null;
    }
}
