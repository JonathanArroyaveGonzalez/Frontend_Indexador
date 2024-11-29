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
          this.genomes = data.map((item: any) => new Genome(item));
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
    const startTime = performance.now();
    if (newPage > 0) {
      this.currentPage = newPage;
      this.loadGenomes();
    }
    setTimeout(() => {
      const endTime = performance.now();
      this.searchTime = endTime - startTime;
    });
  }

  changePageSize() {
    this.currentPage = 1;  // Reset to first page
    this.loadGenomes();
  }
  
  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  search() {
    const startTime = performance.now();
    this.loading = true;
    const filters = {
      filter: this.selectedFilter,
      search: this.searchText
    };
    
    // Store the current search parameters
    this.currentSearchParams = filters;
    this.currentPage = 1;  // Reset to first page
    
    this.performSearch(filters);
    // Simulación de búsqueda
    setTimeout(() => {
      this.loading = false;
      const endTime = performance.now();
      this.searchTime = endTime - startTime;
    }); // Simulación de 1 segundo de búsqueda
  }

  private performSearch(filters: { filter: string, search: string }) {
    this.genomeService.searchGenomes({
      ...filters,
      page: this.currentPage,
      page_size: this.pageSize
    }).subscribe({
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
    const startTime = performance.now();
    // If already sorting by this column, toggle order
    if (this.currentSort.column === column) {
      this.currentSort.order = this.currentSort.order === 'ASC' ? 'DESC' : 'ASC';
    } else {
      // If changing column, start with ascending order
      this.currentSort.column = column;
      this.currentSort.order = 'ASC';
    }
    this.loading = true;
    
    // Call service to get sorted data, respecting current search state
    const sortParams: any = {
      sort_by: this.currentSort.column,
      order: this.currentSort.order,
      page: this.currentPage,
      page_size: this.pageSize
    };

    // Add search parameters if a search is active
    if (this.currentSearchParams) {
      sortParams.filter = this.currentSearchParams.filter;
      sortParams.search = this.currentSearchParams.search;
    }


    this.genomeService.sortGenomes(sortParams).subscribe({
      next: (data) => {
        this.genomes = data.map((item: any) => new Genome(item));
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al ordenar los genomas', error);
        this.loading = false;
      }
    });
    setTimeout(() => {
      const endTime = performance.now();
      this.searchTime = endTime - startTime;
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