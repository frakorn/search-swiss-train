import { Injectable } from '@angular/core';
import { Journey } from '../shared/components/grid/grid.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private storageKey = 'journey';  

  constructor() {}

  addItem(item: Journey): void {
    const items = this.getItems(); 
    items.push(item); 
    this.saveItems(items); 
  }

  getItems(): Journey[] {
    const storedItems = localStorage.getItem(this.storageKey);
    return storedItems ? JSON.parse(storedItems) : [];
  }

  removeItem(id: number): void {
    let items = this.getItems();  
    items = items.filter(item => item.id !== id); 
    this.saveItems(items); 
  }

  private saveItems(items: Journey[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}
