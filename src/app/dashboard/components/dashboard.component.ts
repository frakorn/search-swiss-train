import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { IColumns, Journey } from '../../shared/components/grid/grid.model';
import { GridComponent } from '../../shared/components/grid/grid.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { faTrain } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GridComponent, FormsModule, FontAwesomeModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  cityFrom: string = '';
  cityTo: string = '';
  private dashboardService = inject(DashboardService);
  private router = inject(Router);
  faTrain = faTrain; 

  columns: IColumns[] = [
    { id: 'time', name: 'Time', width: '10%' },
    { id: 'journey', name: 'Journey', width: '70%' },
    { id: 'platform', name: 'Platform', width: '10%' },
    { id: 'favorite', name: 'Favorite', width: 'auto'}
  ];

  source = signal<Journey[] | undefined>(undefined); 

  ngOnInit(): void {
  }

  search() {
    this.dashboardService.getJourney(this.cityFrom,this.cityTo).subscribe({
      next: (data) => {
        this.source.set(data);
      },
      error: (err) => {
        console.error('Error retrieving data:', err);
      }
    });
  }

  gotoFavorite(){
    this.router.navigate(['/favorites']); 
  }

  ngOnDestroy(): void {
  }

}
