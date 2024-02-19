import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MOCK_PRODUCTS } from 'src/test/mocks/mock-products';

import { RouterTestingModule } from '@angular/router/testing';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ProductCardComponent, RouterTestingModule, NoopAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', { ...MOCK_PRODUCTS[0] });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
