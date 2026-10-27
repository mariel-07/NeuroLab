interface Props {
  estado: string;
}

export default function Status({ estado }: Props) {
  const norm = estado.toLowerCase();

  let clase = "badge-warning";
  let dotClass = "dot-warning";

  if (
    norm.includes("completado") ||
    norm.includes("validado") ||
    norm.includes("disponible") ||
    norm.includes("activo")
  ) {
    clase = "badge-success";
    dotClass = "dot-success";
  } else if (
    norm.includes("marcha") ||
    norm.includes("entrenamiento") ||
    norm.includes("procesando")
  ) {
    clase = "badge-info";
    dotClass = "dot-info dot-pulse";
  } else if (norm.includes("error") || norm.includes("fallido")) {
    clase = "badge-danger";
    dotClass = "dot-danger";
  }

  return (
    <span className={`status-badge ${clase}`}>
      <span className={`status-dot ${dotClass}`} />
      <span>{estado}</span>
    </span>
  );
}

