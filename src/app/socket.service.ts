import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  // private url = 'http://localhost:3000'
  private url = 'http://api.todorealtime.tk'
  private socket;
  constructor() {
    this.socket = io(this.url,{forceNew: true});
}
public verifyUser = () => {
  return Observable.create((observer) => {
    this.socket.on('verifyUser', (data) => {
      observer.next(data);
    });
  });
}

public onlineUserList = () => {
  return Observable.create((observer) => {
    this.socket.on('online-user-list', (userList) => {
      observer.next(userList);
    });
  });

}

public disconnect = () => {
  return Observable.create((observer) => {
    this.socket.on('disconnect', () => {
      observer.next();
    });
  });

}

public listenAuthError = () => {
  return Observable.create((observer) => {
    this.socket.on('auth-error', (data) => {
      observer.next(data);
    }); 
  }); 
} 
  
public getUpdatesFromUser = () => {
  return Observable.create((observer) => {
    this.socket.on('noti', (data) => {
      // console.log(userId)

      observer.next(data);
    });
  }); 
} 
public listenToFriendRequest = () => {
  return Observable.create((observer) => {
    this.socket.on('friendRequest', (data) => {
      // console.log(userId)

      observer.next(data);
    });
  }); 
} 


//* Events that are emitted *//


public setUser = (authToken) => {
this.socket.emit('set-user', authToken);
}


public notifyUpdates = (data) => {
this.socket.emit('notify-updates', data);
}

public notifyUpdatesItem = (data) => {
this.socket.emit('notify-updates-item', data);
}

public friendNotification  = (notidata)=>{
  this.socket.emit('friend-notification',notidata);
}
public exitSocket = () =>{
this.socket.disconnect();
}

public disconnectedSocket = () => {

  this.socket.emit("disconnect", "");

}
}
