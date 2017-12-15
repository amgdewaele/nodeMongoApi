var env = {
    webPort: process.env.PORT || 3000,
    dbHost: process.env.DB_HOST || 'ds141766.mlab.com:41766',
    dbPort: process.env.DB_PORT || '41766',
    dbUser: process.env.DB_USER || 'admin',
    dbPassword: process.env.DB_PASSWORD || 'root',
    dbDatabase: process.env.DB_DATABASE || 'exercises'
}
// var env = {
//     webPort: process.env.PORT || 3000,
//     dbHost: process.env.DB_HOST || 'localhost',
//     dbPort: process.env.DB_PORT || '',
//     dbUser: process.env.DB_USER || '',
//     dbPassword: process.env.DB_PASSWORD || '',
//     dbDatabase: process.env.DB_DATABASE || 'exercises'
// }

var dburl = process.env.NODE_ENV === 'production' ?
    'mongodb://' + env.dbUser + ':' + env.dbPassword + '@' + env.dbHost + ':' + env.dbPort + '/' + env.dbDatabase :
    'mongodb://localhost/' + env.dbDatabase

module.exports = {
    env: env,
    dburl: dburl
};