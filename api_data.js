define({ "api": [
  {
    "group": "Friends",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friends/accept/friend/request",
    "title": "Accept Friend Request.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "senderId",
            "description": "<p>Id of the Sender. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "recipientId",
            "description": "<p>Id of the Reciever(Login User). (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Accepted Friend Request\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/friendRoute.js",
    "groupTitle": "Friends",
    "name": "GetApiV1FriendsAcceptFriendRequest"
  },
  {
    "group": "Friends",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friends/friend/recieved",
    "title": "Get all friends request Recieved.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"you received request(s),\n    \"status\": 200,\n    \"data\": [\n        {\n            recipientId:\"string\".\n            senderId:\"string\",\n            requestStatus:{\n                enum:['requested,'accepted']\n            }\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/friendRoute.js",
    "groupTitle": "Friends",
    "name": "GetApiV1FriendsFriendRecieved"
  },
  {
    "group": "Friends",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friends/reject/friend/request",
    "title": "Reject Friend Request.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "senderId",
            "description": "<p>Id of the Sender. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "recipientId",
            "description": "<p>Id of the Reciever(Login User). (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Friend Request rejected\",\n    \"status\": 200,\n    \"data\":{\n        [\n      {\n          recipientId:\"string\".\n          senderId:\"string\",\n          requestStatus:{\n              enum:['requested,'accepted']\n          }\n      }\n  ]\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/friendRoute.js",
    "groupTitle": "Friends",
    "name": "GetApiV1FriendsRejectFriendRequest"
  },
  {
    "group": "Friends",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friends/send/friend/request",
    "title": "Send Friend Request.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "senderId",
            "description": "<p>Id of the Sender. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "recipientId",
            "description": "<p>Id of the Reciever. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Friend Request Sent\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/friendRoute.js",
    "groupTitle": "Friends",
    "name": "GetApiV1FriendsSendFriendRequest"
  },
  {
    "group": "Friends",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friends/unfriend/user",
    "title": "Unfriend user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "senderId",
            "description": "<p>Id of the Sender. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "recipientId",
            "description": "<p>Id of the Reciever(Login User). (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Unfriended\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/friendRoute.js",
    "groupTitle": "Friends",
    "name": "GetApiV1FriendsUnfriendUser"
  },
  {
    "group": "Todo",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/todo/:concernId/notification",
    "title": "get all notification.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "concernId",
            "description": "<p>id of the user to whom notification is sent. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"notification fetched\",\n    \"status\": 200,\n    \"data\":  {\n            notiId:\"string\",\n            text:\"string\",\n            concernId:\"string\",\n            createdOn:date\n        }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/todoRoute.js",
    "groupTitle": "Todo",
    "name": "GetApiV1TodoConcernidNotification"
  },
  {
    "group": "Todo",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/todo/getAllItem",
    "title": "get all item.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"list fetched\",\n    \"status\": 200,\n    \"data\": {\n            itemId:\"string\",\n            itemName:\"string\",\n            parentId:\"string\",\n            isDone:boolean,\n            createdOn:date\n        }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/todoRoute.js",
    "groupTitle": "Todo",
    "name": "GetApiV1TodoGetallitem"
  },
  {
    "group": "Todo",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/todo/getAllSubItem",
    "title": "get all sub item.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"list fetched\",\n    \"status\": 200,\n    \"data\":  {\n            subItemId:\"string\",\n            subItemName:\"string\",\n            parentId:\"string\",\n            createdOn:date\n        }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/todoRoute.js",
    "groupTitle": "Todo",
    "name": "GetApiV1TodoGetallsubitem"
  },
  {
    "group": "Todo",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/todo/:isPrivate/:creatorId/getList",
    "title": "get all list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "isPrivate",
            "description": "<p>boolean value to indicate weather list is private or public. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "creatorId",
            "description": "<p>id of the creator of the list. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"list fetched\",\n    \"status\": 200,\n    \"data\": {\n            listId:\"string\",\n            listName:\"string\",\n            item:array,\n            creatorId:\"string\",\n            isPrivate:boolean,\n            createdOn:date\n        }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/todoRoute.js",
    "groupTitle": "Todo",
    "name": "GetApiV1TodoIsprivateCreatoridGetlist"
  },
  {
    "group": "Todo",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/todo/addItem",
    "title": "add items to todo.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>Id of the todo list to which item has to be added. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemName",
            "description": "<p>name of the item to be added to that todo. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"item added to list\",\n    \"status\": 200,\n    \"data\": {\n        itemId:\"string\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/todoRoute.js",
    "groupTitle": "Todo",
    "name": "PostApiV1TodoAdditem"
  },
  {
    "group": "Todo",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/todo/addSubItem",
    "title": "add sub item to an item.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>Id of the item to which subitem has to be added. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemName",
            "description": "<p>name of the item to be added to that todo. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"sub item created\",\n    \"status\": 200,\n    \"data\":{\n        subItemId:\"string\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/todoRoute.js",
    "groupTitle": "Todo",
    "name": "PostApiV1TodoAddsubitem"
  },
  {
    "group": "Todo",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/todo/create",
    "title": "create a todo.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listName",
            "description": "<p>name of the todo to be created. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "isPrivate",
            "description": "<p>boolean to indicate weather todo is private or public. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"list successfully created\",\n    \"status\": 200,\n    \"data\": {\n        listId:\"string\",\n        listName:\"string\",\n        item:array,\n        creatorId:\"string\",\n        isPrivate:boolean,\n        createdOn:date\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/todoRoute.js",
    "groupTitle": "Todo",
    "name": "PostApiV1TodoCreate"
  },
  {
    "group": "Todo",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/todo/createPublic",
    "title": "create a public todo.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listName",
            "description": "<p>name of the todo to be created. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "isPrivate",
            "description": "<p>boolean to indicate weather todo is private or public. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "creatorId",
            "description": "<p>userId of the user who created the todo. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"list successfully created\",\n    \"status\": 200,\n    \"data\": {\n        listId:\"string\",\n        listName:\"string\",\n        item:array,\n        creatorId:\"string\",\n        isPrivate:boolean,\n        createdOn:date\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/todoRoute.js",
    "groupTitle": "Todo",
    "name": "PostApiV1TodoCreatepublic"
  },
  {
    "group": "Todo",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/todo/delete",
    "title": "delete a todo.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>Id of the todo list to be deleted. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"todo deleted\",\n    \"status\": 200,\n    \"data\": {\n            listId:\"string\",\n            listName:\"string\",\n            item:array,\n            creatorId:\"string\",\n            isPrivate:boolean,\n            createdOn:date\n        }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/todoRoute.js",
    "groupTitle": "Todo",
    "name": "PostApiV1TodoDelete"
  },
  {
    "group": "Todo",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/todo/deleteItem",
    "title": "delete an item in todo.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>Id of the item in todo list to be deleted. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"item deleted\",\n    \"status\": 200,\n    \"data\": {\n            itemId:\"string\",\n            itemName:\"string\",\n            parentId:\"string\",\n            isDone:boolean,\n            createdOn:date\n        }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/todoRoute.js",
    "groupTitle": "Todo",
    "name": "PostApiV1TodoDeleteitem"
  },
  {
    "group": "Todo",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/todo/deleteSubItem",
    "title": "delete a subitem of an item in todo.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "deleteSubItemId",
            "description": "<p>Id of the subitem of item in list to be deleted. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"subitem deleted\",\n    \"status\": 200,\n    \"data\": {\n            subItemId:\"string\",\n            subItemName:\"string\",\n            parentId:\"string\",\n            createdOn:date\n        }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/todoRoute.js",
    "groupTitle": "Todo",
    "name": "PostApiV1TodoDeletesubitem"
  },
  {
    "group": "Todo",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/todo/editItem",
    "title": "edit the title of an item.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>Id of item in list to be renamed. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "rename",
            "description": "<p>new name for the item. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"edited\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/todoRoute.js",
    "groupTitle": "Todo",
    "name": "PostApiV1TodoEdititem"
  },
  {
    "group": "Todo",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/todo/markItem",
    "title": "mark an item as complete.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query/body/header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "ItemId",
            "description": "<p>Id of the item  in list to be marked as complete. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"marked\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/todoRoute.js",
    "groupTitle": "Todo",
    "name": "PostApiV1TodoMarkitem"
  },
  {
    "type": "get",
    "url": "/api/v1/users/getAllUSer",
    "title": "Get all users",
    "version": "1.0.0",
    "group": "User_Management",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"users found\",\n\t    \"status\": 200,\n\t    \"data\": [\n\t\t\t\t\t{\n\t\t\t\t\t\tactive:boolean,\n\t\t\t\t\t\tuserId: \"string\",\n\t\t\t\t\t\tfirstName:\"string\",\n\t\t\t\t\t\tlastName:\"string\",\n\t\t\t\t\t\tuserName:\"string\",\n\t\t\t\t\t\temail:\"string\",\n\t\t\t\t\t\tfriends: array\n\t\t\t\t\t}\n\t    \t\t]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"could not fetch user details, refresh the page\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/userRoute.js",
    "groupTitle": "User_Management",
    "name": "GetApiV1UsersGetalluser"
  },
  {
    "type": "get",
    "url": "/api/v1/users/getAllUSer",
    "title": "Get all users",
    "version": "1.0.0",
    "group": "User_Management",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"user successfully logged out\",\n\t    \"status\": 200,\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"user already logged out\",\n\t    \"status\": 404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/userRoute.js",
    "groupTitle": "User_Management",
    "name": "GetApiV1UsersGetalluser"
  },
  {
    "type": "get",
    "url": "/api/v1/users/resetPassword/:email/:token",
    "title": "to reset password",
    "version": "1.0.0",
    "group": "User_Management",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email to which the password has to be reset (query params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>that was generated in forgot password (query params)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"verified\",\n\t    \"status\": 200,\n\t    \"data\": \n\t    \n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"invalid token since it has already been used\",\n\t    \"status\":400,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/userRoute.js",
    "groupTitle": "User_Management",
    "name": "GetApiV1UsersResetpasswordEmailToken"
  },
  {
    "type": "post",
    "url": "/api/v1/users/forgotPassword",
    "title": "forgot password",
    "version": "1.0.0",
    "group": "User_Management",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"reset email has been sent,please check your email\",\n\t    \"status\": 200,\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"email is invalid or null\",\n\t    \"status\": 400,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/userRoute.js",
    "groupTitle": "User_Management",
    "name": "PostApiV1UsersForgotpassword"
  },
  {
    "type": "post",
    "url": "/api/v1/users/forgotPassword",
    "title": "forgot password",
    "version": "1.0.0",
    "group": "User_Management",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>new password to be reset. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>token that was generated in reset password. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"password successfully modified\",\n\t    \"status\": 200,\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"failed to verify token\",\n\t    \"status\": 400,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/userRoute.js",
    "groupTitle": "User_Management",
    "name": "PostApiV1UsersForgotpassword"
  },
  {
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "Login",
    "version": "1.0.0",
    "group": "User_Management",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Login Successful\",\n\t    \"status\": 200,\n\t    \"data\": [\n\t\t\t\t\t{\n\t\t\t\t\t\tauthToken:\"string\",\n\t\t\t\t\t\tuserDetails:{\n\t\t\t\t\t\t\tactive:boolean,\n\t\t\t\t\t\t\tuserId: \"string\",\n\t\t\t\t\t\t\tfirstName:\"string\",\n\t\t\t\t\t\t\tlastName:\"string\",\n\t\t\t\t\t\t\tuserName:\"string\",\n\t\t\t\t\t\t\temail:\"string\",\n\t\t\t\t\t\t\tcountryCode:\"string\",\n\t\t\t\t\t\t\tmobile:number,\n\t\t\t\t\t\t\tfriends: array\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t    \t\t]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"wrong password\",\n\t    \"status\": 404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/userRoute.js",
    "groupTitle": "User_Management",
    "name": "PostApiV1UsersLogin"
  },
  {
    "type": "post",
    "url": "/api/v1/users/signUp",
    "title": "Register",
    "version": "1.0.0",
    "group": "User_Management",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "countryCode",
            "description": "<p>country code of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobile",
            "description": "<p>Mobile Number of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "apiResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"User created\",\n\t    \"status\": 200,\n\t    \"data\": [\n\t\t\t\t\t{\n\t\t\t\t\t\tactive:boolean,\n\t\t\t\t\t\tcreatedOn:Date,\n\t\t\t\t\t\tuserId: \"string\",\n\t\t\t\t\t\tfirstName:\"string\",\n\t\t\t\t\t\tlastName:\"string\",\n\t\t\t\t\t\tuserName:\"string\",\n\t\t\t\t\t\temail:\"string\",\n\t\t\t\t\t\tcountryCode:\"string\",\n\t\t\t\t\t\tmobile:number,\n\t\t\t\t\t\tfriends: array\n\t\t\t\t\t}\n\t    \t\t]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"email already exists\",\n\t    \"status\": 404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/userRoute.js",
    "groupTitle": "User_Management",
    "name": "PostApiV1UsersSignup"
  }
] });
