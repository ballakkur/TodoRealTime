const appConfig = require('../../Config/appConfig');
const todoController = require('./../controllers/todoController');
const authMiddleware = require('./../middlewares/authMiddleware');



let baseUrl = `${appConfig.apiVersion}/todo`;
module.exports.setRouter = (app) => {

    app.post(`${baseUrl}/create`, authMiddleware.isAuthorized, todoController.createTodo);
    /**
     * @apiGroup Todo
     * @apiVersion  1.0.0
     * @api {post} /api/v1/todo/create api for creating a todo.
     *
     * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
     * @apiParam {string} listName name of the todo to be created. (body params) (required)
     * @apiParam {string} isPrivate boolean to indicate weather todo is private or public. (body params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "list successfully created",
            "status": 200,
            "data": {
                listId:"string",
                listName:"string",
                item:array,
                creatorId:"string",
                isPrivate:boolean,
                createdOn:date
            }
        }
    */
    app.post(`${baseUrl}/createPublic`, authMiddleware.isAuthorized, todoController.createPublicTodo);
    /**
    * @apiGroup Todo
    * @apiVersion  1.0.0
    * @api {post} /api/v1/todo/createPublic api for creating a todo.
    *
    * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
    * @apiParam {string} listName name of the todo to be created. (body params) (required)
    * @apiParam {string} isPrivate boolean to indicate weather todo is private or public. (body params) (required)
    * @apiParam {string} creatorId userId of the user who created the todo. (body params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "list successfully created",
            "status": 200,
            "data": {
                listId:"string",
                listName:"string",
                item:array,
                creatorId:"string",
                isPrivate:boolean,
                createdOn:date
            }
        }
    */
    app.post(`${baseUrl}/addItem`, authMiddleware.isAuthorized, todoController.addItem);
 /**
    * @apiGroup Todo
    * @apiVersion  1.0.0
    * @api {post} /api/v1/todo/addItem api for adding items to todo.
    *
    * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
    * @apiParam {string} listId Id of the todo list to which item has to be added. (body params) (required)
    * @apiParam {string} itemName name of the item to be added to that todo. (body params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
    {
        "error": false,
        "message": "item added to list",
        "status": 200,
        "data": {
            itemId:"string"
        }
    }
           */
    app.post(`${baseUrl}/addSubItem`, authMiddleware.isAuthorized, todoController.addSubItem);
 /**
    * @apiGroup Todo
    * @apiVersion  1.0.0
    * @api {post} /api/v1/todo/addSubItem api for adding sub item to an item.
    *
    * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
    * @apiParam {string} itemId Id of the item to which subitem has to be added. (body params) (required)
    * @apiParam {string} itemName name of the item to be added to that todo. (body params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
    {
        "error": false,
        "message": "sub item created",
        "status": 200,
        "data":{
            subItemId:"string"
        }
    }
  */
    app.post(`${baseUrl}/delete`, authMiddleware.isAuthorized, todoController.deleteTodo);
 /**
    * @apiGroup Todo
    * @apiVersion  1.0.0
    * @api {post} /api/v1/todo/delete api deleting a todo.
    *
    * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
    * @apiParam {string} listId Id of the todo list to be deleted. (body params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
    {
        "error": false,
        "message": "todo deleted",
        "status": 200,
        "data": {
                listId:"string",
                listName:"string",
                item:array,
                creatorId:"string",
                isPrivate:boolean,
                createdOn:date
            }
    }
  */    
    app.post(`${baseUrl}/deleteItem`, authMiddleware.isAuthorized, todoController.deleteItem);
/**
    * @apiGroup Todo
    * @apiVersion  1.0.0
    * @api {post} /api/v1/todo/deleteItem api for deleting an item in todo.
    *
    * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
    * @apiParam {string} itemId Id of the item in todo list to be deleted. (body params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
    {
        "error": false,
        "message": "item deleted",
        "status": 200,
        "data": {
                itemId:"string",
                itemName:"string",
                parentId:"string",
                isDone:boolean,
                createdOn:date
            }
    }
  */  
    app.post(`${baseUrl}/deleteSubItem`, authMiddleware.isAuthorized, todoController.deleteSubItem);
/**
    * @apiGroup Todo
    * @apiVersion  1.0.0
    * @api {post} /api/v1/todo/deleteSubItem api for deleting an subitem of an item todo.
    *
    * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
    * @apiParam {string} deleteSubItemId Id of the subitem of item in list to be deleted. (body params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
    {
        "error": false,
        "message": "subitem deleted",
        "status": 200,
        "data": {
                subItemId:"string",
                subItemName:"string",
                parentId:"string",
                createdOn:date
            }
    }
  */  
    app.post(`${baseUrl}/markItem`, authMiddleware.isAuthorized, todoController.markItem);
/**
    * @apiGroup Todo
    * @apiVersion  1.0.0
    * @api {post} /api/v1/todo/markItem api for marking an item as complete.
    *
    * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
    * @apiParam {string} ItemId Id of the item  in list to be marked as complete. (body params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
    {
        "error": false,
        "message": "marked",
        "status": 200,
        "data": null
    }
  */  
    app.post(`${baseUrl}/editItem`, authMiddleware.isAuthorized, todoController.editItem);
/**
    * @apiGroup Todo
    * @apiVersion  1.0.0
    * @api {post} /api/v1/todo/editItem api for editing the title of an item.
    *
    * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
    * @apiParam {string} itemId Id of item in list to be renamed. (body params) (required)
    * @apiParam {string} rename new name for the item. (body params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
    {
        "error": false,
        "message": "edited",
        "status": 200,
        "data": null
    }
  */  
    app.get(`${baseUrl}/:isPrivate/:creatorId/getList`, authMiddleware.isAuthorized, todoController.getList);
/**
    * @apiGroup Todo
    * @apiVersion  1.0.0
    * @api {get} /api/v1/todo/:isPrivate/:creatorId/getList api for getting all list.
    *
    * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
    * @apiParam {string} isPrivate boolean value to indicate weather list is private or public. (query params) (required)
    * @apiParam {string} creatorId id of the creator of the list. (query params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
    {
        "error": false,
        "message": "list fetched",
        "status": 200,
        "data": {
                listId:"string",
                listName:"string",
                item:array,
                creatorId:"string",
                isPrivate:boolean,
                createdOn:date
            }
    }
  */ 
    app.get(`${baseUrl}/getAllItem`, authMiddleware.isAuthorized, todoController.getAllItems);
/**
    * @apiGroup Todo
    * @apiVersion  1.0.0
    * @api {get} /api/v1/todo/getAllItem api for getting all list.
    *
    * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
    {
        "error": false,
        "message": "list fetched",
        "status": 200,
        "data": {
                itemId:"string",
                itemName:"string",
                parentId:"string",
                isDone:boolean,
                createdOn:date
            }
    }
  */ 
    app.get(`${baseUrl}/getAllSubItem`, authMiddleware.isAuthorized, todoController.getAllSubItems);
/**
    * @apiGroup Todo
    * @apiVersion  1.0.0
    * @api {get} /api/v1/todo/getAllSubItem api for getting all list.
    *
    * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
    {
        "error": false,
        "message": "list fetched",
        "status": 200,
        "data":  {
                subItemId:"string",
                subItemName:"string",
                parentId:"string",
                createdOn:date
            }
    }
  */ 
    app.get(`${baseUrl}/getItem/:id`, authMiddleware.isAuthorized, todoController.getItem);
    app.get(`${baseUrl}/:concernId/notification`, authMiddleware.isAuthorized, todoController.loadNotification)
/**
    * @apiGroup Todo
    * @apiVersion  1.0.0
    * @api {get} /api/v1/todo/:concernId/notification api for getting all notification.
    *
    * @apiParam {string} authToken authToken of the user. (query/body/header params) (required)
    * @apiParam {string} concernId id of the user to whom notification is sent. (query params) (required)
    * 
    * @apiSuccess {object} myResponse shows error status, message, http status code, result.
    * 
    * @apiSuccessExample {object} Success-Response:
    {
        "error": false,
        "message": "notification fetched",
        "status": 200,
        "data":  {
                notiId:"string",
                text:"string",
                concernId:"string",
                createdOn:date
            }
    }
  */ 


}

