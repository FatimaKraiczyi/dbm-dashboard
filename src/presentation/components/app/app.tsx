import { Outlet } from 'react-router-dom';
import { Layout } from './layout';

export function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
