// add env port variable 

async function ajaxSearch(query) { // async with JSON
		const response = await fetch(`https://localhost:8080/poi/find/${query}`); 
		const contents = await response.json();
		let queryResults = "";
		
		contents.forEach( result => {
				queryResults += `Name: ${result.name}, Region: ${result.region}, Type: ${result.type}, Country: ${result.country}, Longitude: ${result.lon}, Latitude: ${result.lat}, Description: ${result.description} <br/>`
		});
		document.getElementById('results').innerHTML = queryResults;
}

document.getElementById('sendButton').addEventListener('click', () => {
		const searchQuery = document.getElementById('inputQuery').value;
		ajaxSearch(searchQuery);
});
