import { CommonModule } from '@angular/common';
import { Component, computed, input, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Product } from 'src/app/models/product';
import { ProductImagesComponent } from '../product-images/product-images.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

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
  ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  product = input.required<Product>();
  selectedImage = model<string>();
  productImage = computed(() => {
    if (this.selectedImage()) {
      return this.selectedImage();
    }

    return this.product().images?.[0] || '';
  });

  discountPercentage = computed(() => {
    return Math.round(
      this.product().price -
        (this.product().price * this.product().discountPercentage) / 100
    );
  });

  handleSelectedImage(preferredImage: string) {
    this.selectedImage.set(preferredImage);
  }
}
