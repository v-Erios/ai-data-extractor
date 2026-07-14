chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.accion === "procesar_ia") {
    
    // Mantenemos la variable 'gemini_key' para no tener que cambiar todo el popup.js,
    // aunque ahora sepas que ahí vas a guardar la clave de Gemini.
    chrome.storage.local.get(['gemini_key'], (resultado) => {
      const API_KEY = resultado.gemini_key;

      if (!API_KEY) {
        sendResponse({ exito: false, error: "Falta la API Key. Guárdala en la configuración." });
        return;
      }

      const prompt = `Eres un experto en extraer datos de páginas web ruidosas. Te voy a pasar el texto en bruto del código fuente de un perfil de LinkedIn.
      
      REGLAS:
      1. El texto contiene mucha basura (menús, notificaciones, posts y sugerencias de otras personas).
      2. Tu misión es identificar a la persona PRINCIPAL dueña del perfil (el que encabeza la página).
      3. Ignora a cualquier otra persona que aparezca en secciones como "Gente que podrías conocer" o en comentarios.
      4. Extrae su Nombre, Cargo actual y Empresa actual.
      5. Devuelve ÚNICAMENTE un objeto JSON válido, sin formato markdown, sin comillas invertidas y sin texto adicional.

      Texto a analizar:
      ${request.texto}`;
      // URL de la API de Gemini usando tu modelo disponible
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

        fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.1 // Temperatura baja para que sea muy preciso sacando datos
          }
        })
      })
      .then(response => response.json())
      .then(data => {
        // La estructura de respuesta de Gemini es distinta a la de OpenAI
        if (data.candidates && data.candidates[0]) {
          sendResponse({ exito: true, resultadoIA: data.candidates[0].content.parts[0].text });
        } else if (data.error) {
          sendResponse({ exito: false, error: data.error.message });
        } else {
          sendResponse({ exito: false, error: "Error desconocido en la respuesta." });
        }
      })
      .catch(error => {
        sendResponse({ exito: false, error: error.message });
      });
    });

    return true; // Obligatorio para respuestas asíncronas
  }
});
