const mongoose = require('mongoose');
const response = require('./../library/responseLib');
const check = require('./../library/checkLib');

/* Models */
const friendModel = mongoose.model('Friendreq');
const UserModel = mongoose.model('User')

sendFriendRequest = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.senderId) || check.isEmpty(req.body.recipientId)) {
                let apiResponse = response.generate(true, 'parameters are missing', 400, null)
                reject(apiResponse)
            } else {
                resolve()
            }
        })
    }

    let addFriendRequest = () => {
        return new Promise((resolve, reject) => {
            let findQuery = {
                $or: [
                    { $and: [{ senderId: req.body.senderId }, { recipientId: req.body.recipientId }] },
                    { $and: [{ senderId: req.body.recipientId }, { recipientId: req.body.senderId }] }]
            }
            friendModel.findOne(findQuery)
                .exec((err, result) => {
                    if (err) {
                        let apiResponse = response.generate(true, 'Failed to find Request', 400, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(result)) {
                        let newRequest = new friendModel({
                            senderId: req.body.senderId,
                            recipientId: req.body.recipientId,
                            requestStatus: 'requested'
                        })
                        newRequest.save((err, newRequest) => {
                            if (err) {
                                console.log(err)
                                let apiResponse = response.generate(true, 'Failed to create new request', 400, null)
                                reject(apiResponse)
                            } else {
                                resolve(newRequest)
                            }
                        })
                    } else if(result.requestStatus == 'accepted') {
                        let apiResponse = response.generate(false, 'you are already friends',200, null)
                        reject(apiResponse)
                    }else{
                        let apiResponse = response.generate(false, 'Request is already sent',200, null)
                        reject(apiResponse);
                    }
                })
        })
    }

    validateUserInput()
        .then(addFriendRequest)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Friend Request sent', 200, resolve)
            res.status(apiResponse.status).send(apiResponse)

        })
        .catch((apiResponse) => {
            res.status(apiResponse.status).send(apiResponse)
        })
}





let acceptAsFriend = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.senderId) || check.isEmpty(req.body.recipientId)) {
                let apiResponse = response.generate(true, 'senderId and recipientId  is missing', 400, null)
                reject(apiResponse)
            }
            else {
                resolve()
            }
        })
    }
    //finding sendername to save sender in recipient friends array
    let findSenderName = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ userId: req.body.senderId }, (err, userDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed to find the user', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(userDetails)) {
                    let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                    console.log('sender')
                    reject(apiResponse)
                } else {

                    resolve(userDetails.userName)
                }
            })
        })
    }

    //adding sender in recipient friend list
    let addFriendToRecipientList = (senderFullName) => {
        return new Promise((resolve, reject) => {
            UserModel.update({ userId: req.body.recipientId }, { $push: { friends: { userId: req.body.senderId, userName: senderFullName } } }, (err, result) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed to update friendlist', 500, null)
                    reject(apiResponse)
                } else {
                    resolve()
                }
            })
        })
    }

    //finding recipientName to save recipient in sender friends array
    let findRecipientName = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ userId: req.body.recipientId }, (err, userDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed to find the user', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(userDetails)) {
                    let apiResponse = response.generate(true, 'No User Details Found', 400, null)
                    console.log('receipnt')
                    reject(apiResponse)
                } else {
                    // and this
                    resolve(userDetails.userName)
                }
            })
        })
    }

    //adding recipient in sender list
    let addFriendToSenderList = (recipientFullName) => {
        return new Promise((resolve, reject) => {
            UserModel.update({ userId: req.body.senderId }, { $push: { friends: { userId: req.body.recipientId, userName: recipientFullName } } }, (err, result) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed to update friendlist', 500, null)
                    reject(apiResponse)
                } else {
                    resolve()
                }
            })
        })
    }

    //setting status of friend reqeust to accepted
    let acceptFriendRequest = () => {
        return new Promise((resolve, reject) => {
            let findQuery = {
                $or: [
                    { $and: [{ senderId: req.body.senderId }, { recipientId: req.body.recipientId }] },
                    { $and: [{ senderId: req.body.recipientId }, { recipientId: req.body.senderId }] }]
            }
            friendModel.findOne(findQuery)
                .exec((err, result) => {
                    if (err) {
                        let apiResponse = response.generate(true, 'Failed to find Request', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(result)) {
                        let apiResponse = response.generate(true, 'No Such request is present in database', 404, null)
                        reject(apiResponse)
                    }else if(result.requestStatus === 'accepted'){
                        let apiResponse = response.generate(true,'already accepted',400,null);
                        reject(apiResponse);
                    }
                     else {
                        result.requestStatus = 'accepted'
                        result.save((err, result) => {
                            if (err) {
                                let apiResponse = response.generate(true, 'Failed to find Request', 404, null)
                                reject(apiResponse)
                            } else {
                                resolve(result)
                            }
                        })
                    }
                })
        })
    }
    validateUserInput()
        .then(findSenderName)
        .then(addFriendToRecipientList)
        .then(findRecipientName)
        .then(addFriendToSenderList)
        .then(acceptFriendRequest)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Friend Request accepted', 200, resolve)
            res.status(apiResponse.status).send(apiResponse)
        })
        .catch((err) => {
            console.log(err)
            res.status(err.status).send(err)
        })
}

//reject him
let rejectFriendRequest = (req, res) => {


    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.senderId)) {
                let apiResponse = response.generate(true, 'senderId parameter is missing', 400, null)
                reject(apiResponse)
            } else if (check.isEmpty(req.body.recipientId)) {
                let apiResponse = response.generate(true, 'recipientId parameter is missing', 400, null)
                reject(apiResponse)
            } else {
                resolve()
            }
        })
    }

    let rejectFriendRequest = () => {
        return new Promise((resolve, reject) => {
            let findQuery = {
                $or: [
                    { $and: [{ senderId: req.body.senderId }, { recipientId: req.body.recipientId }] },
                    { $and: [{ senderId: req.body.recipientId }, { recipientId: req.body.senderId }] }]
            }
            friendModel.deleteOne(findQuery)
                .then((result) => {
                    console.log(result)
                    resolve(result)

                })
                .catch((err) => {
                    let apiResponse = response.generate(true, 'Failed to find Request', 500, null)
                    reject(apiResponse)
                })

        })
    }
    validateUserInput()
        .then(rejectFriendRequest)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Friend Request rejected', 200, resolve)
            res.status(apiResponse.status).send(apiResponse);
        })
        .catch((apiResponse) => {
            res.status(apiResponse.status).send(apiResponse);
        })
}

//remove as friend
let removeFriend = (req, res) => {


    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.senderId)) {
                let apiResponse = response.generate(true, 'senderId parameter is missing', 400, null)
                reject(apiResponse)
            } else if (check.isEmpty(req.body.recipientId)) {
                let apiResponse = response.generate(true, 'recipientId parameter is missing', 400, null)
                reject(apiResponse)
            } else {
                resolve()
            }
        })
    }

    let removeFriendFromRecipientList = () => {
        return new Promise((resolve, reject) => {
            UserModel.updateOne({ userId: req.body.recipientId }, { $pull: { friends: { userId: req.body.senderId } } }, (err, result) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed to update friendlist', 400, null)
                    reject(apiResponse)
                } else {
                    console.log(result)
                    resolve()
                }
            })
        })
    }

    let removeFriendFromSenderList = () => {
        return new Promise((resolve, reject) => {
            UserModel.updateOne({ userId: req.body.senderId }, { $pull: { friends: { userId: req.body.recipientId } } }, (err, result) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed to update friendlist', 400, null)
                    reject(apiResponse)
                } else {
                    resolve()
                }
            })
        })
    }

    let deleteFriendRequest = () => {
        return new Promise((resolve, reject) => {
            let findQuery = {
                $or: [
                    { $and: [{ senderId: req.body.senderId }, { recipientId: req.body.recipientId }] },
                    { $and: [{ senderId: req.body.recipientId }, { recipientId: req.body.senderId }] }]
            }
            friendModel.deleteOne(findQuery)
                .exec((err, result) => {
                    if (err) {
                        let apiResponse = response.generate(true, 'Failed to find Request', 500, null)
                        reject(apiResponse)
                    } else if (result.n === 0) {
                        console.log(result)
                        let apiResponse = response.generate(true, 'No Such request is present in database', 404, null)
                        reject(apiResponse)
                    } else {
                        // console.log(result)
                        resolve(result);
                    }
                })
        })
    }
    validateUserInput()
        .then(removeFriendFromRecipientList)
        .then(removeFriendFromSenderList)
        .then(deleteFriendRequest)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Unfriended', 200, resolve)
            res.status(apiResponse.status).send(apiResponse);
        })
        .catch((apiResponse) => {
            res.status(apiResponse.status).send(apiResponse);

        })
}
//view request received
let viewRequestReceived = (req, res) => {
    console.log(req.user.userId)
    friendModel.find({ recipientId: req.user.userId,requestStatus:'requested' })
        .then((result) => {
            console.log(result);
            if (check.isEmpty(result)) {
                let apiResponse = response.generate(false, 'no requests', 404, null);
                res.status(200).send(apiResponse);
            } else {
                    
                let apiResponse = response.generate(false, 'you received request(s)', 200, result);
                res.status(200).send(apiResponse);
            }
        })
        .catch((err) => {
            console.log(err)
            let apiResponse = response.generate(true, 'could not fetch data', 500, err.message);
            res.status(500).send(apiResponse);
        })

}
module.exports = {

    sendFriendRequest: sendFriendRequest,
    acceptFriendRequest: acceptAsFriend,
    rejectFriendRequest: rejectFriendRequest,
    removeFriend: removeFriend,
    viewRequestReceived: viewRequestReceived

}