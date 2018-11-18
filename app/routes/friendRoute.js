const appConfig = require('../../Config/appConfig');
const friendController = require('./../controllers/friendController');
const auth = require('./../middlewares/authMiddleware');



module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/friends`;

   app.get(`${baseUrl}/view/friend/request/received`, auth.isAuthorized, friendController.viewRequestReceived);

   /**
    * @apiGroup Friends
    * @apiVersion  1.0.0
    * @api {get} /api/v1/friends/friend/recieved api for Getting all friends request Recieved.
    *
    * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
    {
        "error": false,
        "message": "you received request(s),
        "status": 200,
        "data": [
            {
                recipientId:"string".
                senderId:"string",
                requestStatus:{
                    enum:['requested,'accepted']
                }
            }
        ]
    }
   */

    
    app.post(`${baseUrl}/send/friend/request`, auth.isAuthorized,friendController.sendFriendRequest);
    /**
     * @apiGroup friends
     * @apiVersion  1.0.0
     * @api {get} /api/v1/friends/send/friend/request api for Sending Friend Request.
     *
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
     * @apiParam {string} senderId Id of the Sender. (body params) (required)
     * @apiParam {string} recipientId Id of the Reciever. (body params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Friend Request Sent",
            "status": 200,
            "data": null
        }
    */
   
   app.post(`${baseUrl}/accept/friend/request`, auth.isAuthorized,friendController.acceptFriendRequest);
   /**
    * @apiGroup friends
    * @apiVersion  1.0.0
    * @api {get} /api/v1/friends/accept/friend/request api for Accepting Friend Request.
    *
    * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
    * @apiParam {string} senderId Id of the Sender. (body params) (required)
    * @apiParam {string} recipientId Id of the Reciever(Login User). (body params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
       {
           "error": false,
           "message": "Accepted Friend Request",
           "status": 200,
           "data": null
       }
   */

  app.post(`${baseUrl}/reject/friend/request`, auth.isAuthorized,friendController.rejectFriendRequest);
  /**
   * @apiGroup friends
   * @apiVersion  1.0.0
   * @api {get} /api/v1/friends/reject/friend/request api for Rejecting Friend Request.
   *
   * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
   * @apiParam {string} senderId Id of the Sender. (body params) (required)
   * @apiParam {string} recipientId Id of the Reciever(Login User). (body params) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
      {
          "error": false,
          "message": "Friend Request rejected",
          "status": 200,
          "data":{
              [
            {
                recipientId:"string".
                senderId:"string",
                requestStatus:{
                    enum:['requested,'accepted']
                }
            }
        ]
          }
      }
  */


app.post(`${baseUrl}/remove/Friend/user`, auth.isAuthorized,friendController.removeFriend);
/**
 * @apiGroup friends
 * @apiVersion  1.0.0
 * @api {get} /api/v1/friends/unfriend/user api to Unfriend user.
 *
 * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
 * @apiParam {string} senderId Id of the Sender. (body params) (required)
 * @apiParam {string} recipientId Id of the Reciever(Login User). (body params) (required)
 * 
 * @apiSuccess {object} myResponse shows error status, message, http status code, result.
 * 
 * @apiSuccessExample {object} Success-Response:
    {
        "error": false,
        "message": "Unfriended",
        "status": 200,
        "data": null
    }
*/


}

/** Run this command : apidoc -i routes/ -o apidoc/ */