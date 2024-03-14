import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Item } from '../models/item';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  get products(): Promise<Item[]> {
    //this.http.get(`${environment.apiUrl}/groceries
    // @ts-ignore
    return firstValueFrom(this.http.get(`${environment.apiUrl}/groceries`));
  }
}