import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';


import { TodoService } from 'src/app/todo.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})

export class SingleComponent implements OnInit {
  authToken
  constructor(public todoService: TodoService,
    public toastr: ToastrService,
    public appService:AppService,
    public router:Router
    ) { }
    public isloading: boolean = true;
    userDetails
    isActive
    todoTitle = ''
    itemChosen = ''
    value = ''
    itemFunChoice: string;
    choices: string[] = ['add subtodoitem', 'edit'];

    trim = (x)=>{
      let value = String(x);
      return value.replace(/^\s+|\s+$/gm,'');
  }

 isEmpty = (value)=>{
    if(value === null || value === undefined || this.trim(value) === '' || value.length === 0){
        return true;
    }else{
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
markAsDone(itemId,index,isdone,event){
  event.stopPropagation();
  /* console.log(itemId);
  console.log(index); */

  if(isdone === true){
    console.log(isdone)
    this.todoService.markDone({itemId:itemId,isDone:false})
     .subscribe((apiResponse)=>{
        this.items.forEach(item=>{
          if(item.itemId === itemId){
            item.isDone = false
          }
        })
          console.log(apiResponse.data)
          console.log(this.items) 
        },(err)=>{
          console.log(err.error);
          this.toastr.error(`${err.error.status}`,'error');
        })
  }else{
    console.log(isdone)

    this.todoService.markDone({itemId:itemId,isDone:true})
    .subscribe((apiResponse)=>{
       this.items.forEach(item=>{
         if(item.itemId === itemId){
           item.isDone = true
         }
       })
         console.log(this.items) 
       },(err)=>{
         console.log(err.error);
         this.toastr.error(`${err.error.status}`,'error');
       })
  }

}
deleteSubItem(subItemId,index,event){
  event.stopPropagation();
  console.log(subItemId)
  console.log(index)
  this.todoService.deleteSubItem(subItemId)
  .subscribe((apiResponse)=>{
    if(apiResponse.status ===200){
      this.subItems.splice(index,1);
      this.toastr.success('sub item deleted :))','Done!');
    }
  },(err)=>{
    console.log(err);
  })
}
deleteItem(itemId,index,event){
  event.stopPropagation();
  console.log(itemId)
  console.log(index)
  this.todoService.deleteItem(itemId)
  .subscribe((apiResponse)=>{
    if(apiResponse.status ===200){
      this.items.splice(index,1);
      this.toastr.success('item deleted :))','Done!');
    }
  },(err)=>{
    console.log(err);
  })

}
deleteTodo(todoId,index){
  console.log(todoId)
  this.todoService.deleteTodo(todoId)
  .subscribe((apiResponse)=>{
    if(apiResponse.status ===200){
      this.todos.splice(index,1);
      this.toastr.success('Todo deleted :))','Done!');
    }
  },(err)=>{
    console.log(err);
  })
}
createTodo(){
  console.log(this.todoTitle);
  if(this.isEmpty(this.todoTitle)){
    this.toastr.warning('you need a title :)');
  }else{
    this.todoService.createTodo(this.todoTitle)
    .subscribe((apiResponse)=>{
      if(apiResponse.status === 200){
        this.todos.splice(0,0,{listName:apiResponse.data.listName,
          listId:apiResponse.data.listId,
          isPrivate:apiResponse.data.isPrivate,
          createdOn:apiResponse.data.createdOn,item:apiResponse.data.item});
        console.log(apiResponse.data);
        this.toastr.success('todo created','Done!');
      }
    },(err)=>{
      console.log(err);
    })

  }
}
updateSelectedItem(item){
  this.itemChosen = item;
}

funcItem(){

if(this.isEmpty(this.value)){
  console.log('enter a value in the input');

}else{
  console.log(this.itemFunChoice);
console.log(this.value);
  console.log(this.itemChosen)
  if(this.itemFunChoice === 'edit'){
    this.todoService.editItem({itemId:this.itemChosen,rename:this.value})
    .subscribe((apiResponse)=>{
      this.items.forEach(item=>{
        if(item.itemId === this.itemChosen){
          item.itemName = this.value
        }
      })
        console.log(apiResponse.data)
        console.log(this.items) 
      },(err)=>{
        console.log(err.error);
        this.toastr.error(`${err.error.status}`,'error');
      })
  
  }else{
    
    this.todoService.addSubItem({itemId:this.itemChosen,itemName:this.value})
    .subscribe((apiResponse)=>{
      this.subItems.splice(0,0,{itemName:this.value,itemId:apiResponse.data,parentId:this.itemChosen});
      console.log(apiResponse.data);
    },
    (err)=>{
      console.log(err)
    })
  }
}
}
onKeyUp(e,i){
  console.log(this.addItem)
  console.log(e.listId)
  console.log(i)
  if(this.isEmpty(this.addItem[i])){
    console.log(this.addItem[i])
  }else{
    // console.log(this.items)
    this.todoService.addItem({itemName:this.addItem[i],parentId:e.listId})
    .subscribe((apiResponse)=>{
    this.items.splice(0,0,{itemName:this.addItem[i],itemId:apiResponse.data,parentId:e.listId})
      console.log(apiResponse.data)
      console.log(this.items)
    this.addItem[i] ='';  
    },(err)=>{
      console.log(err.error);
      this.toastr.error(`${err.error.status}`,'error');
    })

  }
}
  ngOnInit() {
    this.getUserInfo()
    this.authToken = Cookie.get('authToken');
    this.checkStatus();
    this.loadTodos()
    this.loadItems()
    this.loadSubItems()
    this.isloading = false;
  }
  getUserInfo(){
    this.userDetails = this.appService.getUserInfoFromLocalStorage()
  }
  checkStatus(){
    if(this.isEmpty(this.authToken)){
      this.router.navigate(['/'])
    }
  }
  loadTodos() {

    this.todoService.getList(true,this.userDetails.userId)
      .subscribe((apiResponse) => {
        if(apiResponse.status === 200){
          // console.log(apiResponse.data)
          apiResponse.data.forEach(ele => {
            this.todos.splice(0,0,ele)
            // this.todos.push(ele)
          });
        }
      },
        (err) => {
          console.log(err)
        })
  }
  loadItems(){
    this.todoService.getAllItem()
    .subscribe((apiResponse) => {
      if(apiResponse.status === 200){
        // console.log(apiResponse.data)
        apiResponse.data.forEach(ele => {
          this.items.splice(0,0,ele)
          // this.items.push(ele)
          // console.log(ele)
        });
      }
    },
      (err) => {
        console.log(err)
      })
  }
  loadSubItems(){
    this.todoService.getAllSubItem()
    .subscribe((apiResponse) => {
      if(apiResponse.status === 200){
        // console.log(apiResponse.data)
        apiResponse.data.forEach(ele => {
          this.subItems.splice(0,0,ele);
          // this.subItems.push(ele)
          // console.log(ele)
        });
      }
    },
      (err) => {
        console.log(err)
      })
  }

}


