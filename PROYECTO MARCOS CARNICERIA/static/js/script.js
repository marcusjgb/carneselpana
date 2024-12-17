
//Menu desplegable
const toggleBtn = document.querySelector('.toggle_btn')
const toggleBtnIcon = document.querySelector('.toggle_btn i')
const dropDownMenu = document.querySelector('.dropdown_menu')

toggleBtn.onclick = function () {
    dropDownMenu.classList.toggle('open')
    const isOpen = dropDownMenu.classList.contains('open')

    toggleBtnIcon.classList = isOpen
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars'
}

//Slider reseñas
const swiper = new Swiper(".slider-wrapper", {

    loop: true,
    spaceBetween: 25,
    grabCursor: true,


    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },

    // Flechas
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        576: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        },
    },
});

const carritoBtn = document.getElementById('carritoBtn');
const modalCarrito = document.getElementById('modalCarrito');
const cerrarModal = document.getElementById('cerrarModal');
const borrarCarrito = document.getElementById('borrarCarrito');
const enviarPedido = document.getElementById('enviarPedido');
const contenidoCarrito = document.getElementById('contenidoCarrito');
const mensajeVacio = document.getElementById('mensajeVacio');
const productosCarrito = document.getElementById('productosCarrito');
const productosDisponibles = document.getElementById('productosDisponibles');

const productos = [
    { nombre: 'Pollo entero', img: 'static/images/productos/pollo-entero.jpeg', maxCantidad: 10 },
    { nombre: 'Suprema', img: 'static/images/productos/suprema.jpeg', maxCantidad: 10 },
    { nombre: 'Milanesas', img: 'static/images/productos/milanesas.jpeg', maxCantidad: 10 },
    { nombre: 'Chorizo', img: 'static/images/productos/chorizo.jpeg', maxCantidad: 10 },
    { nombre: 'Pata Muslo', img: 'static/images/productos/pata-muslo.jpeg', maxCantidad: 10 },
    { nombre: 'Bondiola', img: 'static/images/productos/bondiola.jpeg', maxCantidad: 10 },
    { nombre: 'Bife ancho', img: 'static/images/productos/bife-ancho.jpeg', maxCantidad: 10 },
    { nombre: 'Carne picada', img: 'static/images/productos/carne-picada.jpeg', maxCantidad: 10 },
    

    
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function actualizarCarrito() {
    const cantidad = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    carritoBtn.textContent = `CARRITO (${cantidad})`;
}

function mostrarCarrito() {
    if (carrito.length === 0) {
        mensajeVacio.style.display = 'block';
        productosCarrito.innerHTML = '';
    } else {
        mensajeVacio.style.display = 'none';
        productosCarrito.innerHTML = carrito.map((producto, index) => `
              <div class="producto">
                  <img src="${producto.img}" alt="${producto.nombre}">
                  <p>${producto.nombre}</p>
                  <button onclick="actualizarCantidad(${index}, -1)">-</button>
                  <span>${producto.cantidad}</span>
                  <button onclick="actualizarCantidad(${index}, 1)">+</button>
              </div>
          `).join('');
    }
}

function mostrarProductosDisponibles() {
    productosDisponibles.innerHTML = productos.map((producto, index) => `
          <div class="producto">
              <img src="${producto.img}" alt="${producto.nombre}">
              <p>${producto.nombre}</p>
              <button onclick="agregarAlCarrito(${index})">Agregar</button>
          </div>
      `).join('');
}

function agregarAlCarrito(index) {
    const producto = productos[index];
    const productoEnCarrito = carrito.find(p => p.nombre === producto.nombre);

    if (productoEnCarrito) {
        if (productoEnCarrito.cantidad < producto.maxCantidad) {
            productoEnCarrito.cantidad++;
        } else {
            alert(`No puedes agregar más de ${producto.maxCantidad} kg de ${producto.nombre}`);
            return;
        }
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    actualizarCarrito();
}

function actualizarCantidad(index, delta) {
    const producto = carrito[index];
    const nuevaCantidad = producto.cantidad + delta;

    if (nuevaCantidad >= 0 && nuevaCantidad <= producto.maxCantidad) {
        producto.cantidad = nuevaCantidad;

        if (producto.cantidad === 0) {
            carrito.splice(index, 1);
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
        actualizarCarrito();
    } else if (nuevaCantidad > producto.maxCantidad) {
        alert(`No puedes exceder los ${producto.maxCantidad} kg de ${producto.nombre}`);
    }
}

borrarCarrito.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
    } else {
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
        actualizarCarrito();
    }
});

enviarPedido.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
    } else {
        const mensaje = carrito.map(producto => {
            let cantidadConUnidad = (producto.cantidad).toFixed(2) + 'k'; // Solo en kilos
            return `${producto.nombre}: ${cantidadConUnidad}`;
        }).join('\n');
        
        const url = `https://wa.me/5491128178012?text=Hola,%20te%20hago%20el%20siguiente%20pedido!%20${encodeURIComponent(mensaje)}%20Gracias!`;
        window.open(url, '_blank');
        alert('Gracias por tu pedido!');
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
        actualizarCarrito();
    }
});

carritoBtn.addEventListener('click', () => {
    modalCarrito.style.display = 'block';
    mostrarCarrito();
    mostrarProductosDisponibles();
});

cerrarModal.addEventListener('click', () => {
    modalCarrito.style.display = 'none';
});

actualizarCarrito();




