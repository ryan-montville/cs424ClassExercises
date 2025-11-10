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


const loadCityPart3 = file => {
    //Display loading message
    outputSection.innerHTML = '';
    const loadingP = document.createElement('p');
    const loadingText = document.createTextNode("Loading...");
    loadingP.appendChild(loadingText);
    outputSection.appendChild(loadingP);
    //Fetch the json file
    const data = fetch(file);
    //Load the data
    data.then(response => response.json())
        .then(jsonData => {
            console.log(jsonData);
            //Create the city DOM elements
            const city = document.createElement('article');
            //City name
            const cityNameH2 = document.createElement('h2');
            const cityName = document.createTextNode(jsonData['cityName']);
            cityNameH2.appendChild(cityName);
            city.appendChild(cityNameH2);
            //Attractions
            const attractionsH3 = document.createElement('h3');
            const attractionsH3Text = document.createTextNode("Attractions");
            attractionsH3.appendChild(attractionsH3Text);
            city.appendChild(attractionsH3);
            const attractionsUl = jsonData['attractions'].reduce((accumulator, currentVal) => {
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
            const weatherUl = jsonData['weather'].reduce((accumulator, currentVal) => {
                const weatherLi = document.createElement('li');
                const weather = document.createTextNode(`${currentVal['season']}: ${currentVal['typicalCondition']}`);
                weatherLi.appendChild(weather);
                accumulator.appendChild(weatherLi);
                return accumulator;
            }, document.createElement('ul'));
            city.appendChild(weatherUl);
            //Visited
            const visitedP = document.createElement('p');
            if (jsonData['visited']) {
                const visited = document.createTextNode(`I have visited ${jsonData['cityName']}`);
                visitedP.appendChild(visited);
            } else {
                const visited = document.createTextNode(`I have not visited ${jsonData['cityName']} yet`);
                visitedP.appendChild(visited);
            }
            city.appendChild(visitedP);
            //Clear the loading message
            outputSection.innerHTML = '';
            //Add the city to output
            outputSection.appendChild(city);
        });
}

//----------------Exercise JSON Part 4----------------
function loadCityPart4() {

}

loadButtonPart3.addEventListener( 'click', () => (loadCityPart3('city.json')) );
loadButtonPart4Good.addEventListener('click', () => (loadCityPart4('city.json')));
loadButtonPart4Bad.addEventListener('click', () => (loadCityPart4('noFile.json')));
