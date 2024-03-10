// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { RouterProvider } from 'react-router-dom';
import AppRouter from './app.router';
import { AuthenticationProvider } from './hooks/useAuthentication';

export function App() {
  return <RouterProvider router={AppRouter} />;
}

export default App;
