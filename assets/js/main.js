const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonStatus = document.getElementById('conteudo')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `    
    <li id="${pokemon.number}" class="pokemon ${pokemon.type}" onClick="itenId(this.id)">
    
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
          
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function itenId(id) {
    caixaModal();
    pokeApi.getPokemonStats(id).then((statusPokemon = []) => {
        //debugger
        const newHtml = convertPokemonDetailsToTable(statusPokemon);
        console.log(newHtml);
        pokemonStatus.innerHTML += newHtml;

    })



}
function showCaixaModal () {
    caixaModal();
}

function convertPokemonDetailsToTable(pokemon) {
    var vhtml = "";
    const pk=convertPokeApiStatsToPokemonDetail(pokemon);
    
    const status=document.getElementById('status');
    if (status != null) {
       status.remove(); 
    }
    vhtml =`<div id="status" class="container">
        <img id="imagem1" src="${pk.imagem}" alt="pokemon">
        <table id="pokemonStats" class="container">        
        <tbody>             
            ${pk.stats.map((stat) => `
            <tr>
                <td class="col-right col-hp textocapitalize">${stat.stat.name}</td>
                <td class="col-left col-hp-valor">${stat.base_stat}</td>
                <td class="col-hp-grafico">
                    <div class="score" style="margin: 0.1rem;">
                        <div class="scoreprogress" style="width:${ (stat.base_stat < 100) ? stat.base_stat : 100}%;">
                            <span>${(stat.base_stat < 100) ? stat.base_stat : 100}%</span>
                        </div>
                    </div>
                </td>
            </tr> 
            `).join('')}   
        </tbody>
        </table>
    </div>`
    return vhtml;
}