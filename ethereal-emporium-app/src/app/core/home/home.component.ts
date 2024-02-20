import { Component, Input, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterLink } from '@angular/router';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import ProductsComponent from 'src/app/products/products.component';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { PagedResponse } from 'src/app/models/paged-response';
import { FeatureDeferComponent } from 'src/app/demo/feature-defer/feature-defer.component';

@Component({
  selector: 'ethereal-emporium-app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterLink,
    FeatureDeferComponent,
  ],
})
export default class HomeComponent {
  private breakpointObserver = inject(BreakpointObserver);
  navItems = [
    { name: 'Home', route: '/home' },
    { name: 'Demo Products', route: '/products' },
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
