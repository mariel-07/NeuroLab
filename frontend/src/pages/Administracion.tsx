import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import StatCard from "../components/StatCard";
import { useApp } from "../context/AppContext";
import {
  Settings,
  Server,
  Cpu,
  HardDrive,
  ShieldCheck,
  CheckCircle2,
  Save,
  Users,
} from "lucide-react";

export default function Administracion() {
  const { mostrarNotificacion } = useApp();

  const [nombreOrg, setNombreOrg] = useState("ResearchWorkspace - Enterprise AI");
  const [regionGPU, setRegionGPU] = useState("us-east-1 (Clúster A100 Principal)");
  const [retencionLogs, setRetencionLogs] = useState("90 días");

  function handleGuardar() {
    mostrarNotificacion("Configuración del espacio y clúster guardada correctamente.", "success");
  }

  return (
    <>
      <SectionTitle
        titulo="Administración y Clúster de Cómputo"
        descripcion="Supervisa la asignación de hardware acelerador (GPU/TPU), seguridad de red y cuotas de equipo."
        badge="Acceso de Administrador"
      >
        <button type="button" className="btn-primary" onClick={handleGuardar}>
          <Save size={16} />
          <span>Guardar Configuración</span>
        </button>
      </SectionTitle>

      <div className="stats-grid">
        <StatCard
          titulo="GPU VRAM Utilizada"
          valor="24.6 / 80 GB"
          descripcion="NVIDIA A100 SXM4 Activa"
          icono={Cpu}
        />
        <StatCard
          titulo="CPU Clúster"
          valor="32 vCPUs"
          descripcion="AMD EPYC 7763 64-Core"
          icono={Server}
        />
        <StatCard
          titulo="Almacenamiento NVMe"
          valor="1.4 / 10 TB"
          descripcion="Volumen compartido de Datasets"
          icono={HardDrive}
        />
        <StatCard
          titulo="Seguridad y RBAC"
          valor="Enterprise"
          descripcion="Políticas SSO + Auditoría activa"
          icono={ShieldCheck}
        />
      </div>

      <div className="grid grid-2">
        <section className="panel">
          <div className="panel-header">
            <div>
              <h3>Ajustes del Espacio de Investigación</h3>
              <p>Parámetros organizacionales de NeuroLab Enterprise.</p>
            </div>
          </div>

          <div className="form-group">
            <label>Nombre del Espacio de Trabajo</label>
            <input
              type="text"
              value={nombreOrg}
              onChange={(e) => setNombreOrg(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Región y Clúster GPU de Ejecución</label>
            <select
              value={regionGPU}
              onChange={(e) => setRegionGPU(e.target.value)}
            >
              <option value="us-east-1 (Clúster A100 Principal)">
                us-east-1 (NVIDIA A100 · 80GB VRAM Tensor Core)
              </option>
              <option value="eu-west-1 (Clúster H100 Backup)">
                eu-west-1 (NVIDIA H100 SXM5 · 80GB Ultra-Fast)
              </option>
              <option value="sa-east-1 (Edge Inferencia)">
                sa-east-1 (Instancia de Inferencia L4 Tensor)
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>Retención de Checkpoints y Pesos de Entrenamiento</label>
            <select
              value={retencionLogs}
              onChange={(e) => setRetencionLogs(e.target.value)}
            >
              <option value="30 días">30 días</option>
              <option value="90 días">90 días (Recomendado para compliance)</option>
              <option value="1 año">1 año (Archivo extendido)</option>
            </select>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3>Permisos y Miembros del Equipo</h3>
              <p>Roles asignados al proyecto activo.</p>
            </div>
            <span className="badge-active-pill">
              <Users size={12} /> 4 Investigadores
            </span>
          </div>

          <div className="table-container">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Rol</th>
                  <th>Acceso a GPU</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Dr. Diego Morales</strong> (Tú)</td>
                  <td>Lead ML Engineer</td>
                  <td><span className="badge-active-pill"><CheckCircle2 size={11} /> Ilimitado</span></td>
                </tr>
                <tr>
                  <td><strong>Elena Silva</strong></td>
                  <td>Data Scientist</td>
                  <td><span className="badge-active-pill"><CheckCircle2 size={11} /> A100 Pool</span></td>
                </tr>
                <tr>
                  <td><strong>Carlos Vega</strong></td>
                  <td>MLOps Specialist</td>
                  <td><span className="badge-active-pill"><CheckCircle2 size={11} /> A100 Pool</span></td>
                </tr>
                <tr>
                  <td><strong>Sistema CI/CD</strong></td>
                  <td>Automatización</td>
                  <td>Solo Inferencia</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
