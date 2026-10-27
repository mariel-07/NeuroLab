import SectionTitle from "../components/SectionTitle";
import StatCard from "../components/StatCard";
import { useApp } from "../context/AppContext";
import {
  FileText,
  Download,
  Printer,
  CheckCircle2,
  FolderKanban,
  Database,
  Activity,
  Layers,
} from "lucide-react";

export default function Reportes() {
  const { proyectos, datasets, entrenamientos, modelos, proyectoActivo, mostrarNotificacion } = useApp();

  function exportarCSV() {
    const filas = [
      ["Tipo", "ID", "Nombre", "Estado", "Detalle"],
      ...proyectos.map((p) => ["Proyecto", p.id, p.nombre, p.estado, p.arquitectura]),
      ...datasets.map((d) => ["Dataset", d.id, d.nombre, d.estado, `${d.registros} registros`]),
      ...entrenamientos.map((e) => ["Entrenamiento", e.id, e.modelo, e.estado, `${e.progreso}%`]),
      ...modelos.map((m) => ["Modelo", m.id, m.nombre, m.estado, `${m.precision}% acc`]),
    ];

    const contenido = filas
      .map((fila) =>
        fila.map((valor) => `"${String(valor).replace(/"/g, '""')}"`).join(",")
      )
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + contenido], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = `neurolab-reporte-${proyectoActivo.id}.csv`;
    enlace.click();
    URL.revokeObjectURL(url);

    mostrarNotificacion("Reporte consolidado descargado exitosamente en formato CSV.", "success");
  }

  return (
    <>
      <SectionTitle
        titulo="Reportes y Auditoría MLOps"
        descripcion="Consolidado ejecutivo y exportable de todos los artefactos, entrenamientos y modelos de la organización."
        badge={`Auditoría: ${proyectoActivo.id}`}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => window.print()}
          >
            <Printer size={16} />
            <span>Imprimir / PDF</span>
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={exportarCSV}
          >
            <Download size={16} />
            <span>Exportar Reporte CSV</span>
          </button>
        </div>
      </SectionTitle>

      <div className="stats-grid">
        <StatCard
          titulo="Proyectos Activos"
          valor={proyectos.length}
          descripcion="Espacio de investigación"
          icono={FolderKanban}
        />
        <StatCard
          titulo="Datasets Registrados"
          valor={datasets.length}
          descripcion="Volumen procesado"
          icono={Database}
        />
        <StatCard
          titulo="Jobs de Entrenamiento"
          valor={entrenamientos.length}
          descripcion="Historial de backpropagation"
          icono={Activity}
        />
        <StatCard
          titulo="Modelos en Producción"
          valor={modelos.length}
          descripcion="Versiones disponibles"
          icono={Layers}
        />
      </div>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h3>Resumen Ejecutivo de la Suite</h3>
            <p>Estado actual de sincronización entre módulos para el proyecto {proyectoActivo.nombre}.</p>
          </div>
        </div>

        <div className="table-container">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Módulo</th>
                <th>Elemento Activo</th>
                <th>Parámetro Principal</th>
                <th>Estado Operativo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1. Proyecto Raíz</strong></td>
                <td>{proyectoActivo.nombre} ({proyectoActivo.id})</td>
                <td>Arquitectura: {proyectoActivo.arquitectura}</td>
                <td><span className="badge-active-pill"><CheckCircle2 size={12} /> Activo</span></td>
              </tr>
              <tr>
                <td><strong>2. Dataset Vinculado</strong></td>
                <td>{datasets[0]?.nombre || "Dataset"}</td>
                <td>{datasets[0]?.registros.toLocaleString()} muestras · {datasets[0]?.formato}</td>
                <td><span className="badge-active-pill"><CheckCircle2 size={12} /> Conectado</span></td>
              </tr>
              <tr>
                <td><strong>3. Red Neuronal</strong></td>
                <td>Topología CNN Compilada</td>
                <td>4 Capas Convolucionales + Dense</td>
                <td><span className="badge-active-pill"><CheckCircle2 size={12} /> Lista para Run</span></td>
              </tr>
              <tr>
                <td><strong>4. Último Entrenamiento</strong></td>
                <td>{entrenamientos[0]?.modelo}</td>
                <td>Loss: 0.08 · Accuracy: 96.4%</td>
                <td><span className="badge-active-pill"><CheckCircle2 size={12} /> Completado</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

