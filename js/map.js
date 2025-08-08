let map;
let markers = [];
let infoWindows = [];
let archaeologicalSites = [];

async function loadArchaeologicalData() {
    try {
        const response = await fetch('data/archaeological-sites.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        archaeologicalSites = await response.json();
        console.log('Archaeological sites loaded successfully:', archaeologicalSites.length, 'sites');
    } catch (error) {
        console.error('Error loading archaeological sites data:', error);
        // Fallback: you could provide a minimal dataset here if needed
        archaeologicalSites = [];
    }
}

async function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: { lat: 40.4168, lng: -3.7038 },
        mapTypeId: 'roadmap'
    });
    
    // Load data first, then create markers
    await loadArchaeologicalData();
    loadArchaeologicalSites();
    updateMobilePeriodIndicator();
}

function loadArchaeologicalSites() {
    archaeologicalSites.forEach(function(site) {
        createMarker(site);
    });
}

function createMarker(siteData) {
    const iconColor = siteData.period === 'Roman' ? '#8B4513' : 
                     siteData.period === 'Visigothic' ? '#800080' : 
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
        // Center and zoom to the clicked site
        map.setCenter({ lat: siteData.lat, lng: siteData.lng });
        map.setZoom(12);
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

// Track which periods are currently active
let activePeriods = new Set(['Roman', 'Visigothic', 'Celtiberian-Roman']);

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

function togglePeriod(period) {
    // Close all information windows
    closeAllInfoWindows();
    
    // Toggle the period in our active set
    if (activePeriods.has(period)) {
        activePeriods.delete(period);
    } else {
        activePeriods.add(period);
    }
    
    // Update button appearance
    const button = document.querySelector(`[data-period="${period}"]`);
    if (activePeriods.has(period)) {
        button.classList.add('active');
    } else {
        button.classList.remove('active');
    }
    
    // Update marker visibility
    markers.forEach(function(markerObj) {
        if (activePeriods.has(markerObj.data.period)) {
            markerObj.marker.setVisible(true);
        } else {
            markerObj.marker.setVisible(false);
        }
    });
    
    // Update mobile period indicator
    updateMobilePeriodIndicator();
    
    // Always reset map view to initial position when any filter is toggled
    map.setCenter({ lat: 40.4168, lng: -3.7038 });
    map.setZoom(6);
}

function updateMobilePeriodIndicator() {
    const indicatorList = document.getElementById('activePeriodsList');
    if (!indicatorList) return;
    
    // Clear current content
    indicatorList.innerHTML = '';
    
    // Period colors mapping
    const periodColors = {
        'Roman': '#8B4513',
        'Visigothic': '#800080',
        'Celtiberian-Roman': '#CD853F'
    };
    
    // Create items for active periods
    if (activePeriods.size === 0) {
        indicatorList.innerHTML = '<div class="period-indicator-item">No periods active</div>';
    } else {
        activePeriods.forEach(period => {
            const item = document.createElement('div');
            item.className = 'period-indicator-item';
            item.innerHTML = `
                <div class="period-indicator-marker" style="background-color: ${periodColors[period]};"></div>
                <span>${period}</span>
            `;
            indicatorList.appendChild(item);
        });
    }
}