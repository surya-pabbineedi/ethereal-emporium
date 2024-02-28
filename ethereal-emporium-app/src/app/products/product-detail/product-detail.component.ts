import { Component, Input, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/models/product';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ethereal-emporium-app-product-detail',
  standalone: true,
  imports: [MatToolbar, RouterLink, MatButton, MatIcon],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export default class ProductDetailComponent {
  @Input({ required: true }) product!: Product;
  showCloseAction = input<boolean>(false);
  close = model(false);

  handleClose() {
    this.close.set(true);
  }
}
