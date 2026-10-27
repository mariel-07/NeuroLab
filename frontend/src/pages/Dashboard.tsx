import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import Status from "../components/Status";
import { useApp } from "../context/AppContext";
import { historialPerdida } from "../data/mockData";
import {
  FolderKanban,
  Activity,
  Network,
  Cpu,
  Server,
  HardDrive,
  Zap,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  Play,
  Layers,
  Database,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Dashboard() {
  const {
    proyectos,
    proyectoActivo,
    abrirSitioTrabajo,
    navegar,
    entrenamientos,
    datasets,
    modelos,
    iniciarEntrenamiento,
  } = useApp();

  const [tipoGrafico, setTipoGrafico] = useState<"loss" | "accuracy">("loss");

  return (
    <>
      <SectionTitle
        titulo="M01. Inicio / Dashboard"
        descripcion="• Resumen de proyectos  • Entrenamientos activos y recientes  • Indicadores de uso y alertas"
        badge="Vista General"
      >
        <button
          type="button"
          className="btn-primary"
          onClick={() => abrirSitioTrabajo(proyectoActivo)}
        >
          <Network size={16} />
          <span>Abrir Sitio de Trabajo (Diseño de Redes)</span>
          <ArrowRight size={16} />
        </button>
      </SectionTitle>

      {/* ========================================================
          1. RESUMEN DE PROYECTOS
          ======================================================== */}
      <section className="panel">
        <div className="panel-header">
          <div>
            <h3>• Resumen de proyectos</h3>
            <p>Espacios de investigación y configuración central del modelo activo.</p>
          </div>
          <button
            type="button"
            className="btn-secondary btn-sm"
            onClick={() => navegar("Proyectos")}
          >
            <FolderKanban size={14} />
            <span>Ver módulo de Proyectos</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="dashboard-project-box">
          <div className="project-highlight-header">
            <span className="id-chip">{proyectoActivo.id}</span>
            <h4>{proyectoActivo.nombre}</h4>
            <Status estado={proyectoActivo.estado} />
          </div>

          <p className="project-highlight-desc">
            {proyectoActivo.descripcion}
          </p>

          <div className="card-specs-grid">
            <div className="spec-item">
              <span className="spec-label">Proyectos Registrados</span>
              <span className="spec-value">{proyectos.length} (Proyecto principal)</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Arquitectura Neuronal</span>
              <span className="spec-value">{proyectoActivo.arquitectura}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Dataset Vinculado</span>
              <span className="spec-value">{proyectoActivo.datasetPrincipal}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Modelos Asociados</span>
              <span className="spec-value">{proyectoActivo.modelos} versiones en catálogo</span>
            </div>
          </div>

          <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => abrirSitioTrabajo(proyectoActivo)}
            >
              <Network size={16} />
              <span>Abrir Sitio de Trabajo (Diseño de Redes)</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => navegar("Datasets")}
            >
              <Database size={15} />
              <span>Ver Datasets ({datasets.length})</span>
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => navegar("RegistroModelos")}
            >
              <Layers size={15} />
              <span>Ver Modelos ({modelos.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. ENTRENAMIENTOS ACTIVOS Y RECIENTES
          ======================================================== */}
      <section className="panel">
        <div className="panel-header">
          <div>
            <h3>• Entrenamientos activos y recientes</h3>
            <p>Supervisión de procesos de backpropagation y convergencia en clúster GPU.</p>
          </div>
          <button
            type="button"
            className="btn-secondary btn-sm"
            onClick={() => navegar("Entrenamientos")}
          >
            <Activity size={14} />
            <span>Gestionar Entrenamientos</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="jobs-list">
          {entrenamientos.map((job) => {
            const isRunning = job.estado === "En marcha";
            const isDone = job.estado === "Completado";

            return (
              <div className="enterprise-job-item" key={job.id}>
                <div className="job-info-left">
                  <div className="job-name-row">
                    <strong>{job.modelo}</strong>
                    <span className="job-id-pill">{job.id}</span>
                    <span className="format-badge">{job.arquitectura || "CNN"}</span>
                  </div>

                  <div className="job-meta-row">
                    <span>
                      <Clock size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: 3 }} />
                      {job.epocas} épocas configuradas
                    </span>
                    <span>·</span>
                    <span>Dataset: {job.dataset}</span>
                    {job.accuracy ? (
                      <>
                        <span>·</span>
                        <span className="font-semibold" style={{ color: "#16a34a" }}>
                          Precisión: {job.accuracy}%
                        </span>
                      </>
                    ) : null}
                    {job.loss !== undefined && job.loss > 0 ? (
                      <>
                        <span>·</span>
                        <span>Loss: {job.loss}</span>
                      </>
                    ) : null}
                    <span>·</span>
                    <span>{job.duracionEstimada || "Procesando"}</span>
                  </div>

                  <div className="job-progress-wrapper">
                    <div className="job-progress-bar-bg">
                      <div
                        className={`job-progress-bar-fill ${isRunning ? "progress-animated" : ""}`}
                        style={{ width: `${job.progreso}%` }}
                      />
                    </div>
                    <span className="job-progress-number">{job.progreso}%</span>
                  </div>
                </div>

                <div className="job-info-right" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Status estado={job.estado} />

                  {!isRunning && !isDone && (
                    <button
                      type="button"
                      className="btn-primary btn-sm"
                      onClick={() => iniciarEntrenamiento(job.id)}
                    >
                      <Play size={13} />
                      <span>Iniciar</span>
                    </button>
                  )}

                  {isDone && (
                    <button
                      type="button"
                      className="btn-secondary btn-sm"
                      onClick={() => navegar("EvaluacionMetricas")}
                    >
                      <span>Métricas</span>
                      <ArrowRight size={12} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          3. INDICADORES DE USO Y ALERTAS + GRÁFICO DE PÉRDIDA
          ======================================================== */}
      <section className="panel">
        <div className="panel-header">
          <div>
            <h3>• Indicadores de uso y alertas</h3>
            <p>Curva de pérdida (Loss), telemetría de cómputo GPU y avisos del clúster.</p>
          </div>
          <span className="badge-active-pill">
            <CheckCircle2 size={12} /> Clúster GPU Listo (NVIDIA A100)
          </span>
        </div>

        {/* GRÁFICO DE PÉRDIDA Y PRECISIÓN (REQUERIMIENTO EXPLÍCITO) */}
        <div className="loss-chart-container">
          <div className="chart-header-row">
            <div className="chart-title-group">
              <div className="chart-icon-box">
                {tipoGrafico === "loss" ? (
                  <TrendingDown size={20} className="text-primary" />
                ) : (
                  <TrendingUp size={20} style={{ color: "#16a34a" }} />
                )}
              </div>
              <div>
                <h4 className="chart-title">
                  {tipoGrafico === "loss"
                    ? "Curva de Pérdida por Épocas (Training vs Validation Loss)"
                    : "Curva de Precisión y Convergencia (Accuracy %)"}
                </h4>
                <p className="chart-subtitle">
                  Evolución del modelo CNN Vision en 50 épocas con optimizador Adam (LR=0.001)
                </p>
              </div>
            </div>

            <div className="chart-toggle-buttons">
              <button
                type="button"
                className={`btn-sm ${tipoGrafico === "loss" ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setTipoGrafico("loss")}
              >
                <span>Curva de Pérdida (Loss)</span>
              </button>
              <button
                type="button"
                className={`btn-sm ${tipoGrafico === "accuracy" ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setTipoGrafico("accuracy")}
              >
                <span>Curva de Precisión (%)</span>
              </button>
            </div>
          </div>

          <div style={{ width: "100%", height: 260, marginTop: 12 }}>
            <ResponsiveContainer width="100%" height="100%">
              {tipoGrafico === "loss" ? (
                <AreaChart data={historialPerdida} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorValLoss" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="epoca" tick={{ fontSize: 11, fill: "#64748b" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} domain={[0, 1]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: 8,
                      color: "#ffffff",
                      fontSize: 12,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 6 }} />
                  <Area
                    type="monotone"
                    dataKey="loss"
                    name="Loss (Entrenamiento)"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorLoss)"
                  />
                  <Area
                    type="monotone"
                    dataKey="val_loss"
                    name="Val Loss (Validación)"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fillOpacity={1}
                    fill="url(#colorValLoss)"
                  />
                </AreaChart>
              ) : (
                <AreaChart data={historialPerdida} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="epoca" tick={{ fontSize: 11, fill: "#64748b" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} domain={[50, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: 8,
                      color: "#ffffff",
                      fontSize: 12,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 6 }} />
                  <Area
                    type="monotone"
                    dataKey="precision"
                    name="Precisión (%)"
                    stroke="#16a34a"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorAccuracy)"
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>

          <div className="chart-footer-stats">
            <div className="c-stat">
              <span className="c-stat-lbl">Pérdida Inicial</span>
              <strong className="c-stat-val">0.82</strong>
            </div>
            <div className="c-stat">
              <span className="c-stat-lbl">Pérdida Final (Loss)</span>
              <strong className="c-stat-val text-primary">0.08 (-90.2%)</strong>
            </div>
            <div className="c-stat">
              <span className="c-stat-lbl">Pérdida Validación</span>
              <strong className="c-stat-val" style={{ color: "#f59e0b" }}>0.11 (Estable)</strong>
            </div>
            <div className="c-stat">
              <span className="c-stat-lbl">Precisión Convergida</span>
              <strong className="c-stat-val" style={{ color: "#16a34a" }}>96.4% Accuracy</strong>
            </div>
          </div>
        </div>

        {/* TELEMETRÍA Y ALERTAS */}
        <div className="grid grid-2" style={{ marginTop: 20 }}>
          {/* Indicadores de hardware y uso */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <h4 style={{ margin: "0 0 4px", fontSize: 14, color: "#334155" }}>
              Indicadores de Cómputo (Clúster GPU/CPU)
            </h4>

            {/* GPU VRAM */}
            <div className="usage-indicator-card">
              <div className="usage-indicator-header">
                <div className="usage-label-group">
                  <Cpu size={16} className="text-primary" />
                  <strong>GPU VRAM (NVIDIA A100 80GB)</strong>
                </div>
                <span className="usage-val">24.6 / 80 GB (31%)</span>
              </div>
              <div className="job-progress-bar-bg" style={{ height: 8 }}>
                <div className="job-progress-bar-fill" style={{ width: "31%", background: "#2563eb" }} />
              </div>
            </div>

            {/* CPU Compute */}
            <div className="usage-indicator-card">
              <div className="usage-indicator-header">
                <div className="usage-label-group">
                  <Server size={16} className="text-primary" />
                  <strong>CPU Clúster (AMD EPYC 32 vCPUs)</strong>
                </div>
                <span className="usage-val">9 / 32 hilos (28%)</span>
              </div>
              <div className="job-progress-bar-bg" style={{ height: 8 }}>
                <div className="job-progress-bar-fill" style={{ width: "28%", background: "#0284c7" }} />
              </div>
            </div>

            {/* Almacenamiento NVMe */}
            <div className="usage-indicator-card">
              <div className="usage-indicator-header">
                <div className="usage-label-group">
                  <HardDrive size={16} className="text-primary" />
                  <strong>Almacenamiento NVMe Datasets</strong>
                </div>
                <span className="usage-val">1.4 / 10 TB (14%)</span>
              </div>
              <div className="job-progress-bar-bg" style={{ height: 8 }}>
                <div className="job-progress-bar-fill" style={{ width: "14%", background: "#16a34a" }} />
              </div>
            </div>

            {/* Latencia */}
            <div className="usage-indicator-card">
              <div className="usage-indicator-header">
                <div className="usage-label-group">
                  <Zap size={16} className="text-primary" />
                  <strong>Latencia de Inferencia Promedio</strong>
                </div>
                <span className="usage-val" style={{ color: "#16a34a", fontWeight: 700 }}>
                  14.2 ms / muestra (Aceleración TensorCore)
                </span>
              </div>
            </div>
          </div>

          {/* Panel de alertas del sistema */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h4 style={{ margin: "0 0 4px", fontSize: 14, color: "#334155" }}>
              Alertas y Avisos Operativos
            </h4>

            {/* Alerta 1 */}
            <div className="alert-item alert-item-success">
              <CheckCircle2 size={18} className="alert-item-icon" />
              <div className="alert-item-content">
                <strong>Clúster GPU Operativo</strong>
                <p>
                  El nodo principal NVIDIA A100 está asignado al proyecto <strong>{proyectoActivo.id}</strong>. Los 80GB de VRAM se encuentran listos para ejecución sin cuellos de botella.
                </p>
                <span className="alert-timestamp">Hace 5 minutos · Telemetría en tiempo real</span>
              </div>
            </div>

            {/* Alerta 2 */}
            <div className="alert-item alert-item-info">
              <Info size={18} className="alert-item-icon" />
              <div className="alert-item-content">
                <strong>Entrenamiento TR-002 en marcha</strong>
                <p>
                  El modelo <em>CNN Vision PCB v2.0</em> ha completado la época 68/100 con una pérdida estabilizada de 0.12 y 94.1% de precisión.
                </p>
                <span className="alert-timestamp">Hace 12 minutos · Clúster de entrenamiento</span>
              </div>
            </div>

            {/* Alerta 3 */}
            <div className="alert-item alert-item-warning">
              <AlertTriangle size={18} className="alert-item-icon" />
              <div className="alert-item-content">
                <strong>Dataset DS-001 Normalizado</strong>
                <p>
                  12,500 muestras verificadas y normalizadas. Se recomienda revisar la distribución de la clase minoritaria antes de reentrenar.
                </p>
                <span className="alert-timestamp">Hoy, 08:30 · Almacén de Datasets</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
