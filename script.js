var typeWeaknesses = {
  normal: ['Fighting'],
  fighting: ['Flying', 'Psychic', 'Fairy'],
  flying: ['Rock', 'Electric', 'Ice'],
  poison: ['Ground', 'Psychic'],
  ground: ['Water', 'Grass', 'Ice'],
  rock: ['Fighting', 'Ground', 'Steel', 'Water', 'Grass'],
  bug: ['Flying', 'Rock', 'Fire'],
  ghost: ['Ghost', 'Dark'],
  steel: ['Fighting', 'Ground', 'Fire'],
  fire: ['Water', 'Rock', 'Ground'],
  water: ['Electric', 'Grass'],
  grass: ['Flying', 'Poison', 'Bug', 'Fire', 'Ice'],
  electric: ['Ground'],
  psychic: ['Bug', 'Ghost', 'Dark'],
  ice: ['Fighting', 'Rock', 'Steel', 'Fire'],
  dragon: ['Ice', 'Dragon', 'Fairy'],
  fairy: ['Poison', 'Steel'],
  dark: ['Fighting', 'Bug', 'Fairy']
};

var typeStrengths = {
  normal: [],
  fighting: ['Normal', 'Rock', 'Steel', 'Ice', 'Dark'],
  flying: ['Fighting', 'Bug', 'Grass'],
  poison: ['Grass', 'Fairy'],
  ground: ['Poison', 'Rock', 'Steel', 'Fire', 'Electric'],
  rock: ['Flying', 'Bug', 'Fire', 'Ice'],
  bug: ['Grass', 'Psychic', 'Dark'],
  ghost: ['Ghost', 'Psychic'],
  steel: ['Rock', 'Ice', 'Fairy'],
  fire: ['Bug', 'Steel', 'Grass', 'Ice'],
  water: ['Ground', 'Rock', 'Fire'],
  grass: ['Ground', 'Rock', 'Water'],
  electric: ['Flying', 'Water'],
  psychic: ['Fighting', 'Poison'],
  ice: ['Flying', 'Ground', 'Grass', 'Dragon'],
  dragon: ['Dragon'],
  fairy: ['Fighting', 'Dragon', 'Dark'],
  dark: ['Ghost', 'Psychic']
};


function getPokemonList() {
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=24';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      var pokemonList = document.getElementById('pokemonList');
      data.results.forEach(pokemon => {
        var pokemonId = getPokemonIdFromUrl(pokemon.url);
        var pokemonCard = createPokemonCard(pokemon.name, pokemonId);
        pokemonList.appendChild(pokemonCard);
      });
    })
    .catch(error => {
      console.log('Ocorreu um erro:', error);
    });
}

function getPokemonIdFromUrl(url) {
  var parts = url.split('/');
  return parts[parts.length - 2];
}

function createPokemonCard(pokemonName, pokemonId) {
  var pokemonCard = document.createElement('div');
  pokemonCard.className = 'pokemon-card';

  var imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  var imageElement = document.createElement('img');
  imageElement.src = imageUrl;
  imageElement.alt = pokemonName;

  var nameElement = document.createElement('h3');
  nameElement.textContent = pokemonName;

  pokemonCard.appendChild(imageElement);
  pokemonCard.appendChild(nameElement);

  pokemonCard.addEventListener('click', function() {
    showPokemonDetails(pokemonId);
  });

  return pokemonCard;
}

function showPokemonDetails(pokemonIdentifier) {
  var apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIdentifier}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      var pokemonDetails = document.getElementById('pokemonDetails');
      pokemonDetails.innerHTML = '';

      var pokemonName = data.name;
      var pokemonImage = data.sprites.other['official-artwork'].front_default;
      var pokemonTypes = data.types.map(type => type.type.name);

      var pokemonWeaknesses = getWeaknesses(pokemonTypes);
      var pokemonStrengths = getStrengths(pokemonTypes);

      var pokemonElement = document.createElement('div');
      pokemonElement.innerHTML = '<h2>' + pokemonName + '</h2>' +
                                 '<img src="' + pokemonImage + '" alt="' + pokemonName + '">' +
                                 '<p><strong>Tipo:</strong> ' + pokemonTypes.join(', ') + '</p>' +
                                 '<p><strong>Fraquezas:</strong> ' + (pokemonWeaknesses.length > 0 ? pokemonWeaknesses.join(', ') : 'None') + '</p>' +
                                 '<p><strong>Fortalezas:</strong> ' + (pokemonStrengths.length > 0 ? pokemonStrengths.join(', ') : 'None') + '</p>';

      pokemonDetails.appendChild(pokemonElement);

      // Mostrar os detalhes do Pokémon
      pokemonDetails.classList.add('active');
    })
    .catch(error => {
      console.log('Ocorreu um erro:', error);
    });
}

function getWeaknesses(types) {
  var weaknesses = [];
  types.forEach(type => {
    var typeWeakness = typeWeaknesses[type];
    if (typeWeakness) {
      weaknesses = weaknesses.concat(typeWeakness);
    }
  });
  return weaknesses;
}

function getStrengths(types) {
  var strengths = [];
  types.forEach(type => {
    var typeStrength = typeStrengths[type];
    if (typeStrength) {
      strengths = strengths.concat(typeStrength);
    }
  });
  return strengths;
}

function searchPokemon() {
  var searchInput = document.getElementById('searchInput').value.trim();
  if (searchInput) {
    showPokemonDetails(searchInput.toLowerCase());
  }
}

getPokemonList();
