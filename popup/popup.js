document.addEventListener('DOMContentLoaded', () => {
  const boton = document.getElementById('btn-extraer');
  const resultadoDiv = document.getElementById('resultado');
  const inputApiKey = document.getElementById('input-apikey');
  const btnGuardar = document.getElementById('btn-guardar');
  const btnCsv = document.getElementById('btn-csv');

  // 1. Cargar la Key
  chrome.storage.local.get(['gemini_key'], (resultado) => {
    if (resultado.gemini_key) {
      inputApiKey.value = resultado.gemini_key;
    }
  });

  // 2. Guardar la Key
  btnGuardar.addEventListener('click', () => {
    const key = inputApiKey.value.trim();
    if (key) {
      chrome.storage.local.set({ 'gemini_key': key }, () => {
        btnGuardar.textContent = "¡Guardada!";
        btnGuardar.style.backgroundColor = "#28a745";
        setTimeout(() => { 
          btnGuardar.textContent = "Guardar Key"; 
          btnGuardar.style.backgroundColor = "#6c757d";
        }, 2000);
      });
    }
  });

  // 3. Flujo principal
  boton.addEventListener('click', () => {
    resultadoDiv.innerHTML = "Leyendo la web...";
    btnCsv.style.display = "none"; // Ocultamos el botón si hacemos una nueva extracción
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { accion: "leer_web" }, (respuestaTexto) => {
        
        if (respuestaTexto && respuestaTexto.textoExtraido) {
          resultadoDiv.innerHTML = "Conectando con la IA...";
          boton.textContent = "Procesando...";
          boton.style.backgroundColor = "#ffc107"; 
          
          chrome.runtime.sendMessage({ 
            accion: "procesar_ia", 
            texto: respuestaTexto.textoExtraido 
          }, (respuestaIA) => {
            
            if (respuestaIA && respuestaIA.exito) {
              resultadoDiv.innerHTML = `<strong>Datos Extraídos:</strong><br><br><pre style="text-align: left; font-size: 11px; white-space: pre-wrap;">${respuestaIA.resultadoIA}</pre>`;
              boton.textContent = "¡Completado!";
              boton.style.backgroundColor = "#28a745";
              
              // ¡MAGIA CSV A CONTINUACIÓN!
              // Mostramos el botón verde
              btnCsv.style.display = "block";
              
              // Le asignamos la función de descarga
              btnCsv.onclick = () => {
                try {
                  // Limpiamos la respuesta por si la IA metió comillas invertidas (```json ...)
                  let textoLimpio = respuestaIA.resultadoIA.replace(/```json/g, '').replace(/```/g, '').trim();
                  
                  // Convertimos el texto a objeto JavaScript
                  const objetoDatos = JSON.parse(textoLimpio);
                  
                  // Creamos la cabecera (Nombre,Cargo,Empresa)
                  const cabeceras = Object.keys(objetoDatos).join(",") + "\n";
                  
                  // Creamos los valores ("Jose Elías","Presidente","Audax")
                  // Usamos comillas para evitar que las comas del texto rompan las columnas del Excel
                  const valores = Object.values(objetoDatos).map(v => `"${v}"`).join(",") + "\n";
                  
                  const contenidoCsv = cabeceras + valores;
                  
                  // Creamos el archivo fantasma en memoria (Blob)
                  const blob = new Blob([contenidoCsv], { type: 'text/csv;charset=utf-8;' });
                  const url = URL.createObjectURL(blob);
                  
                  // Creamos un enlace invisible, le hacemos clic y lo destruimos
                  const enlaceInvisible = document.createElement("a");
                  enlaceInvisible.href = url;
                  enlaceInvisible.setAttribute("download", "contacto_linkedin.csv");
                  document.body.appendChild(enlaceInvisible);
                  enlaceInvisible.click();
                  document.body.removeChild(enlaceInvisible);
                  URL.revokeObjectURL(url);
                  
                } catch (error) {
                  alert("Error al generar el CSV. Asegúrate de que la IA devolvió un JSON válido.");
                  console.error(error);
                }
              };

            } else {
              const mensajeError = respuestaIA ? respuestaIA.error : "Error de comunicación";
              resultadoDiv.innerHTML = `<strong>Error de IA:</strong><br>${mensajeError}`;
              boton.textContent = "Error";
              boton.style.backgroundColor = "#dc3545";
            }
          });

        } else {
          resultadoDiv.innerHTML = "No se ha podido leer esta web.";
        }
      });
    });
  });
});