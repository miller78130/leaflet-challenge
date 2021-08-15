
//Setting grayscale background for the map
var graymap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
});

var map = L.map("mapid", {
    center: [0,0],
    zoom: 2.4,
});

graymap.addTo(map);

var earthquakes = new L.LayerGroup();

// Our AJAX call retrieves our earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {
    console.log(data);

function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
}

function getColor(depth) {
    switch (true) {
        case depth > 70:
            return "#f06b6b";
        case depth > 50:
            return "#f0a76b";
        case depth > 30:
            return "#f3ba4d";
        case depth > 10:
            return "#f3db4d";
        case depth > -10:
            return "#e1f34d";
        default:
            return "#b7f34d";
    }
}
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude *3;
}
L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
    },
    style: styleInfo,
    onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Depth: " + feature.geometry.coordinates[2] + "<br>Location: " + feature.properties.place);
    }

}).addTo(earthquakes);

earthquakes.addTo(map);

var legend = L.control({
    position: "bottomright"
});

legend.onAdd = function() {
    var div = L
        .DomUtil
        .create("div", "info legend");

        var scale = [-10,10,30,50,70,90];
        var colors = [
            "#b7f34d",
            "#e1f34d",
            "#f3db4d",
            "#f3ba4d",
            "#f0a76b",
            "#f06b6b"
        ];

        for (var i = 0; i< scale.length; i++) {
            div.innerHTML += "<i style='background: " + colors[i] + "'></i>" +
            scale[i] + (scale[i+1] ? "&ndash;" + scale[i+1] + "<br>" : "+");
        }
        return div;
};
legend.addTo(map);

});

