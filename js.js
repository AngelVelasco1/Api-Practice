/* Using try, catch */
async function getPokemons() {
    try {
        const urlAPI = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=100')
        const responseJson = await urlAPI.json();

        const pokemons = await Promise.all(responseJson.results.map(async (pokemon) => {
            const pokemonData = await fetch(pokemon.url);
            const pokemonJson = await pokemonData.json();
            return {
                id: pokemonJson.id,
                name: pokemonJson.name
            }
        }))

        let pokemonList = document.getElementById('container-pokemons');
            pokemons.map(pokemon => {
                pokemonList.innerHTML += `
                <div>
                    <img class="search-pokemon-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png">
                    <span class="bold font-size-12">N° ${pokemon.id}</span>
                    <h3>${pokemon.name}</h3>
                </div>
            `;
            })
         
        }
    
    catch (err) {
        console.error(err)
    }



}
getPokemons();