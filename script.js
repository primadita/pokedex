// #region GLOBAL VARIABLE
let nextUrl = "";
const overlayRef = document.getElementById("overlay");
overlayRef.innerHTML = "";
// #endregion

// #region OVERLAY
async function getPokeApi() {
  try{
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    let responseAsJson = await response.json();
    nextUrl = responseAsJson.next;
 
    // showSpinner();
    renderOverlay(responseAsJson); 
  } catch(error){
    console.error(error);
  }
  
}

function renderOverlay(array){
  
  // overlayRef.innerHTML += getOverlayTemplate(id);
  // const nameRef = document.getElementById("pokemon-name");
  // const idRef = document.getElementById("poke-id");
  // const abilitiesRef = document.getElementById("abilities");
  // const imgRef = document.getElementById("overlay-img");
  

  for (let id = 0; id < array.results.length; id++){
    overlayRef.innerHTML += getOverlayTemplate(array, id);
  }
}

async function loadmore(url){
  try{
    let responseLoadMore = await fetch(url);
    let responseLoadMoreAsJson = await responseLoadMore.json();
    nextUrl = responseLoadMoreAsJson.next;
    console.log(nextUrl);
    renderOverlay(responseLoadMoreAsJson);
  } catch(error){
    console.error(error);
  }
}
// #endregion

// #region BATTLE CARD
// #endregion

// #region SPINNER
// Spinner anzeigen
function showSpinner() {
  document.getElementById("spinner").style.display = "block";
}

// Spinner ausblenden
function hideSpinner() {
  document.getElementById("spinner").style.display = "none";
}

// TO DO: function for spinner
// TO DO: spinner in der Funktionen einbauen

// #endregion

