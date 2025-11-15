import { Routes, Route } from "react-router-dom";
import Clientes from "../pages/Clientes/Clientes";
import Chamados from "../pages/Chamados/Chamados";
import Layout from "../modules/Layout/Layout";

export default function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/chamados" element={<Chamados />} />
        <Route path="/clientes" element={<Clientes />} />
      </Routes>
    </Layout>
  );
}
