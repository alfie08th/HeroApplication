import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {CustomheroComponent} from "./customhero/customhero.component";
import {HeroComponent} from "./hero/hero.component";

const routes: Routes = [
  {path: 'home', component: HeroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'custom-hero', component: CustomheroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
