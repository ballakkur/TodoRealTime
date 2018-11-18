const express = require('express');
const app = express();
const fs = require('fs');
const http = require('http');

const appConfig = require('./Config/appConfig');
const routeLoggerMiddleware = require('./app/middlewares/routeLogger');
const globalErrorMiddleware = require('./app/middlewares/appErrorHandler')


const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(routeLoggerMiddleware.logIp);
app.use(globalErrorMiddleware.globalErrorHandler);


if (app.get('env') === 'development')
    app.use(morgan('tiny'));


    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
        next();
    });
    
//read models

fs.readdirSync('./app/models').forEach((file) => {
    if (~file.indexOf('.js'))
        require(`./app/models/${file}`);
})

//read  routes
fs.readdirSync('./app/routes').forEach((file) => {
    if (~file.indexOf('.js')) {
        let route = require(`./app/routes/${file}`);
        route.setRouter(app);
    }
})

app.use(globalErrorMiddleware.globalNotFoundHandler);

//server
const server = http.createServer(app)

server.listen(appConfig.port)
server.on('error',onError)
server.on('listening', onListening)

const socketLib = require('./app/library/socketioLib')
const socketServer = socketLib.setServer(server)

function onError(error){
	if(error.syscall !=='listen'){
	console.error(error.code + 'not equal listen','serverOnErrorHandler',10)
	throw error
	}
	switch(error.code){
	case 'EACCES' :
	console.error(error.code + ':elavated privileges required','serverOnErrorHandler' , 10)
	process.exit(1)
	break
	case 'EADDRINUSE' :
	console.error(error.code + 'port is already in use','serverOnErrorHandler' , 10)
	process.exit(1)
	break
	default:
	console.error(error.code + 'some unknown error occured','serverOnErrorHandler' , 10)
	throw error
	}
}

function onListening(){
	var addr = server.address()
	var bind = typeof addr === 'string'
	? 'pipe ' + addr
	: 'port ' + addr.port;
	('Listening on ' + bind)
	console.info('server listening on port ' + addr.port,'serverOnListeningHandler', 10)
    mongoose.connect(appConfig.db.url, { useCreateIndex: true, useNewUrlParser: true })
    .then(() => console.log('connected to database'))
    .catch((err) => console.error(`${err}`))
}

process.on('unhandleRejection',(reason,p)=>{
	console.log('unhandled rejection at: Promise ',p,'reason: ',reason)
})

/* app.listen(appConfig.port, () => {
    console.log(`listening on port ${appConfig.port}`);
    mongoose.connect(appConfig.db.url, { useCreateIndex: true, useNewUrlParser: true })
        .then(() => console.log('connected to database'))
        .catch((err) => console.error(`${err}`))
}); */

   
module.exports = app;
