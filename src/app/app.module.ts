import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';  // Asegúrate de que esto esté importado

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { GnomeTableComponent } from './components/gnome-table/gnome-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    GnomeTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'gnomes', component: GnomeTableComponent }
    ]) 
  ],
  providers: [
    provideHttpClient()  // Este es el método correcto para Angular 19
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
