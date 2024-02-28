import { CommonModule } from '@angular/common';
import { Component, Input, computed, input, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Product } from 'src/app/models/product';
import { ProductImagesComponent } from '../product-images/product-images.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductDetailDialogComponent } from '../product-detail-dialog/product-detail-dialog.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import ProductDetailComponent from '../product-detail/product-detail.component';
import { FeatureDeferComponent } from 'src/app/demo/feature-defer/feature-defer.component';

@Component({
  selector: 'ethereal-emporium-app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    ProductImagesComponent,
    MatBadgeModule,
    RouterLink,
    MatDialogModule,
    OverlayModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    ProductDetailComponent,
    FeatureDeferComponent
  ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  selectedImage = model<string>();
  isOpen = false;
  productImage = computed(() => {
    if (this.selectedImage()) {
      return this.selectedImage();
    }

    return this.product.images?.[0] || '';
  });

  discountPercentage = computed(() => {
    return Math.round(
      this.product.price -
        (this.product.price * this.product.discountPercentage) / 100
    );
  });

  productDetailTrigger = model<boolean>();

  constructor(private dialog: MatDialog) {}

  handleMouseoverProductDetail() {
    this.productDetailTrigger.set(true);
  }

  handleSelectedImage(preferredImage: string) {
    this.selectedImage.set(preferredImage);
  }

  openProductDialog() {
    this.dialog.open(ProductDetailDialogComponent, {
      id: ProductDetailDialogComponent.DIALOG_ID,
      data: {
        product: this.product,
      },
    });
  }
}
