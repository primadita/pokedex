function getOverlayTemplate(array, id) {
  return `
        <div id="pokemon-overview${id}" class="pokemon-small-cards" onclick="toggleBattleCard(${id}, pokemonData)">
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

function getBattleCard(arrayId, array) {
  return `
    <div id="battlecard${arrayId}" class="battlecard">
        <img src="./assets/icons/pokeball-white-half.png" alt="">
        <div id="pokemon-data">
            <div>
                <button id="backward-btn${arrayId}" class="forward-backward-btn" onclick="backwardBattleCard(${arrayId}, pokemonData)"><</button>
                <button id="forward-btn${arrayId}" class="forward-backward-btn" onclick="forwardBattleCard(${arrayId}, pokemonData)">></button>
            </div>
            <div id="types-on-battlecard" class="types">
            </div>
            <h3>#${array[arrayId].id}</h3>
            <h1>${array[arrayId].name}</h1>
            <div id="info">
                <img src="${array[arrayId].imgShiny}" alt="">
                    <div id="tab">
                        <a href="#about" onclick="switchTab('about')" id="about-tab" class="active-tab">About</a>
                        <a href="#specification" onclick="switchTab('specification')" id="specification-tab">Specification</a>
                        <a href="#basestats" onclick="switchTab('basestats')" id="basestats-tab">Base Stats</a>
                    </div>
                    <section id="about" class="d-flex">
                        ${array[arrayId].description}
                    </section>
                    <section id="specification" class="d-flex d-none">
                        <table>
                            <tr>
                                <td>Height:</td>
                                <td id="height">${array[arrayId].height} cm</td>
                            </tr>
                            <tr>
                                <td>Color:</td>
                                <td id="color">${array[arrayId].color}</td>
                            </tr>
                            <tr>
                                <td>Abilities</td>
                                <td id="abilities">${array[arrayId].abilities}</td>
                            </tr>
                            <tr>
                                <td>Habitat:</td>
                                <td id="habitat">${array[arrayId].habitat}</td>
                            </tr>
                            <tr>
                                <td>Generation:</td>
                                <td id="generation">${array[arrayId].generation}</td>
                            </tr>
                            <tr>
                                <td>Growth rate: </td>
                                <td id="growth-rate">${array[arrayId].growthRate}</td>
                            </tr>
                        </table>
                    </section>
                    <section id="basestats" class="d-flex d-none">
                        <table>
                            <tr>
                            <td>HP</td>
                            <td id="hpstat">${array[arrayId].basestats.hp}</td>
                            <td id="hpbar"><div style="width: calc(1.4 * ${array[arrayId].basestats.hp}px)"></div></td>
                        </tr>
                        <tr>
                            <td>Attack</td>
                            <td id="attackstat">${array[arrayId].basestats.attack}</td>
                            <td id="attackbar"><div style="width: calc(1.4 * ${array[arrayId].basestats.attack}px)"></div></td>
                        </tr>
                        <tr>
                            <td>Defense</td>
                            <td id="defensestat">${array[arrayId].basestats.defense}</td>
                            <td id="defensebar"><div style="width: calc(1.4 * ${array[arrayId].basestats.defense}px)"></div></td>
                        </tr>
                        <tr>
                            <td>Spec.Attack</td>
                            <td id="spec-att-stat">${array[arrayId].basestats.specAttack}</td>
                            <td id="spec-att-bar"><div style="width: calc(1.4 * ${array[arrayId].basestats.specAttack}px)"></div></td>
                        </tr>
                        <tr>
                            <td>Spec.Defense</td>
                            <td id="">${array[arrayId].basestats.specDefense}</td>
                            <td id=""><div style="width: calc(1.4 * ${array[arrayId].basestats.specDefense}px)"></div></td>
                        </tr>
                        <tr>
                            <td>Speed</td>
                            <td id="speedstat">${array[arrayId].basestats.speed}</td>
                            <td id="speedbar"><div style="width: calc(1.4 * ${array[arrayId].basestats.speed}px)"></div></td>
                        </tr>
                        </table>
                    </section>
                </div>
            </div>
        </div>
    `;
}
