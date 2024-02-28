import { CommonModule } from '@angular/common';
import { Component, Input, computed, inject, model } from '@angular/core';
import { ProductStore } from './product.store';
import { Product } from '../models/product';
import { ProductCardComponent } from './product-card/product-card.component';
import { PagedResponse } from '../models/paged-response';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { FormsModule } from '@angular/forms';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductSearchComponent } from './product-search/product-search.component';

@Component({
  selector: 'ethereal-emporium-app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatGridListModule,
    ProductCardComponent,
    ProductTableComponent,
    ProductSearchComponent,
    ScrollingModule,
  ],
  providers: [ProductStore],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export default class ProductsComponent {
  @Input()
  set products(productResponse: Product[]) {
    this.store.setProducts(productResponse);
  }

  readonly store = inject(ProductStore);
  productsView = model('grid');
  isGridView = computed(() => this.productsView() !== 'table');
}
