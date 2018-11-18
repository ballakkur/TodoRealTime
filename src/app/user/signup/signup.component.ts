import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {  Router } from '@angular/router';

import {AppService } from '../../app.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide1 = true;
  hide = true;
  forms;
  codes = ["+91","+1","+92","880", "32","226","359","387","+1-246","68", "218", "354","374","355", "244",, "+1-684",  "54","61",  "43","297", "91","+358-18", "994", "353","62", "380","974","258"];
  
  constructor(public appservice:AppService,
    public router: Router,
    fb:FormBuilder,
    private toastr: ToastrService) {
   this.forms =  fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      countrycode:['',Validators.required],
      mobile:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmpassword:['',[Validators.required,Validators.minLength(6)]],
    }
    )
  
  }
  goToSignIn = ()=>{
    this.router.navigate(['/']);
  }
 
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.forms.value);
    if(this.forms.value.password.localeCompare(this.forms.value.confirmpassword)){
      this.toastr.error('please re-enter password', 'mismatch');
      this.forms.patchValue({password:'',confirmpassword:''})
    }else{
      this.appservice.signup(this.forms.value)
      .subscribe((apiResponse)=>{
        if(apiResponse.status === 200){

          this.toastr.success('you have successfully signedup', 'welcome');
          setTimeout(() => {
            this.goToSignIn();
          }, 2000);//redirecting to signIn page

        }
        else{
          this.toastr.error(`${apiResponse.message}`,`${apiResponse.status}`)
        }

      },
      
      (error) => {
        console.log(error.error)
        this.toastr.error(`${error.error.message}`, "Error!");
      }
      )
    }
  }

  ngOnInit() {
    
  }

}
