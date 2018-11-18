const appConfig = require('../../Config/appConfig');
const userController = require('./../controllers/userController');
const auth = require('./../middlewares/authMiddleware');



let baseUrl = `${appConfig.apiVersion}/users`;
module.exports.setRouter = (app) => {
	app.get(`${baseUrl}/getAllUser`, auth.isAuthorized, userController.getAllUser);
    /**
	 * @api {get} /api/v1/users/getAllUSer Get all users
	 * @apiVersion 1.0.0
	 * @apiGroup User Management
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * 
	 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "users found",
	    "status": 200,
	    "data": [
					{
						active:boolean,
						userId: "string",
						firstName:"string",
						lastName:"string",
						userName:"string",
						email:"string",
						friends: array
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "could not fetch user details, refresh the page",
	    "status": 500,
	    "data": null
	   }
	 */

	app.post(`${baseUrl}/signUp`, userController.signUp);
	/**
	 * @api {post} /api/v1/users/signUp Register
	 * @apiVersion 1.0.0
	 * @apiGroup User Management
	 *
	 * @apiParam {string} firstName First Name of the user. (body params) (required)
     * @apiParam {string} lastName Last Name of the user. (body params) (required)
     * @apiParam {string} countryCode country code of the user. (body params) (required)
     * @apiParam {string} mobile Mobile Number of the user. (body params) (required)
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
	 * 
	 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "User created",
	    "status": 200,
	    "data": [
					{
						active:boolean,
						createdOn:Date,
						userId: "string",
						firstName:"string",
						lastName:"string",
						userName:"string",
						email:"string",
						countryCode:"string",
						mobile:number,
						friends: array
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "email already exists",
	    "status": 404,
	    "data": null
	   }
	 */
	app.post(`${baseUrl}/login`, userController.login);
	/**
	 * @api {post} /api/v1/users/login Login
	 * @apiVersion 1.0.0
	 * @apiGroup User Management
	 *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
	 * 
	 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Login Successful",
	    "status": 200,
	    "data": [
					{
						authToken:"string",
						userDetails:{
							active:boolean,
							userId: "string",
							firstName:"string",
							lastName:"string",
							userName:"string",
							email:"string",
							countryCode:"string",
							mobile:number,
							friends: array
						}
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "wrong password",
	    "status": 404,
	    "data": null
	   }
	 */

	app.post(`${baseUrl}/forgotPassword`, userController.forgotPassword);
/**
	 * @api {post} /api/v1/users/forgotPassword forgot password
	 * @apiVersion 1.0.0
	 * @apiGroup User Management
	 *
     * @apiParam {string} email email of the user. (body params) (required)
	 * 
	 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "reset email has been sent,please check your email",
	    "status": 200,
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "email is invalid or null",
	    "status": 400,
	    "data": null
	   }
	 */
	
	app.get(`${baseUrl}/resetPassword/:email/:token`, userController.resetPassword);
	 /**
	 * @api {get} /api/v1/users/resetPassword/:email/:token to reset password
	 * @apiVersion 1.0.0
	 * @apiGroup User Management
	 *
	 * @apiParam {String} email email to which the password has to be reset (query params)(required)
	 * 
	 * @apiParam {String} token that was generated in forgot password (query params)(required)
	 * 
	 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "verified",
	    "status": 200,
	    "data": 
	    
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "invalid token since it has already been used",
	    "status":400,
	    "data": null
	   }
	 */
	
	app.post(`${baseUrl}/newPass`, userController.newPassword);
	/**
	 * @api {post} /api/v1/users/forgotPassword forgot password
	 * @apiVersion 1.0.0
	 * @apiGroup User Management
	 *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password new password to be reset. (body params) (required)
     * @apiParam {string} token token that was generated in reset password. (body params) (required)
	 * 
	 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "password successfully modified",
	    "status": 200,
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "failed to verify token",
	    "status": 400,
	    "data": null
	   }
	 */
	
	app.post(`${baseUrl}/logout`, auth.isAuthorized, userController.logout);
 /**
	 * @api {get} /api/v1/users/getAllUSer Get all users
	 * @apiVersion 1.0.0
	 * @apiGroup User Management
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * 
	 * @apiSuccess {object} apiResponse shows error status, message, http status code, result.
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "user successfully logged out",
	    "status": 200,
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "user already logged out",
	    "status": 404,
	    "data": null
	   }
	 */
}

