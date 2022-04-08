console.log('hi!');

fetch ('https://api.airtable.com/v0/appv2MqMcGsmbjVNA/INFLUENCE%20OF%20PROPAGANDA', {
	headers: {
		Authorization: 'Bearer keydeJXh6RaImqQgZ',
	},
})

	.then(response => response.json())
	.then(data => {
		console.log(data);

		const container = document.querySelector('.albums-container');

		data.records
      .slice(0, 40) 
      .filter(album => {

        return album.fields.format === "Book";
      })
      

      .forEach(album => {
        console.log(album);
		
			container.innerHTML += `
				<div class="album">
				            

					<h3> ${album.fields.name} </h3>
					<h5> ${album.fields.created_by} </h5>

					            <img src="${album.fields.images[0].thumbnails.large.url}" width'200' />
				</div>
				
				`;
		});

	});

