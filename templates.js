function getOverlayTemplate(array, id){
    return `
        <div id="pokemon-overview${id}" class="pokemon-small-cards" onclick="toggleBattleCard()">
            <h3 id="poke-id${id}">#id</h3>
            <h2 id="pokemon-name${id}">${array.results[id].name}</h2>
            <div>
                <div id="types${id}" class="types">
                </div>
                <img id="overlay-img${id}" src="./assets/icons/pokeball.png" alt="placeholder">
            </div>
        </div>
    `
}