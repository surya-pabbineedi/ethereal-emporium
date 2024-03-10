import { Dialog } from '@angular/cdk/dialog';
import { Injectable, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { AiAssistantDialogComponent } from './ai-assistant-dialog/ai-assistant-dialog.component';

export interface AiAssistantState {
  isActive: boolean;
}

const initialState: AiAssistantState = {
  isActive: false,
};

export const AiAssistantStore = signalStore(
  { providedIn: 'root' },
  withState<AiAssistantState>(initialState),
  withMethods((store) => {
    const dialog = inject(Dialog);
    return {
      setIsActive(isActive: boolean) {
        patchState(store, {
          isActive,
        });

        dialog.open(AiAssistantDialogComponent, {
          hasBackdrop: false,
        });
      },
    };
  }),

  withHooks((store) => {
    return {
      onInit() {
        store.setIsActive(false);
      },
    };
  })
);
