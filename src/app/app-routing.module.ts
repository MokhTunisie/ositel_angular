import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TransactionsComponent} from './transactions/transactions.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'ecran2', component: TransactionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
