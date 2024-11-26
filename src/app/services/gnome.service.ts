import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Gnome } from '../models/gnome';

@Injectable({
  providedIn: 'root'
})
export class GnomeService {
  private apiUrl = 'http://localhost:8000/genome/all';  // Remove query params from base URL

  constructor(private http: HttpClient) {}

  // Improved method with optional pagination
  getGnomes(page: number = 1, pageSize: number = 10): Observable<Gnome[]> {
    // Create HttpParams for query parameters
    const params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => {
        // Adjust this based on your actual API response structure
        console.log('Raw API response:', response);
        return response.results || response;  // Handle different response formats
      }),
      catchError(this.handleError)
    );
  }

  // Method to get a single gnome by ID
  getGnomeById(id: string): Observable<Gnome> {
    return this.http.get<Gnome>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Method to add a new gnome
  addGnome(gnome: Gnome): Observable<Gnome> {
    return this.http.post<Gnome>(this.apiUrl, gnome).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    console.error('Detailed error:', error);
    
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('Client-side error:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }

    // Return an observable with a user-facing error message
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}