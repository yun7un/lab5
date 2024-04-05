
/* Create one card from item data. */
function createCardElement(item) {
  return `
      <li class="card">
          <img src=${item.image} alt="">
          <div class="card-content">
              <p class="subheader">
                  ${item.subtitle}
              </p>
              <h3 class="header">
                  ${item.title}
              </h3>
          </div>
      </li>
    `;
};


/* Create multiple cards from array of item data. */
function createCardElements(data) {
  return data.map(createCardElement).join("");
}

/* Fetch list of pokemon names and urls. */
async function fetch100PokemonList() {
  try {
    // Get a list of Pokemon numbered 0-100
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100"
    );
    const data = await response.json();
    return data.results;
    //Error handling
  } catch (error) {
    console.log(error);
  };
}

/* Fetch details of a pokemon. */
async function fetchPokemonDetails(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
    //Error handling
  } catch (error) {
    console.log(error);
  }
}

/* 
Search Region

Fetch details of all 100 pokemon. */
async function fetch100PokemonDetails() {
  const detailsList = [];
  for (let i = 1; i <= 100; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    const data = await fetchPokemonDetails(url);
    if (data) {
      detailsList.push(data);
    }
  }

  return detailsList;
}


/* Option 1 
function renderOption1Results(data) {
  const card = createCardElement({
    title: data.name,
    subtitle: data.types.map((type) => type.type.name).join(", "),
    image: data.sprites.other["official-artwork"].front_default,
  });
  document.getElementById("option-1-results").innerHTML = card;
}

async function option1DropdownClickHandler(event) {
  const select = document.getElementById("dropdown");
  const url = select.options[select.selectedIndex].value;
  const data = await fetchPokemonDetails(url);
  if (data) {
    renderOption1Results(data);
  }
}

/* Attach an event listener to the submit button for the Option 1 dropdown list. 
const option1SubmitButton = document.getElementById("submit-button");
option1SubmitButton.addEventListener("click", option1DropdownClickHandler);

/* Populate the dropdown list with pokemon names and their endpoint urls. 
async function renderOption1Dropdown() {
  const select = document.getElementById("dropdown");
  const list = await fetch100PokemonList();
  if (list) {
    list.forEach((item) => {
      const option = document.createElement("option");
      option.textContent = item.name;
      option.value = item.url;
      select.appendChild(option);
    });
  }
}

renderOption1Dropdown();



/* Option 2 */

async function renderOption2() {
  const myFavouritePokemon = ["pikachu", "squirtle", "scorbunny", "sprigatito"];

  const fetchPokemonData = async (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    return await fetchPokemonDetails(url);
  };

  // Map the pokemon names to pokemon data.
  const pokemonData = await Promise.all(
    myFavouritePokemon.map(fetchPokemonData)
  );

  // Map the pokemon data to card data.
  const cardData = pokemonData.map((itemData) => {
    return {
      title: itemData.name,
      image: itemData.sprites.other["official-artwork"].front_default,
      subtitle: itemData.types.map((type) => type.type.name).join(", "),
    };
  });

  const cards = createCardElements(cardData);
  document.getElementById("option-2-results").innerHTML = cards;
}

renderOption2();

/* Option 3 (My Entry Pokemons) */
async function renderOption3() {
  const myEntryPokemon = ["snorlax", "ponyta", "ditto", "corviknight", "toxel", "ceruledge", "minccino", "reshiram"];

  const fetchPokemonData = async (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    return await fetchPokemonDetails(url);
  };

  // Map the pokemon names to pokemon data.
  const pokemonData = await Promise.all(
    myEntryPokemon.map(fetchPokemonData)
  );

  // Map the pokemon data to card data.
  const cardData = pokemonData.map((itemData) => {
    return {
      title: itemData.name,
      image: itemData.sprites.other["official-artwork"].front_default,
      subtitle: itemData.types.map((type) => type.type.name).join(", "),
    };
  });

  const cards = createCardElements(cardData);
  document.getElementById("option-3-results").innerHTML = cards;
}

renderOption3();


/* Option 2 Enhanced */
 
async function renderOption2Enhanced() {
  const data = await fetch100PokemonDetails();
  const cards = createCardElements(
    data.map((item) => ({
      title: item.name,
      image: item.sprites.other["official-artwork"].front_default,
      subtitle: item.types.map((type) => type.type.name).join(", "),
    }))
  );
  document.getElementById("option-2-enhanced-results").innerHTML = cards;
}

renderOption2Enhanced();

/* Option 2 Enhanced: Search bar function. */
 
function searchbarEventHandler() {
  //Get the value of the input field with id="searchbar"
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  //Get all the cards
  const enhancedResults = document.getElementById("option-2-enhanced-results");
  const card = enhancedResults.getElementsByClassName("card");

  for (i = 0; i < card.length; i++) {
    //If the value of the input field is not equal to the name of the pokemon, hide the card
    if (!card[i].innerHTML.toLowerCase().includes(input)) {
      card[i].style.display = "none";
      //If the value of the input field is equal to the name of the pokemon, show the card
    } else {
      card[i].style.display = "block";
    }
  }
}

const searchbar = document.getElementById("searchbar");
searchbar.addEventListener("keyup", searchbarEventHandler);
