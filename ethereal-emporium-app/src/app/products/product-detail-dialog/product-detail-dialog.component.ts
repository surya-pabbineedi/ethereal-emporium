import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import ProductDetailComponent from '../product-detail/product-detail.component';
import { Product } from 'src/app/models/product';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FeatureDeferComponent } from 'src/app/demo/feature-defer/feature-defer.component';

@Component({
  selector: 'ethereal-emporium-app-product-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ProductDetailComponent,
    MatProgressSpinner,
    FeatureDeferComponent,
  ],
  template: `
    <div class="menu-container">
      @defer {
      <app-feature-defer></app-feature-defer>
      } @placeholder (minimum 3s) {
      <mat-spinner diameter="30"></mat-spinner>
      <div>loading a heavy standalone component...</div>
      }
    </div>
  `,
  styles: `.menu-container{
        display: flex;
    margin: 1rem;
    align-items: center;
    gap: 0.5rem;
    height: 500px;
    overflow-y: auto;
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailDialogComponent {
  static DIALOG_ID = 'product-detail-dialog';

  product!: Product;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { product: Product },
    private dialogService: MatDialog
  ) {
    this.product = data.product;
  }

  handleClose() {
    this.dialogService
      .getDialogById(ProductDetailDialogComponent.DIALOG_ID)
      ?.close();
  }
}
