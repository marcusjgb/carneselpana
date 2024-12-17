    document.addEventListener('DOMContentLoaded', function() {
        // Obtener todos los productos
        const productos = document.querySelectorAll('.product');
        // Añadir evento de clic a cada producto
        productos.forEach(function(producto) {
            producto.addEventListener('click', function() {
                
                const descripcion = producto.querySelector('.description');
                // Alternar la visibilidad de la descripción
                if (descripcion.style.display === 'none' || descripcion.style.display === '') {
                    descripcion.style.display = 'block'; 
                } else {
                    descripcion.style.display = 'none'; 
                }
            });
        });
    });

