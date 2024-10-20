import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Journey } from '../../shared/components/grid/grid.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environment';
import { ConnectionAPI } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http = inject(HttpClient)

  getJourney(from: string, to: string): Observable<Journey[]> {
    let params = new HttpParams().set('from', from).set('to', to);
    return this.http.get<ConnectionAPI>(environment.apiUrl, { params }).pipe(
      map(data => this.adaptJourney(data))
    )
  }

  adaptJourney(data:ConnectionAPI): Journey[] {
    return data ? data?.connections?.map( (d,i) => {
      return {
        id: i,
        time: `${new Date(d.from?.departure).toLocaleTimeString()} - ${new Date(d.to?.arrival).toLocaleTimeString()}'`,
        journey: this.convertTimeFormat(d.duration), 
        platform: d.from?.platform
      }
    }) : [];
  }

  convertTimeFormat(input: string): string {
    const parts = input.split(':');
    const daysAndHours = parts[0]; 
    const minutes = parts[1]; 
    const days = parseInt(daysAndHours.slice(0, 2), 10); 
    const hours = parseInt(daysAndHours.slice(3, 5), 10); 
    const totalHours = days * 24 + hours; 
    return `${totalHours}:${minutes}'`;
}

}
