import { useApp } from "../context/AppContext";
import {
  Search,
  Bell,
  Network,
  FolderKanban,
  CheckCircle,
} from "lucide-react";

interface Props {
  pagina: string;
}

export default function Topbar({ pagina }: Props) {
  const { proyectoActivo, abrirSitioTrabajo } = useApp();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="breadcrumbs">
          <span className="crumb-root">Enterprise Suite</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-project" title={proyectoActivo.nombre}>
            <FolderKanban size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
            {proyectoActivo.id}
          </span>
          <span className="crumb-sep">/</span>
          <strong className="crumb-current">{pagina}</strong>
        </div>
        <p className="topbar-subtext">
          Ambiente Empresarial MLOps · Proyecto: <span className="highlight-project">{proyectoActivo.nombre}</span>
        </p>
      </div>

      <div className="topbar-right">
        <button
          type="button"
          className="btn-quick-workspace"
          onClick={() => abrirSitioTrabajo(proyectoActivo)}
          title="Ir directamente al Diseñador de Redes del proyecto activo"
        >
          <Network size={16} />
          <span>Diseño de Redes</span>
        </button>

        <div className="topbar-search-box">
          <Search size={15} className="search-icon" />
          <input
            type="search"
            aria-label="Buscar en módulos"
            placeholder="Buscar capas, datasets, métricas..."
          />
          <kbd className="search-kbd">⌘K</kbd>
        </div>

        <div className="notification-btn" title="Sistema en línea: Todos los servicios operativos">
          <Bell size={18} />
          <span className="notification-dot" />
        </div>

        <div className="user-profile-badge" title="Dr. Morales · Ingeniero Principal de IA">
          <div className="user-avatar">DM</div>
          <div className="user-details">
            <span className="user-name">Dr. D. Morales</span>
            <span className="user-role">
              <CheckCircle size={11} style={{ display: "inline", marginRight: 2, color: "#16a34a" }} />
              Lead ML Engineer
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
