import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/app/todo.service';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from 'src/app/socket.service';
import { AppService } from 'src/app/app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';



@Component({
  selector: 'app-friends-public',
  templateUrl: './friends-public.component.html',
  styleUrls: ['./friends-public.component.css'],
  providers: [SocketService]
})
export class FriendsPublicComponent implements OnInit,OnDestroy {

  authToken

  constructor(public activatedRouter: ActivatedRoute,
    public todoService: TodoService,
    public toastr: ToastrService,
    public socketService: SocketService,
    public router:Router,
    public appService: AppService
  ) { }
  userDetails
  myFriendId
  public isloading: boolean = true;
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
      this.todoService.markDone({ itemId: itemId, isDone:true })
        .subscribe((apiResponse) => {
          this.items.forEach(item => {
            if (item.itemId === itemId) {
              item.isDone = true
            }
          })
          console.log(apiResponse.data)
          console.log(this.items)
          let data = {
            action: 'markAsDone',
            message:{
              text:`${this.userDetails.userName} marked item as completed`,
              concernId:this.myFriendId
            },
            changedViewId:this.myFriendId,
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
              item.isDone =false
            }
          })
          console.log(this.items)
          let data = {
            action: 'markAsNotDone',
            message:{
              text:`${this.userDetails.userName} marked item as incompleted`,
              concernId:this.myFriendId
            },
            changedViewId:this.myFriendId,
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
              text:`${this.userDetails.userName} deleted a subitem`,
              concernId:this.myFriendId
            },
            changedViewId:this.myFriendId,
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
              text:`${this.userDetails.userName} deleted ab item`,
              concernId:this.myFriendId
            },
            changedViewId:this.myFriendId,
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
          let data = {
            //here userId is the id of the person who changed it
            action: 'delete',
            message:{
              text:`${this.userDetails.userName} deleted todo`,
              concernId:this.myFriendId
            },
            changedViewId:this.myFriendId,
            listId: apiResponse.data.listId,
            listName: apiResponse.data.listName
          }
          this.socketService.notifyUpdates(data)
        }
      }, (err) => {
        console.log(err);
      })
  }

  updateSelectedItem(item) {
    this.itemChosen = item;
  }

  funcItem() {

    if (this.isEmpty(this.value)) {
      console.log('enter a value in the input');

    } else {
      console.log(this.itemFunChoice);
      // console.log(this.value);
      // console.log(this.itemChosen)
      if (this.itemFunChoice === 'edit') {
        this.todoService.editItem({ itemId: this.itemChosen, rename: this.value })
          .subscribe((apiResponse) => {
            this.items.forEach(item => {
              if (item.itemId === this.itemChosen) {
                item.itemName = this.value
              }
            })
            // console.log(apiResponse.data)
            // console.log(this.items)
            let data = {
              action: 'editItem',
              message:{
                text:`${this.userDetails.userName} edited a todo`,
                concernId:this.myFriendId
              },
              changedViewId:this.myFriendId,
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
                text:`${this.userDetails.userName} added a sub item`,
                concernId:this.myFriendId
              },
              changedViewId:this.myFriendId,
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
    // console.log(this.addItem)
    // console.log(e.listId)
    // console.log(i)
    if (this.isEmpty(this.addItem[i])) {
      console.log(this.addItem[i])
    } else {
      // console.log(this.items)
      this.todoService.addItem({ itemName: this.addItem[i], parentId: e.listId })
        .subscribe((apiResponse) => {
          this.items.splice(0, 0, { itemName: this.addItem[i], itemId: apiResponse.data, parentId: e.listId })
          // console.log(apiResponse.data)
          // console.log(this.items)
          let data = {
            //here userId is the id of the person who changed it
            action: 'addItem',
            changedViewId:this.myFriendId,
            message:{
              text:`${this.userDetails.userName} added an item`,
              concernId:this.myFriendId
            },
            listId: e.listId,
            itemId: apiResponse.data,
            itemName: this.addItem[i],
            index: i
          }
          console.log(data)
          this.socketService.notifyUpdates(data)
          this.addItem[i] = '';
        }, (err) => {
          console.log(err.error);
          this.toastr.error(`${err.error.status}`, 'error');
        })

    }
  }
  ngOnInit() {
    // console.log(this.activatedRouter.snapshot.params.userId)
    this.authToken = Cookie.get('authToken');
    this.checkStatus();
    this.myFriendId = this.activatedRouter.snapshot.params.userId
    this.getUserInfo()
    // this.addFriendsArray()
    this.loadTodos()
    this.loadItems()
    this.loadSubItems()
    this.getUpdatesFromUser()
    this.isloading = false;
  }
  /* addFriendsArray() {
    for (let friend of this.userDetails.friends) {
      this.userIds.push(friend.userId)
    }
  } */
  checkStatus(){
    if(!this.authToken){
      this.router.navigate(['/'])
    }
  }
  getUserInfo() {
    this.userDetails = this.appService.getUserInfoFromLocalStorage()
    console.log(this.userDetails)
  }
  loadTodos() {

    this.todoService.getList(false, this.myFriendId)
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
  createTodo() {
    // console.log(this.todoTitle);
    if (this.isEmpty(this.todoTitle)) {
      this.toastr.warning('you need a title :)');
    } else {
      this.todoService.createPublicTodo(this.todoTitle, this.myFriendId)
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
              this.userIds.push(friend.userId)
            } */
            // console.log(userIds)
            let data = {
              //here userId is the id of the person who changed it
              changedViewId:this.myFriendId,
              action: 'add',
              message:{
                text:`${this.userDetails.userName} created a todo`,
                concernId:this.myFriendId
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
  /*  public getUpdatesFromUser = () => {
       console.log(this.myFriendId,'listening')
         this.socketService.getUpdatesFromUser(this.myFriendId).subscribe((data) => {
           //getting message from user.
           console.log(data)
           if(data.listId){
             this.todos.splice(0, 0, {
               listName: data.listName,
               listId: data.listId,
             });
           }
       
             
         });
       
     } */
  public getUpdatesFromUser = () => {
    console.log(this.userDetails.userId, 'listening')

    this.socketService.getUpdatesFromUser().subscribe((data) => {
        // console.log('message is for me')
        if(data.changedViewId === this.myFriendId){

          if (data.action == 'add') {
            this.todos.splice(0, 0, {
              listName: data.listName,
              listId: data.listId,
              isPrivate: false,
              createdOn: Date.now(),
            });
            console.log(data);
            this.toastr.info(`new todo added`, 'update');
          } else if (data.action == 'delete') {
            this.todos.splice(data.index, 1);
            this.toastr.info(`todo deleted!!`, 'update');
          } else if (data.action == 'addItem') {
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
            this.subItems.splice(0, 0, { itemName:data.itemName, itemId:data.itemId, parentId:data.parentId });
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
