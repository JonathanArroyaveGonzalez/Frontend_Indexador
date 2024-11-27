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