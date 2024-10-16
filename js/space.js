// Seleccionamos el input y el botón de búsqueda
const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');
const contenedor = document.getElementById('contenedor');

// Función para buscar imágenes de la NASA
function buscarImagenes(query) {
    const url = `https://images-api.nasa.gov/search?q=${query}&media_type=image`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            mostrarImagenes(data.collection.items);
        })
        .catch(error => {
            console.error('Error al realizar la búsqueda:', error);
        });
}

// Función para mostrar las imágenes en formato tarjeta Bootstrap
function mostrarImagenes(items) {
    // Limpiar el contenedor antes de mostrar nuevos resultados
    contenedor.innerHTML = '';

    if (items.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron resultados</p>';
        return;
    }

    // Crear un diseño de cuadrícula para las tarjetas
    const row = document.createElement('div');
    row.classList.add('row', 'row-cols-1', 'row-cols-md-3', 'g-4');

    // Crear una tarjeta para cada imagen
    items.forEach(item => {
        const imagen = item.links[0].href;
        const titulo = item.data[0].title;
        const descripcion = item.data[0].description || "No hay descripción disponible.";

        const col = document.createElement('div');
        col.classList.add('col'); // Columna de la cuadrícula

        const tarjeta = document.createElement('div');
        tarjeta.classList.add('card', 'h-100');

        tarjeta.innerHTML = `
            <img src="${imagen}" class="card-img-top" alt="${titulo}">
            <div class="card-body">
                <h5 class="card-title">${titulo}</h5>
                <p class="card-text">${descripcion}</p>
            </div>
        `;

        col.appendChild(tarjeta);
        row.appendChild(col); // Añadir cada tarjeta a la fila
    });

    contenedor.appendChild(row); // Añadir la fila completa al contenedor
}

// Evento de clic para el botón de búsqueda
btnBuscar.addEventListener('click', () => {
    const query = inputBuscar.value.trim();
    if (query) {
        buscarImagenes(query);
    }
});