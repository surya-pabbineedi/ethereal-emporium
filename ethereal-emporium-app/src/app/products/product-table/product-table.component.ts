import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/models/product';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ethereal-emporium-app-product-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
})
export class ProductTableComponent {
  products = input<Product[]>([]);
  allowedColumns = ['title', 'price', 'stock'];
  columnsToDisplay = this.allowedColumns.slice();
}
