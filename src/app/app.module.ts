import { RoutePermission } from './permissions/RoutePermission';
import { SortByPipe } from './pipe/sort-by';
import { FilterPipe } from './pipe/filter';
import { FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UrlPermission } from './permissions/Urlpermissions';
import { UserService } from './services/user.service';
import { CommentService } from './services/comment.service';
import { CreateService } from './services/create.service';
import { BrowserModule, } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule} from '@angular/Forms';
import { AppComponent } from './app.component';
import { ViewComponent } from './components/view/view.component';
import { CreateComponent } from './components/create/create.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewService } from './services/view.service';
import { AppRoutingModule } from './/app-routing.module';
import { TopicComponent } from './components/topic/topic.component';
import { TopicService } from './services/topic.service';
import { EditComponent } from './components/edit/edit.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { Base64UploadComponent } from './components/base64-upload/base64-upload.component';
import { FileUploadServiceService } from './services/file-upload-service.service';
import { HomeComponent } from './components/home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SortBy } from './pipe/createTopic';

import { PaginationModule } from 'ngx-pagination-bootstrap';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    CreateComponent,
    NavbarComponent,
    TopicComponent,
    EditComponent,
    LoginComponent,
    RegisterComponent,
    SortByPipe,
    FilterPipe,
    SortBy,
    Base64UploadComponent,
    HomeComponent,
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    NgxPaginationModule,
    PaginationModule
    
    
   
  
  ],
  providers: [CreateService,
              ViewService,
              TopicService,
              CommentService,
              AuthService,
              UserService,
              UrlPermission,
              RoutePermission,
              FormBuilder,
              FileUploadServiceService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
