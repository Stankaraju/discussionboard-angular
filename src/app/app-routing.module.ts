import { RoutePermission } from './permissions/RoutePermission';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent }    from './components/edit/edit.component';
import { ViewComponent }    from './components/view/view.component';
import { CreateComponent }  from './components/create/create.component';
import { TopicComponent }   from './components/topic/topic.component';
import { LoginComponent }   from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UrlPermission } from './permissions/Urlpermissions';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent,canActivate:[RoutePermission]},
  {path: 'create/:id', component: CreateComponent,canActivate:[UrlPermission], data:{depth:1}},
  {path: 'view', component: ViewComponent,canActivate:[UrlPermission],data:{depth:2}},
  {path: 'topic/:id',component: TopicComponent,canActivate:[UrlPermission],data:{depth:3 }},
  {path: 'edit/:id', component: EditComponent,canActivate:[UrlPermission],data:{depth:4}},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];
@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes)],
  declarations: []
})
export class AppRoutingModule { }
