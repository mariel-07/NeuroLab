import React from "react";

interface Props {
  titulo: string;
  descripcion?: string;
  badge?: string;
  children?: React.ReactNode;
}

export default function SectionTitle({
  titulo,
  descripcion,
  badge,
  children,
}: Props) {
  return (
    <div className="page-heading">
      <div className="page-heading-content">
        <div className="title-with-badge">
          <h1>{titulo}</h1>
          {badge && <span className="heading-badge">{badge}</span>}
        </div>
        {descripcion && <p className="page-description">{descripcion}</p>}
      </div>

      {children && <div className="page-heading-actions">{children}</div>}
    </div>
  );
}

