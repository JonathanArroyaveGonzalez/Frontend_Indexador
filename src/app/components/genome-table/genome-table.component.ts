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
  selectedFilter = '';  // Default filter
  currentSort = { column: '', order: 'ASC' };  // Default sort
  searchTime = 0;  // Variable para almacenar el tiempo de búsqueda
  
  // New property to track the current search state
  currentSearchParams: { filter: string, search: string } | null = null;

  constructor(private genomeService: GenomeService) { }

  ngOnInit(): void {
    this.loadGenomes();
    
  }

  ngOnDestroy(): void {
    this.clearData();
  }

  loadGenomes() {
    this.loading = true;
    // Check if there's an active search
    if (this.currentSearchParams) {
      this.performSearch(this.currentSearchParams);
    } else {
      // Regular load of genomes
      this.genomeService.getGenomes(this.currentPage, this.pageSize).subscribe({
        next: (data) => {
          this.genomes = data["data"].map((item: any) => new Genome(item));
          this.searchTime = data["process_time"];
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al cargar los genomas', error);
          this.loading = false;
        }
      });
    }
  }

  changePage(newPage: number) {
    if (newPage > 0) {
      this.currentPage = newPage;
      this.loadGenomes();
    }
  }

  changePageSize() {
    this.currentPage = 1;  // Reset to first page
    this.loadGenomes();
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
    
    // Store the current search parameters
    this.currentSearchParams = filters;
    this.currentPage = 1;  // Reset to first page
    
    this.performSearch(filters);
  }

  private performSearch(filters: { filter: string, search: string }) {
    this.genomeService.searchGenomes({
      ...filters,
      page: this.currentPage,
      page_size: this.pageSize
    }).subscribe({
      next: (data) => {
        this.genomes = data["data"].map((item: any) => new Genome(item));
        this.searchTime = data["process_time"];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al buscar los genomas', error);
        this.loading = false;
      }
    });
  }

  // Función para manejar la ordenación por columna solo de los resultados que hay actualmente en pantalla
  sort(column: string) {
    // If already sorting by this column, toggle order
    if (this.currentSort.column === column) {
      this.currentSort.order = this.currentSort.order === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.currentSort.column = column;
      this.currentSort.order = 'ASC';
    }

    // Sort the genomes array
    this.genomes.sort((a, b) => {
      let valueA = a[column];
      let valueB = b[column];

      // Check if the column is within the outputs object
      if (column.startsWith('output_')) {
        valueA = a.outputs[column];
        valueB = b.outputs[column];
      }

      // Convert to numbers if the column is 'QUAL' or 'POS'
      if (column === 'QUAL' || column === 'POS') {
        valueA = parseFloat(valueA);
        valueB = parseFloat(valueB);
      }

      if (valueA < valueB) {
        return this.currentSort.order === 'ASC' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.currentSort.order === 'ASC' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  clearData(): void {
    this.genomes = [];
    this.searchText = '';
    this.currentPage = 1;
    this.pageSize = 10;
    this.totalItems = 0;
    this.loading = false;
    this.selectedFilter = '';
    this.currentSort = { column: '', order: 'ASC' };
    this.searchTime = 0;
  }
}