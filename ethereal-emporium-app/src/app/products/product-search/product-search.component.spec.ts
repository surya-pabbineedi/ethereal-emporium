import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductSearchComponent } from './product-search.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from 'src/app/services/product.service';
import { MockProductService } from 'src/test/mocks/services/mock-product.service';

describe('ProductSearchComponent', () => {
  let component: ProductSearchComponent;
  let fixture: ComponentFixture<ProductSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSearchComponent, NoopAnimationsModule],
      providers: [{
        provide: ProductService,
        useClass: MockProductService,
      },]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
