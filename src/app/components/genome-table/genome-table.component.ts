import { Component, OnInit } from '@angular/core';
import { GenomeService } from 'src/app/services/genome.service';
import { Genome } from 'src/app/models/genome';

@Component({
  selector: 'app-genome-table',
  templateUrl: './genome-table.component.html',
  styleUrls: ['./genome-table.component.css']
})
export class GenomeTableComponent implements OnInit {

  genomes: Genome[] = [];
  searchText = '';
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  loading = false;
  selectedFilter = '';
  currentSort = { column: 'CHROM', order: 'ASC' };  // Estado de ordenación por defecto

  constructor(private genomeService: GenomeService) { }

  ngOnInit(): void {
    this.loadGenomes();
  }

  loadGenomes() {
    this.loading = true;
    this.genomeService.getGenomes(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.genomes = data.map((item: any) => new Genome(item));
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar los genomas', error);
        this.loading = false;
      }
    });
  }

  changePage(newPage: number) {
    if (newPage > 0) {
      this.currentPage = newPage;
      this.loadGenomes();
    }
  }

  changePageSize(event: Event) {
    const target = event.target as HTMLSelectElement | null;  // Asegúrate de que target no sea null
    if (target) {
      const valor = target.value;
      const size = parseInt(valor, 10);
      if (!isNaN(size)) {
        this.pageSize = size;
        this.currentPage = 1;
        this.loadGenomes();
      }
    }
  }
  
  
  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  search() {
    this.loading = true;
    const filters = {
      filter: this.selectedFilter,
      search: this.searchText
    };
    console.log(filters);

    this.genomeService.searchGenomes(filters).subscribe({
      next: (data) => {
        this.genomes = data.map((item: any) => new Genome(item));
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al buscar los genomas', error);
        this.loading = false;
      }
    });
  }

  // Función para manejar la ordenación por columna
  sort(column: string) {
    // Si ya estamos ordenando por esta columna, alternamos el orden
    if (this.currentSort.column === column) {
      this.currentSort.order = this.currentSort.order === 'ASC' ? 'DESC' : 'ASC';
    } else {
      // Si cambiamos de columna, comenzamos con orden ascendente
      this.currentSort.column = column;
      this.currentSort.order = 'ASC';
    }
    this.loading = true;
    
    // Llamada al servicio para obtener los datos ordenados
    this.genomeService.sortGenomes(this.currentSort.column, this.currentSort.order).subscribe({
      next: (data) => {
        this.genomes = data.map((item: any) => new Genome(item));
        this.loading = false;
        console.log('Genomas ordenados', data);
      },
      error: (error) => {
        console.error('Error al ordenar los genomas', error);
        this.loading = false;
      }
    });
  }
}
