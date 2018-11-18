import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { TodoService } from 'src/app/todo.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(public appservice:AppService,
    public router:Router,
    public todoservice:TodoService
    ) { }
    userDetails
  authToken
  messages
  ngOnInit() {
    this.authToken = Cookie.get('authToken');
    this.checkStatus();
    this.getUserInfo();
    this.loadNotifications()
  }
  checkStatus(){
    if(!(this.authToken)){
      this.router.navigate(['/'])
    }
  }
  getUserInfo() {
    this.userDetails = this.appservice.getUserInfoFromLocalStorage()
    console.log(this.userDetails)
  }
  loadNotifications(){
    this.todoservice.loadNotifications(this.userDetails.userId)
    .subscribe((apiResponse)=>{
      console.log(apiResponse)
      this.messages = apiResponse.data
    })
  }

}
