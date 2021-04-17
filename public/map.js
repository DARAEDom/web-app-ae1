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

function addModulesToMap() {
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
}
