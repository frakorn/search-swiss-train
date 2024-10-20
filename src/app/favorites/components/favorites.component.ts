import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { IColumns, Journey } from '../../shared/components/grid/grid.model';
import { GridComponent } from '../../shared/components/grid/grid.component';
import { Router } from '@angular/router';
import { StoreService } from '../../store/store.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [GridComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent {

  private router = inject(Router);
  private store = inject(StoreService);

  source = signal<Journey[]>([]);

  columns: IColumns[] = [
    { id: 'time', name: 'Time', width: '10%' },
    { id: 'journey', name: 'Journey', width: '70%' },
    { id: 'platform', name: 'Platform', width: '10%' },
    { id: 'delete', name: 'Delete', width: 'auto'}
  ];

  ngOnInit(): void {
    this.source.set(this.store.getItems())
  }

  gotoDashboard(){
    this.router.navigate(['/dashboard']); 
  }

  ngOnDestroy(): void {
  }

}
