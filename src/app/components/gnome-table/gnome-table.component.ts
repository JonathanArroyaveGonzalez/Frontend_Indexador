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
  outputKeys: string[] = [];  // Propiedad para almacenar las claves de OUTPUTS

  constructor(private gnomeService: GnomeService) {}

  ngOnInit() {
    this.loadGnomes();
  }

  loadGnomes() {
    this.gnomeService.getGnomes().subscribe({
      next: (data) => {
        this.gnomes = data.map((item: any) => transformData(item));
        this.filteredGnomes = [...this.gnomes];
        console.log('Genomas cargados', this.gnomes);

        // Si hay al menos un elemento en la lista, obtenemos las claves de OUTPUTS
        if (this.gnomes.length > 0) {
          this.outputKeys = Object.keys(this.gnomes[0].OUTPUTS);
        }
      },
      error: (err) => {
        console.error('Error al cargar genomas', err);
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

    // Reiniciar la página al filtrar
    this.pagination.page = 1;
  }

  get paginatedGnomes(): Gnome[] {
    const start = (this.pagination.page - 1) * this.pagination.pageSize;
    const end = start + this.pagination.pageSize;
    return this.filteredGnomes.slice(start, end);
  }

  nextPage() {
    if ((this.pagination.page * this.pagination.pageSize) < this.filteredGnomes.length) {
      this.pagination.page++;
    }
  }

  previousPage() {
    if (this.pagination.page > 1) {
      this.pagination.page--;
    }
  }
}

function transformData(data: any): Gnome {
  const { _id, CHROM, POS, ID, REF, ALT, QUAL, FILTER, INFO, ...outputs } = data;

  // Crear el objeto OUTPUTS a partir de las claves output_CH
  const OUTPUTS: { [key: `output_CH${number}`]: string } = {};

  Object.keys(outputs).forEach(key => {
    if (key.startsWith('output_CH')) {
      // Aquí le decimos a TypeScript que `key` es de un tipo específico que está dentro de OUTPUTS
      OUTPUTS[key as `output_CH${number}`] = outputs[key];
    }
  });
  // Devolver el objeto Gnome con la estructura adecuada
  return {
    _id,
    CHROM,
    POS,
    ID,
    REF,
    ALT,
    QUAL,
    FILTER,
    INFO,
    OUTPUTS
  };
}