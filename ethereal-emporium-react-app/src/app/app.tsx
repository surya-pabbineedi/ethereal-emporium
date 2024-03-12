// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { RouterProvider } from 'react-router-dom';
import AppRouter from './app.router';
import { Provider } from 'react-redux';
import store from './store';

export function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={AppRouter} />
    </Provider>
  );
}

export default App;
