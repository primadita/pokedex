// #region GLOBAL VARIABLE
let pokemonData = [];
let apiStartId = 1;
let apiNextId;
const overlayRef = document.getElementById("overlay");
const battleCardBgRef = document.getElementById("battlecard-bg");
// #endregion

// #region OVERLAY
async function getEachPokemonData(index) {
  try {
    let dataOne = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}#`);
    let dataOneAsJson = await dataOne.json();
    let pokeTypes = [];
    let pokeAbilities = [];

    let dataTwo = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${index}/`
    );
    let dataTwoAsJson = await dataTwo.json();

    for (let k = 0; k < dataOneAsJson.types.length; k++) {
      pokeTypes.push(`${dataOneAsJson.types[k].type.name}`);
    }
    for (let j = 0; j < dataOneAsJson.abilities.length; j++) {
      pokeAbilities.push(`${dataOneAsJson.abilities[j].ability.name}`);
    }
    const pokemon = new Pokemon({
      pName: `${dataOneAsJson.name}`,
      pDefSprite: `${dataOneAsJson.sprites.other["official-artwork"].front_default}`,
      pShinySprite: `${dataOneAsJson.sprites.other["official-artwork"].front_shiny}`,
      pId: `${dataOneAsJson.id}`,
      pDesc: `${dataTwoAsJson.flavor_text_entries[6].flavor_text}`,
      pColor: `${dataTwoAsJson.color.name}`,
      pHabitat: `${dataTwoAsJson.habitat.name}`,
      pHeight: `${dataOneAsJson.height}`,
      pGeneration: `${dataTwoAsJson.generation.name}`,
      pGrowthRate: `${dataTwoAsJson.growth_rate.name}`,
      pBaseStats: {
        hp: `${dataOneAsJson.stats[0].base_stat}`,
        attack: `${dataOneAsJson.stats[1].base_stat}`,
        defense: `${dataOneAsJson.stats[2].base_stat}`,
        specAttack: `${dataOneAsJson.stats[3].base_stat}`,
        specDefense: `${dataOneAsJson.stats[4].base_stat}`,
        speed: dataOneAsJson.stats[5].base_stat,
      },
      pTypes: pokeTypes,
      pAbilities: pokeAbilities,
    });
    pokemonData.push(pokemon);
  } catch (error) {
    console.error;
  }
}

async function loadPokemons(apiStartId, destinationArray) {
  let apiEndId = apiStartId + 19;
  showSpinner();
  apiNextId = apiEndId + 1;
  for (let id = apiStartId; id <= apiEndId; id++) {
    await getEachPokemonData(id)
      .then((result) => {
        renderOverlay(destinationArray, id - 1, "pokemon-overview");
        return apiNextId;
      })
      .catch((error) => {
        console.error(error);
      });
    hideSpinner();
  }
}

function renderSmallCard(array, arrayId) {
  overlayRef.innerHTML += getOverlayTemplate(array, arrayId);
}

function setBackgroundColor(elementId, array, arrayId) {
  const elementRef = document.getElementById(elementId + arrayId);
  elementRef.classList.add(array[arrayId].getBackgroundColor());
}

function renderTypesOnOverlay(array, arrayId) {
  const typesRef = document.getElementById("types" + arrayId);
  typesRef.innerHTML = "";
  for (let j = 0; j < array[arrayId].types.length; j++) {
    typesRef.innerHTML += getTypeTemplate(j, arrayId, array);
  }
}

function renderOverlay(array, arrayId, elementId) {
  renderSmallCard(array, arrayId);
  setBackgroundColor(elementId, array, arrayId);
  renderTypesOnOverlay(array, arrayId);
}
// #endregion

// #region BATTLE CARD
function toggleBattleCard(index, array) {
  battleCardBgRef.classList.toggle("d-none");
  renderBattleCard(index, array);

  document.body.classList.toggle("no-vertical-scroll");
}

function toggleOverview(){
  battleCardBgRef.classList.toggle("d-none");
  document.body.classList.toggle("no-vertical-scroll");
}

function renderTypesOnBattleCard(array, arrayId) {
  const typesRef = document.getElementById("types-on-battlecard");
  typesRef.innerHTML = "";
  for (let j = 0; j < array[arrayId].types.length; j++) {
    typesRef.innerHTML += getTypeTemplate(j, arrayId, array);
  }
}

function renderBattleCard(index, array) {
  battleCardBgRef.innerHTML = getBattleCard(index, array);
  setBackgroundColor("battlecard", array, index);
  renderTypesOnBattleCard(array, index);

  const battleCardRef = document.getElementById("battlecard" + index);
  battleCardRef.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

function forwardBattleCard(index, array) {
  if (index < array.length - 1) {
    renderBattleCard(index + 1, array);
  }
}

function backwardBattleCard(index, array) {
  if (index - 1 >= 0) {
    renderBattleCard(index - 1, array);
  }
}

function switchTab(destinationSection) {
  tabs = ["about", "specification", "basestats"];

  for (let i = 0; i < tabs.length; i++) {
    document.getElementById(tabs[i]).classList.add("d-none");
    document.getElementById(tabs[i] + "-tab").classList.remove("active-tab");
    if (tabs[i] == destinationSection) {
      document.getElementById(tabs[i]).classList.remove("d-none");
      document.getElementById(tabs[i] + "-tab").classList.add("active-tab");
    }
  }
  document.getElementById(destinationSection).classList.remove("d-none");
}

// #endregion

// #region SPINNER
// Spinner anzeigen
function showSpinner() {
  document.getElementById("spinner").style.display = "flex";
}

// Spinner ausblenden
function hideSpinner() {
  document.getElementById("spinner").style.display = "none";
}
// #endregion

// #region SEARCH FUNCTION
function searchPokemon() {
  const searchRef = document.getElementById("search-input");
  inputValue = searchRef.value;

  if (inputValue.length >= 3) {
    const results = pokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(inputValue)
    );
    overlayRef.innerHTML = "";
    for (let resultId = 0; resultId < results.length; resultId++) {
      renderOverlay(results, resultId, "pokemon-overview");
    }
    // message, wenn kein Ergebnis
    if (results.length == 0) {
      overlayRef.innerHTML = showNoResultMessage();
      const loadmoreBtnRef = document.getElementById("loadmore-btn");
      loadmoreBtnRef.classList.add("d-none");
    }
  } else {
    // zurück zur Ursprünglichen, wenn input wieder leer ist
    overlayRef.innerHTML = "";
    for (let pokeId = 0; pokeId < pokemonData.length; pokeId++) {
      renderOverlay(pokemonData, pokeId, "pokemon-overview");
    }
  }
}
// #endregion

