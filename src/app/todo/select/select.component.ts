import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';




@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  constructor(public route:Router,
  private appservice:AppService)
  { }
  username:string

  ngOnInit() {
    if(Cookie.get('authToken')){
      let x = this.appservice.getUserInfoFromLocalStorage()
      this.username = x.firstName
    }else{
      this.route.navigate(['/login'])

    }
  }

}
