import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genome } from '../models/genome';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenomeService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getGenomes(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}all?page=${page}&pageSize=${pageSize}`);
  }

  searchGenomes(filters: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}search`, { params: filters });
  }

  sortGenomes(column: string, order: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}sort?column=${column}&order=${order}`);
  }

  checkServer(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}

/*
metodo de endpoint searchGenomes en el back

@app.get("/genome/search")
async def search_variants(
    chrom: str = None,
    filter: str = None,
    info: str = None,
    format: str = None,
    page: int = 1,
    page_size: int = 10
):
    query = {}
    if chrom:
        query["CHROM"] = {"$regex": f".*{chrom}.*", "$options": "i"}
    if filter:
        query["FILTER"] = {"$regex": f".*{filter}.*", "$options": "i"}
    if info:
        query["INFO"] = {"$regex": f".*{info}.*", "$options": "i"}
    if format:
        query["FORMAT"] = {"$regex": f".*{format}.*", "$options": "i"}
    
    start_index = (page - 1) * page_size
    variants = collection.find(query).skip(start_index).limit(page_size)
    
    # Convertir los documentos para que ObjectId sea serializable
    return [jsonable_encoder_with_objectid(variant) for variant in variants]


    html

    <div class="genome-table-container">
    <div class="search-container">
      <!-- Selector para filtros -->
      <select 
        [(ngModel)]="selectedFilter" 
        class="form-control filter-select"
      >
        <option value="">Seleccionar filtro</option>
        <option value="Chrom">Chrom</option>
        <option value="Filter">Filter</option>
        <option value="Info">Info</option>
        <option value="Format">Format</option>
      </select>
  
      <!-- Campo de búsqueda -->
      <input 
        type="text" 
        [(ngModel)]="searchText" 
        placeholder="Buscar"
        class="form-control search-input"
      >
  
      <!-- Botón de búsqueda -->
      <button 
        class="btn btn-search" 
        (click)="search()"
      >
        Buscar
      </button>
    </div>
  
    <div *ngIf="loading" class="loading-container">
      <p>Cargando datos...</p>
    </div>
  
    <div *ngIf="!loading" class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>CHROM</th>
            <th>POS</th>
            <th>ID</th>
            <th>REF</th>
            <th>ALT</th>
            <th>QUAL</th>
            <th>FILTER</th>
            <th>INFO</th>
            <th>FORMAT</th>
            <th *ngFor="let key of objectKeys(genomes[0]?.OUTPUTS || {})">
              {{ key }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let genome of genomes">
            <td>{{ genome.CHROM }}</td>
            <td>{{ genome.POS }}</td>
            <td>{{ genome.ID }}</td>
            <td>{{ genome.REF }}</td>
            <td>{{ genome.ALT }}</td>
            <td>{{ genome.QUAL }}</td>
            <td>{{ genome.FILTER }}</td>
            <td>{{ genome.INFO }}</td>
            <td>{{ genome.FORMAT }}</td>
            <td *ngFor="let key of objectKeys(genome.OUTPUTS)">
              {{ genome.OUTPUTS[key] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  
    <div class="pagination-container">
      <div class="pagination-controls text-center w-100">
        <button 
          class="btn btn-pagination" 
          (click)="changePage(currentPage - 1)" 
          [disabled]="currentPage === 1"
        >
          Anterior
        </button>
        <span class="page-number mx-3">Página {{ currentPage }}</span>
        <button 
          class="btn btn-pagination"
          (click)="changePage(currentPage + 1)"
        >
          Siguiente
        </button>
      </div>
    

      componente genome-table

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
    const selectElement = event.target as HTMLSelectElement;
    const size = parseInt(selectElement.value, 10);
    
    if (!isNaN(size)) {
      this.pageSize = size;
      this.currentPage = 1;
      this.loadGenomes();
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





  sort(column: string) {
    this.loading = true;
    this.genomeService.sortGenomes(column, 'ASC').subscribe({
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


*/


