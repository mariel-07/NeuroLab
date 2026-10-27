export interface Proyecto {
  id: string;
  nombre: string;
  arquitectura: string;
  modelos: number;
  estado: "Completado" | "En cola" | "En marcha";
  descripcion?: string;
  datasetPrincipal?: string;
  fechaCreacion?: string;
  responsable?: string;
  precisionObjetivo?: number;
}

export interface Dataset {
  id: string;
  nombre: string;
  registros: number;
  formato: string;
  estado: string;
  tipo?: string;
  tamanio?: string;
  columnas?: string[];
  fechaSubida?: string;
  descripcion?: string;
}

export interface Entrenamiento {
  id: string;
  modelo: string;
  epocas: number;
  progreso: number;
  estado: string;
  loss?: number;
  accuracy?: number;
  dataset?: string;
  arquitectura?: string;
  duracionEstimada?: string;
}

export interface Modelo {
  id: string;
  nombre: string;
  version: string;
  arquitectura: string;
  precision: number;
  estado: string;
  tamanioMb?: number;
  formatoExport?: string;
  fechaRegistro?: string;
  latenciaMs?: number;
}

export interface StatCardData {
  titulo: string;
  valor: string | number;
  descripcion: string;
  icono: string;
}

export interface ArquitecturaConfig {
  tipo: string;
  capas: number;
  neuronas: number;
  activacion: string;
  learningRate: number;
  optimizador: string;
  tamLote: number;
}


export interface ArquitecturaConfig {
  tipo: string;
  capas: number;
  neuronas: number;
  activacion: string;
  learningRate: number;
  optimizador: string;
  tamLote: number;
}
