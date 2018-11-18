import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SingleComponent } from './single/single.component';
import { MultiComponent } from './multi/multi.component';
import { NavbarComponent } from './navbar/navbar.component';
//material
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule, MatIconModule } from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import {MatInputModule} from '@angular/material/input';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { SharedModule } from '../shared/shared.module';
import { FriendsComponent } from './friends/friends.component';
import { NotificationComponent } from './notification/notification.component';
import { FriendsPublicComponent } from './friends-public/friends-public.component';




@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    SharedModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    // FontAwesomeModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule.forChild([
      {path:'select',component:SelectComponent},
      {path:'single',component:SingleComponent},
      {path:'multi',component:MultiComponent},
      {path:'friends',component:FriendsComponent},
      {path:'notification',component:NotificationComponent},
      {path:'friendsPublic/:userId',component:FriendsPublicComponent}
    ]),
    LayoutModule,
    MatIconModule
  ],
  declarations: [SelectComponent, SingleComponent, MultiComponent, NavbarComponent, FriendsComponent, NotificationComponent, FriendsPublicComponent]
})
export class TodoModule { }
