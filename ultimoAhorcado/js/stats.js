
const stats = JSON.parse(localStorage.getItem('estadisticasPartida'));
stats.forEach(stat => {
    const row = document.createElement('tr');

    // Convertir el tiempo en segundos a minutos y segundos
    const tiempoEnSegundos = stat.tiempo;
    const minutos = Math.floor(tiempoEnSegundos / 60);
    const segundos = Math.floor(tiempoEnSegundos % 60);
    const tiempoFormato = `${minutos}m ${segundos}s`;

    row.innerHTML = `
                    <td>${stat.resultado}</td>
                    <td>${tiempoFormato}</td>
                    <td>${stat.fecha}</td>`
                ;
    document.querySelector('tbody').appendChild(row);
});