const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"

const pageWrapper = document.getElementById('pageWrapper');
const pokemonDetailContainer = document.getElementById('pokemonDetail');
const outputContainer = document.getElementById('outputContainer');
const controls = document.getElementById('controls');
let layoutPreference = "grid";

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
        loadData(currentPage['url'], currentPage['page'], layoutPreference);
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
        loadData(currentPage['url'], currentPage['page'], layoutPreference);
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
        loadData(currentPage['url'], currentPage['page'], layoutPreference);
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
    if (pokemonDetailContainer.classList.contains('hide')) {
            pokemonDetailContainer.classList.remove("hide");
        }
        if (!pageWrapper.classList.contains('showDetail')) {
            pageWrapper.classList.add('showDetail');
        }
        // let tempType = document.createElement('p');
    // let tType = document.createTextNode(JSON.stringify(pokemonDetail['types']));
    // tempType.appendChild(tType);
    // pokemonCard.appendChild(tempType);
        let tempDetails = document.createElement('p');
        let temp = document.createTextNode(JSON.stringify(pokemonDetail));
        tempDetails.appendChild(temp);
        pokemonDetailContainer.innerHTML = '';
        pokemonDetailContainer.appendChild(tempDetails);
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
        const height = document.createTextNode(`Height: ${pokemonDetail['height'] / 100} m`);
        heightP.appendChild(height);
        details.appendChild(heightP);
        const weightP = document.createElement('p');
        const weight = document.createTextNode(`Weight: ${pokemonDetail['weight'] / 10} kg`);
        weightP.appendChild(weight);
        details.appendChild(weightP);
        cardContainer.appendChild(details);
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
        const pokemonNameH2 = document.createElement('h2');
        const pokemonName = document.createTextNode(`${pokemonDetail['id']}: ${pokemonDetail['name']}`);
        pokemonNameH2.appendChild(pokemonName);
        pokemonCard.appendChild(pokemonNameH2);
    }
    if (layoutPreference === "color") {
        pokemonCard.classList.add(`${pokemonDetail['types'][0]['type']['name']}Type`);
    }
    pokemonCard.addEventListener('click', () => {
        showPokemonDetails(pokemonDetail);

    });
    return pokemonCard;
}

function loadData(url, pageNum, layout) {
    outputContainer.innerHTML = '';
    pokemonDetailContainer.innerHTML = '';
    pokemonDetailContainer.classList.add("hide")
    const data = fetch(url);
    data.then(response => response.json())
        .then(jsonData => {
            const numPokemon = jsonData['count'];
            const totalPages = Math.ceil(numPokemon / 100);
            let previousPage = null;
            if (jsonData['previous']) {
                previousPage = { "url": jsonData['previous'], "page": pageNum - 1 };
            }
            let nextPage = null;
            if (jsonData['next']) {
                nextPage = { "url": jsonData['next'], "page": pageNum + 1 };
            }
            let currentPage = { "url": url, "page": pageNum };
            const pageInfo = `${pageNum} of ${totalPages}`;
            populateControls(previousPage, nextPage, currentPage, pageInfo);
            const pokeArray = jsonData['results'];
            const pokeList = pokeArray.reduce((acc, currentPokemon) => {
                const pokemonUrl = currentPokemon['url'];
                const pokemonDetail = fetch(pokemonUrl)
                    .then(response => response.json())
                    .then(jsonData => {
                        const pokemon = {
                            "id": jsonData['id'],
                            "name": jsonData['name'],
                            "baseExperience": jsonData['base_experience'],
                            "stats": jsonData['stats'],
                            "types": jsonData['types'],
                            "height": jsonData['height'],
                            "weight": jsonData['weight'],
                            "sprite": jsonData['sprites']['front_default']
                        }
                        const pokemonDetail = createPokemonCard(pokemon);
                        acc.appendChild(pokemonDetail);
                    });
                return acc;
            }, document.createElement('div'));
            pokeList.setAttribute("id", "pokeList")
            pokeList.setAttribute('class', 'list')
            if (layout === "grid" || layout === "color") {
                pokeList.setAttribute('class', 'grid');
            } else if (layout === "list") {
                pokeList.setAttribute('class', 'list');
            }
            outputContainer.appendChild(pokeList);
        })
        .catch((error) => {
            console.error(error);
        });
}

loadData("https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0", 1, layoutPreference)