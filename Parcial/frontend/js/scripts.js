const apiUrl = 'http://localhost:4001/tramites'; // Reemplaza con la URL de tu API

// Función para cargar la grilla de paquetes
function filtrar() {
    let tipoFiltro = document.getElementById('buscar-input').value
    listaTramites.innerHTML = '';
    fetch(`${apiUrl}/${tipoFiltro}`)
    .then(res => {
        if(!res.ok){
            throw new Error('Error en la respuesta.')
        }
        return res.json();
    })
    .then(data => { 
        if (data.length === 0){
            listaTramites.innerHTML = '<tr><td colspan="7">No se encontraron trámites.</td></tr>';
        } else{
            data.forEach(e => {
                listaTramites.innerHTML += `
                <tr>
                    <td>${e.titular}</td>
                    <td>${e.dni}</td>
                    <td>${e.tipo}</td>
                    <td>${e.fechaInicio}</td>
                    <td>${e.fechaCierre}</td>
                    <td>${e.prioritario}</td>
                    <td>${e.observaciones}</td>
                </tr>;
                `});
        }
    })
    .catch(err => console.error('Error al filtrar trámites: ', err));
}

function cargarGrilla(data) {
    const listaTramites = document.getElementById("lista-tramites");
    listaTramites.innerHTML = '';
    console.log("Cargando grilla con datos:", data);
    for (let i = 0; i < data.length; i++) {
        let row = `
        <tr>
            <td>${data[i].titular}</td>
            <td>${data[i].dni}</td>
            <td>${data[i].tipo}</td>
            <td>${data[i].fechaInicio}</td>
            <td>${data[i].fechaCierre}</td>
            <td>${data[i].prioritario}</td>
            <td>${data[i].observaciones}</td>
        </tr>`;
        
        listaTramites.innerHTML += row;
    }
}


function cargarTramites(){
    console.log("Cargando tramites")
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
        cargarGrilla(data);
    })
    .catch(err => console.error('Error al cargar los trámites: ', err))
}

function eliminar() {
    let titularEliminar = document.getElementById('eliminar-input').value;
    fetch(`${apiUrl}/${titularEliminar}`, {
        method: 'DELETE'
    })
    .then(res => {
        if (res.ok){
            return res.json();
        } else {
            throw new Error('Error al eliminar el trámite.');
        }
    })
    .then(data => {
        console.log('Cargando tramites', data)
        cargarTramites();
    })
    .catch(err => console.error('Error al eliminar el trámite:', err))
}


document.getElementById('crearTramiteForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nuevoTramite = {
        titular: document.getElementById('titular').value,
        dni: document.getElementById('dni').value,
        tipo: document.getElementById('tipo').value,
        fechaInicio: document.getElementById('fechaInicio').value,
        fechaCierre: document.getElementById('fechaCierre').value,
        prioritario: document.getElementById('prioritario').value,
        observaciones: document.getElementById('observaciones').value,
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoTramite)
    })
    .then(res => res.json())
    .then(data => {
        console.log('Trámite creado:', data);
        // Cerrar el modal
        document.querySelector('#crearTramiteModal .btn-close').click();
        // Recargar la lista de trámites
        cargarTramites();
    })
    .catch(err => console.error('Error al crear el trámite:', err));
});

// Asignar la función filtrar al botón
document.querySelector("button[onclick='filtrar();']").onclick = filtrar;
document.querySelector("button[onclick='eliminar();']").onclick = eliminar;
// Cargar la lista de trámites al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarTramites();
});

// Cargar la lista de paquetes al cargar la página
//cargarTramites();
