// #region GLOBAL VARIABLE
let pokemonData = [];
let apiStartId = 1;
let apiNextId;
const overlayRef = document.getElementById("overlay");
const battleCardBgRef = document.getElementById("battlecard-bg");
const loadmoreBtnRef = document.getElementById("loadmore-btn");
// #endregion

// #region OVERLAY
async function getEachPokemonData(index) {
  try {
    let dataOne = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}#`);
    let dataOneAsJson = await dataOne.json();

    let dataTwo = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${index}/`
    );
    let dataTwoAsJson = await dataTwo.json();

    registerPokemon(dataOneAsJson, dataTwoAsJson, pokemonData);

  } catch (error) {
    console.error;
  }
}

function registerPokemon(jsonOne, jsonTwo, destinationArray){
  let pokeTypes = [];
  let pokeAbilities = [];

  for (let k = 0; k < jsonOne.types.length; k++) {
    pokeTypes.push(`${jsonOne.types[k].type.name}`);
  }
  for (let j = 0; j < jsonOne.abilities.length; j++) {
    pokeAbilities.push(`${jsonOne.abilities[j].ability.name}`);
  }
  const pokemon = new Pokemon({
    pName: `${jsonOne.name}`,
    pDefSprite: `${jsonOne.sprites.other["official-artwork"].front_default}`,
    pShinySprite: `${jsonOne.sprites.other["official-artwork"].front_shiny}`,
    pId: `${jsonOne.id}`,
    pDesc: `${jsonTwo.flavor_text_entries[6].flavor_text}`,
    pColor: `${jsonTwo.color.name}`,
    pHabitat: `${jsonTwo.habitat.name}`,
    pHeight: `${jsonOne.height}`,
    pGeneration: `${jsonTwo.generation.name}`,
    pGrowthRate: `${jsonTwo.growth_rate.name}`,
    pBaseStats: {
      hp: `${jsonOne.stats[0].base_stat}`,
      attack: `${jsonOne.stats[1].base_stat}`,
      defense: `${jsonOne.stats[2].base_stat}`,
      specAttack: `${jsonOne.stats[3].base_stat}`,
      specDefense: `${jsonOne.stats[4].base_stat}`,
      speed: jsonOne.stats[5].base_stat,
    },
    pTypes: pokeTypes,
    pAbilities: pokeAbilities,
  });
  destinationArray.push(pokemon);
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
  }
  hideSpinner();
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

function toggleOverview() {
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

async function forwardBattleCard(index, array) {
  if (index < array.length - 1) {
    renderBattleCard(index + 1, array);
  } else {
    showSpinner();
    await loadPokemons(apiNextId, pokemonData);
    renderBattleCard(index + 1, array);
    hideSpinner();
  }
}

function backwardBattleCard(index, array) {
  if (index - 1 >= 0) {
    renderBattleCard(index - 1, array);
  } else {
    document.getElementById("backward-btn0").classList.add("d-hidden");
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
  const results = filterPokemonName(inputValue);
  if (inputValue.length >= 3) {
    hideLoadMoreButton();
    renderSearchResult(results);
    if (results.length == 0) {
      overlayRef.innerHTML += showNoResultMessage();
    }
  } else if (inputValue.length == 0) {
    showLoadMoreButton();
    renderSearchResult(results);
  }
}

function filterPokemonName(input) {
  const results = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(input)
  );
  return results;
}

function renderSearchResult(resultsArr) {
  overlayRef.innerHTML = "";
  for (let i = 0; i < resultsArr.length; i++) {
    renderOverlay(pokemonData, resultsArr[i].id - 1, "pokemon-overview");
  }
}

function hideLoadMoreButton() {
  loadmoreBtnRef.classList.add("d-none");
}

function showLoadMoreButton() {
  loadmoreBtnRef.classList.remove("d-none");
}
// #endregion 