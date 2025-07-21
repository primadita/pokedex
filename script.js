// #region GLOBAL VARIABLE
let pokemonData = [];
// const startUrl = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`;
const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`; 
let offset = 0;
const limit = 20;
const maxLimit = 1025;

let nextUrl = "";
const overlayRef = document.getElementById("overlay");
overlayRef.innerHTML = "";
// #endregion

// #region OVERLAY
async function getPokeApi(limit, offset) {
  try{
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    let responseAsJson = await response.json();
    let startId = offset + 1;
    let endId = offset + limit;
    if (endId > maxLimit){
      endId = maxLimit;
    }
    offset = endId;
    
    console.log(responseAsJson);
    // nextUrl = responseAsJson.next;
    // showSpinner();
    renderOverlay(startId, endId, responseAsJson); 
  } catch(error){
    console.error(error);
  }
}

function renderOverlay(startId, endId, array){
  
  // overlayRef.innerHTML += getOverlayTemplate(id);
  // const nameRef = document.getElementById("pokemon-name");
  // const idRef = document.getElementById("poke-id");
  // const abilitiesRef = document.getElementById("abilities");
  // const imgRef = document.getElementById("overlay-img");
  
  for (let id = startId; id <= endId; id++){
    // getEachPokemonData(id);
    overlayRef.innerHTML += getOverlayTemplate(array, id);
  }
}

async function getEachPokemonData(index){
  try{
    let dataOne = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}#`);
    let dataOneAsJson = await dataOne.json();
    let pokeTypes = [];
    let pokeAbilities = [];

    let dataTwo = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${index}/`);
    let dataTwoAsJson = await dataTwo.json();

    for (let k = 0; k < dataOneAsJson.types.length; k++){
      pokeTypes.push(`${dataOneAsJson.types[k].type.name}`);
    };

    for (let j = 0; j < dataOneAsJson.abilities.length; j++){
      pokeAbilities.push(`${dataOneAsJson.abilities[j].ability.name}`);
    }
    const pokemon = new Pokemon({pName: `${dataOneAsJson.name}`,
      pDefSprite: `${dataOneAsJson.sprites.other['official-artwork'].front_default}`,
      pShinySprite: `${dataOneAsJson.sprites.other['official-artwork'].front_shiny}`,
      pId: `${dataOneAsJson.id}`,
      pDesc: `${dataTwoAsJson.flavor_text_entries[6].flavor_text}`,
      pColor: `${dataTwoAsJson.color.name}`,
      pHabitat: `${dataTwoAsJson.habitat.name}`,
      pHeight: `${dataOneAsJson.height}`,
      pGeneration: `${dataTwoAsJson.generation.name}`,
      pGrowthRate: `${dataTwoAsJson.growth_rate.name}`,
      pBaseStats: {"hp": `${dataOneAsJson.stats[0].base_stat}`, 
        "attack": `${dataOneAsJson.stats[1].base_stat}` , 
        "defense": `${dataOneAsJson.stats[2].base_stat}`, 
        "specAttack": `${dataOneAsJson.stats[3].base_stat}`, 
        "specDefense": `${dataOneAsJson.stats[4].base_stat}`, 
        "speed": dataOneAsJson.stats[5].base_stat},
      pTypes: pokeTypes,
      pAbilities: pokeAbilities
    });
    
    pokemonData.push(pokemon);

  } catch(error){
    console.error;
  }
  
}

// #endregion

// #region BATTLE CARD
function toggleBattleCard(){
  const battlecardBgRef = document.getElementById("battlecard-bg");
  battlecardBgRef.classList.toggle("d-none");
}
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

