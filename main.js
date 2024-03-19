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
// should try to make this code prettier - maybe use anon function to pull in the boroStats rather than making individual function calls
info.update = function (props) {
    this._div.innerHTML = '<h4>NYC Boroughs</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + "Total Arrests:" + boroStats(props).totalArrests + '<br />' + "Male Arrests:" + boroStats(props).maleArrests + '<br />' + "Female Arrests: " + boroStats(props).femaleArrests: 'Hover over a borough');
};

info.addTo(map);

// Unused - delete when no longer needed for reference
function boroTotalArrests(boro) {
    switch (boro.name){
        case 'Staten Island':
            return arrestStats.general_stats.arrest_boro.S
        case 'Queens':
            return arrestStats.general_stats.arrest_boro.Q
        case 'Brooklyn':
            return arrestStats.general_stats.arrest_boro.B 
        case 'Manhattan':
            return arrestStats.general_stats.arrest_boro.M 
        case 'Bronx':
            return arrestStats.general_stats.arrest_boro.B 
    }
}

// Returns an object containing the stats for each boro
function boroStats(boro) {
    switch (boro.name){
        case 'Staten Island':
            return {
                totalArrests: arrestStats.general_stats.arrest_boro.S,
                maleArrests: arrestStats.boro_stats.S.perp_sex.M,
                femaleArrests: arrestStats.boro_stats.S.perp_sex.F,
                mostCommonCrime: Object.keys(arrestStats.boro_stats.S.ofns_desc)[0]
            }
        case 'Queens':
            return {
                totalArrests: arrestStats.general_stats.arrest_boro.Q,
                maleArrests: arrestStats.boro_stats.Q.perp_sex.M,
                femaleArrests: arrestStats.boro_stats.Q.perp_sex.F,
                mostCommonCrime: Object.keys(arrestStats.boro_stats.Q.ofns_desc)[0]
            } 
        case 'Brooklyn':
            return {
                totalArrests: arrestStats.general_stats.arrest_boro.B,
                maleArrests: arrestStats.boro_stats.B.perp_sex.M,
                femaleArrests: arrestStats.boro_stats.B.perp_sex.F,
                mostCommonCrime: Object.keys(arrestStats.boro_stats.B.ofns_desc)[0]
            }
        case 'Manhattan':
            return {
                totalArrests: arrestStats.general_stats.arrest_boro.M,
                maleArrests: arrestStats.boro_stats.M.perp_sex.M,
                femaleArrests: arrestStats.boro_stats.M.perp_sex.F,
                mostCommonCrime: Object.keys(arrestStats.boro_stats.M.ofns_desc)[0]
            }
        case 'Bronx':
            return {
                totalArrests: arrestStats.general_stats.arrest_boro.K,
                maleArrests: arrestStats.boro_stats.K.perp_sex.M,
                femaleArrests: arrestStats.boro_stats.K.perp_sex.F,
                mostCommonCrime: Object.keys(arrestStats.boro_stats.K.ofns_desc)[0]
            }
    }
}
