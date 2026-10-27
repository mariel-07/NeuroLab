import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { useApp } from "../context/AppContext";
import {
  Network,
  Database,
  Play,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Sliders,
  CheckCircle2,
  Sparkles,
  FolderKanban,
  Zap,
  UploadCloud,
} from "lucide-react";

interface LayerItem {
  id: string;
  tipo: string;
  unidades: number;
  activacion: string;
  kernel?: string;
  dropout?: number;
}

export default function DisenadorRedes() {
  const {
    proyectoActivo,
    datasetActivo,
    arquitecturaConfig,
    setArquitecturaConfig,
    navegar,
    mostrarNotificacion,
    crearEntrenamiento,
  } = useApp();

  const [tipoRed, setTipoRed] = useState(arquitecturaConfig.tipo);
  const [optimizador, setOptimizador] = useState(arquitecturaConfig.optimizador || "Adam");
  const [learningRate, setLearningRate] = useState(arquitecturaConfig.learningRate || 0.001);
  const [tamLote, setTamLote] = useState(arquitecturaConfig.tamLote || 32);

  // Lista de capas interactivas
  const [capas, setCapas] = useState<LayerItem[]>([
    { id: "layer-1", tipo: "Dense", unidades: 64, activacion: "ReLU" },
    { id: "layer-2", tipo: "Dense", unidades: 32, activacion: "ReLU" },
    { id: "layer-3", tipo: "Dropout", unidades: 32, activacion: "None", dropout: 0.2 },
  ]);

  function agregarCapa(tipo: string) {
    const nueva: LayerItem = {
      id: `layer-${Date.now()}`,
      tipo,
      unidades: tipo === "Dense" ? 64 : 32,
      activacion: tipo === "Dropout" ? "None" : "ReLU",
      kernel: tipo === "Conv2D" ? "3x3" : undefined,
      dropout: tipo === "Dropout" ? 0.2 : undefined,
    };
    setCapas((prev) => [...prev, nueva]);
    mostrarNotificacion(`Capa ${tipo} añadida a la arquitectura.`, "info");
  }

  function eliminarCapa(id: string) {
    if (capas.length <= 1) {
      mostrarNotificacion("La red debe conservar al menos 1 capa intermedia.", "warning");
      return;
    }
    setCapas((prev) => prev.filter((c) => c.id !== id));
  }

  function handleGuardarYPasarEntrenamiento() {
    setArquitecturaConfig({
      tipo: tipoRed,
      capas: capas.length,
      neuronas: capas[capas.length - 1]?.unidades || 64,
      activacion: "ReLU",
      learningRate,
      optimizador,
      tamLote,
    });

    crearEntrenamiento(50);
  }

  // Estimación de parámetros
  const totalParametros = capas.reduce((acc, c) => {
    if (c.tipo === "Conv2D") return acc + c.unidades * 9 * 3 + c.unidades;
    if (c.tipo === "Dense") return acc + c.unidades * 32 + c.unidades;
    return acc;
  }, 12500);

  // Si no hay dataset cargado
  if (!datasetActivo) {
    return (
      <>
        <SectionTitle
          titulo="Diseñador de Redes (Sitio de Trabajo)"
          descripcion="Configura la topología de la red neuronal adaptada a tus datos."
          badge="En espera de archivo"
        />

        <div className="empty-state-panel panel" style={{ padding: "60px 20px" }}>
          <Database size={52} style={{ color: "#2563eb", marginBottom: 12 }} />
          <h3>No hay un dataset activo en el flujo</h3>
          <p style={{ maxWidth: 540, textAlign: "center" }}>
            El diseñador de redes necesita un archivo de datos para determinar las dimensiones de entrada y configurar la red. Carga tu archivo en el módulo de <strong>Datasets</strong> para comenzar.
          </p>
          <button
            type="button"
            className="btn-primary btn-large"
            onClick={() => navegar("Datasets")}
            style={{ marginTop: 12 }}
          >
            <UploadCloud size={18} />
            <span>Ir a Datasets para Cargar Archivo</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <SectionTitle
        titulo="Diseñador de Redes Neuronales"
        descripcion="Sitio de trabajo principal. Configura la arquitectura neuronal para procesar el dataset cargado."
        badge={`Dataset: ${datasetActivo.nombre}`}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navegar("Datasets")}
          >
            <ArrowLeft size={16} />
            <span>Cambiar Dataset</span>
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={handleGuardarYPasarEntrenamiento}
          >
            <Play size={16} />
            <span>Guardar y Pasar a Entrenamiento</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </SectionTitle>

      {/* Banner del espacio de trabajo vinculado al dataset */}
      <div className="workspace-hero-banner">
        <div className="banner-left-info">
          <span className="banner-context-label">SITIO DE TRABAJO ACTIVO</span>
          <h2 className="banner-project-title">
            <FolderKanban size={20} style={{ display: "inline", verticalAlign: "middle", marginRight: 8 }} />
            {proyectoActivo ? proyectoActivo.nombre : `Proyecto para ${datasetActivo.nombre}`}
          </h2>
          <p className="banner-project-sub">
            Dataset activo: <strong>{datasetActivo.nombre}</strong> ({datasetActivo.registros.toLocaleString()} registros) · Formato: <strong>{datasetActivo.formato}</strong>
          </p>
        </div>

        <div className="banner-quick-links">
          <button
            type="button"
            className="btn-glass"
            onClick={() => navegar("Datasets")}
          >
            <Database size={14} />
            <span>Ver Archivo ({datasetActivo.id})</span>
          </button>
          <button
            type="button"
            className="btn-glass"
            onClick={() => navegar("Entrenamientos")}
          >
            <Zap size={14} />
            <span>Ver Entrenamientos</span>
          </button>
        </div>
      </div>

      <div className="designer-layout-grid">
        {/* PANEL IZQUIERDO: CONFIGURACIÓN */}
        <div className="designer-controls-column">
          <section className="panel">
            <div className="panel-section-header">
              <Sliders size={18} className="text-primary" />
              <h3>Hiperparámetros de la Red</h3>
            </div>

            <div className="form-group">
              <label>Tipo de Red Neuronal</label>
              <select
                value={tipoRed}
                onChange={(e) => setTipoRed(e.target.value)}
              >
                <option value="Feedforward MLP">Feedforward MLP (Totalmente Conectada - Ideal para Tabular/CSV)</option>
                <option value="CNN">CNN — Red Neuronal Convolucional (Imágenes/Visión)</option>
                <option value="RNN/LSTM">RNN / LSTM (Datos Secuenciales / Series)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Optimizador</label>
              <select
                value={optimizador}
                onChange={(e) => setOptimizador(e.target.value)}
              >
                <option value="Adam">Adam (Recomendado)</option>
                <option value="AdamW">AdamW</option>
                <option value="SGD">SGD con Momentum</option>
              </select>
            </div>

            <div className="grid grid-2">
              <div className="form-group">
                <label>Tasa de Aprendizaje (LR)</label>
                <input
                  type="number"
                  step="0.0001"
                  min="0.00001"
                  max="0.1"
                  value={learningRate}
                  onChange={(e) => setLearningRate(Number(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label>Tamaño de Lote (Batch)</label>
                <select
                  value={tamLote}
                  onChange={(e) => setTamLote(Number(e.target.value))}
                >
                  <option value={16}>16 muestras</option>
                  <option value={32}>32 muestras</option>
                  <option value={64}>64 muestras</option>
                </select>
              </div>
            </div>

            <div className="divider" />

            <div className="panel-section-header">
              <Plus size={18} className="text-primary" />
              <h4>Añadir Capa a la Red</h4>
            </div>

            <div className="layer-buttons-grid">
              <button
                type="button"
                className="btn-outline-layer"
                onClick={() => agregarCapa("Dense")}
              >
                + Capa Dense
              </button>
              <button
                type="button"
                className="btn-outline-layer"
                onClick={() => agregarCapa("Dropout")}
              >
                + Dropout (0.2)
              </button>
              <button
                type="button"
                className="btn-outline-layer"
                onClick={() => agregarCapa("Conv2D")}
              >
                + Capa Conv2D
              </button>
              <button
                type="button"
                className="btn-outline-layer"
                onClick={() => agregarCapa("MaxPooling2D")}
              >
                + MaxPooling
              </button>
            </div>

            <div className="summary-specs-box">
              <div className="spec-row">
                <span>Dataset fuente:</span>
                <strong>{datasetActivo.nombre}</strong>
              </div>
              <div className="spec-row">
                <span>Capas intermedias:</span>
                <strong>{capas.length} capas</strong>
              </div>
              <div className="spec-row">
                <span>Parámetros entrenables:</span>
                <strong className="text-primary">{totalParametros.toLocaleString()} pesos</strong>
              </div>
              <div className="spec-row">
                <span>Hardware:</span>
                <strong>Clúster GPU A100</strong>
              </div>
            </div>
          </section>
        </div>

        {/* PANEL DERECHO: CANVAS DE TOPOLOGÍA */}
        <div className="designer-canvas-column">
          <section className="panel canvas-panel">
            <div className="panel-header">
              <div>
                <h3>Topología de la Red para "{datasetActivo.nombre}"</h3>
                <p>Visualización del paso hacia adelante alimentado por tus datos.</p>
              </div>

              <div className="topology-badge">
                <Sparkles size={14} />
                <span>Lista para compilar</span>
              </div>
            </div>

            <div className="architecture-canvas">
              {/* NODO DE ENTRADA CON EL DATASET ACTIVO */}
              <div className="canvas-node node-input">
                <div className="node-icon-badge">
                  <Database size={16} />
                </div>
                <div className="node-content">
                  <div className="node-title">Capa de Entrada (Input Tensor)</div>
                  <div className="node-meta">
                    Alimentada por: <strong>{datasetActivo.nombre}</strong> ({datasetActivo.registros.toLocaleString()} muestras)
                  </div>
                </div>
                <div className="node-tag">{datasetActivo.formato} Input</div>
              </div>

              <div className="canvas-flow-line">
                <div className="flow-arrow">▼</div>
              </div>

              {/* CAPAS INTERMEDIAS */}
              {capas.map((c, index) => (
                <div key={c.id} className="canvas-layer-wrapper">
                  <div className="canvas-node node-hidden">
                    <div className="node-index-pill">{index + 1}</div>
                    <div className="node-content">
                      <div className="node-title">
                        {c.tipo}
                        {c.kernel && <span className="kernel-tag">k: {c.kernel}</span>}
                      </div>
                      <div className="node-meta">
                        {c.tipo === "Dropout"
                          ? `Tasa de desconexión: ${c.dropout}`
                          : `${c.unidades} unidades · Activación: ${c.activacion}`}
                      </div>
                    </div>

                    <div className="node-actions">
                      <button
                        type="button"
                        className="btn-trash-micro"
                        onClick={() => eliminarCapa(c.id)}
                        title="Eliminar capa"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  <div className="canvas-flow-line">
                    <div className="flow-arrow">▼</div>
                  </div>
                </div>
              ))}

              {/* NODO DE SALIDA */}
              <div className="canvas-node node-output">
                <div className="node-icon-badge">
                  <CheckCircle2 size={16} />
                </div>
                <div className="node-content">
                  <div className="node-title">Capa de Salida (Output Layer)</div>
                  <div className="node-meta">
                    Capa de predicción adaptada a la tarea del dataset
                  </div>
                </div>
                <div className="node-tag">Predicción Final</div>
              </div>
            </div>

            <div className="canvas-footer-cta">
              <div className="canvas-footer-text">
                <strong>¿La arquitectura está lista?</strong>
                <span>Continuar hacia el entrenamiento de pesos en GPU con este dataset.</span>
              </div>
              <button
                type="button"
                className="btn-primary"
                onClick={handleGuardarYPasarEntrenamiento}
              >
                <Play size={16} />
                <span>Continuar a Entrenamiento</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

