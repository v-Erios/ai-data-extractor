#<h1 align="center">🤖 Extractor de Datos IA - Browser Extension</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Manifest-V3-blue?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Manifest V3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/API-Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini API" />
  <img src="https://img.shields.io/badge/License-MIT-success?style=for-the-badge" alt="MIT License" />
</p>

<p align="center">
  Una extensión de navegador ligera y sin servidor que utiliza la potencia de <b>Google Gemini (2.5 Flash)</b> para hacer scraping inteligente. Extrae datos estructurados (Nombre, Cargo, Empresa) de webs complejas como LinkedIn y los exporta a CSV con un solo clic.
</p>

---

## ✨ Características Principales

* **🧠 Procesamiento Inteligente:** Ignora el "ruido" de la web (menús, notificaciones, perfiles sugeridos) y extrae solo la información del perfil principal usando *Prompt Engineering*.
* **🔒 100% Seguro y Local:** La API Key se almacena localmente en tu navegador mediante `chrome.storage.local`. Nunca viaja a servidores de terceros.
* **⚡ Serverless:** Todo el procesamiento ocurre entre el cliente (DOM) y la API oficial de Google AI Studio vía `fetch`.
* **📊 Exportación Nativa a CSV:** Genera archivos descargables directamente en memoria (usando `Blob` y `URL.createObjectURL`), ideal para volcarlos a Excel o CRMs.

## 🏗️ Arquitectura Técnica

El proyecto sigue la arquitectura estricta de **Manifest V3**:
1. **`popup.js` (UI):** Gestiona la interfaz, guarda credenciales y procesa el objeto JSON devuelto para construir el CSV.
2. **`content.js` (DOM Reader):** Se inyecta en la pestaña activa para extraer el texto renderizado (`document.body.innerText`) saltándose las protecciones estándar de scraping.
3. **`background.js` (Service Worker):** Actúa como middleware. Recibe el texto, ensambla el payload con el prompt y hace la llamada asíncrona a la API REST de Gemini.

## 🚀 Instalación (Modo Desarrollador)

Como la extensión no está publicada en la Chrome Web Store, debes cargarla localmente:

### Para Firefox / Zen Browser
1. Escribe `about:debugging#/runtime/this-firefox` en la barra de direcciones.
2. Haz clic en **"Cargar complemento temporal..."**.
3. Selecciona el archivo `manifest.json` de este repositorio.

### Para Chrome / Brave / Edge
1. Ve a `chrome://extensions/`.
2. Activa el **"Modo desarrollador"** arriba a la derecha.
3. Haz clic en **"Cargar descomprimida"** y selecciona la carpeta del proyecto.

## 🛠️ Cómo usarlo

1. **Consigue tu API Key:** Ve a [Google AI Studio](https://aistudio.google.com/app/apikey) y crea una clave gratuita.
2. **Configura la extensión:** Abre el popup de la extensión, pega la clave y dale a "Guardar".
3. **Extrae datos:** Ve a un perfil de LinkedIn (o página similar con información de contacto).
4. **Exporta:** Haz clic en "Extraer Datos". Cuando la IA devuelva el JSON, aparecerá el botón para descargar el CSV.

## 🔮 Próximas mejoras (Roadmap)
- [ ] Soporte para extraer Redes Sociales (Twitter, GitHub).
- [ ] Opción para extraer múltiples perfiles en lote desde una lista de búsqueda.
- [ ] Integración de webhook para enviar datos directamente a Notion o Airtable.

## 👨‍💻 Autor

Creado por **Javi** como proyecto de desarrollo Frontend y manejo de APIs.

---
*Si este proyecto te ha resultado útil, ¡no dudes en darle una ⭐ al repositorio!* ai-data-extractor
