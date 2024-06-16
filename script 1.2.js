// Función para obtener el día y la hora actuales en formato 'día-hora'
function getDayAndTime() {
    const now = new Date();
    const day = now.toLocaleDateString('es-ES', { weekday: 'long' }).toLowerCase();
    const time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    return `${day}-${time}`;
}

// Función para verificar el estado de apertura del local
function checkOpenStatus() {
    const openDaysAndHours = {
        'lunes': ['08:00', '20:00'],
        'martes': ['08:00', '20:00'],
        'miércoles': ['08:00', '20:00'],
        'jueves': ['08:00', '20:00'],
        'viernes': ['08:00', '20:00'],
        'sábado': ['10:00', '14:00'],
        'domingo': ['cerrado', 'cerrado'],
    };

    const [currentDay, currentTime] = getDayAndTime().split('-');

    if (openDaysAndHours[currentDay][0] === 'cerrado') {
        return `Cerrado hoy (${currentDay})`;
    }

    const [openTime, closeTime] = openDaysAndHours[currentDay];
    const timeRemaining = getTimeRemaining(currentTime, closeTime);

    if (currentTime >= openTime && currentTime <= closeTime) {
        return `Abierto hoy (${currentDay})`;
    } else if (timeRemaining !== null && timeRemaining <= 30) {
        return `Cerrará pronto (${timeRemaining} min) hoy (${currentDay})`;
    } else {
        return `Cerrado hoy (${currentDay})`;
    }
}

// Función para calcular el tiempo restante hasta el cierre
function getTimeRemaining(currentTime, closeTime) {
    const currentTimeInMinutes = convertTimeToMinutes(currentTime);
    const closeTimeInMinutes = convertTimeToMinutes(closeTime);

    if (closeTimeInMinutes >= currentTimeInMinutes) {
        return closeTimeInMinutes - currentTimeInMinutes;
    } else {
        return closeTimeInMinutes + (24 * 60) - currentTimeInMinutes;
    }
}

// Función para convertir horas y minutos a minutos
function convertTimeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

// Función para mostrar el estado de apertura del local
function displayOpenStatus() {
    const statusElement = document.getElementById('status');
    statusElement.textContent = checkOpenStatus();
}

// Llamar a la función de visualización de estado al cargar la página
displayOpenStatus();

// Configurar un intervalo para actualizar el estado cada minuto
setInterval(displayOpenStatus, 60000); // 60000 ms = 1 minuto

// Función para alternar la visibilidad del carrito
function toggleCart() {
    const cart = document.getElementById('cart');
    cart.style.display = cart.style.display === 'block' ? 'none' : 'block';
}

// Función para agregar productos al carrito
function addToCart(productName) {
    const cartItems = document.getElementById('cart-items');
    const items = cartItems.getElementsByTagName('li');

    // Comprueba si el carrito está vacío
    if (items.length === 1 && items[0].innerText === 'No hay productos en el carrito.') {
        cartItems.innerHTML = '';
    }

    // Añade el producto al carrito
    const newItem = document.createElement('li');
    newItem.textContent = productName;
    cartItems.appendChild(newItem);
}

// Función para manejar el cambio de secciones al hacer clic en los enlaces de navegación
function cambiarSeccion(seccionId) {
    // Oculta todas las secciones
    const secciones = document.querySelectorAll('.content-section');
    secciones.forEach(seccion => {
        seccion.classList.remove('active');
    });

    // Muestra la sección correspondiente
    const seccion = document.getElementById(seccionId);
    if (seccion) {
        seccion.classList.add('active');
    }
}

// Agrega el evento clic a todos los enlaces de navegación
document.querySelectorAll('nav a').forEach(enlace => {
    enlace.addEventListener('click', function(event) {
        event.preventDefault(); // Evita que el enlace recargue la página
        const seccionId = this.getAttribute('href').slice(1); // Obtiene el ID de la sección
        cambiarSeccion(seccionId); // Cambia a la sección correspondiente
    });
});

// Obtener el modal
var modal = document.getElementById("myModal");

// Obtener el <span> que cierra el modal
var span = document.getElementsByClassName("close")[0];

// Obtener el elemento <p> donde se mostrará la información del producto
var modalText = document.getElementById("modal-text");

// Obtener todas las imágenes de productos
var images = document.querySelectorAll('.product-item img');

// Añadir evento de clic a cada imagen
images.forEach(img => {
    img.addEventListener('click', function() {
        // Mostrar el modal
        modal.style.display = "block";
        // Poner la información del producto en el modal
        modalText.textContent = this.getAttribute('data-info');
    });
});

// Cuando el usuario hace clic en <span> (x), cerrar el modal
span.onclick = function() {
    modal.style.display = "none";
}

// Cuando el usuario hace clic fuera del modal, cerrarlo
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Función para buscar productos
function searchProducts() {
    // Obtener el valor del input de búsqueda
    var input = document.getElementById("searchInput");
    var filter = input.value.toUpperCase();
    var products = document.querySelectorAll('.product-item');

    // Iterar sobre cada producto y mostrar/ocultar según el término de búsqueda
    products.forEach(function(product) {
        var description = product.querySelector('.product-description').textContent.toUpperCase();
        if (description.indexOf(filter) > -1) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }
    });
}