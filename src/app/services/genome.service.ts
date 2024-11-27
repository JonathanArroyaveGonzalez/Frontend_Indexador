import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenomeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getGenomes(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}all`, {
      params: new HttpParams()
        .set('page', page.toString())
        .set('page_size', pageSize.toString())
    });
  }

  searchGenomes(filters: {
    filter: string, 
    search: string, 
    page?: number, 
    page_size?: number
  }): Observable<any> {
    const params = new HttpParams()
      .set('filter', filters.filter)
      .set('search', filters.search)
      .set('page', (filters.page || 1).toString())
      .set('page_size', (filters.page_size || 10).toString());

    return this.http.get<any>(`${this.apiUrl}search`, { params });
  }

  sortGenomes(params: {
    column: string, 
    order: string, 
    page?: number, 
    page_size?: number,
    filter?: string,
    search?: string
  }): Observable<any> {
    const httpParams = new HttpParams()
      .set('sort_by', params.column)
      .set('order', params.order)
      .set('page', (params.page || 1).toString())
      .set('page_size', (params.page_size || 10).toString());

    // Añadir parámetros de búsqueda si están presentes
    if (params.filter && params.search) {
      httpParams.set('filter', params.filter);
      httpParams.set('search', params.search);
    }

    return this.http.get<any>(`${this.apiUrl}sort`, { params: httpParams });
  }

  checkServer(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}