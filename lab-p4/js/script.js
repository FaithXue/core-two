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
                  <h2> ${album.fields.format} </h2>

          <h5> ${album.fields.created_by} </h5>

                      <img src="${album.fields.images[0].thumbnails.large.url}" width'200' />
        </div>
        
        `;
    });

  });



// first we set up our global variables to track initial state of our filter parameters
let filterValue = "all"
let isChecked = false;
let sliderValue = 1945;
let sortBy = 'waryes';


// update sorting
function handleSort() {
  sortBy = event.target.value;
  generateContent(); // after we update sortBy variable, we can generateContent() again to capture the new filters
}

// update checkbox
function handleCheckbox() {
  isChecked = event.target.checked ? true : false;
  generateContent();
}

// update dropdown
function handleDropdown() {
  filterValue = event.target.value;
  generateContent();
}




// update slider
const sliderDisplayValue = document.querySelector('.range-slider-container span'); // slider HTML display value
function handleSlider() {
  sliderValue = event.target.value;
  sliderDisplayValue.innerHTML = `${numberWithCommas(sliderValue)}`; // update slider value. Sending new value through numberWithCommas function below to get commas  in display for 1,000+
  generateContent();
}

// these html elements represent our interactive elements
const reset = document.querySelector('.reset');
const dropdown = document.querySelector('.dropdown-container select');
const checkbox = document.querySelector('.checkbox-container input');
const slider = document.querySelector('.range-slider-container input');
const radio = document.querySelector('.radio-container #country');

// clicking "reset" button will set all variables back to initial state and then update our interactive html elements to display the new state
function resetFilters() {
  country = 'all';
  isChecked = false;
  sliderValue = 1900;
  sortBy = 'country';
  sliderDisplayValue.innerHTML = `${numberWithCommas(sliderValue)}`;
  slider.value = sliderValue;
  dropdown.value = 'all';
  checkbox.checked = isChecked;
  radio.checked = true;
  generateContent();
}

// content

const content = document.querySelector('.content'); // empty placeholder div in our HTML for our data-driven content
function generateContent() {
  content.innerHTML = ''; // important! we want to delete all content on the screen each time we re-run to capture new filter and sorting parameters
  data

    .filter(item => {
      return filterValue === 'all' ? item : item.country === filterValue; // if our dropdown is set to all, return evey item, otherwise only return items that match selected instrument type
    })


    .filter(item => {
      return isChecked ? item.waryes : item; // if our checkbox is checked, only return items that are in stock
    })



    .sort((a, b) => a[sortBy] - b[sortBy]) // sort by value from radio buttons
    .forEach(item => {
      // eveything in this forEach is the same as your project 3 Airtable examples
      
      content.innerHTML += `
      <div class="card">
       <p>country Ranking: ${item.country}</p>
        <h4>${item.name}</h4>
        <p>${item.country}</p>
        <p class="date">${item.date}</p>
        <p class="${item.waryes ? 'war-related' : 'not-war-related'}">
        ${item.waryes ? 'War related' : 'Not war related'}</p>


      </div>
    `;
    });
}
generateContent();

// utility function to display numnbers with commas if they are 1,000+
function numberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


