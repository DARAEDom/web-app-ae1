const port = process.env.port

async function ajaxSearch(query) { // async with JSON
		const response = await fetch(`https://localhost:${port}/poi/find/${query}`); 
		const contents = await response.json();
		let queryResults = "";
		
		contents.forEach( result => {
				queryResults += `Name: ${result.name}, Region: ${result.region}, Type: ${result.type}, Country: ${result.country}, Longitude: ${result.lon}, Latitude: ${result.lat}, Description: ${result.description} <br/>`
		});
		document.getElementById('results').innerHTML = queryResults;
}


// document.getElementById('sendButton').addEventListener('click', () => {
//		const searchQuery = document.getElementById('inputQuery').value;
//		ajaxSearch(searchQuery);
//});

//document.getElementById('sendButton').addEventListener('click', ()=> {
//    const searchQuery = document.getElementById('inputQuery').value;
//    ajaxSearch(searchQuery);
//});
		
//document.getElementById('sendButton').addEventListener('click', window.onload=function(){document.getElementById("results").innerHTML = "Hello, World!" });

window.onload=document.getElementById('sendButton').addEventListener('click', function(){document.getElementById("results").innerHTML = "Hello, World!" });
