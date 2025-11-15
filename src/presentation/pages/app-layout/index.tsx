import { Layout } from "@/presentation/components";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
