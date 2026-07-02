// Productos locales 
const productosLocales = [
    {
        id: "local-1",
        nombre: 'Monopatin plegable',
        categoria: 'Vehiculo infantil',
        precio: 3300,
        imagen: '/pre-entrega_front/Pre-Entrega/img/monopatin.webp',
        descripcion: 'Estructura ligera y resistente, ruedas estables y manillar ergonomico'
    },
    {
        id: "local-2",
        nombre: 'Patin ajustable',
        categoria: 'Deporte y movimiento',
        precio: 1200,
        imagen: '/pre-entrega_front/Pre-Entrega/img/rollers.jpg',
        descripcion: 'Tallas ajustables y sistema de cierre seguro, estructura ligera y ruedas resistentes'
    },
    {
        id: "local-3",
        nombre: 'Bicicleta para niños',
        categoria: 'Bicicleta infantiles',
        precio: 1600,
        imagen: '/pre-entrega_front/Pre-Entrega/img/bicicleta.avif',
        descripcion: 'Bicicleta segura y divertida, adaptada a la altura y necesidades de los mas pequeños'
    },
    {
        id: "local-4",
        nombre: 'Auto a bateria',
        categoria: 'Vehiculo electtrico',
        precio: 5200,
        imagen: '/pre-entrega_front/Pre-Entrega/img/auto.jpg',
        descripcion: 'Con bateria recargable, luces ,sonido y diseño realista'
    },
    {
        id: "local-5",
        nombre: 'Muñeca Hello Kitty',
        categoria: 'Muñeca',
        precio: 625,
        imagen: '/pre-entrega_front/Pre-Entrega/img/hello kitty.webp',
        descripcion: 'Con detalles suaves y colores característicos que transmiten ternura y alegría'
    },
    {
        id: "local-6",
        nombre: 'Muñeca Kuromi',
        categoria: 'Muñecas y coleccionables',
        precio: 625,
        imagen: '/pre-entrega_front/Pre-Entrega/img/kuromi.webp',
        descripcion: 'Detalles coloridos y acabados de calidad'
    },
    {
        id: "local-7",
        nombre: 'Auto Meccano',
        categoria: 'Construcción y mecánica',
        precio: 1760,
        imagen: '/pre-entrega_front/Pre-Entrega/img/auto.webp',
        descripcion: 'Un completo set de construcción con 347 piezas metálicas que permite armar hasta 25 modelos diferentes'
    },
    {
        id: "local-8",
        nombre: 'Puzzle gigante',
        categoria: 'Rompecabezas y juegos educativos',
        precio: 167,
        imagen: '/pre-entrega_front/Pre-Entrega/img/rompecabeza.webp',
        descripcion: 'Piezas grandes y resistentes facilitan el armado, mientras que las ilustraciones alegres fomentan la imaginación y el reconocimiento de personajes'
    },
    {
        id: "local-9",
        nombre: 'Cartuchera',
        categoria: 'Accesorio escolares',
        precio: 122,
        imagen: '/pre-entrega_front/Pre-Entrega/img/cartuchera.webp',
        descripcion: 'Cartucheras prácticas y coloridas diseñadas para organizar lápices, lapiceras, marcadores y otros útiles escolares'
    },
     {
        id: "local-10",
        nombre: 'Marcadores',
        categoria: 'Accesorio escolares',
        precio: 105,
        imagen: '/pre-entrega_front/Pre-Entrega/img/marcadores.webp',
        descripcion: 'Ideales para resaltar, dibujar y escribir en cuadernos o proyectos escolares. Disponibles en diferentes puntas (fina, media y gruesa)'
    },
    
];

// Productos desde la API
async function cargarProductos() {
    try {
        const response = await fetch("https://6a3765a5c105017aa638ed9c.mockapi.io/juguetes");
        if (!response.ok) throw new Error("Error al conectar con la API");

        const productosAPI = await response.json();
        
        const productosIgualados = productosAPI.map(p=> ({
            id: p.id,
            nombre: p.title,
            categoria: p.category,
            precio: p.price,
            imagen :p.image,
            descripcion: p.description,
        }));
        
        // Combino los arrays
        const todosLosProductos = [...productosLocales, ...productosIgualados];
        
        // Renderizo
        const tarjetasHTML = todosLosProductos.map(({id, nombre, categoria, precio, imagen, descripcion}) => `
            <div class="producto">
                <img src="${imagen}" alt="${nombre}">
                <div class="producto-descripcion">
                    <span>${categoria}</span>
                    <h5>${nombre}</h5>
                    <h4>${precio.toFixed(2)}</h4>
                </div>
                <a id="btn-agregar-${id}" class="carrito">
                    <i class="fal fa-shopping-cart"></i> Agregar
                </a>
            </div>
        `);
        
        const contenedor = document.querySelector('.productos-container');
        contenedor.innerHTML = tarjetasHTML.join('');

        adjuntarEventos(todosLosProductos);
    } catch (error) {
        console.error(error);
        const contenedor = document.querySelector('.productos-container');
        contenedor.innerHTML = `<p>Error al cargar productos: ${error.message}</p>`;
    }
}

        
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
    const indice = carrito.findIndex(item => item.id === producto.id);

    if(indice !== -1) {
        carrito[indice].cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            title: producto.nombre,
            price: Number(producto.precio),
            image: producto.imagen,
            cantidad:1
        });
    }

    localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
}


function adjuntarEventos(productos) {
    productos.forEach(producto => {
        const boton = document.getElementById(`btn-agregar-${producto.id}`);
        if (boton) {
            boton.addEventListener('click', () => {
                agregarAlCarrito(producto);
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", cargarProductos)



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

// Ejemplo de uso al agregar producto
mostrarAlerta("Producto agregado al carrito ✅", "success");

function adjuntarEventos(productos) {
    productos.forEach(producto => {
        const boton = document.getElementById(`btn-agregar-${producto.id}`);
        if (boton) {
            boton.addEventListener('click', () => {
                agregarAlCarrito(producto);

                // Mostrar alerta al agregar
                mostrarAlerta(`"${producto.nombre}" agregado al carrito ✅`, "success");
            });
        }
    });
}