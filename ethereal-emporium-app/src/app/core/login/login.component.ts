import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppStore } from '../app.store';
import { take } from 'rxjs';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'ethereal-emporium-app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  emailFormControl = new FormControl<string>('');
  passwordFormControl = new FormControl<string>('');
  store = inject(AppStore);

  login() {
    if (this.emailFormControl.invalid || this.passwordFormControl.invalid) {
      return;
    }

    const email = this.emailFormControl.value;
    const password = this.passwordFormControl.value;

    this.store.login(email!, password!).pipe(take(1)).subscribe();
  }
}
