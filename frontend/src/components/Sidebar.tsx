import { useApp } from "../context/AppContext";
import {
  LayoutDashboard,
  FolderKanban,
  Network,
  Database,
  Activity,
  BookOpen,
  BarChart3,
  Layers,
  FileText,
  Settings,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const grupos = [
  {
    titulo: "Espacio de trabajo",
    opciones: [
      { id: "Dashboard", nombre: "Dashboard", icono: LayoutDashboard },
      { id: "Proyectos", nombre: "Proyectos", icono: FolderKanban },
      { id: "Datasets", nombre: "Datasets", icono: Database },
      { id: "DisenadorRedes", nombre: "Diseño de redes", icono: Network },
      { id: "Entrenamientos", nombre: "Entrenamientos", icono: Activity },
    ],
  },
  {
    titulo: "Conocimiento y Calidad",
    opciones: [
      { id: "EvaluacionMetricas", nombre: "Evaluación y métricas", icono: BarChart3 },
      { id: "RegistroModelos", nombre: "Registro de modelos", icono: Layers },
      { id: "Reportes", nombre: "Reportes", icono: FileText },
      { id: "Fundamentos", nombre: "Fundamentos teóricos", icono: BookOpen },
    ],
  },
  {
    titulo: "Sistema",
    opciones: [
      { id: "Administracion", nombre: "Configuración", icono: Settings },
    ],
  },
];

export default function Sidebar() {
  const { pagina, navegar, proyectoActivo, abrirSitioTrabajo } = useApp();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo">
            <Sparkles size={20} className="logo-sparkle" />
          </div>
          <div className="logo-text">
            <h1 className="logo-title">NeuroLab</h1>
            <span className="logo-tag">Enterprise AI v2.6</span>
          </div>
        </div>
      </div>

      <div className="workspace-card">
        <div className="workspace-header">
          <span className="workspace-badge-micro">PROYECTO ACTIVO</span>
        </div>
        <div className="workspace-name" title={proyectoActivo.nombre}>
          {proyectoActivo.nombre}
        </div>
        <div className="workspace-meta">
          <span>{proyectoActivo.id}</span> · <span>{proyectoActivo.arquitectura}</span>
        </div>

        <button
          type="button"
          className="btn-workspace-open"
          onClick={() => abrirSitioTrabajo(proyectoActivo)}
          title="Abrir Diseñador de Redes para este proyecto"
        >
          <span>Abrir Diseño de Redes</span>
          <ArrowRight size={13} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {grupos.map((grupo) => (
          <div key={grupo.titulo} className="nav-group">
            <p className="sidebar-section-title">{grupo.titulo}</p>

            {grupo.opciones.map((item) => {
              const Icon = item.icono;
              const isActive = pagina === item.id;
              return (
                <button
                  key={item.id}
                  className={`nav-item ${isActive ? "active" : ""}`}
                  onClick={() => navegar(item.id)}
                  type="button"
                >
                  <Icon size={18} className="nav-item-icon" />
                  <span className="nav-item-text">{item.nombre}</span>
                  {isActive && <div className="nav-active-pill" />}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-info">
          <div className="footer-status-indicator" />
          <div>
            <strong className="footer-title">Clúster GPU Online</strong>
            <p className="footer-subtitle">NVIDIA A100 · 80GB VRAM</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
