import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cookie } from 'ng2-cookies/ng2-cookies';

let authToken;
    
const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Authorization': `${authToken}`,
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // private baseUrl = "http://localhost:3000/api/v1/todo";
  private baseUrl = "http://api.todorealtime.tk/api/v1/todo";

  constructor(public http: HttpClient) { 
    authToken = Cookie.get('authToken');
  }
  //get list
  public getList (isPrivate,creatorId): Observable<any> {
    return this.http.get(`${this.baseUrl}/${isPrivate}/${creatorId}/getList?authToken=${authToken}`)
  }
  //get items
  public getItem (id): Observable<any> {
    return this.http.get(`${this.baseUrl}/getItem/${id}?authToken=${authToken}`)
  }
  //get all items
  public getAllItem (): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllItem?authToken=${authToken}`)
  }
  //get all sub items
  public getAllSubItem (): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllSubItem?authToken=${authToken}`)
  }
  //add items
  public addItem (data): Observable<any> {
    const params = new HttpParams()
                    .set('itemName',data.itemName)
                    .set('listId',data.parentId)
    return this.http.post(`${this.baseUrl}/addItem?authToken=${authToken}`,params)
  }
  //addSubItem
  public addSubItem (data): Observable<any> {
    const params = new HttpParams()
                    .set('itemName',data.itemName)
                    .set('itemId',data.itemId)
    return this.http.post(`${this.baseUrl}/addSubItem?authToken=${authToken}`,params)
  }
  //create Todo
  public createTodo(title): Observable<any> {
    const params = new HttpParams()
                    .set('listName',title)
                    .set('isPrivate','true')
    return this.http.post(`${this.baseUrl}/create?authToken=${authToken}`,params)
  }
  //create public Todo
  public createPublicTodo(title,creatorId): Observable<any> {
    const params = new HttpParams()
                    .set('listName',title)
                    .set('isPrivate','false')
                    .set('creatorId',creatorId)
    return this.http.post(`${this.baseUrl}/createPublic?authToken=${authToken}`,params)
  }
  //delete Todo
  public deleteTodo(listId): Observable<any> {
    const params = new HttpParams()
                    .set('listId',listId)
    return this.http.post(`${this.baseUrl}/delete?authToken=${authToken}`,params)
  }
  //delete item
  public deleteItem(itemId): Observable<any> {
    const params = new HttpParams()
                    .set('itemId',itemId)
    return this.http.post(`${this.baseUrl}/deleteItem?authToken=${authToken}`,params)
  }
//delete sub item
  public deleteSubItem(subItemId): Observable<any> {
    const params = new HttpParams()
                    .set('subItemId',subItemId)
    return this.http.post(`${this.baseUrl}/deleteSubItem?authToken=${authToken}`,params)
  }
//edit item
  public editItem(data): Observable<any> {
    const params = new HttpParams()
                    .set('itemId',data.itemId)
                    .set('rename',data.rename)
    return this.http.post(`${this.baseUrl}/editItem?authToken=${authToken}`,params)
  }
//mark it as done
  public markDone(data): Observable<any> {
    const params = new HttpParams()
                    .set('itemId',data.itemId)
                    .set('mark',data.isDone)
    return this.http.post(`${this.baseUrl}/markItem?authToken=${authToken}`,params)
  }
  //load notifications
  public loadNotifications(concernId): Observable<any> {
    
    return this.http.get(`${this.baseUrl}/${concernId}/notification?authToken=${authToken}`);
  }
}
