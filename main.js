let map = L.map('map').setView([40.730610, -73.935242], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


L.geoJSON(boroData).addTo(map);
L.geoJSON(arrestData, {
    pointToLayer: function(feature, latlng){
        let marker = L.marker(latlng);
        marker.bindPopup(feature.properties.ofns_desc + '<br/>' + feature.properties.arrest_date);
        return marker
    }
}).addTo(map);

function highlightFeature(e) {
    let layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.9
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);

}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(boroData, {
    onEachFeature: onEachFeature
}).addTo(map);


let info = L.control()

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>NYC Boroughs</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + "Total Arrests:" + boroTotalArrests(props) : 'Hover over a borough');
};

info.addTo(map);


function boroTotalArrests(boro) {
    let count = 0
    switch (boro.name){
        case 'Staten Island':
            for (let arrest in arrestData.features){
                if (arrestData.features[arrest].properties.arrest_boro === "S") {
                    count++
                }
            }
            return count
        case 'Queens':
            for (let arrest in arrestData.features){
                if (arrestData.features[arrest].properties.arrest_boro === "Q") {
                    count++
                }
            }
            return count
        case 'Brooklyn':
            for (let arrest in arrestData.features){
                if (arrestData.features[arrest].properties.arrest_boro === "B") {
                    count++
                }
            }
            return count
        case 'Manhattan':
            for (let arrest in arrestData.features){
                if (arrestData.features[arrest].properties.arrest_boro === "M") {
                    count++
                }
            }
            return count
        case 'Bronx':
            for (let arrest in arrestData.features){
                if (arrestData.features[arrest].properties.arrest_boro === "K") {
                    count++
                }
            }
            return count
    }
}
