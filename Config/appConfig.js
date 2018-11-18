let appConfig = {};

appConfig.port = process.env.port || 3000;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.password = process.env.PASSWORD || 'DEFAULT';
appConfig.db = {
    url: 'mongodb://127.0.0.1:27017/todoListDB'
}
appConfig.apiVersion = '/api/v1';


module.exports = {
    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    environment: appConfig.env,
    db: appConfig.db,
    password: appConfig.password,
    apiVersion: appConfig.apiVersion
};