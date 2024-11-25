document.getElementById("formulario-produccion").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Obtener valores del formulario
    const fecha = document.getElementById("fecha").value.trim();
    const cabra = document.getElementById("cabra").value.trim();
    const produccion = parseFloat(document.getElementById("produccion").value);

    // Validación de los campos
    if (!fecha || !cabra || isNaN(produccion) || produccion <= 0) {
        mostrarMensaje("Por favor, completa los campos correctamente.", "error");
        return;
    }

    // Datos a enviar
    const datos = {
        fecha,
        cabra,
        produccion,
    };

    try {
        // Enviar solicitud a la API
        const respuesta = await fetch("http://localhost:8080/producciones/agregar", {  // Eliminar el espacio antes de la URL
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });

        // Manejo de errores en la respuesta
        if (!respuesta.ok) {
            const errorTexto = await respuesta.text();
            mostrarMensaje(`Error del servidor: ${errorTexto}`, "error");
            return;
        }

        // Procesar la respuesta JSON
        const resultado = await respuesta.json();
        mostrarMensaje("Producción registrada correctamente.", "success");

        // Actualizar estadísticas
        actualizarEstadisticas(produccion);
    } catch (error) {
        // Manejo de errores de conexión
        console.error("Error al conectar con la API:", error);
        mostrarMensaje("No se pudo conectar con el servidor. Revisa tu conexión.", "error");
    }
});

// Función para mostrar mensajes
function mostrarMensaje(mensaje, tipo) {
    // Eliminar mensajes previos
    const mensajesPrevios = document.querySelectorAll(".mensaje");
    mensajesPrevios.forEach((msg) => msg.remove());

    // Crear y mostrar mensaje
    const mensajeDiv = document.createElement("div");
    mensajeDiv.textContent = mensaje;
    mensajeDiv.className = `mensaje ${tipo}`;
    document.body.appendChild(mensajeDiv);

    // Eliminar mensaje después de 3 segundos
    setTimeout(() => {
        mensajeDiv.remove();
    }, 3000);
}

// Función para actualizar estadísticas
function actualizarEstadisticas(produccion) {
    const totalLitros = document.getElementById("total-litros");
    const numRegistros = document.getElementById("num-registros");

    // Asegúrate de que los elementos existan en el DOM
    if (!totalLitros || !numRegistros) {
        console.error("Los elementos para mostrar las estadísticas no están disponibles.");
        return;
    }

    const totalActual = parseFloat(totalLitros.textContent) || 0; // Manejo de valores no numéricos
    const registrosActuales = parseInt(numRegistros.textContent) || 0;

    // Actualizar estadísticas
    totalLitros.textContent = (totalActual + produccion).toFixed(1);
    numRegistros.textContent = registrosActuales + 1;
}
