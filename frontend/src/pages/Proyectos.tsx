import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import Status from "../components/Status";
import { useApp } from "../context/AppContext";
import { Proyecto } from "../types";
import {
  FolderKanban,
  Network,
  Database,
  Layers,
  Calendar,
  User,
  Plus,
  Trash2,
  ExternalLink,
  Info,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Cpu,
} from "lucide-react";

export default function Proyectos() {
  const {
    proyectos,
    proyectoActivo,
    setProyectoActivo,
    abrirSitioTrabajo,
    crearProyecto,
    eliminarProyecto,
    navegar,
  } = useApp();

  const [mostrarModalCrear, setMostrarModalCrear] = useState(false);
  const [nombre, setNombre] = useState("");
  const [arquitectura, setArquitectura] = useState("CNN");
  const [descripcion, setDescripcion] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [proyectoDetalle, setProyectoDetalle] = useState<Proyecto | null>(null);

  function handleCrear() {
    if (!nombre.trim()) return;
    crearProyecto({
      nombre: nombre.trim(),
      arquitectura,
      descripcion: descripcion.trim() || "Espacio de experimentación de redes neuronales.",
    });
    setNombre("");
    setDescripcion("");
    setMostrarModalCrear(false);
  }

  const proyectosFiltrados = proyectos.filter((p) =>
    `${p.nombre} ${p.id} ${p.arquitectura}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <>
      <SectionTitle
        titulo="Proyectos de Investigación"
        descripcion="Administra tus espacios de trabajo. Cada proyecto contiene su arquitectura neuronal, datasets y modelos asociados."
        badge={`${proyectos.length} ${proyectos.length === 1 ? "Proyecto Registrado" : "Proyectos"}`}
      >
        <button
          type="button"
          className="btn-primary"
          onClick={() => setMostrarModalCrear(true)}
        >
          <Plus size={16} />
          <span>Nuevo Proyecto</span>
        </button>
      </SectionTitle>

      {/* Explicación de la relación con los otros módulos */}
      <div className="module-relation-card">
        <div className="module-relation-icon">
          <Info size={20} />
        </div>
        <div className="module-relation-body">
          <h4>¿Cómo se relaciona este módulo con los demás?</h4>
          <p>
            El <strong>Proyecto</strong> es el contenedor raíz de toda tu investigación en NeuroLab. Al <strong>Abrir el sitio de trabajo</strong>, serás dirigido automáticamente al <strong>Diseñador de Redes</strong> para configurar sus capas y parámetros, alimentado por los <strong>Datasets</strong> seleccionados y listo para el proceso de <strong>Entrenamiento</strong>.
          </p>
        </div>
      </div>

      {/* PROYECTO PRINCIPAL DESTACADO / ESPACIO DE TRABAJO */}
      <div className="active-project-hero">
        <div className="hero-badge-tag">
          <Sparkles size={14} />
          <span>PROYECTO ACTIVO EN EL ESPACIO DE TRABAJO</span>
        </div>

        <div className="hero-content-grid">
          <div className="hero-main">
            <div className="hero-title-row">
              <div className="hero-id-chip">{proyectoActivo.id}</div>
              <h2 className="hero-title">{proyectoActivo.nombre}</h2>
              <Status estado={proyectoActivo.estado} />
            </div>

            <p className="hero-desc">
              {proyectoActivo.descripcion ||
                "Sistema integral de visión por computadora para detección de defectos e inspección automática en entornos industriales de alta precisión."}
            </p>

            <div className="hero-meta-row">
              <div className="hero-meta-item">
                <Cpu size={15} />
                <span>
                  Arquitectura: <strong>{proyectoActivo.arquitectura}</strong>
                </span>
              </div>
              <div className="hero-meta-item">
                <Database size={15} />
                <span>
                  Dataset Principal: <strong>{proyectoActivo.datasetPrincipal || "DS-001"}</strong>
                </span>
              </div>
              <div className="hero-meta-item">
                <Layers size={15} />
                <span>
                  Modelos: <strong>{proyectoActivo.modelos} versiones</strong>
                </span>
              </div>
              <div className="hero-meta-item">
                <User size={15} />
                <span>
                  Líder: <strong>{proyectoActivo.responsable || "Diego Morales"}</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="hero-cta-box">
            <div className="cta-header">
              <h4>Sitio de Trabajo del Proyecto</h4>
              <p>Inicia el flujo de experimentación abriendo el diseñador de redes:</p>
            </div>

            <button
              type="button"
              className="btn-primary btn-large w-full"
              onClick={() => abrirSitioTrabajo(proyectoActivo)}
            >
              <Network size={18} />
              <span>Abrir Sitio de Trabajo (Diseño de Redes)</span>
              <ArrowRight size={18} />
            </button>

            <div className="cta-secondary-actions">
              <button
                type="button"
                className="btn-secondary btn-sm"
                onClick={() => navegar("Datasets")}
              >
                <Database size={14} />
                <span>Ver Datasets</span>
              </button>
              <button
                type="button"
                className="btn-secondary btn-sm"
                onClick={() => navegar("RegistroModelos")}
              >
                <Layers size={14} />
                <span>Ver Modelos</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CATÁLOGO DE PROYECTOS */}
      <section className="panel">
        <div className="panel-header">
          <div>
            <h3>Catálogo de Proyectos</h3>
            <p>Lista de proyectos registrados en la organización.</p>
          </div>

          <div className="search-filter-wrapper">
            <input
              type="search"
              placeholder="Filtrar por nombre, ID o arquitectura..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="search-input-field"
            />
          </div>
        </div>

        <div className="grid grid-2">
          {proyectosFiltrados.map((p) => {
            const isCurrent = p.id === proyectoActivo.id;
            return (
              <article
                key={p.id}
                className={`enterprise-project-card ${isCurrent ? "is-selected-card" : ""}`}
              >
                <div className="card-top-row">
                  <div className="card-id-badge">
                    <FolderKanban size={15} />
                    <span>{p.id}</span>
                  </div>
                  <div className="card-badges">
                    {isCurrent && (
                      <span className="badge-active-pill">
                        <CheckCircle2 size={12} /> Activo
                      </span>
                    )}
                    <Status estado={p.estado} />
                  </div>
                </div>

                <h3 className="card-project-title">{p.nombre}</h3>
                <p className="card-project-desc">{p.descripcion}</p>

                <div className="card-specs-grid">
                  <div className="spec-item">
                    <span className="spec-label">Arquitectura</span>
                    <span className="spec-value">{p.arquitectura}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Modelos Registrados</span>
                    <span className="spec-value">{p.modelos}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Dataset</span>
                    <span className="spec-value">{p.datasetPrincipal || "Asignado"}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Objetivo</span>
                    <span className="spec-value">{p.precisionObjetivo || 95}% acc</span>
                  </div>
                </div>

                <div className="card-footer-actions">
                  {/* BOTÓN PRINCIPAL REQUERIDO: ABRIR AL SITIO DE TRABAJO EN DISEÑO DE REDES */}
                  <button
                    type="button"
                    className="btn-primary btn-sm"
                    onClick={() => {
                      setProyectoActivo(p);
                      abrirSitioTrabajo(p);
                    }}
                    title="Abrir este proyecto en el Diseñador de Redes"
                  >
                    <Network size={14} />
                    <span>Abrir en Diseño de Redes</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    type="button"
                    className="btn-secondary btn-sm"
                    onClick={() => setProyectoDetalle(p)}
                  >
                    <Info size={14} />
                    <span>Detalles</span>
                  </button>

                  {proyectos.length > 1 && (
                    <button
                      type="button"
                      className="btn-danger btn-icon-only"
                      onClick={() => {
                        if (confirm(`¿Deseas eliminar el proyecto "${p.nombre}"?`)) {
                          eliminarProyecto(p.id);
                        }
                      }}
                      title="Eliminar proyecto"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {proyectosFiltrados.length === 0 && (
          <div className="empty-state-panel">
            <FolderKanban size={36} />
            <p>No se encontraron proyectos con ese criterio de búsqueda.</p>
          </div>
        )}
      </section>

      {/* MODAL CREAR PROYECTO */}
      {mostrarModalCrear && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Crear Nuevo Proyecto</h3>
              <button
                type="button"
                className="btn-close"
                onClick={() => setMostrarModalCrear(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Nombre del Proyecto *</label>
                <input
                  type="text"
                  placeholder="Ej. Clasificación Satelital de Cultivos"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Arquitectura Neuronal Inicial</label>
                <select
                  value={arquitectura}
                  onChange={(e) => setArquitectura(e.target.value)}
                >
                  <option value="CNN">CNN — Red Neuronal Convolucional (Imágenes/Visión)</option>
                  <option value="RNN">RNN / LSTM — Red Neuronal Recurrente (Series temporales)</option>
                  <option value="Feedforward">Feedforward / MLP — Perceptrón Multicapa</option>
                  <option value="Transformer">Transformer / Attention (NLP y Secuencias)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Descripción del Objetivo de Investigación</label>
                <textarea
                  rows={3}
                  placeholder="Describe el problema que resuelve y las metas de precisión..."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setMostrarModalCrear(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={handleCrear}
                disabled={!nombre.trim()}
              >
                <Plus size={16} />
                <span>Crear Proyecto y Configurar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DETALLES DEL PROYECTO */}
      {proyectoDetalle && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <div className="modal-title-with-badge">
                <div className="hero-id-chip">{proyectoDetalle.id}</div>
                <h3>{proyectoDetalle.nombre}</h3>
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={() => setProyectoDetalle(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <p className="modal-description">{proyectoDetalle.descripcion}</p>

              <div className="details-info-table">
                <div className="detail-row">
                  <span className="detail-key">Arquitectura:</span>
                  <span className="detail-val font-semibold">{proyectoDetalle.arquitectura}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-key">Estado:</span>
                  <span className="detail-val"><Status estado={proyectoDetalle.estado} /></span>
                </div>
                <div className="detail-row">
                  <span className="detail-key">Dataset Vinculado:</span>
                  <span className="detail-val">{proyectoDetalle.datasetPrincipal || "DS-001"}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-key">Modelos Registrados:</span>
                  <span className="detail-val">{proyectoDetalle.modelos} modelos</span>
                </div>
                <div className="detail-row">
                  <span className="detail-key">Responsable:</span>
                  <span className="detail-val">{proyectoDetalle.responsable || "Diego Morales"}</span>
                </div>
              </div>

              <div className="modal-action-box">
                <h4>Espacio de Trabajo Asignado</h4>
                <p>Al abrir el sitio de trabajo podrás diseñar y editar la topología de la red:</p>
                <button
                  type="button"
                  className="btn-primary w-full"
                  onClick={() => {
                    abrirSitioTrabajo(proyectoDetalle);
                    setProyectoDetalle(null);
                  }}
                >
                  <Network size={16} />
                  <span>Ir al Diseñador de Redes (Sitio de Trabajo)</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setProyectoDetalle(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
