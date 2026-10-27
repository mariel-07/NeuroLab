import { createContext, useContext, useState, ReactNode } from "react";
import {
  Proyecto,
  Dataset,
  Entrenamiento,
  Modelo,
  ArquitecturaConfig,
} from "../types";
import {
  proyectos as proyectosMock,
  datasets as datasetsMock,
  entrenamientos as entrenamientosMock,
  modelos as modelosMock,
} from "../data/mockData";

interface AppContextType {
  pagina: string;
  navegar: (pagina: string) => void;
  proyectoActivo: Proyecto;
  setProyectoActivo: (p: Proyecto) => void;
  abrirSitioTrabajo: (proyecto?: Proyecto) => void;
  proyectos: Proyecto[];
  crearProyecto: (nuevo: Partial<Proyecto>) => Proyecto;
  eliminarProyecto: (id: string) => void;
  datasets: Dataset[];
  agregarDataset: (nuevo: Omit<Dataset, "id">) => Dataset;
  eliminarDataset: (id: string) => void;
  datasetActivo: Dataset;
  setDatasetActivo: (d: Dataset) => void;
  arquitecturaConfig: ArquitecturaConfig;
  setArquitecturaConfig: (conf: ArquitecturaConfig | ((prev: ArquitecturaConfig) => ArquitecturaConfig)) => void;
  entrenamientos: Entrenamiento[];
  crearEntrenamiento: (epocas?: number) => void;
  iniciarEntrenamiento: (id: string) => void;
  completarEntrenamiento: (id: string) => void;
  modelos: Modelo[];
  registrarModelo: (nuevo: Partial<Modelo>) => void;
  notificacion: { mensaje: string; tipo: "info" | "success" | "warning" | "danger" } | null;
  mostrarNotificacion: (mensaje: string, tipo?: "info" | "success" | "warning" | "danger") => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [pagina, setPagina] = useState<string>("Dashboard");

  // Inicia como antes con el proyecto predeterminado y los 2 datasets
  const [proyectosList, setProyectosList] = useState<Proyecto[]>(proyectosMock);
  const [proyectoActivo, setProyectoActivo] = useState<Proyecto>(proyectosMock[0]);

  const [datasetsList, setDatasetsList] = useState<Dataset[]>(datasetsMock);
  const [datasetActivo, setDatasetActivo] = useState<Dataset>(datasetsMock[0]);

  // Configuración de arquitectura neuronal
  const [arquitecturaConfig, setArquitecturaConfig] = useState<ArquitecturaConfig>({
    tipo: "CNN",
    capas: 4,
    neuronas: 128,
    activacion: "ReLU",
    learningRate: 0.001,
    optimizador: "Adam",
    tamLote: 32,
  });

  const [entrenamientosList, setEntrenamientosList] = useState<Entrenamiento[]>(entrenamientosMock);
  const [modelosList, setModelosList] = useState<Modelo[]>(modelosMock);

  const [notificacion, setNotificacion] = useState<{
    mensaje: string;
    tipo: "info" | "success" | "warning" | "danger";
  } | null>(null);

  function mostrarNotificacion(
    mensaje: string,
    tipo: "info" | "success" | "warning" | "danger" = "info"
  ) {
    setNotificacion({ mensaje, tipo });
    setTimeout(() => {
      setNotificacion(null);
    }, 4500);
  }

  function navegar(nuevaPagina: string) {
    setPagina(nuevaPagina);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Abre el sitio de trabajo (Diseño de Redes)
  function abrirSitioTrabajo(proyecto?: Proyecto) {
    if (proyecto) {
      setProyectoActivo(proyecto);
    }
    navegar("DisenadorRedes");
    mostrarNotificacion(
      `Sitio de trabajo activo: Diseñador de Redes para "${(proyecto ?? proyectoActivo).nombre}"`,
      "info"
    );
  }

  function crearProyecto(datos: Partial<Proyecto>): Proyecto {
    const nuevo: Proyecto = {
      id: `PRJ-00${proyectosList.length + 1}`,
      nombre: datos.nombre || "Nuevo Proyecto",
      arquitectura: datos.arquitectura || arquitecturaConfig.tipo,
      modelos: 0,
      estado: "En marcha",
      descripcion: datos.descripcion || "Espacio de experimentación de redes neuronales.",
      datasetPrincipal: datasetActivo.nombre,
      fechaCreacion: new Date().toISOString().split("T")[0],
      responsable: datos.responsable || "Investigador AI",
      precisionObjetivo: datos.precisionObjetivo || 95.0,
    };

    setProyectosList((prev) => [...prev, nuevo]);
    setProyectoActivo(nuevo);
    mostrarNotificacion(`Proyecto "${nuevo.nombre}" creado exitosamente.`, "success");
    return nuevo;
  }

  function eliminarProyecto(id: string) {
    const restantes = proyectosList.filter((p) => p.id !== id);
    if (restantes.length > 0) {
      setProyectosList(restantes);
      if (proyectoActivo.id === id) {
        setProyectoActivo(restantes[0]);
      }
      mostrarNotificacion("Proyecto eliminado.", "warning");
    } else {
      mostrarNotificacion("Debe existir al menos un proyecto principal.", "warning");
    }
  }

  function agregarDataset(nuevoData: Omit<Dataset, "id">): Dataset {
    const nuevoId = `DS-${String(datasetsList.length + 1).padStart(3, "0")}`;
    const datasetCompleto: Dataset = {
      id: nuevoId,
      ...nuevoData,
      estado: nuevoData.estado || "Disponible",
      fechaSubida: new Date().toISOString().split("T")[0],
    };

    setDatasetsList((prev) => [datasetCompleto, ...prev]);
    setDatasetActivo(datasetCompleto);

    setProyectoActivo((prev) => ({
      ...prev,
      datasetPrincipal: `${datasetCompleto.id} · ${datasetCompleto.nombre}`,
    }));

    mostrarNotificacion(
      `Dataset "${datasetCompleto.nombre}" registrado y vinculado al proyecto activo.`,
      "success"
    );

    return datasetCompleto;
  }

  function eliminarDataset(id: string) {
    const restantes = datasetsList.filter((d) => d.id !== id);
    if (restantes.length > 0) {
      setDatasetsList(restantes);
      if (datasetActivo.id === id) {
        setDatasetActivo(restantes[0]);
      }
      mostrarNotificacion("Dataset eliminado.", "warning");
    } else {
      mostrarNotificacion("Debe conservarse al menos un dataset en el catálogo.", "warning");
    }
  }

  function crearEntrenamiento(epocas: number = 50) {
    const nuevoJob: Entrenamiento = {
      id: `TR-${String(entrenamientosList.length + 1).padStart(3, "0")}`,
      modelo: `${proyectoActivo.nombre} Run #${entrenamientosList.length + 1}`,
      epocas: epocas,
      progreso: 0,
      estado: "En cola",
      dataset: datasetActivo.nombre,
      arquitectura: `${arquitecturaConfig.tipo} (${arquitecturaConfig.capas} capas)`,
      loss: 0.0,
      accuracy: 0.0,
      duracionEstimada: `${Math.round(epocas * 0.4)} min estimados`,
    };

    setEntrenamientosList((prev) => [nuevoJob, ...prev]);
    mostrarNotificacion(`Job "${nuevoJob.modelo}" añadido a la cola de GPU.`, "info");
    navegar("Entrenamientos");
  }

  function iniciarEntrenamiento(id: string) {
    setEntrenamientosList((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, progreso: 25, estado: "En marcha" } : e
      )
    );
    mostrarNotificacion("Entrenamiento iniciado en clúster GPU.", "info");
  }

  function completarEntrenamiento(id: string) {
    setEntrenamientosList((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              progreso: 100,
              estado: "Completado",
              accuracy: 96.5,
              loss: 0.08,
              duracionEstimada: "Completado",
            }
          : e
      )
    );
    mostrarNotificacion("¡Entrenamiento finalizado al 100%! Métricas listas.", "success");
  }

  function registrarModelo(nuevo: Partial<Modelo>) {
    const modeloComp: Modelo = {
      id: `MD-${String(modelosList.length + 1).padStart(3, "0")}`,
      nombre: nuevo.nombre || `${proyectoActivo.nombre} Certified`,
      version: nuevo.version || "1.0.0",
      arquitectura: nuevo.arquitectura || arquitecturaConfig.tipo,
      precision: nuevo.precision || 96.4,
      estado: "Validado",
      tamanioMb: nuevo.tamanioMb || 45.2,
      formatoExport: nuevo.formatoExport || "ONNX / PyTorch",
      fechaRegistro: new Date().toISOString().split("T")[0],
      latenciaMs: nuevo.latenciaMs || 14.2,
    };

    setModelosList((prev) => [modeloComp, ...prev]);
    setProyectoActivo((prev) => ({
      ...prev,
      modelos: prev.modelos + 1,
    }));

    mostrarNotificacion(
      `Modelo "${modeloComp.nombre}" registrado y certificado en el catálogo.`,
      "success"
    );
  }

  return (
    <AppContext.Provider
      value={{
        pagina,
        navegar,
        proyectoActivo,
        setProyectoActivo,
        abrirSitioTrabajo,
        proyectos: proyectosList,
        crearProyecto,
        eliminarProyecto,
        datasets: datasetsList,
        agregarDataset,
        eliminarDataset,
        datasetActivo,
        setDatasetActivo,
        arquitecturaConfig,
        setArquitecturaConfig,
        entrenamientos: entrenamientosList,
        crearEntrenamiento,
        iniciarEntrenamiento,
        completarEntrenamiento,
        modelos: modelosList,
        registrarModelo,
        notificacion,
        mostrarNotificacion,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp debe usarse dentro de un AppProvider");
  }
  return context;
}
