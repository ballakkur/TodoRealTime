import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from 'src/app/socket.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  users: []
  reqs:[any]
  myDetail
  authToken
  constructor(public appservice: AppService,
    public toastr: ToastrService,
    public router: Router,
    public socketService: SocketService) { }

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

  reject(senderId, i) {
    let data = {
      recipientId: this.myDetail.userId,
      senderId: senderId,
      authToken: this.authToken
    }
    // console.log(data)
    this.appservice.rejectFriendRequest(data)
      .subscribe((apiResponse) => {
        console.log(apiResponse.data)
        if (apiResponse.status === 200) {
          this.toastr.success('friend request rejected');
          this.reqs.splice(i, 1)
          console.log(this.reqs)
          let notiData = {
            notireceiver:senderId,
            action:'reject'
          }
          this.socketService.friendNotification(notiData)
        }
      }, (err) => {
        console.log(err.error);
        this.toastr.error('could reject request');
      })
  }
  //remove friend
  removeFriend(userId, index) {
    console.log(userId);
    let data = {
      recipientId: this.myDetail.userId,
      senderId: userId,
      authToken: this.authToken
    }
    this.appservice.unfriendUser(data)
      .subscribe((apiResponse) => {
        console.log(apiResponse.data)
        if (apiResponse.status === 200) {
          this.toastr.success('we are no longer friends \'((');
          this.myDetail.friends.splice(index, 1)
          this.appservice.setUserInfoInLocalStorage(this.myDetail);
          let notiData = {
            notireceiver:userId,
            notisender:this.myDetail.userId,
            action:'remove'
          }
          this.socketService.friendNotification(notiData)
        }
      }, (err) => {
        console.log(err.error);
        this.toastr.error('could accept request');
      })
  }
  accept(senderId, index) {
    let data = {
      recipientId: this.myDetail.userId,
      senderId: senderId,
      authToken: this.authToken
    }
    this.appservice.acceptFriendRequest(data)
      .subscribe((apiResponse) => {
        console.log(apiResponse.data)
        if (apiResponse.status === 200) {
          this.toastr.success('friend request accepted');
          this.myDetail.friends.splice(0, 0, { userId: senderId, senderName: '' })
          this.appservice.setUserInfoInLocalStorage(this.myDetail)
          this.reqs.splice(index, 1)
          let notiData = {
            notireceiver:senderId,
            notisender:this.myDetail.userId,
            action:'accept'
          }
          this.socketService.friendNotification(notiData)
        }
      }, (err) => {
        console.log(err.error);
        this.toastr.error('could accept request');
      })
  }

  ngOnInit() {
    this.authToken = Cookie.get('authToken');
    this.checkStatus();
    this.loadFriendRequest();
    this.loadUsers();
    this.listenToFriendNotification()
  }
  checkStatus() {
    if (!this.authToken) {
      this.router.navigate(['/'])
    }
  }
  loadUsers() {
    this.myDetail = this.appservice.getUserInfoFromLocalStorage()
    console.log(this.myDetail)
    this.appservice.getAllUser()
      .subscribe((apiResponse) => {
        this.users = apiResponse.data;
        console.log(this.users)
      }, (err) => {
        console.log(err.error);
        this.toastr.error('could fetch user list')
      })
  }
  loadFriendRequest() {
    this.appservice.friendRequestReceived(this.authToken)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 404) {
          this.toastr.info(apiResponse.message);
        } else {
          // console.log(apiResponse.data)
          if(!this.isEmpty(apiResponse.data)){
            this.reqs = apiResponse.data
            console.log(this.reqs)
            this.toastr.info(apiResponse.message);
          }else{
            console.log(apiResponse.data)
          }
        }
      }, (err) => {
        console.log(err.error);
        this.toastr.error('could fetch requests')
      })
  }
  //send request
  sendRequest(recipientId) {
    let data = {
      senderId: this.myDetail.userId,
      recipientId: recipientId,
      authToken: this.authToken
    }
    this.appservice.sendFriendRequest(data)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200 && apiResponse.message === 'Friend Request sent') {
          this.toastr.success(`${apiResponse.message}`, 'success');
          let notiData = {
            notireceiver:recipientId,
            action:'request',
            notiSender: this.myDetail.userId
          }
          this.socketService.friendNotification(notiData)
          console.log(this.reqs)
        } else {
          this.toastr.warning(`${apiResponse.message}`);
        }
      }, (err) => {
        console.log(err.error);
        this.toastr.error('could not send request');
      })
  }
  gotoView(userId) {
    console.log(this.myDetail.friends)
    this.myDetail.friends.forEach(element => {

      if (element.userId === userId) {
        console.log('goto that friends public page')
        this.router.navigate([`/friendsPublic/${userId}`])
      }
    });
  }

  listenToFriendNotification(){
    this.socketService.listenToFriendRequest()
    .subscribe((data) => {
      if(data.notireceiver === this.myDetail.userId){

        if(data.action == 'request'){
          console.log(data);
          console.log(this.reqs);
          console.log(typeof(this.reqs))
          this.reqs.splice(0,0,{recipientId:data.notireceiver,requestStatus: "requested",senderId:data.notiSender});
          this.toastr.info('you received a friends request','Request');

        }else if(data.action == 'reject'){
          this.toastr.info('request rejected :((', 'update');

        }else if(data.action == 'accept'){
          this.myDetail.friends.splice(0, 0, { userId: data.notisender, senderName: '' })
          console.log(this.myDetail.friends)
          this.appservice.setUserInfoInLocalStorage(this.myDetail)
          this.toastr.info('friend Request accepted :))','update');

        }else if(data.action == 'remove'){
          //find the index of the person who removed me as his friend and remove him from my friend list
          let index = this.myDetail.friends.findIndex(friend => friend.userId == data.notisender);
          console.log(index);
          this.myDetail.friends.splice(index,1)
          console.log(this.myDetail.friends)
          this.appservice.setUserInfoInLocalStorage(this.myDetail)
          this.toastr.info('you were removed as friend.','update');
        }
      }
    })
  }
}
