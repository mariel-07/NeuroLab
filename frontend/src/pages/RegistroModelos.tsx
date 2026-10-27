import SectionTitle from "../components/SectionTitle";
import Status from "../components/Status";
import StatCard from "../components/StatCard";
import { useApp } from "../context/AppContext";
import {
  Layers,
  Download,
  CheckCircle2,
  Cpu,
  ArrowRight,
  HardDrive,
  Zap,
  Network,
  Info,
} from "lucide-react";

export default function RegistroModelos() {
  const { modelos, proyectoActivo, abrirSitioTrabajo, mostrarNotificacion } = useApp();

  function exportarPesos(nombre: string, formato: string) {
    mostrarNotificacion(
      `Generando artefacto binario para "${nombre}" en formato ${formato}... Descarga simulada lista.`,
      "success"
    );
  }

  return (
    <>
      <SectionTitle
        titulo="Registro de Modelos (Model Registry)"
        descripcion="Repositorio empresarial de modelos certificados, versionados y listos para inferencia en producción."
        badge={`${modelos.length} Modelos en Catálogo`}
      >
        <button
          type="button"
          className="btn-primary"
          onClick={() => abrirSitioTrabajo(proyectoActivo)}
        >
          <Network size={16} />
          <span>Diseñar Nueva Versión de Red</span>
          <ArrowRight size={16} />
        </button>
      </SectionTitle>

      {/* Relación con otros módulos */}
      <div className="module-relation-card">
        <div className="module-relation-icon">
          <Info size={20} />
        </div>
        <div className="module-relation-body">
          <h4>Destino Final del Flujo de Trabajo MLOps</h4>
          <p>
            El <strong>Model Registry</strong> almacena las arquitecturas ya optimizadas en <strong>Entrenamientos</strong> y validadas en <strong>Métricas</strong>. Desde aquí los ingenieros de software pueden descargar los pesos binarios en ONNX o PyTorch para integrarlos en aplicaciones finales.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          titulo="Modelos Certificados"
          valor={modelos.filter((m) => m.estado === "Validado").length}
          descripcion="Listos para despliegue en línea"
          icono={CheckCircle2}
        />
        <StatCard
          titulo="Latencia Media de Inferencia"
          valor="14.2 ms"
          descripcion="Evaluado en acelerador Edge AI"
          icono={Zap}
        />
        <StatCard
          titulo="Formatos Soportados"
          valor="ONNX / PT / TF"
          descripcion="Multiplataforma y C++ Runtime"
          icono={HardDrive}
        />
        <StatCard
          titulo="Proyecto Vinculado"
          valor={proyectoActivo.id}
          descripcion={proyectoActivo.nombre}
          icono={Layers}
        />
      </div>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h3>Catálogo de Modelos Registrados</h3>
            <p>Historial de versiones y binarios de pesos.</p>
          </div>
        </div>

        <div className="table-container">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre del Modelo</th>
                <th>Versión</th>
                <th>Arquitectura</th>
                <th>Precisión</th>
                <th>Latencia</th>
                <th>Tamaño</th>
                <th>Estado</th>
                <th style={{ textAlign: "right" }}>Exportar</th>
              </tr>
            </thead>
            <tbody>
              {modelos.map((m) => (
                <tr key={m.id}>
                  <td>
                    <span className="id-chip">{m.id}</span>
                  </td>
                  <td>
                    <strong>{m.nombre}</strong>
                  </td>
                  <td>
                    <span className="version-pill">v{m.version}</span>
                  </td>
                  <td>{m.arquitectura}</td>
                  <td>
                    <strong className="text-primary">{m.precision}%</strong>
                  </td>
                  <td>{m.latenciaMs || 15} ms</td>
                  <td>{m.tamanioMb || 45} MB</td>
                  <td>
                    <Status estado={m.estado} />
                  </td>
                  <td>
                    <div className="table-actions-cell" style={{ justifyContent: "flex-end" }}>
                      <button
                        type="button"
                        className="btn-secondary btn-sm"
                        onClick={() => exportarPesos(m.nombre, m.formatoExport || "ONNX")}
                        title="Descargar pesos para inferencia"
                      >
                        <Download size={14} />
                        <span>Exportar ({m.formatoExport || "ONNX"})</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

