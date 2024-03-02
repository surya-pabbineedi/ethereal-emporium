import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MOCK_PRODUCTS } from './mock-products';

@Component({
  selector: 'ethereal-emporium-app-bulk-import-product',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    TextFieldModule,
    CdkTextareaAutosize,
    FormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './bulk-import-product.component.html',
  styleUrl: './bulk-import-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BulkImportProductComponent {
  static DIALOG_ID = 'bulk-import-product-dialog';

  jsonInput = JSON.stringify(MOCK_PRODUCTS);

  constructor(private dialogService: MatDialog) {}

  handleImport() {
    let parsedJSON = [];

    try {
      parsedJSON = JSON.parse(this.jsonInput);
    } catch {}

    if (parsedJSON.length > 0) {
      this.dialogService
        .getDialogById(BulkImportProductComponent.DIALOG_ID)
        ?.close(parsedJSON);
      this.jsonInput = '';
    }
  }
}
