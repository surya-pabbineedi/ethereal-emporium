import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  model,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MatSuffix } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'ethereal-emporium-app-ai-assistant-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './ai-assistant-dialog.component.html',
  styleUrl: './ai-assistant-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AiAssistantDialogComponent {
  prompt = model('');
}
