function searchPokemon() {
    var searchInput = document.getElementById('searchInput').value;
    
    // Aqui você pode fazer uma requisição para uma API que retorna os dados dos Pokemons, 
    // ou criar um objeto JavaScript com os dados dos Pokemons manualmente.
    // Vou fornecer um exemplo básico de objeto JavaScript com os dados de um Pokemon:
    
    var pokemonData = {
      name: 'Pikachu',
      type: 'Electric',
      strengths: ['Water', 'Flying'],
      weaknesses: ['Ground']
    };
    
    // Exibindo as informações do Pokemon na página:
    var pokemonInfo = document.getElementById('pokemonInfo');
    pokemonInfo.innerHTML = '<h2>' + pokemonData.name + '</h2>' +
                            '<p><strong>Tipo:</strong> ' + pokemonData.type + '</p>' +
                            '<p><strong>Fraquezas:</strong> ' + pokemonData.weaknesses.join(', ') + '</p>' +
                            '<p><strong>Fortalezas:</strong> ' + pokemonData.strengths.join(', ') + '</p>';
  }
  