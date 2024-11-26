import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genome } from '../models/genome';

@Injectable({
  providedIn: 'root'
})
export class GenomeService {

  private apiUrl = 'http://localhost:8000/genome/all';

  constructor(private http: HttpClient) { }

  getGenomes(page: number = 1, pageSize: number = 10): Observable<Genome[]> {
    return this.http.get<Genome[]>(`${this.apiUrl}?page=${page}&page_size=${pageSize}`);
  }
}
