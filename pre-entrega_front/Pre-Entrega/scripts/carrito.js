document.addEventListener('DOMContentLoaded', () => {
    cargarProductosCarrito();
});

function cargarProductosCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
    const contenedor = document.querySelector('#carrito_contenedor');
    contenedor.innerHTML = '';

    let subtotal = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <p style="text-align: center; width: 100%;">
                Tu carrito esta vacio. Anda a gastar plata desde la
                <a href="tienda.html">tienda</a>.
            </p>`;
    } else {
        carrito.forEach(producto => {
            contenedor.innerHTML += crearTarjetaProducto(producto);
            subtotal += producto.price * producto.cantidad;
        });
    }

    actualizarTotal(subtotal);
    adjuntarEventosTarjeta();
}

function crearTarjetaProducto(producto) {
    const precio = Number(producto.price || producto.precio) || 0;
    const subtotalProducto = (precio * producto.cantidad).toFixed(2);
    const titulo = producto.title.length > 25
        ? producto.title.slice(0,25) + "..."
        : producto.title;

    return `
        <div class="card-carrito">
            <button class="remove-btn" data-id="${producto.id}">✖</button>
            <img src="${producto.image}" alt="${producto.title}">
            <h4>${titulo}</h4>
            <p>Precio: $${precio.toFixed(2)}</p>
            <p>
                Cantidad:
                <input type="number" value="${producto.cantidad}" min="1"
                        class="cantidad-producto" data-id="${producto.id}">
            </p>
            <p class="subtotal">Subtotal: $${subtotalProducto}</p>
        </div>
    `;
}

function actualizarTotal(subtotal) {
    const totalElement = document.querySelector('#total')
    if (totalElement) {
        totalElement.textContent = `$${subtotal.toFixed(2)}`;
    }
}

function adjuntarEventosTarjeta() {
    document.querySelectorAll('.remove-btn').forEach(boton => {
        boton.addEventListener('click', () => {
            let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
            const id = boton.dataset.id;
            carrito = carrito.filter(item => String(item.id) !== String(id));
            localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
            cargarProductosCarrito();
        });
    });

    document.querySelectorAll('.cantidad-producto').forEach(input => {
        input.addEventListener('change', () => {
            let carrito =JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
            const id = input.dataset.id;
            let nuevaCantidad = parseInt(input.value);

            if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
                nuevaCantidad = 1;
                input.value = 1;
            }

            const producto = carrito.find(item => String(item.id) === String(id));
            if (producto) {
                producto.cantidad = nuevaCantidad;
                localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
                recalcularTotales();
            }
        });
        
    });
}

function recalcularTotales() {
    const carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
    let subtotal = 0;

    document.querySelectorAll('.card-carrito').forEach(fila => {
        const input = fila.querySelector('.cantidad-producto');
        if (input) {
            const id = input.dataset.id;
            const producto = carrito.find(item => String(item.id) === String(id));
            if(producto) {
                const subtotalFila = (producto.price * producto.cantidad).toFixed(2);
                fila.querySelector('.subtotal').textContent = `Subtotal: $${subtotalFila}`;
                subtotal += producto.price * producto.cantidad;
            }
        }
    });

    actualizarTotal(subtotal);
}