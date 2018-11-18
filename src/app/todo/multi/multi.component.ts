import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from 'src/app/socket.service';

import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from 'src/app/todo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-multi',
  templateUrl: './multi.component.html',
  styleUrls: ['./multi.component.css'],
  providers: [SocketService]
})
export class MultiComponent implements OnInit, OnDestroy {

  userDetails
  authToken
  constructor(public socketService: SocketService,
    public toastr: ToastrService,
    public todoService: TodoService,
    public router:Router,
    public appService: AppService) { }
  public isloading: boolean = true;
  public onlineUserList: any[];
  isActive
  todoTitle = ''
  itemChosen = ''
  value = ''
  itemFunChoice: string;
  choices: string[] = ['add subtodoitem', 'edit'];

  trim = (x) => {
    let value = String(x);
    return value.replace(/^\s+|\s+$/gm, '');
  }

  isEmpty = (value) => {
    if (value === null || value === undefined || this.trim(value) === '' || value.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  addItem = [];
  todos = [
    /*  {
      listId:'ss', listName: "urgent list", createdOn: 12, items:['x','y','z']
     },
     {
      listId:'hh', listName: "new list", createdOn: 11, items:['p','q','r']
     } */
  ];

  items = [
    /* {parentId:'ss',itemId:'subutem',itemName:'subtodo'},
    {parentId:'ss',itemName:'substodo'} */
  ];

  subItems = [
    /* {parentId:'subutem',itemName:'itemofitem'},
    {parentId:'subutem',itemName:'itemofitem'},
    {parentId:'subutem',itemName:'itemofitem'},
    {parentId:'subutem',itemName:'itemofitem'} */
  ]
  markAsDone(itemId, index, isdone, event) {
    event.stopPropagation();
    /* console.log(itemId);
    console.log(index); */

    if (isdone === false) {
      console.log(isdone)
      this.todoService.markDone({ itemId: itemId, isDone: true })
        .subscribe((apiResponse) => {
          this.items.forEach(item => {
            if (item.itemId === itemId) {
              item.isDone = true
            }
          })
          console.log(this.items)
          let data = {
            action: 'markAsDone',
            message:{
              text:`${this.userDetails.userName} created a todo`,
              concernId:''
            },
            changedViewId:this.userDetails.userId,
            itemId:itemId
          }
          this.socketService.notifyUpdates(data);
        }, (err) => {
          console.log(err.error);
          this.toastr.error(`${err.error.status}`, 'error');
        })
    } else {
      console.log(isdone)

      this.todoService.markDone({ itemId: itemId, isDone:false })
        .subscribe((apiResponse) => {
          this.items.forEach(item => {
            if (item.itemId === itemId) {
              item.isDone = false
            }
          })
          console.log(this.items)
          let data = {
            action: 'markAsNotDone',
            message:{
              text:`${this.userDetails.userName} created a todo`,
              concernId:''
            },
            changedViewId:this.userDetails.userId,
            itemId:itemId
          }
          this.socketService.notifyUpdates(data);
        }, (err) => {
          console.log(err.error);
          this.toastr.error(`${err.error.status}`, 'error');
        })
    }

  }
  deleteSubItem(subItemId, index, event) {
    event.stopPropagation();
    console.log(subItemId)
    console.log(index)
    this.todoService.deleteSubItem(subItemId)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.subItems.splice(index, 1);
          this.toastr.success('sub item deleted :))', 'Done!');
          let data = {
            action: 'deleteSubItem',
            message:{
              text:`${this.userDetails.userName} created a todo`,
              concernId:''
            },
            changedViewId:this.userDetails.userId,
            index: index
          }
          this.socketService.notifyUpdates(data)
        }
      }, (err) => {
        console.log(err);
      })
  }
  deleteItem(itemId, index, event) {
    event.stopPropagation();
    console.log(itemId)
    console.log(index)
    this.todoService.deleteItem(itemId)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.items.splice(index, 1);
          this.toastr.success('item deleted :))', 'Done!');
          let data = {
            //here userId is the id of the person who changed it
            action: 'deleteItem',
            message:{
              text:`${this.userDetails.userName} created a todo`,
              concernId:''
            },
            changedViewId:this.userDetails.userId,
            index: index
          }
          this.socketService.notifyUpdates(data)
        }
      }, (err) => {
        console.log(err);
      })

  }
  deleteTodo(todoId, index) {
    console.log(todoId)
    this.todoService.deleteTodo(todoId)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.todos.splice(index, 1);
          this.toastr.success('Todo deleted :))', 'Done!');
        }
        let data = {
          //here userId is the id of the person who changed it
          action: 'delete',
          message:{
            text:`${this.userDetails.userName} created a todo`,
            concernId:''
          },
          changedViewId:this.userDetails.userId,
          listId: apiResponse.data.listId,
          index: index
        }
        this.socketService.notifyUpdates(data)
      }, (err) => {
        console.log(err);
      })
  }
  createTodo() {
    console.log(this.todoTitle);
    if (this.isEmpty(this.todoTitle)) {
      this.toastr.warning('you need a title :)');
    } else {
      this.todoService.createPublicTodo(this.todoTitle, this.userDetails.userId)
        .subscribe((apiResponse) => {
          if (apiResponse.status === 200) {
            this.todos.splice(0, 0, {
              listName: apiResponse.data.listName,
              listId: apiResponse.data.listId,
              isPrivate: apiResponse.data.isPrivate,
              createdOn: apiResponse.data.createdOn, item: apiResponse.data.item
            });
            console.log(apiResponse.data);
            this.toastr.success('todo created', 'Done!');

            /* for (let friend of this.userDetails.friends) {
              console.log(friend.userId)
              let data = {
                message: `${this.userDetails.userId} has added a List named as ${this.todoTitle}`,
                //here userId is the id of the person who changed it
                userId: friend.userId,
                listId: apiResponse.data.listId,
                listName: apiResponse.data.listName
              }
              this.socketService.notifyUpdates(data)
            } */

            // console.log(userIds)
            let data = {
              //here userId is the id of the person who changed it
              changedViewId:this.userDetails.userId,
              action: 'add',
              message:{
                text:`${this.userDetails.userName} created a todo`,
                concernId:''
              },
              listId: apiResponse.data.listId,
              listName: apiResponse.data.listName
            }
            this.socketService.notifyUpdates(data)
          }
        }, (err) => {
          console.log(err);
        })

    }
  }
  updateSelectedItem(item) {
    this.itemChosen = item;
  }

  funcItem() {

    if (this.isEmpty(this.value)) {
      console.log('enter a value in the input');

    } else {
      // console.log(this.itemFunChoice);
      // console.log(this.value);
      // console.log(this.itemChosen)
      if (this.itemFunChoice === 'edit') {
        this.todoService.editItem({ itemId: this.itemChosen, rename: this.value })
          .subscribe((apiResponse) => {
            this.items.forEach(item => {
              if (item.itemId === this.itemChosen) {
                item.itemName = this.value
                console.log(item.itemName);
                return;
              }
            })
            // console.log(apiResponse.data)
            // console.log(this.items)
            let data = {
              action: 'editItem',
              message:{
                text:`${this.userDetails.userName} created a todo`,
                concernId:''
              },
              changedViewId:this.userDetails.userId,
              itemId: this.itemChosen,
              itemName: this.value,
            }
            this.socketService.notifyUpdates(data)
          }, (err) => {
            console.log(err.error);
            this.toastr.error(`${err.error.status}`, 'error');
          })

      } else {
        this.todoService.addSubItem({ itemId: this.itemChosen, itemName: this.value })
          .subscribe((apiResponse) => {
            this.subItems.splice(0, 0, { itemName: this.value, itemId: apiResponse.data, parentId: this.itemChosen });
            console.log(apiResponse.data);
            let data = {
              action: 'addSubItem',
              message:{
                text:`${this.userDetails.userName} created a todo`,
                concernId:''
              },
              changedViewId:this.userDetails.userId,
              itemId: apiResponse.data,
              parentId: this.itemChosen,
              itemName: this.value,
            }
            this.socketService.notifyUpdates(data)
          },
            (err) => {
              console.log(err)
            })
      }
    }
  }
  onKeyUp(e, i) {
    console.log(this.addItem)
    console.log(e.listId)
    console.log(i)
    if (this.isEmpty(this.addItem[i])) {
      console.log(this.addItem[i])
    } else {
      // console.log(this.items)
      this.todoService.addItem({ itemName: this.addItem[i], parentId: e.listId })
        .subscribe((apiResponse) => {
          this.items.splice(0, 0, { itemName: this.addItem[i], itemId: apiResponse.data, parentId: e.listId })
          console.log(apiResponse.data)
          console.log(this.items)
          let data = {
            //here userId is the id of the person who changed it
            action: 'addItem',
            message:{
              text:`${this.userDetails.userName} created a todo`,
              concernId:''
            },
            changedViewId:this.userDetails.userId,
            listId: e.listId,
            itemId: apiResponse.data,
            itemName: this.addItem[i],
            index: i
          }
          this.socketService.notifyUpdates(data)
          this.addItem[i] = '';
        }, (err) => {
          console.log(err.error);
          this.toastr.error(`${err.error.status}`, 'error');
        })

    }
  }
  ngOnInit() {
    this.getUserInfo()
    this.authToken = Cookie.get('authToken');
    this.checkStatus();
    this.verifyUserConfirmation()
    this.getOnlineUserList()
    // this.addFriendsArray()
    this.loadTodos()
    this.loadItems()
    this.loadSubItems()
    this.getUpdatesFromUser()
    this.isloading = false;

  }
  checkStatus(){
    if(this.isEmpty(this.authToken)){
      this.router.navigate(['/'])
    }
  }
  /* addFriendsArray() {
    for (let friend of this.userDetails.friends) {
      this.userIds.push(friend.userId)
    }
  } */
  loadTodos() {

    this.todoService.getList(false, this.userDetails.userId)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          // console.log(apiResponse.data)
          apiResponse.data.forEach(ele => {
            this.todos.splice(0, 0, ele)
            // this.todos.push(ele)
          });
        }
      },
        (err) => {
          console.log(err)
        })
  }
  loadItems() {
    this.todoService.getAllItem()
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          // console.log(apiResponse.data)
          apiResponse.data.forEach(ele => {
            this.items.splice(0, 0, ele)
            // this.items.push(ele)
            // console.log(ele)
          });
        }
      },
        (err) => {
          console.log(err)
        })
  }
  loadSubItems() {
    this.todoService.getAllSubItem()
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          // console.log(apiResponse.data)
          apiResponse.data.forEach(ele => {
            this.subItems.splice(0, 0, ele);
            // this.subItems.push(ele)
            // console.log(ele)
          });
        }
      },
        (err) => {
          console.log(err)
        })
  }
  getUserInfo() {
    this.userDetails = this.appService.getUserInfoFromLocalStorage()
    console.log(this.userDetails)
  }
  public verifyUserConfirmation: any = () => {
    this.socketService.verifyUser().subscribe(
      data => {
        this.socketService.setUser(Cookie.get('authToken'))
      }
    )
  }
  public getOnlineUserList: any = () => {
    this.socketService.onlineUserList().subscribe((data) => {

      // console.log(data)
      this.onlineUserList = []
      for (let x in data) {
        //let temp = { 'userId': x, 'userName': data[x] };
        this.onlineUserList.push(x);

      }
      console.log(this.onlineUserList)
      /*   for (let user of this.userDetails) {
          console.log(user)
          if (this.onlineUserList.includes(user.userId)) {
            user.status = "online"
          } else {
            user.status = "offline"
          }

        } */
      console.log(this.userDetails)

    });//end subscribe
  }//end getOnlineUserList
  public getUpdatesFromUser = () => {
    console.log(this.userDetails.userId, 'listening')
    // console.log(this.userDetails.friends)
    /*  for(let friend of this.userDetails.friends){
       console.log(friend)
       this.socketService.getUpdatesFromUser(friend).subscribe((data) => {
         //getting message from user.
         console.log(data)
         // if(data.listId != undefined && data.listId == this.selectedListId)
         //   this.getAllItemFunction()
           
       });
     } */
    this.socketService.getUpdatesFromUser().subscribe((data) => {
      //getting message from user.
      // console.log(data.userId)
      // console.log(this.userDetails.userId)
        if(data.changedViewId === this.userDetails.userId){
        if (data.action == 'add') {
          this.todos.splice(0, 0, {
            listName: data.listName,
            listId: data.listId,
            isPrivate: false,
            createdOn: Date.now(),
          });
          this.toastr.info(`new todo added`, 'update');
        } else if (data.action == 'delete') {
          this.todos.splice(data.index, 1);
          this.toastr.info(`todo deleted!!`, 'update');
        } else if (data.action == 'addItem') {
          console.log(data.itemName)
          this.items.splice(0, 0, { itemName: data.itemName, itemId: data.itemId, parentId: data.listId })
          this.toastr.info(`item added to a todo`, 'update');
        } else if (data.action == 'deleteItem') {
          this.items.splice(data.index, 1);
          this.toastr.info(`item deleted from a todo`, 'update');
        } else if (data.action == 'editItem') {
          this.items.forEach(item => {
            if (item.itemId === data.itemId) {
              item.itemName = data.itemName
              console.log(item.itemName);
              return;
            }
          })
          this.toastr.info(`item renamed from a todo`, 'update');
        } else if (data.action == 'addSubItem') {
          this.subItems.splice(0, 0, { itemName: data.itemName, itemId: data.itemId, parentId: data.parentId });
          this.toastr.info(`sub item added to a todo item`, 'update');
        }else if(data.action == 'deleteSubItem'){
          this.subItems.splice(data.index, 1);
          this.toastr.info(`sub item deleted from a todo item`, 'update');
        }else if(data.action == 'markAsDone'){
          this.items.forEach(item => {
            if (item.itemId === data.itemId) {
              item.isDone = true
            }
          })
          this.toastr.info(`task completed! yay :))`, 'update');
        }else if(data.action == 'markAsNotDone'){
          this.items.forEach(item => {
            if (item.itemId === data.itemId) {
              item.isDone = false
            }
          })
          this.toastr.info(`marked as incomplete`, 'update');
        }
      }



    });
  }
  ngOnDestroy() {
    this.socketService.exitSocket()
  }
}
