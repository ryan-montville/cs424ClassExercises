const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"

const pageWrapper = document.getElementById('pageWrapper');
const pokemonDetailContainer = document.getElementById('pokemonDetail');
const outputContainer = document.getElementById('outputContainer');
const controls = document.getElementById('controls');
let layoutPreference = "grid";

//The api does not capitalize the first letter of the name of the Pokemon
function capitalizeName(name) {
    //Split the name up if their name is multiple words
    const words = name.split(" ");
    //Capatilize and combine
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return capitalizedWords.join(' ');
}

//Create a key/value p where the key is bolded
function createDetailsPair(detailKey, detailValue, parentElementId) {
    const detailPairP = document.createElement('p');
    const detailKeySpan = document.createElement('span');
    const detailKeyText = document.createTextNode(`${detailKey}: `);
    detailKeySpan.appendChild(detailKeyText);
    detailKeySpan.style.fontWeight = 'bold';
    detailPairP.appendChild(detailKeySpan);
    const detailValueSpan = document.createElement('span');
    const detailValueText = document.createTextNode(detailValue);
    detailValueSpan.appendChild(detailValueText);
    detailPairP.appendChild(detailValueSpan);
    return detailPairP;
}

function populateControls(previousPage, nextPage, currentPage, info) {
    controls.innerHTML = '';
    //Create the buttons to change the layout
    const layout = document.createElement('section');
    layout.setAttribute('id', 'layout');
    const layoutLabel = document.createElement('label');
    const layoutText = document.createTextNode("Layout:")
    layoutLabel.appendChild(layoutText);
    layout.appendChild(layoutLabel);
    const gridViewButton = document.createElement('button');
    gridViewButton.setAttribute('type', 'button');
    gridViewButton.setAttribute('class', 'material-symbols-outlined');
    if (layoutPreference === "grid") gridViewButton.classList.add('selected');
    const gridViewText = document.createTextNode("grid_view");
    gridViewButton.appendChild(gridViewText);
    gridViewButton.addEventListener('click', () => {
        layoutPreference = "grid";
        loadData(currentPage['url'], currentPage['page'], "grid");
    });
    layout.appendChild(gridViewButton);
    const colorButton = document.createElement('button');
    colorButton.setAttribute('type', 'button');
    colorButton.setAttribute('class', 'material-symbols-outlined');
    if (layoutPreference === "color") colorButton.classList.add('selected');
    const colorText = document.createTextNode("palette")
    colorButton.appendChild(colorText);
    colorButton.addEventListener('click', () => {
        layoutPreference = "color";
        loadData(currentPage['url'], currentPage['page'], "color");
    });
    layout.appendChild(colorButton);
    const listViewButton = document.createElement('button');
    listViewButton.setAttribute('type', 'button');
    listViewButton.setAttribute('class', 'material-symbols-outlined');
    if (layoutPreference === "list") listViewButton.classList.add('selected');
    const listViewText = document.createTextNode("lists");
    listViewButton.appendChild(listViewText);
    listViewButton.addEventListener('click', () => {
        layoutPreference = "list";
        loadData(currentPage['url'], currentPage['page'], "list");
    });
    layout.appendChild(listViewButton);
    controls.appendChild(layout);
    const pagigation = document.createElement('section');
    pagigation.setAttribute("id", "pagigation")
    if (previousPage) {
        const previousButton = document.createElement('button');
        previousButton.setAttribute('type', 'button');
        const previousText = document.createTextNode("Previous");
        previousButton.appendChild(previousText);
        previousButton.addEventListener('click', () => loadData(previousPage['url'], previousPage['page'], layoutPreference))
        pagigation.appendChild(previousButton);
    }
    const infoP = document.createElement('p');
    const infoText = document.createTextNode(info);
    infoP.appendChild(infoText);
    pagigation.appendChild(infoP);
    if (nextPage) {
        const nextButton = document.createElement('button');
        nextButton.setAttribute('type', 'button');
        const nextText = document.createTextNode('Next');
        nextButton.appendChild(nextText);
        nextButton.addEventListener('click', () => loadData(nextPage['url'], nextPage['page'], layoutPreference))
        pagigation.appendChild(nextButton);
    }
    controls.appendChild(pagigation);
}

function showPokemonDetails(pokemonDetail) {
    pokemonDetailContainer.innerHTML = '';
    //Add classes to the page wrapper and detail container to display the detail container
    if (pokemonDetailContainer.classList.contains('hide')) {
        pokemonDetailContainer.classList.remove("hide");
    }
    if (!pageWrapper.classList.contains('showDetail')) {
        pageWrapper.classList.add('showDetail');
    }
    //Create the Pokemon detail header
    const pokeHeader = document.createElement('section');
    pokeHeader.setAttribute('class', 'pokeHeader');
    pokeHeader.classList.add(`${pokemonDetail['types'][0]['type']['name']}Type`);
    //Create the pokeHeader h2
    const pokemonNameH2 = document.createElement('h2');
    const pokemonName = document.createTextNode(pokemonDetail['name']);
    pokemonNameH2.appendChild(pokemonName);
    pokeHeader.appendChild(pokemonNameH2);
    //Create the close button
    const closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('class', 'material-symbols-outlined');
    const closeButtonIcon = document.createTextNode('close');
    closeButton.appendChild(closeButtonIcon);
    closeButton.addEventListener('click', () => {
        closePokemonDetails();
    })
    pokeHeader.appendChild(closeButton);
    pokemonDetailContainer.appendChild(pokeHeader);
    //Create the image container
    const imageContainer = document.createElement('section');
    imageContainer.setAttribute('class', 'imageContainer');
    let pokemonImage = document.createElement('img');
     if (pokemonDetail['sprite']) {
        pokemonImage.setAttribute('src', pokemonDetail['sprite']);
        pokemonImage.setAttribute('alt', pokemonDetail['name']);
    } else {
        pokemonImage.setAttribute('src', 'images/not-found.png');
        pokemonImage.setAttribute('alt', 'Image not provided');
    }
    imageContainer.appendChild(pokemonImage);
    imageContainer.classList.add(`${pokemonDetail['types'][0]['type']['name']}Type`);
    pokemonDetailContainer.appendChild(imageContainer);
    //Create the types section
    const detailTypes = pokemonDetail['types'].reduce((acc, currentType) => {
        const typeP = document.createElement('p');
        const typeText = document.createTextNode(currentType['type']['name']);
        typeP.appendChild(typeText);
        typeP.classList.add(`${currentType['type']['name']}Type`);
        acc.appendChild(typeP);
        return acc;
    }, document.createElement('section'))
    detailTypes.setAttribute('class', 'detailTypes');
    const typesWordP = document.createElement('p');
    const typesWord = document.createTextNode("Types:");
    typesWordP.appendChild(typesWord);
    typesWordP.style.fontWeight = 'bold';
    detailTypes.prepend(typesWordP);
    pokemonDetailContainer.appendChild(detailTypes);
    //Create the details section: order #, base xp, height, weight
    const detailsSection = document.createElement('section');
    detailsSection.setAttribute('id', 'detailsSection');
    detailsSection.setAttribute('class', 'detailsSection');
    pokemonDetailContainer.appendChild(detailsSection);
    const orderP = createDetailsPair('Order #', pokemonDetail['id']);
    detailsSection.appendChild(orderP);
    const baseExP = createDetailsPair('Base Experince', pokemonDetail['baseExperience']);
    detailsSection.appendChild(baseExP)
    const heightP = createDetailsPair('Height', `${pokemonDetail['height'] / 10} m`);
    detailsSection.appendChild(heightP)
    const weightP = createDetailsPair('Weight', `${pokemonDetail['weight'] / 10} kg`);
    detailsSection.appendChild(weightP)
    //Create the stats section
    const stats = pokemonDetail['stats'].reduce((acc, currentStat) => {
        const statP = createDetailsPair(currentStat['stat']['name'], currentStat['base_stat']);
        acc.appendChild(statP);
        return acc;
    }, document.createElement('fieldset'));
    stats.setAttribute('id', 'detailStats');
    const statsLegend = document.createElement('legend');
    const stateLegendText = document.createTextNode("Stats");
    statsLegend.appendChild(stateLegendText);
    stats.appendChild(statsLegend);
    pokemonDetailContainer.appendChild(stats);
}

function closePokemonDetails() {
    pokemonDetailContainer.innerHTML = '';
    if (pageWrapper.classList.contains('showDetail')) {
        pageWrapper.classList.remove('showDetail');
    }
    if (!pokemonDetailContainer.classList.contains("hide")) {
        pokemonDetailContainer.classList.add("hide");
    }
}

function createPokemonCard(pokemonDetail) {
    //Create the card
    const pokemonCard = document.createElement('article');
    pokemonCard.setAttribute("id", pokemonDetail['id'])
    if (layoutPreference === "list") {
        const pokemonNameH2 = document.createElement('h2');
        const pokemonName = document.createTextNode(pokemonDetail['name']);
        pokemonNameH2.appendChild(pokemonName);
        pokemonCard.appendChild(pokemonNameH2);
    }
    const cardContainer = document.createElement('section');
    //Create the pokemon image
    const image = document.createElement('img');
    if (pokemonDetail['sprite']) {
        image.setAttribute('src', pokemonDetail['sprite']);
        image.setAttribute('alt', pokemonDetail['name']);
    } else {
        image.setAttribute('src', 'images/not-found.png');
        image.setAttribute('alt', 'Image not provided');
        image.setAttribute('style', 'height: 96px;width: 96px;')
    }
    cardContainer.appendChild(image);
    if (layoutPreference === "list") {
        //Load the details: order #, base xp, height, weight
        const details = document.createElement('div');
        details.setAttribute("class", "details");
        const orderP = document.createElement('p');
        const orderText = document.createTextNode(`Order #: ${pokemonDetail['id']}`);
        orderP.appendChild(orderText);
        details.appendChild(orderP);
        const baseExpP = document.createElement('p');
        const baseExp = document.createTextNode(`Base Experience: ${pokemonDetail['baseExperience']}`);
        baseExpP.appendChild(baseExp);
        details.appendChild(baseExpP);
        const heightP = document.createElement('p');
        const height = document.createTextNode(`Height: ${pokemonDetail['height'] / 10} m`);
        heightP.appendChild(height);
        details.appendChild(heightP);
        const weightP = document.createElement('p');
        const weight = document.createTextNode(`Weight: ${pokemonDetail['weight'] / 10} kg`);
        weightP.appendChild(weight);
        details.appendChild(weightP);
        cardContainer.appendChild(details);
        //Load the stats for the Pokemon
        const stats = document.createElement('div');
        stats.setAttribute("class", "stats");
        const statsUl = pokemonDetail['stats'].reduce((acc, currentStat) => {
            const statLi = document.createElement('li');
            const stat = document.createTextNode(`${currentStat['stat']['name']}: ${currentStat['base_stat']}`);
            statLi.appendChild(stat);
            acc.appendChild(statLi);
            return acc;
        }, document.createElement('ul'));
        stats.appendChild(statsUl);
        cardContainer.appendChild(stats);
    }
    pokemonCard.appendChild(cardContainer);
    if (layoutPreference === "grid") {
        //Just load the name
        const pokemonNameH2 = document.createElement('h2');
        const pokemonName = document.createTextNode(`${pokemonDetail['id']}: ${pokemonDetail['name']}`);
        pokemonNameH2.appendChild(pokemonName);
        pokemonCard.appendChild(pokemonNameH2);
    }
    if (layoutPreference === "color") {
        //Set the card background to the color of the Pokemon's first type
        pokemonCard.classList.add(`${pokemonDetail['types'][0]['type']['name']}Type`);
    }
    pokemonCard.addEventListener('click', () => {
        //Open the Pokemon detail card to the left of the list of Pokemon
        showPokemonDetails(pokemonDetail);
    });
    return pokemonCard;
}

function loadData(url, pageNum, layout) {
    outputContainer.innerHTML = '';
    //Close the Pokemon detail card if it is open
    closePokemonDetails();
    //Fetch the list of Pokemon from PokeAPI
    const data = fetch(url);
    data.then(response => response.json())
        .then(jsonData => {
            //Calculate the number of pages
            //https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0
            //Get the limit # from the url. Limit and offset sometimes switch?
            let urlParam1 = url.split("?")[1].split("&")[0].split("=");
            let urlParam2 = url.split("?")[1].split("&")[1].split("=");
            let limit = 0;
            if (urlParam1[0] === "limit") {
                limit = urlParam1[1];
            } else {
                limit = urlParam2[1];
            }
            const numPokemon = jsonData['count'];
            const totalPages = Math.ceil(numPokemon / limit);
            //Create objects for the previous and next buttons that include the url and page number
            let nextPage = null;
            if (jsonData['next']) {
                nextPage = { "url": jsonData['next'], "page": pageNum + 1 };
            } else {
                pageNum = totalPages;
            }
            let previousPage = null;
            if (jsonData['previous']) {
                previousPage = { "url": jsonData['previous'], "page": pageNum - 1 };
            }
            //Create an object for the current page url and page number
            let currentPage = { "url": url, "page": pageNum };
            const pageInfo = `${pageNum} of ${totalPages}`;
            //Load the controls
            populateControls(previousPage, nextPage, currentPage, pageInfo);
            //Create the container for the Pokemon cards
            const pokeArray = jsonData['results'];
            const pokeList = pokeArray.reduce((acc, currentPokemon) => {
                const pokemonUrl = currentPokemon['url'];
                //Create a Pokemon object
                const pokemonDetail = fetch(pokemonUrl)
                    .then(response => response.json())
                    .then(jsonData => {
                        const pokemon = {
                            "id": jsonData['id'],
                            "name": capitalizeName(jsonData['name']),
                            "baseExperience": jsonData['base_experience'],
                            "stats": jsonData['stats'],
                            "types": jsonData['types'],
                            "height": jsonData['height'],
                            "weight": jsonData['weight'],
                            "sprite": jsonData['sprites']['front_default']
                        }
                        //Pass the object to createPokemonCard() to create the Pokemon card
                        const pokemonDetail = createPokemonCard(pokemon);
                        acc.appendChild(pokemonDetail);
                    });
                return acc;
            }, document.createElement('div'));
            pokeList.setAttribute("id", "pokeList");
            //Set the layout stlye. The default is list view
            pokeList.setAttribute('class', 'list');
            if (layout === "grid" || layout === "color") {
                pokeList.setAttribute('class', 'grid');
            } else if (layout === "list") {
                pokeList.setAttribute('class', 'list');
            }
            outputContainer.appendChild(pokeList);
        })
        .catch((error) => {
            //Log any errors to the console
            console.error(error);
            //Display the error message on the page
            const errorH2 = document.createElement('h2');
            const errorMessage = document.createTextNode(`Error loading the Pokemon: ${error}. Please try reloading the page.`);
            errorH2.appendChild(errorMessage);
            controls.appendChild(errorH2);
        });
}

loadData("https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0", 1, layoutPreference)