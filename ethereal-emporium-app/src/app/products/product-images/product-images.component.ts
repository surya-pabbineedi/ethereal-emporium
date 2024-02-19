import { Component, EventEmitter, Input, Output, input } from '@angular/core';
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
  @Input({ required: true }) product!: Product;
  @Output() selectedImage = new EventEmitter<string>();
}
