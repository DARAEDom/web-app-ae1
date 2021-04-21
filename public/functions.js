function map() {
	initMap();	
//	addModulesToMap();
}

function initMap() {
	const map = L.map ("mapid");

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

function searchButton() {
		const query = document.getElementById("inputQuery").value;
		dbSearch(query);
}

async function dbSearch(query) {
		try {
			const response = await fetch(`/poi/find/${query}`)
			.then(response => {return response.json();})
			.then(contents => {
				Object.values(contents).forEach(value => {
					const arrayValue = Object.values(value)
					console.log(arrayValue);
					addRows(arrayValue);
				})});
//			checkRows();

		} catch (e) {
			console.log(`Error ${e} has occured`);
		}
}

function addRows(contents) {
	let tableId = document.getElementById('tbodyResults');

	let newRow = tableId.insertRow(-1);
	
	let newCell0 = newRow.insertCell(0);
	let newCell1 = newRow.insertCell(1);
	let newCell2 = newRow.insertCell(2);
	let newCell3 = newRow.insertCell(3);
	let newCell4 = newRow.insertCell(4);
	let newCell5 = newRow.insertCell(5);
	let newCell6 = newRow.insertCell(6);
	let newCell7 = newRow.insertCell(7);
	let newCell8 = newRow.insertCell(8);
	
	let newText0 = document.createTextNode(contents[1]);
	let newText1 = document.createTextNode(contents[2]);
	let newText2 = document.createTextNode(contents[3]);
	let newText3 = document.createTextNode(contents[4]);
	let newText4 = document.createTextNode(contents[5]);
	let newText5 = document.createTextNode(contents[6]);
	let newText6 = document.createTextNode(contents[7]);
	let newText7 = document.createTextNode(contents[8]);
	let newButton8 = document.createElement("BUTTON");
	
	newButton8.innerHTML = "Recommend";
	newButton8.onclick = function(){
		saveRecommendation(this.id);
	}
	newButton8.setAttribute("id", contents[0]);

	newCell0.appendChild(newText0);
	newCell1.appendChild(newText1);
	newCell2.appendChild(newText2);
	newCell3.appendChild(newText3);
	newCell4.appendChild(newText4);
	newCell5.appendChild(newText5);
	newCell6.appendChild(newText6);
	newCell7.appendChild(newText7);
	newCell8.appendChild(newButton8);
}

function checkRows() {
	const tbodyElement = document.getElementById('tbodyResults');
//	tbodyElement.childNodes.forEach ( childNode => {
//			tbodyElement.removeChild('tr');
//});
//	tbodyElement.remove(tbodyElement.firstChild);
}

function getData() {
	const contents = {
		name: document.getElementById("nameIn").value,
		region: document.getElementById("regionIn").value,
		type: document.getElementById("typeIn").value,
		country: document.getElementById("countryIn").value,
		lon: document.getElementById("lonIn").value,
		lat: document.getElementById("latIn").value,
		description: document.getElementById("desIn").value
	}
	saveData(contents)
}

async function saveData(contents) { 
	console.log(contents);
	const response = await fetch(`/poi/add`, {
			method:'POST',
			headers: {
				'Content-Type': 'application/json'},
			body: JSON.stringify(contents)
	});
}

async function saveRecommendation(id) {
	console.log(id);
	const response = await fetch(`/poi/${id}/recommend`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'}
	})
}
