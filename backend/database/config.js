module.exports.config = {
    connectionLimit: 100,
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    debug: false,
    multipleStatements: true
}

