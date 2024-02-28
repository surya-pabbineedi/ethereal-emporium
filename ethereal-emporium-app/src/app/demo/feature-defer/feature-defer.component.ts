import { CdkAccordionModule } from '@angular/cdk/accordion';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { PagedResponse } from 'src/app/models/paged-response';
import { Product } from 'src/app/models/product';
import ProductsComponent from 'src/app/products/products.component';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-feature-defer',
  templateUrl: './feature-defer.component.html',
  styleUrls: ['./feature-defer.component.scss'],
  standalone: true,
  imports: [
    MatProgressBarModule,
    MatProgressSpinner,
    ProductsComponent,
    AsyncPipe,
    CdkAccordionModule,
    MatProgressBarModule,
    MatProgressSpinner,
    NgIf,
  ],
})
export class FeatureDeferComponent {
  productsResponse$ = inject(ProductService).getProducts$();

  deferUseCases = [
    '@defer',
    '@defer with @placeholder',
    '@defer with @loading',
    '@defer triggers',
    '@defer @error block',
    '@defer - Viewport',
    '@defer - Viewport Element',
    '@defer - Interaction',
    '@defer - Interaction Input',
    '@defer - Hover',
  ];
  expandedIndex = 0;
}
