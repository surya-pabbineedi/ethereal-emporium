import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import ProductDetailComponent from '../product-detail/product-detail.component';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'ethereal-emporium-app-product-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ProductDetailComponent],
  template: `<ethereal-emporium-app-product-detail
    [product]="product"
    [showCloseAction]="true"
    (closeChange)="handleClose()"
  ></ethereal-emporium-app-product-detail>`,
  styles: ``,
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
