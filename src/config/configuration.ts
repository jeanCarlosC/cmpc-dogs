export default () => ({
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USER || 'myuser',
        password: process.env.DB_PASS || 'mypassword',
        name: process.env.DB_NAME || 'mydb',
    },
});