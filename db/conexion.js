// const mysql = require('mysql2');
// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: 'joanhac',
//     database: 'empresa'
// });

// module.exports = connection;

import { createClient } from "@libsql/client";
import 'dotenv/config'

export const turso = createClient({
    authToken: process.env.TURSO_AUTH_TOKEN,
    url: process.env.TURSO_DATABASE_URL
});

// async function main() {
//     const result = await turso.execute("SELECT * FROM trabajadores");
//     console.log(result);
// }

// main();

// export default turso;