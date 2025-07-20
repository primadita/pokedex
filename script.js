async function getPokeApi() {
  try{
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    let responseAsJson = await response.json();
    console.log(responseAsJson);
    console.log(responseAsJson.results[0]); 
    console.log(responseAsJson.results.length);
    console.log(responseAsJson.results[0].name); 

    // showSpinner();
    renderOverlay(responseAsJson); 
  } catch(error){
    console.error(error);
  }
  
}

function renderOverlay(array){
  const overlayRef = document.getElementById("overlay");
  overlayRef.innerHTML = "";
  // overlayRef.innerHTML += getOverlayTemplate(id);
  // const nameRef = document.getElementById("pokemon-name");
  // const idRef = document.getElementById("poke-id");
  // const abilitiesRef = document.getElementById("abilities");
  // const imgRef = document.getElementById("overlay-img");
  

  for (let id = 0; id < array.results.length; id++){
    overlayRef.innerHTML += getOverlayTemplate(array, id);
  }
}

// Spinner anzeigen
function showSpinner() {
  document.getElementById("spinner").style.display = "block";
}

// Spinner ausblenden
function hideSpinner() {
  document.getElementById("spinner").style.display = "none";
}

// to do: function for spinner


