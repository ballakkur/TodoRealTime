const mongoose = require('mongoose');
const shortId = require('shortid');

const response = require('./../library/responseLib');
const check = require('./../library/checkLib');


const todoModel = mongoose.model('List');
const itemModel = mongoose.model('Item');
const subItemModel = mongoose.model('SubItem');
const notificationModel = mongoose.model('Notification');


let createTodo = (req, res) => {
    // console.log(req.body)
    console.log(req.user)
    if (!req.body.listName || !req.body.isPrivate) {
        let apiResponse = response.generate(true, 'parameters missing', 404, null);
        res.status(404).send(apiResponse);
        return;
    } else {
        let glistId = shortId.generate();
        let newlist = new todoModel({
            listId: glistId,
            listName: req.body.listName,
            creatorId: req.user.userId,
            isPrivate: req.body.isPrivate
        });
        newlist.save()
            .then((newListData) => {
                let apiResponse = response.generate(false, 'list successfully created', 200, newListData);
                res.status(apiResponse.status).send(apiResponse);
            })
            .catch((err) => {
                console.log(err);
                let apiResponse = response.generate(true, 'db error', 500, err.message);
                res.status(apiResponse.status).send(apiResponse);
            })
    }
}
let createPublicTodo = (req, res) => {
    // console.log(req.body)
    console.log(req.user)
    if (!req.body.listName || !req.body.isPrivate || !req.body.creatorId) {
        let apiResponse = response.generate(true, 'parameters missing', 404, null);
        res.status(404).send(apiResponse);
        return;
    } else {
        let glistId = shortId.generate();
        let newlist = new todoModel({
            listId: glistId,
            listName: req.body.listName,
            creatorId: req.body.creatorId,
            isPrivate: req.body.isPrivate
        });
        newlist.save()
            .then((newListData) => {
                let apiResponse = response.generate(false, 'list successfully created', 200, newListData);
                res.status(apiResponse.status).send(apiResponse);
            })
            .catch((err) => {
                console.log(err);
                let apiResponse = response.generate(true, 'db error', 500, err.message);
                res.status(apiResponse.status).send(apiResponse);
            })
    }
}

let addItem = (req, res) => {
    console.log(req.body)
    let checkParams = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.itemName) || check.isEmpty(req.body.listId)) {
                let apiResponse = response.generate(true, 'parameter missing', 404, null);
                reject(apiResponse);
                return
            }
            else {
                //check if the list with listId is in db
                todoModel.find({ listId: req.body.listId })
                    .select({ listId: 1 })
                    .then((data) => {
                        if (check.isEmpty(data)) {
                            let apiResponse = response.generate(true, 'todo with the given listId not found', 404, null);
                            reject(apiResponse);
                        } else {
                            // data.toObject();
                            // console.log(data)
                            resolve(data);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        let apiResponse = response.generate(true, 'could not check list', 500, null);
                        reject(apiResponse);
                    })
            }
        })
    }
    let createItem = (data) => {
        return new Promise((resolve, reject) => {

            let newItem = new itemModel({
                itemId: shortId.generate(),
                parentId: req.body.listId,
                itemName: req.body.itemName,
            });
            newItem.save()
                .then((newItemData) => {
                    //resolve the item so that the itemId can be added into array of todoModel
                    let itemId = newItemData.itemId
                    let listId = data[0].listId
                    console.log(listId)
                    Tdata = {
                        itemId,
                        listId
                    }
                    resolve(Tdata)
                })
                .catch((err) => {
                    console.log(err);
                    let apiResponse = response.generate(true, 'could not create item', 500, null);
                    reject(apiResponse);
                })
        })

    }

    let addItemToList = (data) => {
        console.log(data);
        console.log('itemid', data.itemId);
        return new Promise((resolve, reject) => {
            todoModel.updateOne({ listId: data.listId }, { $push: { item: data.itemId } })
                .then((modified) => {
                    console.log(modified);
                    if (modified.nModified === 1) {
                        let apiResponse = response.generate(false, 'item added to list', 200, data.itemId);
                        resolve(apiResponse);
                    } else {
                        let apiResponse = response.generate(true, 'item not added', 500, null);
                        reject(apiResponse);
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        })
    }
    checkParams()
        .then(createItem)
        .then(addItemToList)
        .then((apiResponse) => res.status(apiResponse.status).send(apiResponse))
        .catch((apiResponse) => res.status(apiResponse.status).send(apiResponse));
}

//add subitems
let addSubItem = (req, res) => {

    console.log(req.body)
    let checkParams = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.itemName) || check.isEmpty(req.body.itemId)) {
                let apiResponse = response.generate(true, 'parameter missing', 404, null);
                reject(apiResponse);
                return
            }
            else {
                //check if the list with listId is in db
                itemModel.find({ itemId: req.body.itemId })
                    .select({ itemId: 1 })
                    .then((data) => {
                        if (check.isEmpty(data)) {
                            let apiResponse = response.generate(true, 'item with the given itemId not found', 404, null);
                            reject(apiResponse);
                        } else {
                            // data.toObject();
                            // console.log(data)
                            resolve(data);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        let apiResponse = response.generate(true, 'could not check list', 500, null);
                        reject(apiResponse);
                    })
            }
        })
    }
    let createItem = (data) => {
        return new Promise((resolve, reject) => {

            let newItem = new subItemModel({
                itemName: req.body.itemName,
                subItemId: shortId.generate(),
                parentId: req.body.itemId
            });
            newItem.save()
                .then((newItemData) => {
                    let apiResponse = response.generate(false, 'sub item created', 200, newItemData.subItemId)
                    resolve(apiResponse)
                })
                .catch((err) => {
                    console.log(err);
                    let apiResponse = response.generate(true, 'could not create subitem', 500, null);
                    reject(apiResponse);
                })
        })

    }

    checkParams()
        .then(createItem)
        .then((apiResponse) => res.status(apiResponse.status).send(apiResponse))
        .catch((apiResponse) => res.status(apiResponse.status).send(apiResponse));
}

let getList = (req, res) => {

    todoModel.find({ isPrivate: req.params.isPrivate, creatorId: req.params.creatorId })
        .select({ _id: 0, __v: 0 })
        .sort({ createdOn: 1 })
        .then((data) => {
            console.log(data);
            let apiResponse = response.generate(false, 'list fetched', 200, data);
            res.status(apiResponse.status).send(apiResponse)
        })
        .catch((err) => {
            console.log(err)
            let apiResponse = response.generate(true, 'could not fetch todos', 500, null);
            res.status(500).send(apiResponse);
        })
}

let getItem = (req, res) => {
    if (check.isEmpty(req.params.id)) {
        let apiResponse = response.generate(true, 'parameter missing', 404, null);
        reject(apiResponse);
        return
    } else {
        itemModel.find({ itemId: req.params.id })
            .select({ __v: 0, _id: 0 })
            .sort({ createdOn: 1 })
            .then((itemData) => {
                console.log(itemData)
                let apiResponse = response.generate(false, 'details found', 200, itemData);
                res.status(apiResponse.status).send(apiResponse);
            })
            .catch((err) => {
                console.log(err)
                let apiResponse = response.generate(true, 'could not fetch item detail', 500, null);
                res.status(500).send(apiResponse);
            })
    }
}

let getAllItems = (req, res) => {

    itemModel.find()
        .select({ _id: 0, __v: 0 })
        .sort({ createdOn: 1 })
        .then((data) => {
            console.log(data);
            let apiResponse = response.generate(false, 'list fetched', 200, data);
            res.status(apiResponse.status).send(apiResponse)
        })
        .catch((err) => {
            console.log(err)
            let apiResponse = response.generate(true, 'could not fetch todos', 500, null);
            res.status(500).send(apiResponse);
        })
}

let getAllSubItems = (req, res) => {

    subItemModel.find()
        .select({ _id: 0, __v: 0 })
        .sort({ createdOn: 1 })
        .then((data) => {
            console.log(data);
            let apiResponse = response.generate(false, 'list fetched', 200, data);
            res.status(apiResponse.status).send(apiResponse)
        })
        .catch((err) => {
            console.log(err)
            let apiResponse = response.generate(true, 'could not fetch todos', 500, null);
            res.status(500).send(apiResponse);
        })
}
let deleteTodo = (req, res) => {
    let checkParams = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.listId)) {
                let apiResponse = response.generate(true, 'listId is missing', 404, null);
                reject(apiResponse);
                return;
            }
            else {
                resolve();
            }
        })
    }
    let findItems = () => {
        return new Promise((resolve, reject) => {
            todoModel.find({ listId: req.body.listId })
                .select({ item: 1, _id: 0 })
                .then((itemArray) => {
                    if (check.isEmpty(itemArray)) {
                        let apiResponse = response.generate(true, 'todo with the given id not found', 404, null);
                        reject(apiResponse);
                    }
                    else {
                        resolve(itemArray)
                    }
                })
                .catch((err) => {
                    let apiResponse = response.generate(true, 'db error cannot get todo', 500, null);
                    console.log(err);
                    reject(apiResponse);
                })
        })
    }

    let deleteItems = (itemArray) => {
        return new Promise((resolve, reject) => {
            console.log(itemArray[0].item)
            itemModel.deleteMany({ itemId: { $in: itemArray[0].item } })
                .then((data) => {
                    if (data.ok === 1) {
                        console.log("number of item deleted", data.n)
                        resolve();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    let apiResponse = response.generate(true, 'could not delete item', 500, null);
                    reject(apiResponse);
                    return;
                })
        })
    }

    let deleteList = () => {
        return new Promise((resolve, reject) => {
            console.log('you can now delete the list ');
            todoModel.findOneAndDelete({ listId: req.body.listId })
                .then((data) => {
                    console.log(data);
                    let apiResponse = response.generate(false, 'todo deleted', 200, data);
                    resolve(apiResponse);
                })
                .catch((err) => {
                    console.log(err);
                    let apiResponse = response.generate(true, 'db error todo not deleted', 500, null);
                    reject(apiResponse);
                })

        })
    }
    checkParams()
        .then(findItems)
        .then(deleteItems)
        .then(deleteList)
        .then(apiResponse => res.status(apiResponse.status).send(apiResponse))
        .catch(apiResponse => res.status(apiResponse.status).send(apiResponse));
}

//delete item
let deleteItem = (req, res) => {

    if (check.isEmpty(req.body.itemId)) {
        let apiResponse = response.generate(true, 'itemId is missing', 404, null);
        res.status(404).send(apiResponse);
        return;
    }
    else {
        itemModel.findOneAndDelete({ itemId: req.body.itemId })
            .then((data) => {
                console.log(data);
                let apiResponse = response.generate(false, 'item deleted', 200, data);
                res.status(200).send(apiResponse);
            })
            .catch((err) => {
                console.log(err);
                let apiResponse = response.generate(true, 'db error item not deleted', 500, null);
                res.status(500).send(apiResponse);
            })
    }
}
//delete subitem
let deleteSubItem = (req, res) => {
    if (check.isEmpty(req.body.subItemId)) {
        let apiResponse = response.generate(true, 'subItemId is missing', 404, null);
        res.status(404).send(apiResponse);
        return;
    }
    else {
        subItemModel.findOneAndDelete({ subItemId: req.body.subItemId })
            .then((data) => {
                console.log(data);
                let apiResponse = response.generate(false, 'subitem deleted', 200, data);
                res.status(200).send(apiResponse);
            })
            .catch((err) => {
                console.log(err);
                let apiResponse = response.generate(true, 'db error subitem not deleted', 500, null);
                res.status(500).send(apiResponse);
            })
    }
}

//edit item
let editItem = (req, res) => {
    if (check.isEmpty(req.body.itemId) || check.isEmpty(req.body.rename)) {
        let apiResponse = response.generate(true, 'parameters are missing', 404, null);
        res.status(404).send(apiResponse);
        return;
    } else {
        itemModel.update({ itemId: req.body.itemId }, { itemName: req.body.rename })
            .then((result) => {
                console.log(result);
                if (result.nModified === 1) {
                    let apiResponse = response.generate(false, 'edited', 200, null);
                    res.status(apiResponse.status).send(apiResponse);
                } else {
                    let apiResponse = response.generate(true, 'could not edit', 404, null);
                    res.status(apiResponse.status).send(apiResponse);
                }
            })
            .catch((err) => {
                console.log(err)
                let apiResponse = response.generate(true, 'db error', 500, null);
                res.status(apiResponse.status).send(apiResponse);
            })
    }
}

//markItem
let markItem = (req, res) => {
    if (check.isEmpty(req.body.itemId) || check.isEmpty(req.body.mark)) {
        let apiResponse = response.generate(true, 'parameters are missing', 404, null);
        res.status(404).send(apiResponse);
        return;
    } else {
        console.log(req.body.mark)
        itemModel.updateOne({ itemId: req.body.itemId }, { isDone: req.body.mark })
            .then((result) => {
                console.log(result);
                if (result) {
                    let apiResponse = response.generate(false, 'marked', 200, null);
                    res.status(apiResponse.status).send(apiResponse);
                } else {
                    let apiResponse = response.generate(true, 'could not edit', 404, null);
                    res.status(apiResponse.status).send(apiResponse);
                }
            })
            .catch((err) => {
                console.log(err)
                let apiResponse = response.generate(true, 'db error', 500, null);
                res.status(apiResponse.status).send(apiResponse);
            })
    }
}

//loading notification
let loadNotification = (req, res) => {
    if (check.isEmpty(req.params.concernId)) {
        let apiResponse = response.generate(true, 'concern Id is missing', 404, null);
        res.status(404).send(apiResponse);
    } else {
        notificationModel.find({ concernId: req.params.concernId })
        .select('-_id -__v')
        .sort({ createdOn: 1 })
            .then((data) => {
                let apiResponse = response.generate(false, 'notification fetched',200,data);
                res.status(200).send(apiResponse);
            })
            .catch((err) => {
                console.log(err)
                let apiResponse = response.generate(true, 'could not fetch db error', 500, null);
                res.status(404).send(apiResponse);
            })
    }
}

module.exports = {
    getList,
    getAllItems,
    getAllSubItems,
    getItem,
    createTodo,
    createPublicTodo,
    addItem,
    addSubItem,
    deleteTodo,
    deleteItem,
    deleteSubItem,
    editItem,
    markItem,
    loadNotification
}
