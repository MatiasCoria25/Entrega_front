document.addEventListener('DOMContentLoaded', () => {
    const botonesCarrito = document.querySelectorAll(".carrito");

    if (botonesCarrito.length > 0) {
        botonesCarrito.forEach((boton, indice) => {
            boton.addEventListener('click', (e) => {
                e.preventDefault();

                // Construimos el objeto producto con los data-atributos
                const producto = {
                    id: boton.dataset.id, 
                    nombre: boton.dataset.nombre,
                    precio: Number(boton.dataset.precio), 
                    imagen: boton.dataset.imagen
                };

                agregarAlCarrito(producto);
            });
        });
    }

    mostrarCarrito();
});

function guardarCarrito(carrito) {
    localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
    const indice = carrito.findIndex(item => item.id === producto.id);

    if (indice !== -1) {
        carrito[indice].cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            title: producto.nombre,
            price: producto.precio,
            image: producto.imagen,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    mostrarCarrito();

    mostrarAlerta(`"${producto.nombre}" agregado al carrito ✅`, "success");
}

function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
    const contenedor = document.getElementById('carrito_contenedor');
    const totalSpan = document.getElementById('total');

    if (!contenedor) return;

    contenedor.innerHTML = "";

    carrito.forEach((item, index) => {
        const productoHTML = `
            <div class="producto-carrito">
                <img src="${item.image}" alt="${item.title}" width="60">
                <h4>${item.title}</h4>
                <p>Precio: $${item.price.toFixed(2)}</p>
                <p>
                    Cantidad: 
                    <input type="number" value="${item.cantidad}" min="1" 
                           class="cantidad-producto" data-index="${index}">
                </p>
                <p>Subtotal: $${(item.price * item.cantidad).toFixed(2)}</p>
                <button class="eliminar" data-index="${index}">Eliminar</button>
            </div>
        `;
        contenedor.innerHTML += productoHTML;
    });

    const total = carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);
    if (totalSpan) totalSpan.textContent = `$${total.toFixed(2)}`;

    // Eventos para eliminar
    document.querySelectorAll(".eliminar").forEach(boton => {
        boton.addEventListener("click", () => {
            eliminarProducto(boton.dataset.index);
        });
    });

    // Eventos para cambiar cantidad
    document.querySelectorAll(".cantidad-producto").forEach(input => {
        input.addEventListener("change", () => {
            let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
            const index = input.dataset.index;
            carrito[index].cantidad = parseInt(input.value) || 1;
            guardarCarrito(carrito);
            mostrarCarrito();
        });
    });
}

function eliminarProducto(indice) {
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
    carrito.splice(indice, 1);
    guardarCarrito(carrito);
    mostrarCarrito();
}


// Función para mostrar alerta Bootstrap
function mostrarAlerta(mensaje, tipo = "success") {
    const contenedor = document.getElementById("alert-container");
    const alerta = document.createElement("div");

    alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
    alerta.role = "alert";
    alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    contenedor.appendChild(alerta);

    // Ocultar automáticamente después de 3 segundos
    setTimeout(() => {
        alerta.classList.remove("show");
        alerta.classList.add("hide");
        setTimeout(() => alerta.remove(), 500);
    }, 3000);
}

