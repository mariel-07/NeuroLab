import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import Status from "../components/Status";
import StatCard from "../components/StatCard";
import { useApp } from "../context/AppContext";
import { Dataset } from "../types";
import {
  Database,
  Plus,
  UploadCloud,
  FileSpreadsheet,
  Network,
  Trash2,
  CheckCircle2,
  Layers,
  HardDrive,
  Table as TableIcon,
  ArrowRight,
  Sparkles,
  FileCheck,
  Search,
} from "lucide-react";

export default function Datasets() {
  const {
    datasets,
    agregarDataset,
    eliminarDataset,
    datasetActivo,
    setDatasetActivo,
    proyectoActivo,
    abrirSitioTrabajo,
  } = useApp();

  const [busqueda, setBusqueda] = useState("");
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [datasetDetalle, setDatasetDetalle] = useState<Dataset | null>(null);

  // Campos para el formulario manual
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("Para Analizar (Diagnóstico)");
  const [formato, setFormato] = useState("CSV");
  const [registros, setRegistros] = useState<number>(3200);
  const [descripcion, setDescripcion] = useState("");
  const [archivoNombre, setArchivoNombre] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);

  // Procesamiento en vivo de archivos reales (CSV u otros)
  function procesarArchivo(archivo?: File) {
    if (!archivo) return;
    setArchivoNombre(archivo.name);
    const nombreSugerido = archivo.name.replace(/\.[^/.]+$/, "");
    if (!nombre) setNombre(nombreSugerido);

    if (archivo.name.toLowerCase().endsWith(".csv")) {
      const lector = new FileReader();
      lector.onload = () => {
        const lineas = String(lector.result || "").split(/\r?\n/).filter((l) => l.trim().length > 0);
        if (lineas.length > 0) {
          const encabezados = lineas[0].split(",").map((c) => c.trim().replace(/^["']|["']$/g, ""));
          const cantidadFilas = Math.max(0, lineas.length - 1);
          setRegistros(cantidadFilas);
          setFormato("CSV");
          setTipo(`Para Analizar (${encabezados.length} variables)`);

          agregarDataset({
            nombre: archivo.name,
            tipo: `Para Analizar (${encabezados.length} atributos)`,
            formato: "CSV",
            registros: cantidadFilas || 1200,
            tamanio: `${(archivo.size / 1024).toFixed(1)} KB`,
            columnas: encabezados,
            descripcion: `Dataset CSV "${archivo.name}" cargado para análisis e inferencia con ${encabezados.length} atributos y ${cantidadFilas} filas.`,
            estado: "Listo para Analizar",
          });
        }
      };
      lector.readAsText(archivo);
    } else {
      const extension = archivo.name.split(".").pop()?.toUpperCase() || "BIN";
      setFormato(extension);
      agregarDataset({
        nombre: archivo.name,
        tipo: "Para Analizar (Imágenes / Lote)",
        formato: extension,
        registros: 1500,
        tamanio: `${(archivo.size / (1024 * 1024)).toFixed(2)} MB`,
        descripcion: `Archivo "${archivo.name}" cargado para análisis en la red neuronal.`,
        estado: "Listo para Analizar",
      });
    }
  }

  function handleGuardarManual() {
    if (!nombre.trim()) return;

    agregarDataset({
      nombre: nombre.trim(),
      tipo,
      formato,
      registros: Number(registros) || 1000,
      tamanio: "150 MB",
      columnas: ["sample_id", "feature_1", "feature_2", "prediction_label"],
      descripcion: descripcion.trim() || `Dataset configurado para pruebas y análisis en la red.`,
      estado: "Disponible",
    });

    setNombre("");
    setDescripcion("");
    setArchivoNombre("");
    setMostrarModalAgregar(false);
  }

  const filtrados = datasets.filter((d) =>
    `${d.nombre} ${d.id} ${d.formato} ${d.tipo || ""}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const totalRegistros = datasets.reduce((acc, d) => acc + d.registros, 0);

  return (
    <>
      <SectionTitle
        titulo="Gestión de Datasets"
        descripcion="Administra el dataset predeterminado de entrenamiento y el dataset para análisis e inferencia."
        badge={`${datasets.length} Datasets en Catálogo`}
      >
        <button
          type="button"
          className="btn-primary"
          onClick={() => setMostrarModalAgregar(true)}
        >
          <Plus size={16} />
          <span>+ Agregar Dataset Manual</span>
        </button>
      </SectionTitle>

      {/* MÉTRICAS CLAVE */}
      <div className="stats-grid">
        <StatCard
          titulo="Datasets Registrados"
          valor={datasets.length}
          descripcion="1 Predeterminado + 1 Para Analizar"
          icono={Database}
        />
        <StatCard
          titulo="Total Muestras / Registros"
          valor={totalRegistros.toLocaleString()}
          descripcion="Datos combinados en clúster"
          icono={Layers}
        />
        <StatCard
          titulo="Dataset en Uso"
          valor={datasetActivo ? datasetActivo.id : "Ninguno"}
          descripcion={datasetActivo ? datasetActivo.nombre : "Selecciona uno"}
          icono={Sparkles}
        />
        <StatCard
          titulo="Proyecto Vinculado"
          valor={proyectoActivo ? proyectoActivo.id : "PRJ-001"}
          descripcion={proyectoActivo ? proyectoActivo.nombre : "Computer Vision Lab"}
          icono={HardDrive}
        />
      </div>

      {/* ZONA DE CARGA PARA AGREGAR NUEVO DATASET */}
      <div
        className={`upload-dropzone-hero ${isDragging ? "dropzone-dragging" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) procesarArchivo(file);
        }}
        style={{ padding: "30px 20px" }}
      >
        <div className="dropzone-icon-circle" style={{ width: 54, height: 54, marginBottom: 10 }}>
          <UploadCloud size={28} />
        </div>
        <h3 style={{ fontSize: 16 }}>¿Deseas subir otro archivo de dataset?</h3>
        <p style={{ margin: "0 0 14px", fontSize: 12 }}>
          Arrastra y suelta tu archivo <strong>CSV</strong>, <strong>Parquet</strong> o <strong>ZIP</strong> para agregarlo inmediatamente al catálogo.
        </p>

        <div className="dropzone-actions">
          <input
            type="file"
            id="mainFileInput"
            accept=".csv,.parquet,.json,.zip,.txt"
            onChange={(e) => procesarArchivo(e.target.files?.[0])}
            style={{ display: "none" }}
          />
          <label htmlFor="mainFileInput" className="btn-secondary btn-sm">
            <FileSpreadsheet size={16} />
            <span>Seleccionar archivo desde mi equipo</span>
          </label>
        </div>

        {archivoNombre && (
          <div className="file-ready-banner" style={{ marginTop: 10 }}>
            <FileCheck size={16} color="#16a34a" />
            <span>
              Archivo cargado: <strong>{archivoNombre}</strong> ({registros.toLocaleString()} filas)
            </span>
          </div>
        )}
      </div>

      {/* TABLA PRINCIPAL DE DATASETS */}
      <section className="panel">
        <div className="panel-header">
          <div>
            <h3>Conjuntos de Datos Disponibles</h3>
            <p>Dataset predeterminado configurado para entrenamiento y lote para análisis/inferencia.</p>
          </div>

          <div className="search-filter-wrapper">
            <input
              type="search"
              placeholder="Buscar dataset por nombre o formato..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="search-input-field"
            />
          </div>
        </div>

        <div className="table-container">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre del Dataset</th>
                <th>Rol / Tipo</th>
                <th>Registros</th>
                <th>Formato</th>
                <th>Tamaño</th>
                <th>Estado</th>
                <th style={{ textAlign: "right" }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((d) => {
                const esActivo = datasetActivo?.id === d.id;
                const esParaAnalizar = d.tipo?.toLowerCase().includes("analizar");

                return (
                  <tr key={d.id} className={esActivo ? "row-highlight" : ""}>
                    <td>
                      <span className="id-chip">{d.id}</span>
                    </td>
                    <td>
                      <div className="table-title-cell">
                        <strong>{d.nombre}</strong>
                        {esActivo && (
                          <span className="badge-active-pill" style={{ marginLeft: 6 }}>
                            <CheckCircle2 size={11} /> Seleccionado
                          </span>
                        )}
                        <span className="table-subtext">{d.descripcion}</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className="tag-pill"
                        style={{
                          background: esParaAnalizar ? "#fef3c7" : "#eff6ff",
                          color: esParaAnalizar ? "#92400e" : "#1e40af",
                          fontWeight: 600,
                        }}
                      >
                        {d.tipo}
                      </span>
                    </td>
                    <td>
                      <strong className="records-count">{d.registros.toLocaleString()}</strong>
                      <span className="table-subtext">muestras</span>
                    </td>
                    <td>
                      <span className="format-badge">{d.formato}</span>
                    </td>
                    <td>{d.tamanio || "150 MB"}</td>
                    <td>
                      <Status estado={d.estado} />
                    </td>
                    <td>
                      <div className="table-actions-cell" style={{ justifyContent: "flex-end" }}>
                        <button
                          type="button"
                          className="btn-primary btn-sm"
                          onClick={() => {
                            setDatasetActivo(d);
                            abrirSitioTrabajo(proyectoActivo || undefined);
                          }}
                          title={esParaAnalizar ? "Analizar este lote en la red" : "Diseñar red con este dataset"}
                        >
                          <Network size={14} />
                          <span>{esParaAnalizar ? "Analizar en Red" : "Diseñar Red"}</span>
                          <ArrowRight size={13} />
                        </button>

                        <button
                          type="button"
                          className="btn-secondary btn-sm"
                          onClick={() => {
                            setDatasetActivo(d);
                            setDatasetDetalle(d);
                          }}
                        >
                          <TableIcon size={14} />
                          <span>Detalles</span>
                        </button>

                        {datasets.length > 2 && (
                          <button
                            type="button"
                            className="btn-danger btn-icon-only"
                            onClick={() => {
                              if (confirm(`¿Eliminar el dataset "${d.nombre}"?`)) {
                                eliminarDataset(d.id);
                              }
                            }}
                            title="Eliminar dataset"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL AGREGAR DATASET MANUAL */}
      {mostrarModalAgregar && (
        <div className="modal-backdrop">
          <div className="modal-card modal-lg">
            <div className="modal-header">
              <div className="modal-title-with-badge">
                <Database size={20} className="text-primary" />
                <h3>Agregar Nuevo Dataset al Catálogo</h3>
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={() => setMostrarModalAgregar(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="grid grid-2">
                <div className="form-group">
                  <label>Nombre del Dataset *</label>
                  <input
                    type="text"
                    placeholder="Ej. Lote de Telemetría Térmica"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Rol / Tipo de Dataset</label>
                  <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    <option value="Para Analizar (Diagnóstico)">Para Analizar (Inferencia y Diagnóstico)</option>
                    <option value="Predeterminado (Entrenamiento)">Predeterminado (Entrenamiento de Pesos)</option>
                    <option value="Validación Cruzada">Validación Cruzada / Test Set</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Formato de Almacenamiento</label>
                  <select value={formato} onChange={(e) => setFormato(e.target.value)}>
                    <option value="CSV">CSV (Valores separados por comas)</option>
                    <option value="CSV + Imágenes (PNG)">CSV + Lote de Imágenes (PNG)</option>
                    <option value="Parquet">Apache Parquet</option>
                    <option value="JSON">JSON / JSONL</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Número de Registros / Muestras</label>
                  <input
                    type="number"
                    min="1"
                    value={registros}
                    onChange={(e) => setRegistros(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Descripción y notas</label>
                <textarea
                  rows={2}
                  placeholder="Detalles sobre las variables y el propósito del dataset..."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setMostrarModalAgregar(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={handleGuardarManual}
                disabled={!nombre.trim()}
              >
                <Plus size={16} />
                <span>Guardar Dataset</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DETALLES DEL DATASET */}
      {datasetDetalle && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <div className="modal-title-with-badge">
                <span className="id-chip">{datasetDetalle.id}</span>
                <h3>{datasetDetalle.nombre}</h3>
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={() => setDatasetDetalle(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <p className="modal-description">{datasetDetalle.descripcion}</p>

              <div className="details-info-table">
                <div className="detail-row">
                  <span className="detail-key">Propósito:</span>
                  <span className="detail-val font-semibold">{datasetDetalle.tipo}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-key">Muestras / Filas:</span>
                  <span className="detail-val font-semibold">{datasetDetalle.registros.toLocaleString()}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-key">Formato:</span>
                  <span className="detail-val">{datasetDetalle.formato}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-key">Tamaño:</span>
                  <span className="detail-val">{datasetDetalle.tamanio}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-key">Estado:</span>
                  <span className="detail-val"><Status estado={datasetDetalle.estado} /></span>
                </div>
              </div>

              <div className="modal-action-box">
                <h4>Acción con Diseñador de Redes</h4>
                <p>Abre el diseñador para trabajar con este dataset:</p>
                <button
                  type="button"
                  className="btn-primary w-full"
                  onClick={() => {
                    setDatasetActivo(datasetDetalle);
                    abrirSitioTrabajo(proyectoActivo || undefined);
                    setDatasetDetalle(null);
                  }}
                >
                  <Network size={16} />
                  <span>Abrir en Diseñador de Redes</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setDatasetDetalle(null)}
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
