/// <reference path="../../../cypress/support/component.ts" />

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import ProductsComponent from './products.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProductsComponent', () => {
  beforeEach(() => {
    cy.mount(ProductsComponent, {
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
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
    });
  });

  it('should render title', () => {
    cy.get('mat-toolbar h1').contains('Products');
  });
});
