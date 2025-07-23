function getOverlayTemplate(array, id) {
  return `
        <div id="pokemon-overview${id}" class="pokemon-small-cards" onclick="toggleBattleCard(${id})">
            <h3 id="poke-id${id}">#${array[id].id}</h3>
            <h2 id="pokemon-name${id}">${array[id].name}</h2>
            <div>
                <div id="types${id}" class="types">
                </div>
                <img id="overlay-img${id}" src="${array[id].imgDefault}" alt="Image of ${array[id].name}">
            </div>
        </div>
    `;
}

function getTypeTemplate(typeId, arrayId, array) {
  return `<div id="type${typeId}-${arrayId}" class="type">${array[arrayId].types[typeId]}</div>`;
}

function showNoResultMessage() {
  return `<h2 id="noresults"> No pokemon is found! </h2>`;
}

function getBattleCard() {
  return `
    <div id="battlecard">
        <img src="./assets/icons/pokeball-white.png" alt="">
        <div id="pokemon-data">
            <div>
                <button id="backward-btn" class="forward-backward-btn"><</button>
                <button id="forward-btn" class="forward-backward-btn">></button>
            </div>
            <div id="types" class="types">
            </div>
            <h3>#id</h3>
            <h1>PokemonName</h1>
            <div id="info">
                <img src="./assets/icons/pokeball.png" alt="">
                    <div id="tab">
                        <a href="#about" onclick="switchTab('about')">About</a>
                        <a href="#specification" onclick="switchTab('specification')">Specification</a>
                        <a href="#basestats" onclick="switchTab('basestats')">Base Stats</a>
                    </div>
                    <section id="about" class="d-flex d-none">
                        This is my pokemon description
                    </section>
                    <section id="specification" class="d-flex d-none">
                        <table>
                            <tr>
                                <td>Height:</td>
                                <td id="height"></td>
                            </tr>
                            <tr>
                                <td>Color:</td>
                                <td id="color"></td>
                            </tr>
                            <tr>
                                <td>Abilities</td>
                                <td id="abilities"></td>
                            </tr>
                            <tr>
                                <td>Habitat:</td>
                                <td id="habitat"></td>
                            </tr>
                            <tr>
                                <td>Generation:</td>
                                <td id="generation"></td>
                            </tr>
                            <tr>
                                <td>Growth rate: </td>
                                <td id="growth-rate"></td>
                            </tr>
                        </table>
                    </section>
                    <section id="basestats" class="d-flex d-none">
                        <table>
                            <tr>
                            <td>HP</td>
                            <td id="hpstat">45</td>
                            <td id="hpbar"><div style="width: calc(1.4 * 45px)"></div></td>
                        </tr>
                        <tr>
                            <td>Attack</td>
                            <td id="attackstat">55</td>
                            <td id="attackbar"><div style="width: calc(1.4 * 55px)"></div></td>
                        </tr>
                        <tr>
                            <td>Defense</td>
                            <td id="defensestat">55</td>
                            <td id="defensebar"><div style="width: calc(1.4 * 55px)"></div></td>
                        </tr>
                        <tr>
                            <td>Spec.Attack</td>
                            <td id="spec-att-stat">90</td>
                            <td id="spec-att-bar"><div style="width: calc(1.4 * 90px)"></div></td>
                        </tr>
                        <tr>
                            <td>Spec.Defense</td>
                            <td id="">75</td>
                            <td id=""><div style="width: calc(1.4 * 75px)"></div></td>
                        </tr>
                        <tr>
                            <td>Speed</td>
                            <td id="speedstat">10</td>
                            <td id="speedbar"><div style="width: calc(1.4 * 10px)"></div></td>
                        </tr>
                        </table>
                    </section>
                </div>
            </div>
        </div>
    `;
}
