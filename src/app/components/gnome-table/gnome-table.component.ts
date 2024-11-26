import { Component, OnInit } from '@angular/core';
import { GnomeService } from '../../services/gnome.service';  // Importa el servicio
import { Gnome } from '../../models/gnome';  // Importa el modelo

@Component({
  selector: 'app-gnome-table',
  templateUrl: './gnome-table.component.html',
  styleUrls: ['./gnome-table.component.css']
})
export class GnomeTableComponent implements OnInit {
  gnomes: Gnome[] = [];
  filteredGnomes: Gnome[] = [];
  searchTerm: string = '';
  pagination = { page: 1, pageSize: 10 };

  constructor(private gnomeService: GnomeService) {}

  ngOnInit() {
    this.loadGnomes();
  }

  loadGnomes() {
    this.gnomeService.getGnomes().subscribe({
      next: (data) => {
        this.gnomes = data;
        this.filteredGnomes = [...this.gnomes];
      },
      error: (err) => {
        console.error('Error al cargar genomas', err);
        // Podrías agregar un toast o mensaje de error
      }
    });
  }

  filterGnomes() {
    if (!this.searchTerm) {
      this.filteredGnomes = [...this.gnomes];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredGnomes = this.gnomes.filter(gnome => 
      Object.values(gnome).some(
        value => value && value.toString().toLowerCase().includes(term)
      )
    );
  }
}