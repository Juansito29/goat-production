let carrito = [];
let total = 0;
let currentIndex = 0;


async function cargarProductos() {
    const carousel = document.getElementById('carousel');

    try {
        const response = await fetch(''); 
        const productos = await response.json();

        productos.forEach((producto) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al carrito</button>
            `;
            carousel.appendChild(li);
        });
    } catch (error) {
        console.error("Error al cargar productos: ", error);
        alert("Hubo un problema al cargar los productos.");
    }
}


function agregarAlCarrito(producto, precio) {
    carrito.push({ producto, precio });
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoContenedor = document.getElementById('carrito');
    carritoContenedor.innerHTML = '';
    total = 0;
    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.producto} - $${item.precio} <button onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
        carritoContenedor.appendChild(li);
        total += item.precio;
    });
    document.getElementById('total').textContent = `Total: $${total}`;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}


async function realizarPago() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de pagar.");
        return;
    }


    const data = {
        productos: carrito.map(item => ({
            nombre: item.producto,
            precio: item.precio
        })),
        total: total
    };

    try {
 
        const response = await fetch('https://api.misitio.com/pagar', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message || "¡Pago realizado con éxito!");
            vaciarCarrito(); 
        } else {
            alert(result.error || "Hubo un problema con el pago. Intenta de nuevo.");
        }
    } catch (error) {
        console.error("Error al realizar el pago:", error);
        alert("Ocurrió un error al realizar el pago.");
    }
}


function moveCarousel(direction) {
    const carousel = document.getElementById('carousel');
    const totalItems = carousel.children.length;
    currentIndex += direction;

    if (currentIndex < 0) currentIndex = totalItems - 1;
    if (currentIndex >= totalItems) currentIndex = 0;

    carousel.style.transform = `translateX(-${currentIndex * 270}px)`; 
}


window.onload = () => {
    cargarProductos();
};
