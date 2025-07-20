function getOverlayTemplate(array, id){
    return `
        <div class="pokemon-small-cards">
            <p id="poke-id${id}">#id</p>
            <h2 id="pokemon-name${id}">${array.results[id].name}</h2>
            <div>
                <div id="types${id}" class="types">
                    <div id="type1" class="type">ability1</div>
                    <div id="type2" class="type">ability2</div>
                </div>
                <img id="overlay-img" src="./assets/icons/pokeball.png" alt="placeholder">
            </div>
        </div>
    `
}