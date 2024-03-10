import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AiAssistantStore } from './ai-assistant-store.store';
import { DialogModule } from '@angular/cdk/dialog';

@Component({
  selector: 'ee-ai-assistant',
  standalone: true,
  imports: [CommonModule, MatIconModule, DialogModule],
  providers: [AiAssistantStore],
  templateUrl: './ai-assistant.component.html',
  styleUrl: './ai-assistant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiAssistantComponent {
  store = inject(AiAssistantStore);
}
