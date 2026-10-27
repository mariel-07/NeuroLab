import type {
  Proyecto,
  Dataset,
  Entrenamiento,
  Modelo,
} from "../types";

// 1 SOLO PROYECTO INICIAL COMO REQUERIMIENTO EXPLÍCITO
export const proyectos: Proyecto[] = [
  {
    id: "PRJ-001",
    nombre: "Computer Vision Lab — Detección Industrial",
    arquitectura: "CNN (Convolucional)",
    modelos: 3,
    estado: "En marcha",
    descripcion: "Sistema de visión artificial para clasificación y detección automatizada de anomalías en línea de manufactura.",
    datasetPrincipal: "DS-001 · Inspección PCB (Predeterminado)",
    fechaCreacion: "2026-10-15",
    responsable: "Ing. Diego Morales (Lead AI)",
    precisionObjetivo: 96.5,
  },
];

// EXACTAMENTE 2 DATASETS: UNO PREDETERMINADO Y OTRO PARA ANALIZAR
export const datasets: Dataset[] = [
  {
    id: "DS-001",
    nombre: "Inspección de Componentes PCB (Predeterminado)",
    registros: 12500,
    formato: "CSV + Imágenes (PNG)",
    estado: "Disponible",
    tipo: "Predeterminado (Entrenamiento)",
    tamanio: "1.4 GB",
    fechaSubida: "2026-10-18",
    descripcion: "Conjunto predeterminado con etiquetas de defectos de soldadura y componentes de manufactura.",
    columnas: ["image_id", "patch_x", "patch_y", "defect_type", "confidence", "temp_celsius"],
  },
  {
    id: "DS-002",
    nombre: "Lote de Muestras Industriales (Para Analizar)",
    registros: 3200,
    formato: "CSV",
    estado: "Listo para Analizar",
    tipo: "Para Analizar (Diagnóstico)",
    tamanio: "185 MB",
    fechaSubida: "2026-10-25",
    descripcion: "Lote no etiquetado reservado para inferencia, análisis de fallas y pruebas de rendimiento del modelo.",
    columnas: ["sample_id", "batch_code", "optical_density", "thermal_var", "prediction_ready"],
  },
];

export const entrenamientos: Entrenamiento[] = [
  {
    id: "TR-001",
    modelo: "CNN Vision PCB v1.0",
    epocas: 50,
    progreso: 100,
    estado: "Completado",
    loss: 0.08,
    accuracy: 96.4,
    dataset: "DS-001 · Inspección PCB (Predeterminado)",
    arquitectura: "CNN (4 Capas Conv + Dense)",
    duracionEstimada: "42 min (Completado)",
  },
  {
    id: "TR-002",
    modelo: "CNN Vision PCB v2.0 (Optimizado)",
    epocas: 100,
    progreso: 68,
    estado: "En marcha",
    loss: 0.12,
    accuracy: 94.1,
    dataset: "DS-001 · Inspección PCB (Predeterminado)",
    arquitectura: "ResNet-18 Custom",
    duracionEstimada: "14 min restantes",
  },
  {
    id: "TR-003",
    modelo: "Detector de Soldadura Fría",
    epocas: 30,
    progreso: 0,
    estado: "En cola",
    loss: 0.0,
    accuracy: 0.0,
    dataset: "DS-002 · Lote para Analizar",
    arquitectura: "Feedforward MLP",
    duracionEstimada: "Pendiente en cluster GPU",
  },
];

export const modelos: Modelo[] = [
  {
    id: "MD-001",
    nombre: "CNN Vision PCB",
    version: "1.0.0",
    arquitectura: "CNN",
    precision: 96.4,
    estado: "Validado",
    tamanioMb: 45.2,
    formatoExport: "ONNX / PyTorch",
    fechaRegistro: "2026-10-26",
    latenciaMs: 14.2,
  },
  {
    id: "MD-002",
    nombre: "CNN Vision PCB (Optimizado)",
    version: "2.0.0-rc",
    arquitectura: "CNN",
    precision: 94.1,
    estado: "Entrenamiento",
    tamanioMb: 52.8,
    formatoExport: "PyTorch (.pt)",
    fechaRegistro: "2026-10-27",
    latenciaMs: 16.5,
  },
];

// Curva de pérdida y precisión a lo largo de las épocas (para el gráfico del Dashboard)
export const historialPerdida = [
  { epoca: "Ep 5", loss: 0.82, val_loss: 0.88, precision: 68.2 },
  { epoca: "Ep 10", loss: 0.54, val_loss: 0.59, precision: 79.5 },
  { epoca: "Ep 15", loss: 0.38, val_loss: 0.42, precision: 86.1 },
  { epoca: "Ep 20", loss: 0.27, val_loss: 0.31, precision: 89.8 },
  { epoca: "Ep 25", loss: 0.20, val_loss: 0.24, precision: 92.4 },
  { epoca: "Ep 30", loss: 0.15, val_loss: 0.19, precision: 94.2 },
  { epoca: "Ep 35", loss: 0.12, val_loss: 0.16, precision: 95.1 },
  { epoca: "Ep 40", loss: 0.10, val_loss: 0.14, precision: 95.8 },
  { epoca: "Ep 45", loss: 0.09, val_loss: 0.13, precision: 96.1 },
  { epoca: "Ep 50", loss: 0.08, val_loss: 0.11, precision: 96.4 },
];
