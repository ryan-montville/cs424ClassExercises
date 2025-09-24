function app() {
    "use strict";
    //Create an object from the posts section on the home page
    let posts = document.querySelector('.posts');

    //Adding some random content to act as an external source to load some articles
    const postTitles = ["Real Article (Trust me bro)", "Not Fake Article", "Another Amazing Article", "You won't believe what's in this article", "Top 10 Article"]
    let postBody1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus tellus nec velit ornare, ac vestibulum neque iaculis. Donec dictum scelerisque sodales. Nulla auctor imperdiet nunc sed placerat. Donec commodo elit eget nisl lobortis, nec suscipit enim molestie. Suspendisse fringilla, sem non accumsan feugiat, urna ipsum hendrerit ipsum, at porttitor arcu tortor dignissim libero. Nulla vel sem massa. Nam ultricies ac lorem nec tincidunt. Donec facilisis mauris vitae eros rhoncus fermentum. Cras sit amet neque venenatis, pretium risus in, sollicitudin neque. Donec non velit quam. Nulla efficitur congue ex et euismod.";
    let postBody2 = "Sed et tellus nunc. Etiam viverra, leo eu rutrum consequat, orci lectus pellentesque enim, in porttitor tortor lacus non nisi. Quisque malesuada varius ultricies. Duis fermentum leo justo, quis egestas velit aliquet non. Aliquam fermentum sem vitae metus dapibus lobortis lacinia placerat enim. Cras semper egestas tellus vel molestie. Curabitur varius augue eget ultrices lacinia. Phasellus iaculis nisl eu consectetur vestibulum. Sed gravida convallis libero eu porta. Quisque volutpat dolor vestibulum pretium iaculis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras laoreet ante vel massa tempus fringilla id in tellus. Fusce ac eleifend sapien, non scelerisque dui. Nulla neque nibh, ultrices in vulputate ut, rhoncus sit amet ex. Integer cursus laoreet est vitae gravida.";
    let postBody3 = "Duis sapien eros, lobortis suscipit porta vel, fermentum vel leo. Mauris dui arcu, fermentum sit amet ex vel, luctus consequat augue. Cras tincidunt, diam quis ultrices ullamcorper, ipsum dolor tempor nulla, eu interdum velit nisi ut tortor. Mauris scelerisque leo vehicula ultricies molestie. Nam ac volutpat magna, eu ullamcorper sapien. Ut faucibus in metus at volutpat. Suspendisse a tempus nulla. Phasellus consequat risus id sapien volutpat, faucibus eleifend arcu auctor. Vivamus viverra nibh vitae nisl blandit, pellentesque rhoncus tellus imperdiet. Maecenas at ex iaculis, elementum magna sit amet, ultricies dui. In at mi nunc. Vivamus fringilla eu mauris non dignissim. Donec fermentum faucibus diam. Nunc a sapien a nibh feugiat rutrum quis sit amet dui. Nulla ultricies posuere ipsum. Etiam neque magna, dignissim ut commodo sit amet, finibus sit amet massa.";
    let postBody4 = "Suspendisse lobortis, nisl quis suscipit sagittis, diam enim mattis turpis, in ullamcorper nisl velit eget magna. Aliquam malesuada purus nisl, vel tincidunt nisl luctus eu. Quisque nulla massa, faucibus vitae metus ac, laoreet molestie mi. In hac habitasse platea dictumst. Etiam volutpat est eget ipsum ornare molestie. Suspendisse luctus imperdiet mi eget suscipit. Maecenas in quam quis ante molestie sagittis.";
    let postBody5 = "Sed maximus, nisl at ultrices vestibulum, velit justo congue sapien, ut rutrum magna velit ac eros. Aenean finibus cursus est, quis commodo libero consequat eu. Integer nec erat dui. Phasellus rutrum tristique lorem in dapibus. Aenean vel lacus sed magna facilisis vehicula at vitae nisi. Curabitur pellentesque metus nec nulla pretium, nec auctor enim malesuada. Fusce laoreet metus ut velit tempus elementum. Ut sagittis non lectus a vehicula. Cras sit amet tristique mauris, et maximus tortor. Integer varius nisl vitae lectus pulvinar, nec convallis enim elementum. Nullam quam nisi, pellentesque nec turpis id, consectetur elementum nisl. Donec accumsan turpis ac turpis efficitur, nec malesuada dui eleifend. Donec mattis accumsan dolor.";
    const postContents = [postBody1, postBody2, postBody3, postBody4, postBody5];

    //function to add an article to the "posts" section, pass the index of the current post as a parameter
    function addAPost(index) {
        //Create a new article
        let newPost = document.createElement('article');
        //Create the post title as an h2 element
        let h2 = document.createElement('h2');
        let postTitle = document.createTextNode(postTitles[index]);
        h2.appendChild(postTitle);
        //Add the post title to the article
        newPost.appendChild(h2);
        //Create the post content as a p element
        let p = document.createElement('p');
        let postBody = document.createTextNode(postContents[index])
        p.appendChild(postBody)
        //Add the post content to the article
        newPost.appendChild(postBody);
        //Add the article to the posts section
        posts.appendChild(newPost);
    }

    //for loop to add all the posts
    for (let i = 0; i < postTitles.length; i++) {
        addAPost(i);
    }

    //Create an object for the search box
    let inputBox = document.getElementById('search-input');
    //Clear the search box on page load, helps when refreshing the page
    inputBox.value = '';
    //Create an object for the seach button
    let searchButton = document.getElementById('search-button');
    //Create an object for the search results section
    let fakeSearchResults = document.getElementById('fake-search-results');

    //function to return a fake search results that just says "No results found for [inputBox.value]"
    //The search results section only has content after the user searches for something, otherwise its an empty section
    function fakeSearch(input, output) {
        //Store the search box input as an object
        let searchInput = input.value;
        //Clear the search results section in case there was a previous search
        output.innerHTML = '';
        //Check to make sure te search box is not empty
        if (input !== '') {
            //Create the title
            let h2 = document.createElement('h2');
            let titleText = document.createTextNode('Search Results');
            h2.appendChild(titleText);
            //Add the h2 element to the search results
            output.appendChild(h2);
            //Create the results as a p element
            let p = document.createElement('p');
            let resulsts = createTextNode(`No results found for "${searchInput}". Sorry about that.`);
            p.appendChild(resulsts);
            //Add the results to the search results section
            output.appendChild(p);
        }
    }

    //Event listener for the search button to return the fake results
    searchButton.addEventListener('click', () => {
        fakeSearch(inputBox, fakeSearchResults);
    });

    //Event listener to return the fake results when the user presses the 'Enter' key
    inputBox.addEventListener('keypress', (e) => {
        if (e.keyCode === 13) {
            console.log("enter pressed");
            fakeSearch(inputBox.value, fakeSearchResults);
        }
    });
}

app();
