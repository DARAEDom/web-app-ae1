const port = 8080

async function ajaxRecom(query) { 
		const response = await fetch(`https://localhost:${port}/poi/${query}/recommend`); 
		const contents = await response.json();
		console.log(contents);
}

function recommend(id) {
		console.log(id);
		//ajaxRecom(id);
}
