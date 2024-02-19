import { ComponentFixture, TestBed } from '@angular/core/testing';
import ProductsComponent from './products.component';
import { MockProductService } from 'src/test/mocks/services/mock-product.service';
import { ProductService } from '../services/product.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MOCK_PRODUCTS } from 'src/test/mocks/mock-products';
import * as exp from 'constants';
import { ProductStore } from './product.store';

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
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set store values', () => {
    const setProductsSpy = jest.spyOn(component.store, 'setProducts')
    fixture.componentRef.setInput("products", { items: [...MOCK_PRODUCTS] });
    expect(setProductsSpy).toHaveBeenCalledWith(MOCK_PRODUCTS);
  });
});
