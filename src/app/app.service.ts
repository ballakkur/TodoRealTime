import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Cookie } from 'ng2-cookies/ng2-cookies';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  // private baseUrl = "http://localhost:3000/api/v1/users";
  // private friendUrl = "http://localhost:3000/api/v1";

  private baseUrl = "http://api.todorealtime.tk/api/v1/users";
  private friendUrl = "http://api.todorealtime.tk/api/v1";

  constructor(public http: HttpClient) { }

  public setUserInfoInLocalStorage = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }//end of setlocalstorage Function
  public getUserInfoFromLocalStorage: any = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  }//end getlocalstorage function


  public signup(data): Observable<any> {
    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('email', data.email)
      .set('password', data.password)
      .set('countryCode', data.countrycode)
      .set('mobile', data.mobile)
      .set('isadmin', data.checked)
    return this.http.post(`${this.baseUrl}/signup`, params)
  }
  public signin(data): Observable<any> {
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password)
    return this.http.post(`${this.baseUrl}/login`, params)
  }

  public forgotPassword(email): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
    return this.http.post(`${this.baseUrl}/forgotPassword`, params)
  }

  public resetPassword(data): Observable<any> {
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password)
      .set('token', data.resetToken)
    return this.http.post(`${this.baseUrl}/newPass`, params)
  }

  public getAllUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllUser?authToken=${Cookie.get('authToken')}`);
  }
  //logout
  public logout(): Observable<any> {

    const params = new HttpParams()
      .set('authToken', Cookie.get('authToken'));
    return this.http.post(`${this.baseUrl}/logout`, params);
  }
  //load friend requests
  public friendRequestReceived(authToken):Observable<any> {

    return this.http.get(`${this.friendUrl}/friends/view/friend/request/received?authToken=${authToken}`);
  }

  //send request
  public sendFriendRequest(data): Observable<any> {

    const params = new HttpParams()
      .set('senderId', data.senderId)
      .set('recipientId', data.recipientId)
      .set('authToken', data.authToken)


    return this.http.post(`${this.friendUrl}/friends/send/friend/request`, params);
  }
  //reject him
  public rejectFriendRequest(data): Observable<any> {

    const params = new HttpParams()
      .set('senderId', data.senderId)
      .set('recipientId', data.recipientId)
      .set('authToken', data.authToken)


    return this.http.post(`${this.friendUrl}/friends/reject/friend/request`, params);
  }

  public acceptFriendRequest(data): Observable<any> {

    const params = new HttpParams()
      .set('senderId', data.senderId)
      .set('recipientId', data.recipientId)
      .set('authToken', data.authToken)


    return this.http.post(`${this.friendUrl}/friends/accept/friend/request`, params);
  }//end sendFriendRequest

  public unfriendUser(data): Observable<any> {

    const params = new HttpParams()
      .set('senderId', data.senderId)
      .set('recipientId', data.recipientId)
      .set('authToken', data.authToken)


    return this.http.post(`${this.friendUrl}/friends/remove/Friend/user`, params);
  }//end sendFriendRequest
}
