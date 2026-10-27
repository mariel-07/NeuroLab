import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import Status from "../components/Status";
import StatCard from "../components/StatCard";
import { useApp } from "../context/AppContext";
import {
  Activity,
  Play,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Plus,
  Network,
  Database,
  BarChart3,
  Cpu,
  Clock,
  Zap,
} from "lucide-react";

export default function Entrenamientos() {
  const {
    entrenamientos,
    iniciarEntrenamiento,
    completarEntrenamiento,
    proyectoActivo,
    datasetActivo,
    arquitecturaConfig,
    navegar,
    mostrarNotificacion,
  } = useApp();

  const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);
  const [nombreJob, setNombreJob] = useState(`CNN Training Run #${entrenamientos.length + 1}`);
  const [epocasInput, setEpocasInput] = useState(60);

  return (
    <>
      <SectionTitle
        titulo="Entrenamientos y Optimización"
        descripcion="Ejecuta y monitorea jobs de entrenamiento en clúster GPU mediante descenso de gradiente y backpropagation."
        badge={`${entrenamientos.length} Procesos`}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navegar("DisenadorRedes")}
          >
            <Network size={16} />
            <span>Ajustar Arquitectura</span>
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={() => navegar("EvaluacionMetricas")}
          >
            <BarChart3 size={16} />
            <span>Ver Métricas y Evaluación</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </SectionTitle>

      {/* Tarjeta de Relación entre Módulos */}
      <div className="module-relation-card">
        <div className="module-relation-icon">
          <Activity size={20} />
        </div>
        <div className="module-relation-body">
          <h4>Vínculo en el Flujo de Trabajo</h4>
          <p>
            Este módulo toma la <strong>Arquitectura de Red</strong> compilada en el Diseñador ({arquitecturaConfig.tipo}, {arquitecturaConfig.capas} capas) y el <strong>Dataset Activo</strong> ({datasetActivo?.nombre}) para ejecutar el ajuste de pesos. Los resultados se validan a continuación en <strong>Evaluación y Métricas</strong>.
          </p>
        </div>
      </div>

      {/* Estadísticas de cómputo */}
      <div className="stats-grid">
        <StatCard
          titulo="Procesos Activos"
          valor={entrenamientos.filter((e) => e.estado === "En marcha").length}
          descripcion="Ejecutándose en GPU Cluster"
          icono={Zap}
        />
        <StatCard
          titulo="Completados Exitosos"
          valor={entrenamientos.filter((e) => e.estado === "Completado").length}
          descripcion="Con métricas listas para validar"
          icono={CheckCircle2}
        />
        <StatCard
          titulo="GPU Asignada"
          valor="NVIDIA A100"
          descripcion="80GB VRAM · FP16 Tensor Cores"
          icono={Cpu}
        />
        <StatCard
          titulo="Tasa de Error Media"
          valor="Loss: 0.08"
          descripcion="Convergencia en últimas 50 épocas"
          icono={Activity}
        />
      </div>

      {/* LISTA DE ENTRENAMIENTOS */}
      <div className="grid grid-2">
        {entrenamientos.map((job) => {
          const isDone = job.estado === "Completado";
          const isRunning = job.estado === "En marcha";

          return (
            <article className="panel training-card" key={job.id}>
              <div className="panel-header">
                <div>
                  <div className="training-title-row">
                    <span className="id-chip">{job.id}</span>
                    <h3 className="training-title">{job.modelo}</h3>
                  </div>
                  <p className="training-subtitle">
                    {job.arquitectura || "CNN"} · Dataset: {job.dataset || "DS-001"}
                  </p>
                </div>
                <Status estado={job.estado} />
              </div>

              {/* Indicadores de rendimiento del job */}
              <div className="training-metrics-row">
                <div className="metric-pill">
                  <Clock size={13} />
                  <span>{job.epocas} épocas</span>
                </div>
                {job.accuracy && (
                  <div className="metric-pill positive">
                    <span>Precisión: <strong>{job.accuracy}%</strong></span>
                  </div>
                )}
                {job.loss !== undefined && (
                  <div className="metric-pill">
                    <span>Loss: <strong>{job.loss}</strong></span>
                  </div>
                )}
              </div>

              {/* Barra de Progreso Empresarial */}
              <div className="job-progress-wrapper-large">
                <div className="progress-text-row">
                  <span className="progress-label">Progreso de Optimización</span>
                  <span className="progress-percentage">{job.progreso}%</span>
                </div>
                <div className="job-progress-bar-bg">
                  <div
                    className={`job-progress-bar-fill ${isRunning ? "progress-animated" : ""}`}
                    style={{ width: `${job.progreso}%` }}
                  />
                </div>
              </div>

              {/* Botones de acción del entrenamiento */}
              <div className="card-actions-row">
                {!isRunning && !isDone && (
                  <button
                    type="button"
                    className="btn-primary btn-sm"
                    onClick={() => iniciarEntrenamiento(job.id)}
                  >
                    <Play size={14} />
                    <span>Iniciar Entrenamiento GPU</span>
                  </button>
                )}

                {isRunning && (
                  <button
                    type="button"
                    className="btn-success btn-sm"
                    onClick={() => completarEntrenamiento(job.id)}
                  >
                    <CheckCircle2 size={14} />
                    <span>Finalizar Simulación (100%)</span>
                  </button>
                )}

                {isDone && (
                  <button
                    type="button"
                    className="btn-primary btn-sm"
                    onClick={() => navegar("EvaluacionMetricas")}
                  >
                    <BarChart3 size={14} />
                    <span>Examinar Métricas del Modelo</span>
                    <ArrowRight size={13} />
                  </button>
                )}

                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  onClick={() =>
                    mostrarNotificacion(
                      `Logs de consola para ${job.id}: Optimizador Adam converging gracefully at lr=0.001. Epoch ${job.epocas}/${job.epocas}.`,
                      "info"
                    )
                  }
                >
                  <span>Ver Logs</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

