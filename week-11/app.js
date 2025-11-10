//----------------Exercise JSON part 1 - JSON Object----------------
let originalJson = '{"cityName": "Orlando", "attractions": ["Walt Disney World","Universal Studios","Fun spot"],"weather": [{"season": "spring","typicalCondition": "warm"},{   "season": "summer","typicalCondition": "Hot and Rainy"},{"season": "fall","typicalCondition": "warm"},{"season": "winter","typicalCondition": "Still wam with a few cool days"}],"visited": true}';

//----------------Exercise JSON Part 2----------------
// Parse into JavaScript object
let parsedJson = JSON.parse(originalJson);
// Adding new property "bestTimeToVisit" and modifiy the attractions array
parsedJson['bestTimeToVisit'] = "January or February (lowest crowds)";
parsedJson['attractions'].push("Legoland");
//Putting back into json
let modifiedJson = JSON.stringify(parsedJson);

//----------------Exercise JSON Part 3----------------
//Get the output section and clear the error message if the javascript never loads
const outputSection = document.getElementById('output');
outputSection.innerHTML = '';
const loadButtonPart3 = document.getElementById('loadP3');
const loadButtonPart4Good = document.getElementById('part4Good');
const loadButtonPart4Bad = document.getElementById('part4Bad');

function displayLoadingMessage() {
    outputSection.innerHTML = '';
    const loadingP = document.createElement('p');
    const loadingText = document.createTextNode("Loading...");
    loadingP.appendChild(loadingText);
    outputSection.appendChild(loadingP);
}

function displayErrorMessage(errorMessage) {
    outputSection.innerHTML = '';
    const errorH2 = document.createElement('h2');
    const errorH2Text = document.createTextNode("Error loading data");
    errorH2.appendChild(errorH2Text);
    outputSection.appendChild(errorH2);
    const errorMessageP = document.createElement('p');
    const errorMessageText = document.createTextNode(errorMessage);
    errorMessageP.appendChild(errorMessageText);
    outputSection.appendChild(errorMessageP);
}

function displayCityInfo(cityObject) {
//Create the city DOM elements
            const city = document.createElement('article');
            //City name
            const cityNameH2 = document.createElement('h2');
            const cityName = document.createTextNode(cityObject['cityName']);
            cityNameH2.appendChild(cityName);
            city.appendChild(cityNameH2);
            //Attractions
            const attractionsH3 = document.createElement('h3');
            const attractionsH3Text = document.createTextNode("Attractions");
            attractionsH3.appendChild(attractionsH3Text);
            city.appendChild(attractionsH3);
            const attractionsUl = cityObject['attractions'].reduce((accumulator, currentVal) => {
                const attractionLi = document.createElement('li');
                const attractionName = document.createTextNode(currentVal);
                attractionLi.appendChild(attractionName);
                accumulator.appendChild(attractionLi);
                return accumulator;
            }, document.createElement('ul'));
            city.appendChild(attractionsUl);
            //Weather
            const weatherH3 = document.createElement('h3');
            const weatherH3Text = document.createTextNode("Weather");
            weatherH3.appendChild(weatherH3Text);
            city.appendChild(weatherH3);
            const weatherUl = cityObject['weather'].reduce((accumulator, currentVal) => {
                const weatherLi = document.createElement('li');
                const weather = document.createTextNode(`${currentVal['season']}: ${currentVal['typicalCondition']}`);
                weatherLi.appendChild(weather);
                accumulator.appendChild(weatherLi);
                return accumulator;
            }, document.createElement('ul'));
            city.appendChild(weatherUl);
            //Visited
            const visitedP = document.createElement('p');
            if (cityObject['visited']) {
                const visited = document.createTextNode(`I have visited ${cityObject['cityName']}`);
                visitedP.appendChild(visited);
            } else {
                const visited = document.createTextNode(`I have not visited ${cityObject['cityName']} yet`);
                visitedP.appendChild(visited);
            }
            city.appendChild(visitedP);
            //Clear the loading message
            outputSection.innerHTML = '';
            //Add the city to output
            outputSection.appendChild(city);

}
const loadCityPart3 = file => {
    //Display loading message
    displayLoadingMessage();
    //Fetch the json file
    const data = fetch(file);
    //Load the data
    data.then(response => response.json())
        .then(jsonData => {
            console.log(jsonData);
            //Display the data in the dom
            displayCityInfo(jsonData);
        });
}

//----------------Exercise JSON Part 4----------------
function loadCityPart4(file) {
    displayLoadingMessage();
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        //Checking for browser CORS support
        if (!('withCredentials' in xhr)) {
			alert('no CORS support');
			return;
		}

        xhr.open("GET", file);

        xhr.onload = function() {
            try {
                if (this.status === 200) {
                    resolve(displayCityInfo(JSON.parse(this.response)));
                } else {
                    reject(displayErrorMessage(`${this.status} ${this.statusText}`));
                }
            } catch (error) {
                reject(error.message);
            }
        };

        xhr.onerror = function() {
            reject(displayErrorMessage(`${this.status} ${this.statusText}`));
        };

        xhr.send();
    })
}

loadButtonPart3.addEventListener( 'click', () => (loadCityPart3('city.json')) );
loadButtonPart4Good.addEventListener('click', () => (loadCityPart4('city.json')));
loadButtonPart4Bad.addEventListener('click', () => (loadCityPart4('noFile.json')));
