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
        period: "Roman",
        description: "Capital of Roman Lusitania. Preserves theater, amphitheater, circus, Temple of Diana, aqueducts and Roman bridge. UNESCO World Heritage Site.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/M%C3%A9rida,_Spain"
    },
    {
        id: 2,
        name: "Tarraco",
        city: "Tarragona",
        province: "Tarragona",
        lat: 41.1189,
        lng: 1.2445,
        period: "Roman",
        description: "Capital of Hispania Citerior. Preserves Roman walls, amphitheater, circus, provincial forum and aqueduct. UNESCO World Heritage Site.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Tarragona"
    },
    {
        id: 3,
        name: "Segóbriga",
        city: "Saelices",
        province: "Cuenca",
        lat: 39.8851,
        lng: -2.8133,
        period: "Roman",
        description: "Ancient 'caput Celtiberiæ' (head of Celtiberia). Preserves theater, amphitheater, baths, walls and forum. Prospered from lapis specularis exploitation.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Segobriga"
    },
    {
        id: 4,
        name: "Corduba",
        city: "Córdoba",
        province: "Córdoba",
        lat: 37.8882,
        lng: -4.7794,
        period: "Roman",
        description: "Capital of Hispania Ulterior Baetica. Preserves the famous Roman bridge over the Guadalquivir, an example of the durability of Roman civil works.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/C%C3%B3rdoba,_Spain"
    },
    {
        id: 5,
        name: "Empúries",
        city: "L'Escala",
        province: "Girona",
        lat: 42.1364,
        lng: 3.1206,
        period: "Roman",
        description: "Entry point of the Roman invasion in 218 BC. Preserves remains of the Greek and Roman city, including Roman walls.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Emp%C3%BAries"
    },
    {
        id: 6,
        name: "Baelo Claudia",
        city: "Tarifa",
        province: "Cádiz",
        lat: 36.0886,
        lng: -5.7708,
        period: "Roman",
        description: "Coastal Roman city that preserves basilica, theater, temples and fish-salting factory. Shows influence of African building methods.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Baelo_Claudia"
    },
    {
        id: 7,
        name: "Numancia",
        city: "Garray",
        province: "Soria",
        lat: 41.7833,
        lng: -2.4456,
        period: "Celtiberian-Roman",
        description: "Famous Celtiberian city that heroically resisted the Roman siege until 133 BC. Symbol of indigenous resistance.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Numantia"
    },
    {
        id: 8,
        name: "Caesaraugusta",
        city: "Zaragoza",
        province: "Zaragoza",
        lat: 41.6561,
        lng: -0.8773,
        period: "Roman",
        description: "Important Roman city founded by Augustus. Preserves theater, baths, forum and museum of the Roman river port.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Zaragoza"
    },
    {
        id: 9,
        name: "Toledo (Toletum)",
        city: "Toledo",
        province: "Toledo",
        lat: 39.8628,
        lng: -4.0273,
        period: "Roman-Visigothic",
        description: "Capital of the Visigothic Kingdom of Toledo (567-712). Preserves Roman and Visigothic remains, including churches with horseshoe arch architecture.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Toledo,_Spain"
    },
    {
        id: 10,
        name: "Astorga (Asturica Augusta)",
        city: "Astorga",
        province: "León",
        lat: 42.4579,
        lng: -6.0545,
        period: "Roman",
        description: "Important Roman city in the northwest. Preserves baths, Roman walls and was center of gold exploitation at Las Médulas.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Astorga,_Spain"
    },
    {
        id: 11,
        name: "San Juan de Baños",
        city: "Baños de Cerrato",
        province: "Palencia",
        lat: 41.9167,
        lng: -4.3167,
        period: "Visigothic",
        description: "7th-century Visigothic church. Outstanding example of Visigothic architecture with basilical plan, thick walls and horseshoe arch.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Basilica_of_San_Juan_Bautista"
    },
    {
        id: 12,
        name: "Lugo (Lucus Augusti)",
        city: "Lugo",
        province: "Lugo",
        lat: 43.0130,
        lng: -7.5564,
        period: "Roman",
        description: "Preserves the best-preserved Roman wall in the world, declared World Heritage Site. Complete and walkable.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Lugo"
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
    const iconColor = siteData.period === 'Roman' ? '#8B4513' : 
                     siteData.period === 'Visigothic' ? '#800080' : 
                     siteData.period === 'Roman-Visigothic' ? '#4B0082' : 
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
                <p><strong>Location:</strong> ${siteData.city}, ${siteData.province}</p>
                <p><strong>Period:</strong> ${siteData.period}</p>
                <p><strong>Description:</strong> ${siteData.description}</p>
                <p><strong>Coordinates:</strong> ${siteData.lat.toFixed(4)}, ${siteData.lng.toFixed(4)}</p>
                <p><a href="${siteData.wikipediaUrl}" target="_blank" rel="noopener noreferrer">📖 View on Wikipedia</a></p>
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
    
    const romanSites = archaeologicalSites.filter(site => site.period === 'Roman');
    const visigothSites = archaeologicalSites.filter(site => site.period === 'Visigothic');
    const mixedSites = archaeologicalSites.filter(site => site.period === 'Roman-Visigothic');
    const celtibrianSites = archaeologicalSites.filter(site => site.period === 'Celtiberian-Roman');
    
    sitesList.innerHTML = `
        <div class="period-section">
            <h4>🏛️ Roman Sites (${romanSites.length})</h4>
            ${romanSites.map(site => createSiteListItem(site, '#8B4513')).join('')}
        </div>
        
        <div class="period-section">
            <h4>⛪ Visigothic Sites (${visigothSites.length})</h4>
            ${visigothSites.map(site => createSiteListItem(site, '#800080')).join('')}
        </div>
        
        <div class="period-section">
            <h4>🏰 Roman-Visigothic Sites (${mixedSites.length})</h4>
            ${mixedSites.map(site => createSiteListItem(site, '#4B0082')).join('')}
        </div>
        
        <div class="period-section">
            <h4>⚔️ Celtiberian-Roman Sites (${celtibrianSites.length})</h4>
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
    
    // Find and open the site's information window
    const markerObj = markers.find(m => m.data.id === siteId);
    if (markerObj) {
        closeAllInfoWindows();
        markerObj.infoWindow.open(map, markerObj.marker);
    }
}

function filterSitesByPeriod(period) {
    // Close all information windows
    closeAllInfoWindows();
    
    // Reset map view to original position (showing all of Iberian Peninsula)
    map.setCenter({ lat: 40.4168, lng: -3.7038 });
    map.setZoom(6);
    
    markers.forEach(function(markerObj) {
        if (period === 'all' || markerObj.data.period === period) {
            markerObj.marker.setVisible(true);
        } else {
            markerObj.marker.setVisible(false);
        }
    });
}