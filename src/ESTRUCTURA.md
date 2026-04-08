# Estructura de Componentes - MusiHelp

## 📁 Organización de Carpetas

```
src/
├── components/         # Componentes React reutilizables
├── hooks/             # Custom hooks para lógica reutilizable
├── assets/            # Imágenes y recursos estáticos
├── App.jsx           # Componente principal
└── index.css         # Estilos globales
```

## 🧩 Componentes (`components/`)

### Componentes Principales
- **Header.jsx** - Encabezado con el título de la aplicación
- **Footer.jsx** - Pie de página con información
- **InfoSection.jsx** - Sección con 3 columnas (QUÉ ES, Imagen, APP AFINADOR)
- **PianoImage.jsx** - Imagen del piano

### Componentes de Acción
- **UploadButton.jsx** - Botón para subir partitura

### Componentes de Estado
- **SelectedNote.jsx** - Muestra la nota seleccionada
- **LoadingState.jsx** - Estado de carga
- **ErrorState.jsx** - Estado de error

### Componentes de Contenedor
- **ScoreContainer.jsx** - Contenedor de la partitura (usa forwardRef)
- **Instructions.jsx** - Instrucciones para el usuario

### Índice de Exportación
- **index.js** - Barril de exportación para importaciones simplificadas

## 🎣 Hooks (`hooks/`)

### useScoreLoader.js
Hook personalizado que encapsula toda la lógica relacionada con:
- Cargar archivos MusicXML
- Extraer notas del XML
- Renderizar la partitura con OpenSheetMusicDisplay
- Manejar interacción del usuario con notas
- Estados de carga, error y nota seleccionada
- Manejar redimensionamientos de ventana

#### Retorna:
```javascript
{
  scoreRef,        // Ref para el contenedor de la partitura
  osmdRef,         // Ref para OpenSheetMusicDisplay
  loading,         // Boolean de estado de carga
  error,           // String con mensaje de error o null
  selectedNote,    // String con nota seleccionada o null
  showScore,       // Boolean para mostrar/ocultar partitura
  loadScore,       // Función para cargar la partitura
  handleLoadScore, // Handler del botón de subida
  handleResize     // Handler para redimensionamiento
}
```

## 📦 Importación Simplificada

Gracias al archivo `index.js` en cada carpeta, puedes importar así:

```javascript
// Antes (sin índice)
import Header from './components/Header'
import Footer from './components/Footer'

// Después (con índice)
import { Header, Footer } from './components'
import { useScoreLoader } from './hooks'
```

## 🏗️ Estructura del App.jsx

El `App.jsx` es ahora muy limpio y fácil de mantener:
- Usa el hook `useScoreLoader` para toda la lógica
- Importa todos los componentes
- El JSX es puramente declarativo (solo renderiza componentes)
- Muy fácil de modificar y escalar

## ✅ Ventajas de esta Estructura

1. **Separación de Responsabilidades** - Cada componente tiene una única responsabilidad
2. **Reutilización** - Los componentes pueden usarse en diferentes contextos
3. **Testabilidad** - Componentes pequeños y aislados son más fáciles de testear
4. **Mantenibilidad** - Código más limpio y fácil de entender
5. **Escalabilidad** - Fácil agregar nuevas funcionalidades
6. **Documentación automática** - La estructura comunica la intención del código
