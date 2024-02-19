import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/models/product';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ethereal-emporium-app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export default class ProductDetailComponent {
  product = input.required<Product>();
}
