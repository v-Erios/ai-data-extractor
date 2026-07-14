chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.accion === "leer_web") {
    
    // Capturamos todo el texto visible de la página web
    const textoBruto = document.body.innerText;
    
    // ¡Fuera el límite de 150! Mandamos los primeros 3000 caracteres, 
    // que es donde siempre está la cabecera del perfil de LinkedIn.
    const fragmento = textoBruto.substring(0, 3000);
    
    // Se lo mandamos de vuelta al popup
    sendResponse({ textoExtraido: fragmento });
  }
});