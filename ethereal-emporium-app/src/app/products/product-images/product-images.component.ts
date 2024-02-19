import { Component, EventEmitter, Output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'ethereal-emporium-app-product-images',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-images.component.html',
  styleUrl: './product-images.component.scss',
})
export class ProductImagesComponent {
  product = input.required<Product>();
  @Output() selectedImage = new EventEmitter<string>();
}
