const socketio = require('socket.io');

const tokenLib = require('./tokenLib');

const shortId = require('shortid');

const redisLib = require("./redisLib");

const events = require('events');
const eventEmitter = new events.EventEmitter();

const mongoose = require('mongoose');

const notificationModel = mongoose.model('Notification');

let setServer = (server) => {

    let io = socketio.listen(server);
    let myIo = io.of('/')
    
    myIo.on('connection', (socket) => {
        

        console.log("on connection--emitting verify user");

        socket.emit("verifyUser", "");
        /**
         * @api {emit} verifyUser verify user
         * @apiVersion 1.0.0
         * @apiGroup Emit 
         *@apiDescription This event is emmited to verify asking user to verify itself.
        */

        // code to verify the user and make him online

        socket.on('set-user', (authToken) => {
    
    /**
     * @api {listen} set-user Setting user online
     * @apiVersion 1.0.0
     * @apiGroup Listen 
     *@apiDescription This eventListner listens to user for authToken verification
    */

            console.log("set-user called")
            tokenLib.verifyClaimsWithoutSecret(authToken, (err, user) => {
                if (err) {
                    socket.emit('auth-error', { status: 500, error: 'Please provide correct auth token' })
             /**
             * @api {emit} auth-error emit authentication error
             * @apiVersion 1.0.0
             * @apiGroup Emit 
             *@apiDescription This event is emmited when the auth token provided by user cannot be verified
            */
                }
                else {

                    console.log("user is verified..setting details");
                    let currentUser = user.data;
                    // setting socket user id 
                    socket.userId = currentUser.userId
                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`
                    let key = currentUser.userId
                    let value = fullName

                    let setUserOnline = redisLib.setANewOnlineUserInHash("onlineUsersListToDo", key, value, (err, result) => {
                        if (err) {
                            console.log(`some error occurred`)
                        } else {
                            // getting online users list.

                            redisLib.getAllUsersInAHash('onlineUsersListToDo', (err, result) => {
                                console.log(`--- inside getAllUsersInAHas function ---`)
                                if (err) {
                                    console.log(err)
                                } else {

                                    console.log(`${fullName} is online`);
                                   
                                    
 
                                    socket.broadcast.emit('online-user-list', result);
                             /**
                             * @api {emit} auth-error broadcast users online
                             * @apiVersion 1.0.0
                             * @apiGroup Emit 
                             *@apiDescription This broadcast event is emited to indicate the online users
                            */
                                }
                            })
                        }
                    })

                }
            })

        }) // end of listening set-user event


        socket.on('disconnect', () => {
           
             /**
             * @api {listen} disconnect to disconnect from socket
             * @apiVersion 1.0.0
             * @apiGroup Listen 
             *@apiDescription This eventListner is listens to disconnect event to disconnect from socket
            */
            console.log("user is disconnected");

            if (socket.userId) {
                redisLib.deleteUserFromHash('onlineUsersListToDo', socket.userId)
                redisLib.getAllUsersInAHash('onlineUsersListToDo', (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        // socket.to(socket.room).broadcast.emit('online-user-list', result);
                        socket.broadcast.emit('online-user-list', result);
                    }
                })
            }

        }) // end of on disconnect


        socket.on('notify-updates', (data) => {
            console.log("socket notify-updates called");
             /**
             * @api {listen} notify-updates notification
             * @apiVersion 1.0.0
             * @apiGroup Listen 
             *@apiDescription This eventListner listens to updates from client
            */
            
            socket.broadcast.emit('noti', data);
             /**
             * @api {emit} noti emit 
             * @apiVersion 1.0.0
             * @apiGroup Emit 
             *@apiDescription This event is emited when a notification of update arrives from client
            */
            eventEmitter.emit('save-notification',data.message);
            // socket.emit(data.userId,data)
             /**
             * @api {emit} save-notification
             * @apiVersion 1.0.0
             * @apiGroup Emit 
             *@apiDescription This event is emited to save the notification received to database
            */
        });
        socket.on('friend-notification', (friendData) => {
             /**
             * @api {listen} friend-notification friends related notification
             * @apiVersion 1.0.0
             * @apiGroup Listen 
             *@apiDescription This eventListner listens to updates from client on friend request,reject,accept,unfriend
            */
            console.log("socket friend-notification called");
            console.log(`${friendData}`);
            socket.broadcast.emit('friendRequest', friendData);
            // socket.emit(data.userId,data)
             /**
             * @api {emit} friendRequest send friend request 
             * @apiVersion 1.0.0
             * @apiGroup Emit 
             *@apiDescription This event is emited when one client sends a request to another(this is for notification purpose only)
            */
        });
    });
}

        eventEmitter.on('save-notification',(message)=>{
             /**
             * @api {listen} save-notification  save notification to database
             * @apiVersion 1.0.0
             * @apiGroup Listen 
             *@apiDescription This eventListner listens to notification updates to save them in database
            */
            let msg = new notificationModel({
                notiId:shortId.generate(),
                text:message.text,
                concernId:message.concernId
            })
            msg.save()
            .then((data)=>{
                console.log('data','saved noti to db')
            })
            .catch((err)=>console.log(`${err}, noti not saved`));
        })

module.exports = {
    setServer: setServer
}