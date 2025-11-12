function getRandomNumber(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}

//-------------------Exercise - Generators & Promises - Part 1-------------------
//
function numbers(length, min, max) {
    return new Promise((resolve, reject) => {
        let numbers = []
        for (let i = 0; i < length; i++) {
            numbers.push(getRandomNumber(min, max));
        }
        if (length < 1) {
            reject("Length is less than one")
        } else if (min > max) {
            reject("Min is greater than max")
        } else {
            console.log(`Setp 1 - Array of numbers: ${numbers}`)
            resolve(numbers)
        }

    });
}

numbers(20, 1, 100)
    .then(response => {
        let doubled = []
        const l = response.length;
        for (i = 0; i < l; i++) {
            doubled.push(response[i] * 2)
        }
        console.log(`step 2 - Array of numbers doubled: ${doubled}`)
        return doubled
    })
    .then(repose => {
        return sum = repose.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    })
    .then(sum => console.log(`Step 3 - sum: ${sum}`))
    .catch((err) => {
        console.log("Error:", err);
    });

fetch('./assets/item.json')
    .then(response => {
        // reactions passed to `then` used to handle fulfillment of a promise
        return response.json();
    })
    .then(myJSON => {
        console.log(myJSON);
    })
    .catch(err => {
        // reactions passed to `catch` executed with a rejection reason...
        console.log(`error detected - ${err}`);
    });