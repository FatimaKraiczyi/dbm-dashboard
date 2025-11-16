import { Outlet } from 'react-router-dom';
import { Layout } from '@/presentation/components';

export function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
