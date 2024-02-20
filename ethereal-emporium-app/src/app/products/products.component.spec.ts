import { ComponentFixture, TestBed } from '@angular/core/testing';
import ProductsComponent from './products.component';
import { MockProductService } from 'src/test/mocks/services/mock-product.service';
import { ProductService } from '../services/product.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MOCK_PRODUCTS } from 'src/test/mocks/mock-products';
import { ProductStore } from './product.store';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ProductsComponent', () => {
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
        {
          provide: ProductStore,
          useValue: {
            filteredProducts: signal(MOCK_PRODUCTS)
          }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput("products", { items: [...MOCK_PRODUCTS] });

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

  it('should have a title', () => {
    const title = fixture.nativeElement.querySelector('h1');
    expect(title.textContent).toEqual('Products');
  });

  describe('product search', () => {
    it('should filter products', () => {
      const searchInput = fixture.debugElement.query(By.css('ethereal-emporium-app-product-search'));
      expect(searchInput).toBeDefined();
    });
  });

  describe('products view', () => {
    it('should render product cards', () => {
      expect(component.productsView()).toEqual('grid');
      fixture.whenStable().then(() => {
        const productCards = fixture.debugElement.queryAll(By.css('ethereal-emporium-app-product-card'));
        expect(productCards.length).toEqual(MOCK_PRODUCTS.length);
      });
    });

    it('should render product table', () => {
      expect(component.productsView()).toEqual('grid');
      fixture.whenStable().then(() => {
        const productCards = fixture.debugElement.queryAll(By.css('ethereal-emporium-app-product-card'));
        expect(productCards.length).toEqual(MOCK_PRODUCTS.length);
      });
    });
  });
});
