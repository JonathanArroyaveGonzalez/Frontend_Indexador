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
  selectedFilter = 'CHROM';  // Default filter
  currentSort = { column: 'CHROM', order: 'ASC' };  // Default sort
  
  // New property to track the current search state
  currentSearchParams: { filter: string, search: string } | null = null;

  constructor(private genomeService: GenomeService) { }

  ngOnInit(): void {
    this.loadGenomes();
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
    if (newPage > 0) {
      this.currentPage = newPage;
      this.loadGenomes();
    }
  }

  changePageSize(event: Event) {
    const target = event.target as HTMLSelectElement | null;
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
  }
}