import { HomeComponent } from './components/home/home.component';
import { InspirationHomeComponent } from './inspiration-home/inspiration-home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'campaign/:id', component: InspirationHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
