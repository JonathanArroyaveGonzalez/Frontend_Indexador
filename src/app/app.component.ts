import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Indexer_crudComponent } from "./components/indexer_crud/indexer_crud.component";
import { GnomeTableComponent } from './components/gnome-table/gnome-table.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HomeComponent, Indexer_crudComponent, GnomeTableComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Gnoma-Frontend';
}
