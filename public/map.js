function map(location) {
	const map = L.map ("mapid");
// [50.9, -1.4]
	const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: attrib } ).addTo(map);

	const pos = [location[0], location[1]];
	map.setView(pos, 14);

	L.marker(pos).addTo(map);
	map.on("click", mark => {
		L.marker([mark.latlng.lat, mark.latlng.lng]).addTo(map);
		console.log(`You clicked at:${mark.latlng.lat} ${mark.latlng.lng}`);

	addModulesToMap(map);
});

function addModulesToMap(map, location, details) {

	const marker = L.marker([location[0], location[1]]).addTo(map);
	marker.bindPopup(`<b>${details[0]}</b><br>${details[1]}`);
	
/*	const solent = L.circle([50.9079, -1.4015], { radius:100, fillColor: 'blue',
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
*/
}}
