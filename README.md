# NeuroLab Enterprise — Frontend demo

Plataforma frontend basada en el Documento Maestro de Desarrollo Semana 11. La interfaz está construida con React + TypeScript + Vite, con módulos para dashboard, proyectos, fundamentos, diseñador de arquitecturas, datasets, entrenamientos, evaluación, registro de modelos, reportes y administración.

## Estructura

```text
neurolab-enterprise/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── backend/
    ├── README.md
    ├── requirements.txt
    └── .env.example
```

## Requisitos

- Node.js 20 o superior recomendado
- npm

## Ejecutar en Windows (PowerShell) o terminal

1. Descomprime el ZIP.
2. Abre una terminal dentro de la carpeta `neurolab-enterprise/frontend`.
3. Instala dependencias:

   ```bash
   npm install
   ```

4. Inicia el frontend:

   ```bash
   npm run dev
   ```

5. Abre la dirección local que muestra Vite, normalmente `http://localhost:5173`.

## Qué funciona en esta entrega

- Navegación entre los módulos principales.
- Dashboard adaptable a escritorio y móvil.
- Gráficos de ejemplo de pérdida y actividad.
- Tabla de entrenamientos con avance simulado cada 5 segundos.
- Crear proyectos en memoria de la sesión.
- Diseñador visual editable: familia, capas, unidades, activaciones, dataset y épocas.
- Catálogo local de datasets de demostración.
- Exportación CSV desde el navegador.
- Mensajes de estado y formularios de demostración.

## Importante: datos “en tiempo real”

Como se solicitó únicamente frontend, el progreso y los indicadores dinámicos son **simulados localmente** para que la interfaz se pueda demostrar hoy. No son datos reales de un modelo, no se ejecuta TensorFlow/Keras, no existe persistencia tras recargar y no hay conexión a API ni base de datos. El documento técnico reserva el tiempo real auténtico para un canal SSE/WebSocket conectado a la API y a los workers de entrenamiento.

La carpeta `backend/` está separada y preparada como estructura de referencia, pero no contiene una API funcional ni debe iniciarse todavía.
