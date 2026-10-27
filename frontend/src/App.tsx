import { AppProvider, useApp } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import Proyectos from "./pages/Proyectos";
import Fundamentos from "./pages/Fundamentos";
import DisenadorRedes from "./pages/DisenadorRedes";
import Datasets from "./pages/Datasets";
import Entrenamientos from "./pages/Entrenamientos";
import EvaluacionMetricas from "./pages/EvaluacionMetricas";
import RegistroModelos from "./pages/RegistroModelos";
import Reportes from "./pages/Reportes";
import Administracion from "./pages/Administracion";

import { CheckCircle2, Info, AlertTriangle, AlertCircle } from "lucide-react";

const paginas: Record<string, React.ComponentType> = {
  Dashboard,
  Proyectos,
  Fundamentos,
  DisenadorRedes,
  Datasets,
  Entrenamientos,
  EvaluacionMetricas,
  RegistroModelos,
  Reportes,
  Administracion,
};

const nombres: Record<string, string> = {
  Dashboard: "Dashboard",
  Proyectos: "Proyectos de Investigación",
  Fundamentos: "Fundamentos Teóricos",
  DisenadorRedes: "Diseñador de Redes",
  Datasets: "Gestión de Datasets",
  Entrenamientos: "Entrenamientos y Optimización",
  EvaluacionMetricas: "Evaluación y Métricas",
  RegistroModelos: "Registro de Modelos",
  Reportes: "Reportes Ejecutivos",
  Administracion: "Configuración y Clúster",
};

function MainLayout() {
  const { pagina, notificacion } = useApp();
  const PaginaActual = paginas[pagina] ?? Dashboard;

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main">
        <Topbar pagina={nombres[pagina] ?? pagina} />

        <div className="page">
          <PaginaActual />
        </div>

        {/* Notificación flotante Toast para feedback de acciones */}
        {notificacion && (
          <div className={`toast-notification toast-${notificacion.tipo}`}>
            {notificacion.tipo === "success" && <CheckCircle2 size={18} />}
            {notificacion.tipo === "info" && <Info size={18} />}
            {notificacion.tipo === "warning" && <AlertTriangle size={18} />}
            {notificacion.tipo === "danger" && <AlertCircle size={18} />}
            <span>{notificacion.mensaje}</span>
          </div>
        )}

        <footer className="app-footer">
          <div className="footer-content">
            <span>© 2026 NeuroLab Enterprise AI Suite · Plataforma de Experimentación Neuronal</span>
            <div className="footer-links">
              <span>Clúster GPU: Activo</span>
              <span>·</span>
              <span>Modo: Frontend Demo Interactivo</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
