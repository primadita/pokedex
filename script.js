// #region GLOBAL VARIABLE
let pokemonData = [];
let apiStartId = 1;
let apiNextId;
const overlayRef = document.getElementById("overlay");
// #endregion

// #region OVERLAY
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

function loadPokemons(apiStartId, destinationArray){
  let apiEndId = apiStartId + 19;
  apiNextId = apiEndId + 1;
  for (let id = apiStartId; id <= apiEndId; id++){
    getEachPokemonData(id).then(
      (result) => {
        renderOverlay(destinationArray, id - 1);
        setBackgroundColor(destinationArray, id - 1);
        renderTypesOnOverlay(destinationArray, id - 1);
        return apiNextId;
      } 
    ).catch((error) => {
      console.error(error);
    });
  }
}

function renderOverlay(array, arrayId){
  overlayRef.innerHTML += getOverlayTemplate(array, arrayId);
}

function setBackgroundColor(array, arrayId){
  const smallCardRef = document.getElementById("pokemon-overview" + arrayId);
  smallCardRef.classList.add(array[arrayId].getBackgroundColor());
}

function renderTypesOnOverlay(array, arrayId){
  const typesRef = document.getElementById("types" + arrayId);
  typesRef.innerHTML = "";
  for (let j = 0; j < array[arrayId].types.length; j++){
    typesRef.innerHTML += getTypeTemplate(j, arrayId, array);
  }
}
// #endregion

// #region BATTLE CARD
function toggleBattleCard(index){
  const battleCardBgRef = document.getElementById("battlecard-bg");
  battleCardBgRef.classList.toggle("d-none");


  const battleCardRef = document.getElementById("battlecard");

  battleCardRef.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

function updateBattleCard(index){

}



function switchTab(destinationSection){
  document.getElementById(destinationSection).classList.remove("d-none");
}

function renderBattleCard(){

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

// #region Testing
// giveOverviewNewValue(1, 20);