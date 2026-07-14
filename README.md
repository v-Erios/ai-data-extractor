# < AI_DATA_EXTRACTOR_v2.0 // >

[![Manifest V3](https://img.shields.io/badge/Manifest-V3-black?style=for-the-badge&logo=googlechrome)](#)
[![Gemini 2.5](https://img.shields.io/badge/API-Gemini_2.5_Flash-black?style=for-the-badge&logo=google)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-black?style=for-the-badge)](#)

> Extractor de datos sin servidor diseñado para operar en la web moderna. Inyecta scripts en el DOM, filtra el ruido del frontend mediante IA y empaqueta la información estructural en volcados CSV. Sin intermediarios.

---

### /// SYSTEM_FEATURES

*   **[+] Señal sobre ruido:** Utiliza ingeniería de prompts para ignorar basura del HTML (notificaciones, menús, perfiles adyacentes) y aislar el objetivo principal.
*   **[+] Estado en local:** La API Key se encripta y confina en `chrome.storage.local`. Cero fugas a servidores de terceros.
*   **[+] Pipeline Serverless:** Conexión asíncrona directa entre el cliente y la API REST de Google AI Studio. 
*   **[+] Exfiltración a CSV:** Construcción nativa de archivos `.csv` en memoria volátil (usando `Blob` y `URL.createObjectURL`), listos para descargar y cruzar con bases de datos.

---

### /// ARCHITECTURE_OVERVIEW

Construido bajo las restricciones de seguridad de **Manifest V3**:

`> popup.js` 
Interfaz de usuario. Gestiona credenciales, interpreta el payload JSON y ensambla el volcado de datos.

`> content.js`
Infiltrador del DOM. Se inyecta en la pestaña activa para capturar el texto renderizado saltándose ofuscaciones visuales.

`> background.js`
Service Worker aislado. Recibe la telemetría, ensambla el prompt estricto y ejecuta las peticiones `fetch` contra el modelo de Gemini.

---

### /// DEPLOYMENT (DEV_MODE)

Herramienta no listada en tiendas oficiales. Despliegue manual requerido:

**Firefox / Zen Browser:**
1. Accede a `about:debugging#/runtime/this-firefox`
2. Ejecuta "Cargar complemento temporal..."
3. Selecciona el archivo `manifest.json` del repositorio.

**Chrome / Brave / Edge:**
1. Navega a `chrome://extensions/`
2. Habilita el "Modo desarrollador" (esquina superior derecha).
3. Carga la carpeta desempaquetada del proyecto.

---

### /// EXECUTION_PROTOCOL

1. **Generar credencial:** Obtén una clave API de Google AI Studio.
2. **Inicializar:** Abre el panel de la extensión e inyecta la clave en el almacenamiento local.
3. **Fijar objetivo:** Navega al perfil objetivo (ej. LinkedIn).
4. **Extraer:** Ejecuta la rutina de IA. Una vez el JSON sea validado, vuelca los datos en CSV.

---

### /// ROADMAP

- [ ] Módulo de extracción de nodos sociales (X, GitHub).
- [ ] Ejecución en bucle (Batch scraping) desde resultados de búsqueda.
- [ ] Webhook para volcado automático en bases de datos externas.

---
`SYS.AUTHOR: Javi` // `STATUS: ONLINE` // `BUILD: DAW_PROJECT`
