import { ComponentFixture, TestBed } from '@angular/core/testing';
import ProductsComponent from './products.component';
import { MockProductService } from 'src/test/mocks/services/mock-product.service';
import { ProductService } from '../services/product.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe.only('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent, NoopAnimationsModule],
      providers: [
        {
          provide: ProductService,
          useClass: MockProductService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
