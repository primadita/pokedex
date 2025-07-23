function getOverlayTemplate(array, id){
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
    `
}

function getTypeTemplate(typeId, arrayId, array){
    return `<div id="type${typeId}-${arrayId}" class="type">${array[arrayId].types[typeId]}</div>`
}

function showNoResultMessage(){
    return `<h2 id="noresults"> No pokemon is found! </h2>`
}