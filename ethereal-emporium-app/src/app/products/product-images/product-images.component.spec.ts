import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductImagesComponent } from './product-images.component';
import { MOCK_PRODUCTS } from 'src/test/mocks/mock-products';

describe('ProductImagesComponent', () => {
  let component: ProductImagesComponent;
  let fixture: ComponentFixture<ProductImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductImagesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductImagesComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', { ...MOCK_PRODUCTS[0] });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
