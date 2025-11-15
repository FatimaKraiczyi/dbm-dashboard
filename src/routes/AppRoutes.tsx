import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Clientes from "../pages/Clientes/Clientes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/clientes" element={<Clientes />} />
    </Routes>
  );
}
