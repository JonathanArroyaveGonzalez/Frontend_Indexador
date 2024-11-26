
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Indexer_crudComponent } from './components/indexer_crud/indexer_crud.component'; // Añade esta línea para la nueva ruta
import { HomeComponent } from './components/home/home.component'; // Añade esta línea para la nueva ruta
import { GnomeTableComponent } from './components/gnome-table/gnome-table.component';
const routes: Routes = [
  // ...existing routes...
  { path: 'indexer', component: Indexer_crudComponent }, // Añade esta línea para la nueva ruta
  { path: 'home', component: HomeComponent }, // Añade esta línea para la nueva ruta
  { path: 'gnomes', component: GnomeTableComponent }
  // ...existing routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }