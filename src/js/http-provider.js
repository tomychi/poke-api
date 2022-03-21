const urlApi = 'https://pokeapi.co/api/v2/pokemon/';


const obtenerPokemones =  async(url = urlApi, index) => {


        let res = await fetch(url, {
            method: 'GET'
        }),
            json = await res.json();


        
        let resp = await fetch(json.results[index].url),
            pokemon = await resp.json();
        return pokemon
}


export {
    obtenerPokemones
}



