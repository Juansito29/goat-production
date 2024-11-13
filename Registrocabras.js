
document.addEventListener("DOMContentLoaded", () => {
    const formCabra = document.getElementById("form-cabra");
    const tablaCabras = document.getElementById("tabla-cabras").querySelector("tbody");

    const obtenerCabras = async () => {
        try {
            const response = await fetch("http://localhost:8080/Mostrar"); 
            const cabras = await response.json();

            tablaCabras.innerHTML = ""; 

            cabras.forEach(cabra => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${cabra.id}</td>
                    <td>${cabra.nombre}</td>
                    <td>${cabra.fechaNacimiento}</td>
                    <td>${cabra.fechaFallecimiento || 'N/A'}</td>
                    <td>${cabra.estado}</td>
                    <td>
                        <button onclick="editarCabra(${cabra.id})">Editar</button>
                        <button onclick="eliminarCabra(${cabra.id})">Eliminar</button>
                    </td>
                `;
                tablaCabras.appendChild(fila);
            });
        } catch (error) {
            console.error("Error al obtener cabras:", error);
        }
    };

 
    formCabra.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const nuevaCabra = {
            nombre: document.getElementById("nombre").value,
            fechaNacimiento: document.getElementById("fechaNacimiento").value,
            fechaFallecimiento: document.getElementById("fechaFallecimiento").value || null,
            estado: document.getElementById("estado").value
        };

        try {
            await fetch("http://localhost:8080/Mostrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevaCabra)
            });
            obtenerCabras();
            formCabra.reset();
        } catch (error) {
            console.error("Error al registrar cabra:", error);
        }
    });

    const eliminarCabra = async (id) => {
        try {
            await fetch(`http://localhost:8080/Mostrar/${id}`, { 
                method: "DELETE"
            });
            obtenerCabras();
        } catch (error) {
            console.error("Error al eliminar cabra:", error);
        }
    };


    obtenerCabras();
});

