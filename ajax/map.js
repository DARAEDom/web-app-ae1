const map = L.map ("map0");

const waterMark="Map data copyright OpenStreetMap contributors, Open Database Licence";

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution: waterMark}).addTo(map);

const pos=[50.91, -1.4];
map.setView(pos, 14);

L.marker(pos).addTo(map);

map.on("click", e => {
	L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
	console.log(`You clicked at: ${e.latlng.lat} ${e.latlng.lng}`);
});
