function getOverlayTemplate(array, id){
    return `
        <div class="pokemon-small-cards" onclick="toggleBattleCard()">
            <p id="poke-id${id}">#id</p>
            <h2 id="pokemon-name${id}">${array.results[id].name}</h2>
            <div>
                <div id="types${id}" class="types">
                    <div id="type1" class="type">type1</div>
                    <div id="type2" class="type">type2</div>
                </div>
                <img id="overlay-img" src="./assets/icons/pokeball.png" alt="placeholder">
            </div>
        </div>
    `
}