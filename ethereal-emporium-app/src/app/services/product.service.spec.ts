import { TestBed, inject } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Product', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
  });

  it('should ...', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));
});
