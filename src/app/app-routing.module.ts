
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Indexer_crudComponent } from './components/indexer_crud/indexer_crud.component'; // Añade esta línea para la nueva ruta
const routes: Routes = [
  // ...existing routes...
  { path: 'indexer', component: Indexer_crudComponent }, // Añade esta línea para la nueva ruta
  // ...existing routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }