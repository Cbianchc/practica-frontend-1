

    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }


document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1, 152)
    fetchData(random)
})


const fetchData = async (id) => {
    try {
        console.log(id);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        console.log(data);
        
        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            nombre: data.forms[0].name,
            hp: data.stats[0].base_stat,
            experiencia: data.base_experience,
            ataque: data.stats[1].base_stat,
            especial: data.stats[2].base_stat,
            defensa: data.stats[3].base_stat,

        };
        //console.log(pokemon.nombre)
        pintarCard(pokemon)
    } catch (error) {
        console.log(error)
    }
}

const pintarCard = (pokemon) => {
    console.log(pokemon)

    const flex = document.querySelector('.flex')
    const template = document.querySelector('#template-card').content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    clone.querySelector('.card-body-user').setAttribute('src', pokemon.img)
    clone.querySelector('.card-body-nombre').innerHTML = `${pokemon.nombre} <span>${pokemon.hp} hp</span>`;
    clone.querySelector('.card-body-localidad').textContent = pokemon.experiencia + " EXP"
    clone.querySelectorAll('.card-pie-social h3')[0].textContent = pokemon.ataque
    //queryselectorall devuelve un array - busco el primero asi que va un 0
    clone.querySelectorAll('.card-pie-social h3')[1].textContent = pokemon.especial
    clone.querySelectorAll('.card-pie-social h3')[2].textContent = pokemon.defensa

    fragment.appendChild(clone)
    flex.appendChild(fragment)
};