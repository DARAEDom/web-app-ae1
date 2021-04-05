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
     const response = await fetch(`https://example.com/api/product/${productType}`);
          const products = await response.json();
  
          let html ="";
          products.forEach(product => {
              html += `Product Name: ${product.name} Manufacturer: ${product.manufacturer} Price: ${product.price} <br />`;
  
  });
          document.getElementById('results').innerHTML = html;
  }
  // }
  
  document.getElementById('ajaxButton').addEventListener('click', () => {
          const product = document.getElementById('productType').value;
          ajaxSearch(product);
          });
