document.addEventListener('submit', async (e) => {
    // Verificamos si el formulario enviado es de votación (puedes añadir una clase .vote-form en tu HBS)
    if (e.target.matches('form[action*="/vote"]')) {
        e.preventDefault(); // Evitamos la recarga de página

        const form = e.target;
        const url = form.action;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Recargamos la ubicación para que el servidor reordene los elementos 
                // según los nuevos votos, pero hecho desde JS.
                window.location.reload();
            }
        } catch (error) {
            console.error("Error al enviar el voto:", error);
            alert("No se pudo procesar el voto. Intenta de nuevo.");
        }
    }
});