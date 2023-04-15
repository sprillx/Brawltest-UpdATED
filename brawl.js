// Define the function to update the DOM
function updateDOM(bioName, bio, forms, iconURL) {
  const firstLineElement = document.getElementById('firstLine');
  if (firstLineElement) {
    firstLineElement.innerHTML = bioName;
  }

  const secondLineElement = document.getElementById('secondLine');
  if (secondLineElement) {
    secondLineElement.innerHTML = forms;
  }

  const thirdLineElement = document.getElementById('thirdLine');
  if (thirdLineElement) {
    thirdLineElement.innerHTML = bio;
  }

  const fourthElement = document.getElementById('fourth');
  if (fourthElement) {
    fourthElement.innerHTML = iconURL;
  }
}

// Define the function to get data from the API
function getData() {
  const searchBar = document.querySelector('#searchbar').value;
  const queryParams = new URLSearchParams({
    legend_name: searchBar
  });

  fetch(`https://brawlhalla.fly.dev/v1/legends/name?${queryParams.toString()}`)
    .then(response => response.json())
    .then(data => {
      const bioName = data.data.bio_name;
      const bio = data.data.bio_text;
      const forms = data.data.bio_quote;
      const iconURL = data.data.thumbnail;

      // Update the query parameters in the URL
      const newQueryParams = new URLSearchParams({
        bioName,
        bio,
        forms,
        iconURL
      });
      history.pushState(null, null, `BrawlResults.html?${newQueryParams.toString()}`);

      // Update the DOM with the new data
      updateDOM(bioName, bio, forms, iconURL);
    })
    .catch(error => console.error(error));
}

// Attach an event listener to the button if it exists
const button = document.querySelector('#searchButton');
if (button) {
  button.addEventListener('click', getData);
}

// Call the getData() function on page load if the URL contains query parameters
if (location.search) {
  const queryParams = new URLSearchParams(location.search);
  const bioName = queryParams.get('bioName');
  const bio = queryParams.get('bio');
  const forms = queryParams.get('forms');
  const iconURL = queryParams.get('iconURL');
  updateDOM(bioName, bio, forms, iconURL);
}
