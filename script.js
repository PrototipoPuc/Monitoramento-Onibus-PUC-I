// Coordenadas iniciais (centro do mapa)
var initialLat = -22.83255885262272, ;  // Substitua pelas coordenadas centrais do seu campus
var initialLng = -47.05238443863091;  // Substitua pelas coordenadas centrais do seu campus

// Inicializa o mapa
var map = L.map('map').setView([initialLat, initialLng], 16);

// Adiciona o tile layer do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Variável para o marcador do ônibus
var busMarker = null;

// URL da planilha publicada em CSV
var csvUrl = 'https://docs.google.com/spreadsheets/d/e/SEU_LINK_CSV_PUBLICADO/pub?output=csv';

// Função para buscar os dados do CSV e atualizar o marcador
function fetchBusLocation() {
    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            // Dividir o CSV em linhas
            var lines = data.trim().split('\n');
            // Pegar a última linha (últimas coordenadas)
            var lastLine = lines[lines.length - 1];
            // Separar os valores por vírgula
            var values = lastLine.split(',');

            // Obter latitude e longitude (supondo que estão na segunda e terceira colunas)
            var latitude = parseFloat(values[1]);
            var longitude = parseFloat(values[2]);

            // Atualizar o marcador no mapa
            updateBusMarker(latitude, longitude);
        })
        .catch(error => {
            console.error('Erro ao buscar dados do ônibus:', error);
        });
}

function updateBusMarker(lat, lng) {
    if (busMarker) {
        // Atualiza a posição do marcador existente
        busMarker.setLatLng([lat, lng]);
    } else {
        // Cria um novo marcador
        busMarker = L.marker([lat, lng]).addTo(map);
    }
}

// Atualiza a localização do ônibus a cada 5 segundos
setInterval(fetchBusLocation, 5000);

// Chama a função ao carregar a página
fetchBusLocation();
