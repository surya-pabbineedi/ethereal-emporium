import { useEffect, useState } from 'react';
import styles from './Products.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppStoreDispatch, RootState } from '../store';
import { Product } from '../models/ProductResponse';
import ProductCard from './product-card';
import { fetchProducts } from '../store/product.actions';
import SearchBar from './SearchBar';

export function Products() {
  const products = useSelector((state: RootState) => state.products.products);
  const [searchQuery, setSearchQuery] = useState('');
  const loadingProducts = useSelector(
    (state: RootState) => state.products.loading
  );
  const productsLoadingError = useSelector(
    (state: RootState) => state.products.error
  );
  const dispatch = useDispatch<AppStoreDispatch>();

  useEffect(() => {
    if (searchQuery === '' || searchQuery.length > 2) {
      dispatch(fetchProducts(searchQuery));
    }
  }, [searchQuery]);

  return (
    <>
      <div className={styles['products-container-wrapper']}>
        <SearchBar
          loading={loadingProducts}
          query={searchQuery}
          setSearchQuery={(query) => setSearchQuery(query)}
        />
      </div>
      <div  className={styles['products-container-loader']}>
        {loadingProducts && <div>Loading products...</div>}
        {productsLoadingError && (
          <div>Error loading products: {productsLoadingError}</div>
        )}
      </div>
      <div className={styles['products-container']}>
        {products.map((product: Product) => {
          return <ProductCard key={product.id} product={product} />;
        })}

        {products.length === 0 && !loadingProducts && (
          <div>No products found</div>
        )}
      </div>
    </>
  );
}

export default Products;
