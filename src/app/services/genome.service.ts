import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenomeService {
  private apiUrl = environment.apiUrl;
  private apiRegister = environment.apiRegister;
  constructor(private http: HttpClient) { }

  registerUser(data: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);

    return this.http.post<any>(`${this.apiRegister}register`, formData);
  }

  loginUser(data: any): Observable<any> {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('token', data.token);

    return this.http.post<any>(`${this.apiRegister}login`, formData);
  }

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
    sort_by: string,
    order: string,
    page?: number,
    page_size?: number,
    filter?: string,
    search?: string
  }): Observable<any> {
    let httpParams = new HttpParams()
      .set('sort_by', params.sort_by)
      .set('order', params.order)
      .set('page', (params.page || 1).toString())
      .set('page_size', (params.page_size || 10).toString());

    // Añadir parámetros de búsqueda si están presentes
    if (params.filter && params.search) {
      httpParams = httpParams
        .set('filter', params.filter)
        .set('search', params.search);
    }
    return this.http.get<any>(`${this.apiUrl}sort`, { params: httpParams });
  }

  checkServer(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}