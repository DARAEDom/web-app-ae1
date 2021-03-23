function ajaxFunction(query) {
	fetch(`http://localhost:8080/map/${query}`);
		.then(response => response.text())
		.then(text => {
			document.getElementById('element').innerHTML = text;
		});
		.catch(e => {alert(`Error has occured: ${e}`);});
} 

async function search(query) {
		try {
				const response = await fetch(`http://localhost:8080/map/${query}`);
				const text = await response.text();
				document.getElementById('results').innerHTML = text;
		} catch (e) {
				alert(`Error has occured: ${e}`);
		}
}

async function ajaxSearchJson(productType) { // async with JSON
 20     const response = await fetch(`https://example.com/api/product/${productType}`);
 21         const products = await response.json();
 22 
 23         let html ="";
 24         products.forEach(product => {
 25             html += `Product Name: ${product.name} Manufacturer: ${product.manufacturer} Price: ${product.price} <br />`;
 26 
 27 });
 28         document.getElementById('results').innerHTML = html;
 29 }
 30 // }
 31 
 32 document.getElementById('ajaxButton').addEventListener('click', () => {
 33         const product = document.getElementById('productType').value;
 34         ajaxSearch(product);
 35         });
