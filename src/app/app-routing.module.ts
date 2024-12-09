import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenomeTableComponent } from './components/genome-table/genome-table.component';
import { LoginComponent } from './components/login/login.component';
const routes: Routes = [
  {
    path: '',      redirectTo: '/login', pathMatch: 'full'},
  { path: 'genome-table', component: GenomeTableComponent },
  { path: 'login'       , component: LoginComponent       }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
