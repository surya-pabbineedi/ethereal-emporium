import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { debounceTime, switchMap, tap } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'ethereal-emporium-app-product-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  template: `
    <mat-form-field class="search-control" appearance="fill">
      <mat-icon matPrefix>search</mat-icon>
      <input
        matInput
        type="text"
        placeholder="Search for a product"
        [(ngModel)]="query"
        [matAutocomplete]="auto"
      />

      @if(loading()) {<mat-spinner matSuffix diameter="20"></mat-spinner> }
      @else if (query()) {
      <mat-icon matSuffix (click)="query.set('')">close</mat-icon>
      }

      <mat-autocomplete #auto="matAutocomplete">
        @for (option of products(); track option) {
        <mat-option
          [value]="option.title"
          [routerLink]="['/products', option.id]"
          >{{ option.title }}</mat-option
        >
        }
      </mat-autocomplete>
    </mat-form-field>
  `,
  styles: `.search-control{width: 450px;} 
  mat-spinner {
    margin-right: 10px
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSearchComponent {
  productService = inject(ProductService);
  query = model<string>('');
  loading = model<boolean>(false);
  products = toSignal(
    toObservable(this.query).pipe(
      debounceTime(500),
      tap(() => this.loading.set(true)),
      switchMap((incomingQuery) =>
        this.productService
          .searchProducts(incomingQuery)
          .pipe(tap(() => this.loading.set(false)))
      ),
      takeUntilDestroyed()
    )
  );
}
