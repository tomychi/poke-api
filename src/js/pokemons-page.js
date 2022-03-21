import '../css/pokemon-page.css';
import { obtenerPokemones } from './http-provider'

const urlApi = 'https://pokeapi.co/api/v2/pokemon/';


const d = document,
    $body = d.querySelector('#root');
let $template = '';

const crearHtml = () => {
    const html = `
        <h1>Pokemons</h1>
        <nav class='links'></nav>
        <main class='grid-fluid'></main>
    `
    $body.innerHTML = html;
}

const crearCard = async (url) => {
    const $main = d.querySelector('main'),
        $links = d.querySelector('.links');

    try {
        $main.innerHTML  = `<img class="loader" src="../assets/img/circles.svg" alt="Cargando...">`;


        let res = await fetch(url),
            json = await res.json(),
            $template = '',
            $prevLink,
            $nextLink;


        if(!res.ok) throw {
            status: res.status,
            statusText: res.statusText
        } 
        

        for(let i = 0;  i < json.results.length; i++){
            // console.log(json.results[i]);

            try {
                let pokemon = await obtenerPokemones(url, i);
                // console.log(pokemon)
                if(!res.ok) throw {
                    status: res.status,
                    statusText: res.statusText
                }

                $template += `
                    <figure>
                        <img id="${pokemon.id-1}" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                        <figcaption>${pokemon.name}</figcaption>
                        <p>${pokemon.types[0].type.name}</p>
                        <p>${pokemon.id}</p>
                    </figure>                
                `;

            } catch (err) {
                console.log(err);
                let message = err.statusText || 'ocurrio un error';
                $template += `
                    <figure>
                        <figcaption> Error ${err.status}: ${message} </figcaption>
                    </figure>
                `
            }
        } // end for
        
        $main.innerHTML = $template;

        // $prevLink = json.previous ? `<a href="${json.previous}">⏮</a>` : '';
        // $nextLink = json.next ? `<a href="${json.next}">⏭</a>` : '';
        // $links.innerHTML = `${$prevLink} ${$nextLink}`;

    } catch (err) {
        console.log(err);
        let message = err.statusText || 'ocurrio un error';
        $main.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
    }
}

const eventos = () => {
    d.addEventListener('DOMContentLoaded', e => {
        crearCard( urlApi );
    });

    d.addEventListener('click', e => {
        if(e.target.matches('.links a')) {
            e.preventDefault();
            crearCard( e.target.getAttribute('href'));
        }
    });


}




export const init = () => {
    crearHtml();
    eventos();
}


