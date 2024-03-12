import { useEffect } from 'react';
import styles from './Products.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppStoreDispatch, RootState } from '../store';
import { Product } from '../models/ProductResponse';
import ProductCard from './product-card';
import { fetchProducts } from '../store/product.actions';

export function Products() {
  const products = useSelector((state: RootState) => state.products.products);
  const loadingProducts = useSelector(
    (state: RootState) => state.products.loading
  );
  const productsLoadingError = useSelector(
    (state: RootState) => state.products.error
  );
  const dispatch = useDispatch<AppStoreDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={styles['products-container']}>
      {loadingProducts && <div>Loading products...</div>}
      {productsLoadingError && (
        <div>Error loading products: {productsLoadingError}</div>
      )}
      {products.map((product: Product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}

export default Products;
