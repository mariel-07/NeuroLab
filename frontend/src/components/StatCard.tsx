import { isValidElement } from "react";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface Props {
  titulo: string;
  valor: string | number;
  descripcion: string;
  icono?: LucideIcon | ReactNode | string;
  trend?: string;
  trendPositive?: boolean;
}

export default function StatCard({
  titulo,
  valor,
  descripcion,
  icono: Icon,
  trend,
  trendPositive = true,
}: Props) {
  const renderIcono = () => {
    if (!Icon) {
      return <span className="stat-icon-text">◈</span>;
    }

    if (typeof Icon === "string") {
      return <span className="stat-icon-text">{Icon}</span>;
    }

    if (isValidElement(Icon)) {
      return Icon;
    }

    if (typeof Icon === "object" && Icon !== null && "$$typeof" in Icon) {
      // Un elemento de React ya se ha tratado arriba.
      return <span className="stat-icon-text">◈</span>;
    }

    if (typeof Icon === "function") {
      const IconComponent = Icon as LucideIcon;
      return <IconComponent size={20} className="stat-icon-svg" />;
    }

    return <span className="stat-icon-text">◈</span>;
  };

  return (
    <article className="stat-card">
      <div className="stat-card-header">
        <p className="stat-label">{titulo}</p>

        <div className="stat-icon-wrapper">
          {renderIcono()}
        </div>
      </div>

      <div className="stat-value">{valor}</div>

      <div className="stat-card-footer">
        {trend && (
          <span
            className={`stat-trend ${
              trendPositive ? "positive" : "negative"
            }`}
          >
            {trend}
          </span>
        )}

        <span className="stat-foot">{descripcion}</span>
      </div>
    </article>
  );
}