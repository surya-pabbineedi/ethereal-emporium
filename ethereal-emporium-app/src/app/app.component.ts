import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'ethereal-emporium-app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ethereal-emporium-app';
}
