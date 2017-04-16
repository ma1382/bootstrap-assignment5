// instantiate the map object
var map = L.map('mapContainer', {
  scrollWheelZoom: false
}).setView([40.853202, -73.904920], 13);

//add a light basemap from carto's free basemaps
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
}).addTo(map);
    
    // Create point feature for Office of Fernando Cabrera
    var myDataPoint = L.marker([40.853202, -73.904920]).addTo(map);
    
    // Create line feature for Jerome Ave rezoning corridor, style and add to map
    var myDataLine = L.polyline([[40.860598, -73.902564], [40.834177, -73.922192]],
      {color: 'orange', weight: 7}).addTo(map);

    // Bind popup to data point object
    myDataPoint.bindPopup("<h3>Office of Fernando Cabrera</h3><p>Bronx, NY<br>New York City Council District 14.</p>");

    // Bind popup to line object
    myDataLine.bindPopup("Jerome Ave proposed rezoning corridor");

    // load GeoJSON from an external file
    $.getJSON("cc_14_copy.geojson",function(data){
   
      // add GeoJSON layer to the map once the file is loaded
      L.geoJson(data).addTo(map);
});

    // load GeoJSON from an external file
    $.getJSON("polygon2.geojson",function(data){

    
    // add GeoJSON layer to the map once the file is loaded
      L.geoJson(data,{
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name);
        }
    
      }).addTo(map);

});

//add in test points

var transit4 = [
  {
    name: 'Fordham Road',
    line: '4',
    coord: [40.862836, -73.901109],
  },
  {
    name: 'Burnside Ave',
    line: '4',
    coord: [40.853457, -73.907654],
  },
  {
    name: '176 Street',
    line: '4',
    coord: [40.848464, -73.911787],
  },
  {
    name: 'Mt Eden Avenue',
    line: '4',
    coord: [40.844391, -73.914678],
  },
  {
    name: '167 Street',
    line: '4',
    coord: [40.835527, -73.921398],
  },
]

var transitD = [
  {
    name: 'Fordham Rd',
    line: 'B/D',
    coord: [40.861271, -73.897779],
  },
  {
    name: '182-83 St',
    line: 'B',
    coord: [40.856085, -73.900736],
  },
  {
    name: 'Tremont Avenue',
    line: 'B/D',
    coord: [40.850431, -73.905210],
  },
  {
    name: '174-175 St',
    line: 'B',
    coord: [40.846491, -73.909716],
  },
  {
    name: '170 St',
    line: 'B',
    coord: [40.840087, -73.913364],
  },
  {
    name: '167 Street',
    line: 'B',
    coord: [40.705446, -73.934281],
  },
]

// create an empty layerGroup
var transit4LayerGroup = L.layerGroup();

transit4.forEach(function(data) {
  var thisCircleMarker = L.circleMarker(data.coord, {
    color: 'white',
    fillColor: 'green',
    fillOpacity: .9,
    weight: 1,
  })
    .bindPopup(data.name + ' station- ' + data.line + ' train on Lexington Ave line')
    .addTo(map)


    transit4LayerGroup.addLayer(thisCircleMarker);
});

var transitDLayerGroup = L.layerGroup();

transitD.forEach(function(data) {
  var thisCircleMarker = L.circleMarker(data.coord, {
    color: 'white',
    fillColor: 'orange',
    fillOpacity: .9,
    weight: 2,
  })
    .bindPopup(data.name + ' station- ' + data.line + ' train(s) on 6th Ave line')
    .addTo(map)


    transitDLayerGroup.addLayer(thisCircleMarker);
});

// finally, add the fully populated layergroup to the map
transit4LayerGroup.addTo(map);
transitDLayerGroup.addTo(map);

// create an object with the two layerGroups in it, which we can pass into L.control.group

var types = {
  "4 Train": transit4LayerGroup,
  "B/D Trains": transitDLayerGroup,
}

L.control.layers(null, types, {
  collapsed: false
}).addTo(map);

// begin event handlers for buttons

$('.Burnside').on('click', function() {
  // alert('You clicked Al!')
  map.flyTo(transit4[1].coord, 16)
});

$('.Tremont').on('click', function() {
  // alert('You clicked Al!')
  map.flyTo(transitD[2].coord, 16)
});

//end


    // reset view
    $('.reset').on('click', function() {
    // alert('#')
    map.flyTo([40.853202, -73.904920], 13);
});

    console.log("hello");


