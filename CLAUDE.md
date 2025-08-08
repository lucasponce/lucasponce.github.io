# Roman and Visigothic Archaeological Sites of Spain

This project is a static web application that displays an interactive map of archaeological sites from the Roman and Visigothic periods in Spain using Google Maps.

## Project Structure

```
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Stylesheet with archaeological theme
├── js/
│   └── map.js          # JavaScript for Google Maps functionality
├── data/
│   └── archaeological-sites.json  # Archaeological sites data
└── README.md           # Project description
```

## Features

- Interactive Google Maps integration with fullscreen display
- Archaeological sites with detailed information loaded from JSON data
- Period-based filtering with toggle buttons (Roman, Visigothic, Roman-Visigothic, Celtiberian-Roman)
- Info windows with site descriptions and Wikipedia links
- Museum-inspired design with professional styling
- Responsive design optimized for desktop and mobile devices
- Mobile-specific features: circular filter buttons and floating period indicator
- Zoom functionality when clicking on site markers

## Technologies Used

- HTML5
- CSS3 (with Google Fonts: Cinzel and Cormorant Garamond)
- JavaScript (ES6+ with async/await)
- Google Maps JavaScript API
- JSON for data storage

## Development Notes

- The project uses a museum-inspired color palette with gold (#d4af37) and dark browns
- Archaeological site data is stored in JSON format for easy maintenance
- The map is configured to show the Iberian Peninsula by default
- All styling follows an archaeological/historical theme
- Mobile interface uses circular buttons and floating indicators for optimal UX
- Data is loaded asynchronously from the JSON file

## Setup

1. Ensure you have a valid Google Maps API key
2. The API key is currently embedded in the HTML file
3. Serve the files from a web server (required for JSON loading)
4. Open index.html in a web browser to run the application

## Site Data

The application includes 12 archaeological sites across Spain with detailed historical information and precise coordinates. Site data is stored in `data/archaeological-sites.json` for easy updates and maintenance.

## Data Structure

Each archaeological site contains:
- id: Unique identifier
- name: Site name
- city: Modern city location
- province: Spanish province
- lat/lng: GPS coordinates
- period: Historical period classification
- description: Detailed historical information
- wikipediaUrl: Link to Wikipedia article

## Deployment

As indicated by the repository name (`lucasponce.github.io`), this is a GitHub Pages site that gets deployed automatically when changes are pushed to the repository.