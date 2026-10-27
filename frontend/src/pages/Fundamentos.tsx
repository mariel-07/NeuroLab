import SectionTitle from "../components/SectionTitle";
import { useApp } from "../context/AppContext";
import {
  BookOpen,
  Network,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";

const conceptos = [
  {
    titulo: "Redes Convolucionales (CNN)",
    descripcion:
      "Especializadas en datos con topología de cuadrícula, como imágenes. Usan filtros convolucionales para extraer características invariantes en traslación.",
    detalle: "Visión por Computadora",
    arquitectura: "CNN",
    icono: Layers,
  },
  {
    titulo: "Redes Recurrentes (RNN y LSTM)",
    descripcion:
      "Poseen conexiones retroalimentadas que permiten mantener un estado de memoria interno para series temporales y telemetría continua.",
    detalle: "Datos Secuenciales",
    arquitectura: "RNN/LSTM",
    icono: Zap,
  },
  {
    titulo: "Perceptrón Multicapa (Feedforward)",
    descripcion:
      "La información se propaga en un único sentido hacia adelante. Esencial para clasificación tabular y regresión de variables continuas.",
    detalle: "Tabular y Regresión",
    arquitectura: "Feedforward MLP",
    icono: Cpu,
  },
  {
    titulo: "Funciones de Activación",
    descripcion:
      "Introducen no-linealidades indispensables para modelar problemas complejos. Ejemplos estándar: ReLU, LeakyReLU, GeLU, Sigmoid y Softmax.",
    detalle: "No Linealidad",
    arquitectura: "CNN",
    icono: Sparkles,
  },
  {
    titulo: "Algoritmo de Backpropagation",
    descripcion:
      "Calcula analíticamente los gradientes de la función de pérdida respecto a cada peso mediante la regla de la cadena para optimización estocástica.",
    detalle: "Optimización",
    arquitectura: "CNN",
    icono: Network,
  },
  {
    titulo: "Regularización y Dropout",
    descripcion:
      "Técnicas para prevenir el sobreajuste (overfitting). Desactiva aleatoriamente neuronas durante el forward pass mejorando la generalización.",
    detalle: "Generalización",
    arquitectura: "CNN",
    icono: BookOpen,
  },
];

export default function Fundamentos() {
  const { abrirSitioTrabajo, proyectoActivo } = useApp();

  return (
    <>
      <SectionTitle
        titulo="Fundamentos Teóricos de Deep Learning"
        descripcion="Base de conocimientos y guía de conceptos que sustentan los módulos de NeuroLab Enterprise."
        badge="Biblioteca Académica e Industrial"
      />

      <div className="grid grid-3">
        {conceptos.map((c) => {
          const Icon = c.icono;
          return (
            <article className="concept-card-enterprise" key={c.titulo}>
              <div className="concept-top">
                <div className="concept-icon-box">
                  <Icon size={20} />
                </div>
                <span className="concept-badge">{c.detalle}</span>
              </div>

              <h3>{c.titulo}</h3>
              <p>{c.descripcion}</p>

              <div className="concept-action">
                <button
                  type="button"
                  className="btn-link-action"
                  onClick={() => abrirSitioTrabajo(proyectoActivo)}
                >
                  <span>Experimentar en Diseñador</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

