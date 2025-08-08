let map;
let markers = [];
let addMode = false;
let infoWindows = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: { lat: 40.4168, lng: -3.7038 },
        mapTypeId: 'roadmap'
    });
    
    map.addListener('click', function(event) {
        if (addMode) {
            addPointOfInterest(event.latLng);
        }
    });
    
    loadSavedPoints();
}

function enableAddMode() {
    const name = document.getElementById('pointName').value.trim();
    const description = document.getElementById('pointDescription').value.trim();
    
    if (!name) {
        alert('Por favor, introduce un nombre para el punto de interés');
        return;
    }
    
    addMode = true;
    document.body.style.cursor = 'crosshair';
    alert('Haz clic en el mapa donde quieras añadir el punto de interés');
}

function addPointOfInterest(location) {
    const name = document.getElementById('pointName').value.trim();
    const description = document.getElementById('pointDescription').value.trim();
    
    if (!name) {
        alert('Por favor, introduce un nombre para el punto de interés');
        addMode = false;
        document.body.style.cursor = 'default';
        return;
    }
    
    const pointData = {
        id: Date.now(),
        lat: location.lat(),
        lng: location.lng(),
        name: name,
        description: description
    };
    
    createMarker(pointData);
    savePoint(pointData);
    updatePointsList();
    
    document.getElementById('pointName').value = '';
    document.getElementById('pointDescription').value = '';
    addMode = false;
    document.body.style.cursor = 'default';
}

function createMarker(pointData) {
    const marker = new google.maps.Marker({
        position: { lat: pointData.lat, lng: pointData.lng },
        map: map,
        title: pointData.name,
        icon: {
            url: 'data:image/svg+xml;base64,' + btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="36" viewBox="0 0 24 36">
                    <path fill="#e74c3c" d="M12 0C5.4 0 0 5.4 0 12s12 24 12 24 12-17.6 12-24S18.6 0 12 0z"/>
                    <circle fill="white" cx="12" cy="12" r="6"/>
                </svg>
            `),
            scaledSize: new google.maps.Size(24, 36),
            anchor: new google.maps.Point(12, 36)
        }
    });
    
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div class="info-window">
                <h3>${pointData.name}</h3>
                <p><strong>Descripción:</strong> ${pointData.description || 'Sin descripción'}</p>
                <p><strong>Coordenadas:</strong> ${pointData.lat.toFixed(6)}, ${pointData.lng.toFixed(6)}</p>
                <button class="delete-btn" onclick="deletePoint(${pointData.id})">Eliminar Punto</button>
            </div>
        `
    });
    
    marker.addListener('click', function() {
        closeAllInfoWindows();
        infoWindow.open(map, marker);
    });
    
    markers.push({ marker: marker, infoWindow: infoWindow, data: pointData });
    infoWindows.push(infoWindow);
}

function closeAllInfoWindows() {
    infoWindows.forEach(function(infoWindow) {
        infoWindow.close();
    });
}

function deletePoint(pointId) {
    const markerIndex = markers.findIndex(m => m.data.id === pointId);
    if (markerIndex !== -1) {
        markers[markerIndex].marker.setMap(null);
        markers[markerIndex].infoWindow.close();
        markers.splice(markerIndex, 1);
    }
    
    const savedPoints = JSON.parse(localStorage.getItem('mapPoints') || '[]');
    const filteredPoints = savedPoints.filter(point => point.id !== pointId);
    localStorage.setItem('mapPoints', JSON.stringify(filteredPoints));
    
    updatePointsList();
}

function savePoint(pointData) {
    const savedPoints = JSON.parse(localStorage.getItem('mapPoints') || '[]');
    savedPoints.push(pointData);
    localStorage.setItem('mapPoints', JSON.stringify(savedPoints));
}

function loadSavedPoints() {
    const savedPoints = JSON.parse(localStorage.getItem('mapPoints') || '[]');
    savedPoints.forEach(function(pointData) {
        createMarker(pointData);
    });
    updatePointsList();
}

function updatePointsList() {
    const savedPoints = JSON.parse(localStorage.getItem('mapPoints') || '[]');
    const pointsList = document.getElementById('pointsList');
    
    if (savedPoints.length === 0) {
        pointsList.innerHTML = '<p>No hay puntos de interés guardados.</p>';
        return;
    }
    
    pointsList.innerHTML = savedPoints.map(point => `
        <div class="point-item">
            <div class="point-info">
                <div class="point-name">${point.name}</div>
                <div class="point-description">${point.description || 'Sin descripción'}</div>
            </div>
            <button class="btn btn-danger" onclick="deletePoint(${point.id})">Eliminar</button>
        </div>
    `).join('');
}

function clearAllPoints() {
    if (confirm('¿Estás seguro de que quieres eliminar todos los puntos de interés?')) {
        markers.forEach(function(markerObj) {
            markerObj.marker.setMap(null);
            markerObj.infoWindow.close();
        });
        markers = [];
        infoWindows = [];
        localStorage.removeItem('mapPoints');
        updatePointsList();
    }
}

function focusOnPoint(lat, lng) {
    map.setCenter({ lat: lat, lng: lng });
    map.setZoom(12);
}