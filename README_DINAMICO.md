# 🎊 Sistema Dinámico para Invitación de Boda

## 📋 Descripción

Este sistema permite manejar de forma dinámica todos los datos de tu invitación de boda mediante un archivo JSON. Ya no necesitas editar el HTML directamente, ¡solo cambia los datos en el JSON y todo se actualiza automáticamente!

## 🚀 Características

- **Datos dinámicos**: Nombres, fechas, ubicaciones, horarios
- **Fácil personalización**: Todo desde un archivo JSON
- **Rutas automáticas**: Imágenes y archivos de audio
- **Contador regresivo dinámico**: Se ajusta automáticamente
- **Enlaces dinámicos**: Mapas, formularios, regalos

## 📁 Estructura de Archivos

```
nuevaboda/
├── index.html              # Página principal
├── data.json              # ¡ARCHIVO PRINCIPAL DE DATOS!
├── assets/
│   ├── css/style.css      # Estilos
│   ├── js/dinamico.js     # Sistema dinámico
│   ├── audio/audio.mp3    # Canción de la pareja
│   ├── icons/             # Iconos SVG
│   └── images/            # Imágenes de la boda
└── README.md             # Este archivo
```

## ✏️ Cómo Personalizar Tu Boda

### 1. Editar Datos Básicos

Abre `data.json` y modifica:

```json
{
  "pareja": {
    "novia": "TU_NOMBRE",
    "novio": "SU_NOMBRE", 
    "iniciales": "T & S",
    "nombreCompleto": "Tu Nombre y Su Nombre"
  },
  "fecha": {
    "fechaEvento": "December 15, 2025 14:00:00",
    "fechaTexto": "15 de diciembre",
    "año": "2025"
  }
}
```

### 2. Cambiar Ubicación de la Ceremonia

```json
{
  "ceremonia": {
    "hora": "2:00 pm",
    "titulo": "CEREMONIA",
    "direccion": "Tu dirección aquí",
    "urlMapa": "ENLACE_DE_GOOGLE_MAPS"
  }
}
```

### 3. Actualizar Itinerario

```json
{
  "itinerario": [
    {
      "evento": "Ceremonia",
      "hora": "2:00 pm",
      "icono": "ceremonia.svg"
    },
    {
      "evento": "Cocktail",
      "hora": "3:30 pm", 
      "icono": "copas.svg"
    }
  ]
}
```

### 4. Cambiar Información de Regalos

```json
{
  "regalos": {
    "tienda": "tu_tienda_favorita",
    "codigo": "TU_CODIGO",
    "url": "ENLACE_A_LISTA_DE_REGALOS",
    "cuentaBanco": {
      "banco": "TU_BANCO",
      "numero": "TU_NUMERO_DE_CUENTA",
      "cci": "TU_CCI"
    }
  }
}
```

## 🎵 Cambiar Música

1. Reemplaza `assets/audio/audio.mp3` con tu canción
2. O actualiza la ruta en el JSON:

```json
{
  "medios": {
    "audio": "assets/audio/tu_cancion.mp3"
  }
}
```

## 🖼️ Cambiar Imágenes

1. Coloca tus imágenes en `assets/images/`
2. Actualiza las rutas en el JSON:

```json
{
  "medios": {
    "imagenes": {
      "portada": "assets/images/tu_portada.png",
      "separador1": "assets/images/tu_separador.png"
    }
  }
}
```

## 🔗 Enlaces Importantes

### Formulario de Confirmación
```json
{
  "asistencia": {
    "urlFormulario": "TU_ENLACE_DE_GOOGLE_FORMS"
  }
}
```

### Redes Sociales o Página Web
Puedes agregar más enlaces en el JSON según necesites.

## 🎨 Personalizar Textos

```json
{
  "textos": {
    "invitacion": {
      "titulo": "Nuestra Boda",
      "clickParaAbrir": "Toca para abrir la invitación",
      "soloFaltan": "¡Solo faltan!",
      "eventoComenzo": "¡Ya es el gran día!"
    }
  }
}
```

## 🛠️ Cómo Funciona

1. **Carga automática**: Al abrir la página, se carga `data.json`
2. **Renderizado dinámico**: El script busca elementos con atributos `data-*`
3. **Actualización en tiempo real**: Los datos se insertan automáticamente
4. **Fallbacks incluidos**: Si falta algún atributo, usa el contenido original

## 🚨 Consejos Importantes

- **Guarda copias**: Siempre haz backup de `data.json` antes de cambios grandes
- **Prueba localmente**: Usa un servidor local para probar cambios
- **Valida JSON**: Asegúrate de que el JSON esté bien formateado
- **Rutas correctas**: Verifica que las rutas de archivos sean correctas

## 🐛 Solución de Problemas

### La página no carga datos
- Verifica que `data.json` esté en la raíz del proyecto
- Comprueba la consola del navegador (F12) para errores
- Asegúrate de que el JSON esté bien formateado

### Las imágenes no aparecen
- Verifica las rutas en el JSON
- Asegúrate de que los archivos existan en `assets/images/`

### El audio no funciona
- Comprueba la ruta en el JSON
- Verifica que el archivo de audio exista
- Algunos navegadores bloquean autoplay

## 🎉 ¡Disfruta tu Boda!

Con este sistema, puedes personalizar fácilmente tu invitación y hasta crear múltiples versiones para diferentes eventos. ¡Solo cambia el JSON y todo se actualiza automáticamente!

---

**Creado con ❤️ para hacer tu día especial aún más memorable**