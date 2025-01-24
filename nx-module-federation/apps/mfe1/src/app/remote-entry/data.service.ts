import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Globale Bereitstellung
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api/data/generate';

  constructor(private http: HttpClient) {}

  getData(size: number, frequency: number, amplitude: number): Observable<{ data: number[] }> {
    return this.http.get<{ data: number[] }>(
      `${this.apiUrl}?size=${size}&frequency=${frequency}&amplitude=${amplitude}`
    );
  }
}
