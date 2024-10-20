import { ChangeDetectionStrategy, Component, Input, Signal, SimpleChanges, inject, input, model } from '@angular/core';
import { IColumns, Journey } from './grid.model';
import { CommonModule } from '@angular/common';
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreService } from '../../../store/store.service';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent {

  @Input() columns!: IColumns[]
  source = model<Journey[]>([])  
  faStar = faStar;   
  faTrash = faTrash; 
  isActive: boolean = false;

  private storeService = inject(StoreService)

  ngOnInit(): void {
  }

  toggleFavorite(row: Journey) {
    row.favorite = !row.favorite;
    row.favorite ? this.storeService.addItem(row) : this.storeService.removeItem(row.id)
  }

  removeFavorite(row: Journey){
    this.storeService.removeItem(row.id);
    this.source.set(this.storeService.getItems())
    }

}
