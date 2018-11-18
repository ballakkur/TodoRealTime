import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import {MatIconModule,MatFormFieldModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule,} from '@angular/material/button';
import { RouterModule } from '@angular/router';

//toastr
import { ToastrModule } from 'ngx-toastr';

import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild([
      {path:'signup',component:SignupComponent},
      {path:'forgot',component:ForgotPasswordComponent},
      {path:'resetPassword/:resetToken/:email',component:ResetPasswordComponent},
    ])
  ],
  declarations: [SignupComponent, LoginComponent, ForgotPasswordComponent, ResetPasswordComponent]
})
export class UserModule { }
