function map() {
	initMap();	
}

function initMap{

	const map = L.map ("map1");

	const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: attrib } ).addTo(map);

	const pos = [50.9, -1.4];            
	map.setView(pos, 14);

	L.marker(pos).addTo(map);
	map.on("click", e => {
		L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
		console.log(`You clicked at:${e.latlng.lat} ${e.latlng.lng}`);
	});
}


const solent = L.circle([50.9079, -1.4015], { radius:100, fillColor: 'blue',
                                color: 'red', opacity: 0.5 }).addTo(map);

// Saints stadium (football ground)
const saints = L.polygon ( [
        [50.9063 , -1.3914 ] ,
        [50.9063 , -1.3905 ] ,
        [50.9053 , -1.3905 ] ,
        [50.9053 , -1.3914 ]
        ] ).addTo(map);

// Route to railway station
const routeToStation = L.polyline ( [
        [50.9079, -1.4015] ,
        [50.9071, -1.4015], 
        [50.9069, -1.4047],
        [50.9073, -1.4077],
        [50.9081, -1.4134] 
        ]).addTo(map);
const marker = L.marker(pos).addTo(map);

solent.bindPopup("Solent University");
saints.bindPopup("Saints stadium");
routeToStation.bindPopup("Route to station");
marker.bindPopup("My Location");

// Custom markers
const bondstreet = L.polygon([[51.314018690847135, -2.215558290481568] ,
							[51.3143539934763, -2.215955257415772] ,
							[51.31464905776292, -2.2152364253997807] ,
							[51.314467995811995, -2.2151935100555424]]).addTo(map);

bondstreet.bindPopup("Gruba Kurwa street");

const ita = L.circle([41.90354188154937, 12.477996842935683], { radius: 20000, fillColor: 'pink', color: 'pink', opacity: 0.8}).addTo(map);
ita.bindPopup("Unicorn City");
