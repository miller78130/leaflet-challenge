
//Setting grayscale background for the map
var graymap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
});

var map = L.map("map", {
    center: [42,-42],
    zoom: 3,
});

graymap.addTo(map);

var earthquakes = new L.LayerGroup();

// Our AJAX call retrieves our earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {

function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
}

function getColor(magnitude) {
    switch (true) {
        case magnitude > 5:
            return "#f06b6b";
        case magnitude > 4:
            return "#f0a76b";
        case magnitude > 3:
            return "#f3ba4d";
        case magnitude > 2:
            return "#f3db4d";
        case magnitude > 1:
            return "#e1f34d";
        default:
            return "#b7f34d";
    }
}
function getRadius(magnitude)

}

