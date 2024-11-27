import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenomeTableComponent } from './components/genome-table/genome-table.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/genome-table', pathMatch: 'full'
  },
  { path: 'genome-table', component: GenomeTableComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
