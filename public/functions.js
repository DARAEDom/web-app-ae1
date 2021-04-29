function map() {
	const map = L.map ("mapid");
	const attrib="Map data copyright OpenStreetMap contributors, Open Database Licence";
	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: attrib } ).addTo(map);

	const location = document.body.getElementsByTagName("td");
	
	const pos = [ parseInt(location[5].childNodes[0].nodeValue), parseInt(location[4].childNodes[0].nodeValue)];
	map.setView(pos, 14);

	const array = Array.from(location);
		for(i=0; i < location.length/9; i++) {
			addModulesToMap(map, [parseFloat(array[5+i*9].childNodes[0].nodeValue), parseFloat(array[4+i*9].childNodes[0].nodeValue)], [array[0+i*9].childNodes[0].nodeValue, array[6+i*9].childNodes[0].nodeValue]);
		} 

	L.marker(pos).addTo(map);
	map.on("click", mark => {
		L.marker([mark.latlng.lat, mark.latlng.lng]).addTo(map);
		fillForm(mark.latlng.lng, mark.latlng.lat);
});
}

function fillForm(lon, lat) {
	document.getElementById('lonIn').value = lon;
	document.getElementById('latIn').value = lat;
}

function addModulesToMap(map, location, details) {
	const marker = L.marker([location[0], location[1]]).addTo(map);
	marker.bindPopup(`<b>${details[0]}</b><br>${details[1]}`);
}

function searchButton() {
	try {
		const query = document.getElementById("inputQuery").value;
		if (query) {
		purgeTable();
		purgeMap();
		dbSearch(query); 
		document.getElementById('alert').style.display = "none";
		} else {
			console.log("Ajax Get Search - No Input");
			document.getElementById('alert').innerHTML = "Empty search query";
			document.getElementById('alert').style.display = "block";
		}
	} catch (e) {
		console.log(`Error ${e} has occured!`);
		document.getElementById('alert').innerHTML = "Error has occured";
		document.getElementById('alert').style.display = "block";
	}
}

async function dbSearch(query) {
		const response = await fetch(`/poi/find/${query}`)
		.then(response => {return response.json();})
		.then(contents => {
			Object.values(contents).forEach(value => {
				const arrayValue = Object.values(value)
				addRows(arrayValue);
			})
			if (contents.length != 0) {
				document.getElementById("table").style.display = "block";
				map();
			} else {
				console.log("Ajax Search Get - Failed to find");
				document.getElementById('alert').innerHTML = "No results found";
				document.getElementById('alert').style.display = "block";
			}
		});
}

function purgeTable() {
	const table = document.getElementById('tbodyResults');
	while (table.firstChild) {
		table.removeChild(table.lastChild);
	}
}

function purgeMap() {
	let mapElement = document.getElementById('mapDiv');
	let mapChildElement = document.getElementById('mapid');
	if (!document.getElementById('mapid').className == false) {
		mapChildElement.remove();

		let newDiv = document.createElement("div");
		newDiv.setAttribute("id", "mapid");
		newDiv.setAttribute("style", "height:600px")

		mapElement.appendChild(newDiv);
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

function getData() {
	try {
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
	} catch (e) {
		console.log(`Get data error - ${e}`);
		document.getElementById('alert').innerHTML = `Error has occured: ${e}`;
		document.getElementById('alert').style.display = "block";
	}
}

async function saveData(contents) { 
	const response = await fetch(`/poi/add`, {
			method:'POST',
			headers: {
				'Content-Type': 'application/json'},
			body: JSON.stringify(contents)
	});

	const alertHtml = document.getElementById('alert');
	if(response.status == 401) {
		console.log("Ajax Post Add - Not logged in");
		alertHtml.innerHTML = "Log in before Adding new record";
		alertHtml.style.display = "block";
	} else if (response.status == 402) {
		console.log("Ajax Post Add - Null value");
		alertHtml.innerHTML = "Fill all the forms";
		alertHtml.style.display = "block";
	} else if (response.status == 500) {
		console.log("Ajax Post Add - Error");
		alertHtml.innerHTML = "Error has occured";
	} else {
		alertHtml.style.display = "none";
	}
}

async function saveRecommendation(id) {
	const response = await fetch(`/poi/${id}/recommend`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'}
	});

	const alertHtml = document.getElementById('alert');
	if(response.status == 401) {
		console.log("Ajax Recommend Post - Not logged in");
		alertHtml.value = "Log in before Sending Recommendation";
		alertHtml.style.display = "block"
	} else if (response.status == 500) {
		console.log("Ajax Recommend Post - Error");
		alertHtml.value = "Error has occured";
		alertHtml.style.display = "block"
	} else {
		alertHtml.style.display = "none";
	}
}

function loginDetails() {
	details = {
			username: document.getElementById("loginInput").value,
			password: document.getElementById("passwordInput").value
	}
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

async function checkLogin() {
	const response = await fetch(`/login`)
	.then(response => {return response.json()})
	.then(contents => {
		if (contents.username) {
			document.getElementById('alert').style.display = "none";
			document.getElementById('loginInput').style.display = "none";
			document.getElementById('passwordInput').style.display = "none";
			document.getElementById('loginButton').style.display = "none";

			let loginForm = document.getElementById('loginForm');				

			const welcomeText = document.getElementById('welcomeText')
			welcomeText.style.display = "block";
			welcomeText.innerHTML = "";
			welcomeText.innerHTML = `Welcome ${contents.username}`;
			document.getElementById('logoutButton').style.display = "block";
		} else {
			document.getElementById('alert').innerHTML = "User not Logged in";
			document.getElementById('alert').style.display = "block";
		}
	});
	// const answer = response.json();
	// response.then(contents => {

	// });
	// console.log("Answer", answer);
	// console.log("Answer 2", answer);
	// Promise.resolve([1, 2, 3])
	// .then(function(value) {
	// 	console.log(value);
	// })
	// console.log("Promise", Promise.resolve());
	// if (ajaxGetLogin) {
		// console.log("Logged in ");
	// } else {
		// console.log("Not Logged");
	// }
}

async function logout() {
	console.log("async logout");
	const response = await fetch('/logout');
	const answer = response.json();
}

function responseCheck(response) {
	if (response.status == 401) {
		console.log("You must be logged in");
		return 1;
	} else if (response.status == 402) {			
		console.log("Null value");
		return 2;
	}
}