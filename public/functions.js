function map() {
	const map = L.map ("mapid");
	const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";
	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: attrib } ).addTo(map);

	const location = document.body.getElementsByTagName("td");
	
	const pos = [ parseInt(location[5].childNodes[0].nodeValue), parseInt(location[4].childNodes[0].nodeValue)];
	map.setView(pos, 14);

	let array = Array.from(location);
		console.log(array);
		console.log(array[0]);
		console.log(array[1]);
		console.log(array[8]);
/*		for(i=0; i < location.length; i++) {
			console.log(location[1].childNodes[i].nodeValue);
		} */
//		addModulesToMap(map, )

	L.marker(pos).addTo(map);
	map.on("click", mark => {
		L.marker([mark.latlng.lat, mark.latlng.lng]).addTo(map);
		console.log(`You clicked at:${mark.latlng.lat} ${mark.latlng.lng}`);

});
}

function addModulesToMap(map, location, details) {
	console.log(location[0], location[1], details[0], details[1] );
	const marker = L.marker([location[0], location[1]]).addTo(map);
	marker.bindPopup(`<b>${details[0]}</b><br>${details[1]}`);
}

// function map(location) {
	// const map = L.map ("mapid");
//[50.9, -1.4]
	// console.log(map);
	// const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";
// 
	// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: attrib } ).addTo(map);
// 
	// const pos = [location[0], location[1]];
	// map.setView(pos, 14);
// 
	// L.marker(pos).addTo(map);
	// map.on("click", mark => {
		// L.marker([mark.latlng.lat, mark.latlng.lng]).addTo(map);
		// console.log(`You clicked at:${mark.latlng.lat} ${mark.latlng.lng}`);
// 
		// addModulesToMap(map, )
// });
// }
// 
// function addModulesToMap(map, location, details) {
	// console.log(location[0], location[1], details[0], details[1] );
	// const marker = L.marker([location[0], location[1]]).addTo(map);
	// marker.bindPopup(`<b>${details[0]}</b><br>${details[1]}`);
// }

function searchButton() {
	try {
		const query = document.getElementById("inputQuery").value;
		dbSearch(query); 
	} catch (e) {
		console.log(`Error ${e} has occured!`);
	}
}

async function dbSearch(query) {
			const response = await fetch(`/poi/find/${query}`)
			.then(response => {return response.json();})
			.then(contents => {
				Object.values(contents).forEach(value => {
					const arrayValue = Object.values(value)
					//console.log(arrayValue);
					addRows(arrayValue);
					//console.log(arrayValue[5], arrayValue[6], arrayValue[7], arrayValue[2]);
				})
				map();
//				map.map(mapLocation);
			});
//			checkRows();
}

// async function dbSearch(query) {
// 			const response = await fetch(`/poi/find/${query}`)
// 			.then(response => {return response.json();})
// 			.then(contents => {
// 				Object.values(contents).forEach(value => {
// 					const arrayValue = Object.values(value)
// 					console.log(arrayValue);
// 					addRows(arrayValue);
// 					addModulesToMap([arrayValue[5], arrayValue[6]], [arrayValue[7], arrayValue[2]]);
// 					console.log(arrayValue[5], arrayValue[6], arrayValue[7], arrayValue[2]);
// 				})
// 				mapLocation = [contents[6], contents[7]];
// //				map.map(mapLocation);
// 			});
// //			checkRows();
// }

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


function loginDetails() {
	details = {
			username: document.getElementById("loginId").value,
			password: document.getElementById("passwordId").value
	}
		console.log(details);
	ajaxLogin(details);
}

async function ajaxLogin(details) {
	const response = await fetch(`/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'},
		body: JSON.stringify(details)
	});	
}

function checkLogin() {
	console.log("check login");
	if (ajaxGetLogin) {
		console.log("Logged in ");
	} else {
		console.log("Not Logged");
	}
}
async function ajaxGetLogin() {
	const response = await fetch('/login');
	console.log(response);
}