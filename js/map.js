let map;
let markers = [];
let infoWindows = [];

const archaeologicalSites = [
    {
        id: 1,
        name: "Augusta Emerita",
        city: "Mérida",
        province: "Badajoz",
        lat: 38.9166,
        lng: -6.3333,
        period: "Romano",
        description: "Capital de Lusitania romana. Conserva teatro, anfiteatro, circo, templo de Diana, acueductos y puente romano. Patrimonio de la Humanidad UNESCO.",
        wikipediaUrl: "https://es.wikipedia.org/wiki/M%C3%A9rida_(Espa%C3%B1a)"
    },
    {
        id: 2,
        name: "Tarraco",
        city: "Tarragona",
        province: "Tarragona",
        lat: 41.1189,
        lng: 1.2445,
        period: "Romano",
        description: "Capital de Hispania Citerior. Conserva muralla romana, anfiteatro, circo, foro provincial y acueducto. Patrimonio de la Humanidad UNESCO.",
        wikipediaUrl: "https://es.wikipedia.org/wiki/Tarragona"
    },
    {
        id: 3,
        name: "Segóbriga",
        city: "Saelices",
        province: "Cuenca",
        lat: 39.8851,
        lng: -2.8133,
        period: "Romano",
        description: "Antigua 'caput Celtiberiæ'. Conserva teatro, anfiteatro, termas, muralla y foro. Prosperó por la explotación del lapis specularis.",
        wikipediaUrl: "https://es.wikipedia.org/wiki/Segobriga"
    },
    {
        id: 4,
        name: "Corduba",
        city: "Córdoba",
        province: "Córdoba",
        lat: 37.8882,
        lng: -4.7794,
        period: "Romano",
        description: "Capital de Hispania Ulterior Baetica. Conserva el famoso puente romano sobre el Guadalquivir, ejemplo de la durabilidad de las obras civiles romanas.",
        wikipediaUrl: "https://es.wikipedia.org/wiki/C%C3%B3rdoba_(Espa%C3%B1a)"
    },
    {
        id: 5,
        name: "Empúries",
        city: "L'Escala",
        province: "Girona",
        lat: 42.1364,
        lng: 3.1206,
        period: "Romano",
        description: "Punto de entrada de la invasión romana en 218 a.C. Conserva restos de la ciudad griega y romana, incluyendo muralla romana.",
        wikipediaUrl: "https://es.wikipedia.org/wiki/Emp%C3%BAries"
    },
    {
        id: 6,
        name: "Baelo Claudia",
        city: "Tarifa",
        province: "Cádiz",
        lat: 36.0886,
        lng: -5.7708,
        period: "Romano",
        description: "Ciudad romana costera que conserva basílica, teatro, templos y factoría de salazones. Muestra influencia del modo de construir africano.",
        wikipediaUrl: "https://es.wikipedia.org/wiki/Baelo_Claudia"
    },
    {
        id: 7,
        name: "Numancia",
        city: "Garray",
        province: "Soria",
        lat: 41.7833,
        lng: -2.4456,
        period: "Celtíbero-Romano",
        description: "Famosa ciudad celtíbera que resistió heroicamente el asedio romano hasta el 133 a.C. Símbolo de la resistencia indígena.",
        wikipediaUrl: "https://es.wikipedia.org/wiki/Numancia"
    },
    {
        id: 8,
        name: "Caesaraugusta",
        city: "Zaragoza",
        province: "Zaragoza",
        lat: 41.6561,
        lng: -0.8773,
        period: "Romano",
        description: "Importante ciudad romana fundada por Augusto. Conserva teatro, termas, foro y museo del puerto fluvial romano.",
        wikipediaUrl: "https://es.wikipedia.org/wiki/Zaragoza"
    },
    {
        id: 9,
        name: "Toledo (Toletum)",
        city: "Toledo",
        province: "Toledo",
        lat: 39.8628,
        lng: -4.0273,
        period: "Romano-Visigodo",
        description: "Capital del Reino Visigodo de Toledo (567-712). Conserva restos romanos y visigodos, incluyendo iglesias con arquitectura de arco de herradura.",
        wikipediaUrl: "https://es.wikipedia.org/wiki/Toledo"
    },
    {
        id: 10,
        name: "Astorga (Asturica Augusta)",
        city: "Astorga",
        province: "León",
        lat: 42.4579,
        lng: -6.0545,
        period: "Romano",
        description: "Importante ciudad romana en el noroeste. Conserva termas, muralla romana y fue centro de explotación aurífera de Las Médulas.",
        wikipediaUrl: "https://es.wikipedia.org/wiki/Astorga"
    },
    {
        id: 11,
        name: "San Juan de Baños",
        city: "Baños de Cerrato",
        province: "Palencia",
        lat: 41.9167,
        lng: -4.3167,
        period: "Visigodo",
        description: "Iglesia visigoda del siglo VII. Ejemplo destacado de arquitectura visigoda con planta basilical, muros gruesos y arco de herradura.",
        wikipediaUrl: "https://es.wikipedia.org/wiki/Iglesia_de_San_Juan_de_Ba%C3%B1os"
    },
    {
        id: 12,
        name: "Lugo (Lucus Augusti)",
        city: "Lugo",
        province: "Lugo",
        lat: 43.0130,
        lng: -7.5564,
        period: "Romano",
        description: "Conserva la muralla romana mejor preservada del mundo, declarada Patrimonio de la Humanidad. Completa y transitable.",
        wikipediaUrl: "https://es.wikipedia.org/wiki/Lugo"
    }
];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: { lat: 40.4168, lng: -3.7038 },
        mapTypeId: 'roadmap'
    });
    
    loadArchaeologicalSites();
    updateSitesList();
}

function loadArchaeologicalSites() {
    archaeologicalSites.forEach(function(site) {
        createMarker(site);
    });
}

function createMarker(siteData) {
    const iconColor = siteData.period === 'Romano' ? '#8B4513' : 
                     siteData.period === 'Visigodo' ? '#800080' : 
                     siteData.period === 'Romano-Visigodo' ? '#4B0082' : 
                     '#CD853F';
    
    const marker = new google.maps.Marker({
        position: { lat: siteData.lat, lng: siteData.lng },
        map: map,
        title: siteData.name,
        icon: {
            url: 'data:image/svg+xml;base64,' + btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="36" viewBox="0 0 24 36">
                    <path fill="${iconColor}" d="M12 0C5.4 0 0 5.4 0 12s12 24 12 24 12-17.6 12-24S18.6 0 12 0z"/>
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
                <h3>${siteData.name}</h3>
                <p><strong>Ubicación:</strong> ${siteData.city}, ${siteData.province}</p>
                <p><strong>Período:</strong> ${siteData.period}</p>
                <p><strong>Descripción:</strong> ${siteData.description}</p>
                <p><strong>Coordenadas:</strong> ${siteData.lat.toFixed(4)}, ${siteData.lng.toFixed(4)}</p>
                <p><a href="${siteData.wikipediaUrl}" target="_blank" rel="noopener noreferrer">📖 Ver en Wikipedia</a></p>
            </div>
        `
    });
    
    marker.addListener('click', function() {
        closeAllInfoWindows();
        infoWindow.open(map, marker);
    });
    
    markers.push({ marker: marker, infoWindow: infoWindow, data: siteData });
    infoWindows.push(infoWindow);
}

function closeAllInfoWindows() {
    infoWindows.forEach(function(infoWindow) {
        infoWindow.close();
    });
}

function updateSitesList() {
    const sitesList = document.getElementById('sitesList');
    
    const romanSites = archaeologicalSites.filter(site => site.period === 'Romano');
    const visigothSites = archaeologicalSites.filter(site => site.period === 'Visigodo');
    const mixedSites = archaeologicalSites.filter(site => site.period === 'Romano-Visigodo');
    const celtibrianSites = archaeologicalSites.filter(site => site.period === 'Celtíbero-Romano');
    
    sitesList.innerHTML = `
        <div class="period-section">
            <h4>🏛️ Yacimientos Romanos (${romanSites.length})</h4>
            ${romanSites.map(site => createSiteListItem(site, '#8B4513')).join('')}
        </div>
        
        <div class="period-section">
            <h4>⛪ Yacimientos Visigodos (${visigothSites.length})</h4>
            ${visigothSites.map(site => createSiteListItem(site, '#800080')).join('')}
        </div>
        
        <div class="period-section">
            <h4>🏰 Yacimientos Romano-Visigodos (${mixedSites.length})</h4>
            ${mixedSites.map(site => createSiteListItem(site, '#4B0082')).join('')}
        </div>
        
        <div class="period-section">
            <h4>⚔️ Yacimientos Celtíbero-Romanos (${celtibrianSites.length})</h4>
            ${celtibrianSites.map(site => createSiteListItem(site, '#CD853F')).join('')}
        </div>
    `;
}

function createSiteListItem(site, color) {
    return `
        <div class="site-item" onclick="focusOnSite(${site.lat}, ${site.lng}, ${site.id})">
            <div class="site-marker" style="background-color: ${color}"></div>
            <div class="site-info">
                <div class="site-name">${site.name}</div>
                <div class="site-location">${site.city}, ${site.province}</div>
                <div class="site-description">${site.description}</div>
            </div>
        </div>
    `;
}

function focusOnSite(lat, lng, siteId) {
    map.setCenter({ lat: lat, lng: lng });
    map.setZoom(12);
    
    // Encontrar y abrir la ventana de información del sitio
    const markerObj = markers.find(m => m.data.id === siteId);
    if (markerObj) {
        closeAllInfoWindows();
        markerObj.infoWindow.open(map, markerObj.marker);
    }
}

function filterSitesByPeriod(period) {
    // Cerrar todas las ventanas de información
    closeAllInfoWindows();
    
    markers.forEach(function(markerObj) {
        if (period === 'all' || markerObj.data.period === period || 
            (period === 'Romano-Visigodo' && markerObj.data.period.includes('Romano'))) {
            markerObj.marker.setVisible(true);
        } else {
            markerObj.marker.setVisible(false);
        }
    });
}