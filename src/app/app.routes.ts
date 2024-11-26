import { Routes } from '@angular/router';
import { Indexer_crudComponent } from "./components/indexer_crud/indexer_crud.component";
import { HomeComponent} from "./components/home/home.component";
import { GnomeTableComponent } from './components/gnome-table/gnome-table.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'indexer', component: Indexer_crudComponent},
    {path: 'home', component: HomeComponent},
    {
        path: 'gnomes', component: GnomeTableComponent
    }
];
