import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {CustomheroComponent} from "./customhero/customhero.component";
import {HeroComponent} from "./hero/hero.component";
import {InflationComponent} from "./inflation/inflation.component";

const routes: Routes = [
  {path: 'home', component: HeroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'hero', component: HeroComponent},
  {path: 'custom-hero', component: CustomheroComponent},
  {path: 'inflation', component: InflationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
