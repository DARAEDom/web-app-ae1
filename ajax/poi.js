// add env port variable 

async function ajaxSearch(query) { // async with JSON
		const response = await fetch(`https://localhost:8080/${}`); 
		const contents = await response.json();
		let html = "";
		
		contents.forEach( result => {
				html += `Name: ${result.name}, Region: ${result.region}, Type: ${result.type}, Country: ${result.country}, Longitude: ${result.lon}, Latitude: ${result.lat}, Description: ${result.description} <br/>`
		});
		document.getElementById('results').innerHTML = html;
}

document.getElementById('findButton').addEventListener('click', () => {
		const searchQuery = document.getElementById('input').value;
		ajaxSearch(searchQuery);
});
