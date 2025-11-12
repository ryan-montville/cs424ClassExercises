function app() {
    "use strict";
    //Create an object from the posts section on the home page
    let postsSection = document.getElementById('posts');
    //Adding some random content to act as an external source to load some articles
    var posts = [
        {
            title: "Real Article (Trust me bro)",
            pubDate: "September 5, 2010",
            author: "Garrett Lambert",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus tellus nec velit ornare, ac vestibulum neque iaculis. Donec dictum scelerisque sodales. Nulla auctor imperdiet nunc sed placerat. Donec commodo elit eget nisl lobortis, nec suscipit enim molestie. Suspendisse fringilla, sem non accumsan feugiat, urna ipsum hendrerit ipsum, at porttitor arcu tortor dignissim libero. Nulla vel sem massa. Nam ultricies ac lorem nec tincidunt. Donec facilisis mauris vitae eros rhoncus fermentum. Cras sit amet neque venenatis, pretium risus in, sollicitudin neque. Donec non velit quam. Nulla efficitur congue ex et euismod."
        },
        {
            title: "Not Fake Article",
            pubDate: "September 2, 2010",
            author: "Vicki Cooper",
            content: "Sed et tellus nunc. Etiam viverra, leo eu rutrum consequat, orci lectus pellentesque enim, in porttitor tortor lacus non nisi. Quisque malesuada varius ultricies. Duis fermentum leo justo, quis egestas velit aliquet non. Aliquam fermentum sem vitae metus dapibus lobortis lacinia placerat enim. Cras semper egestas tellus vel molestie. Curabitur varius augue eget ultrices lacinia. Phasellus iaculis nisl eu consectetur vestibulum. Sed gravida convallis libero eu porta. Quisque volutpat dolor vestibulum pretium iaculis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras laoreet ante vel massa tempus fringilla id in tellus. Fusce ac eleifend sapien, non scelerisque dui. Nulla neque nibh, ultrices in vulputate ut, rhoncus sit amet ex. Integer cursus laoreet est vitae gravida."
        },
        {
            title: "Another Amazing Article",
            pubDate: "August 15, 2010",
            author: "Vicki Cooper",
            content: "Duis sapien eros, lobortis suscipit porta vel, fermentum vel leo. Mauris dui arcu, fermentum sit amet ex vel, luctus consequat augue. Cras tincidunt, diam quis ultrices ullamcorper, ipsum dolor tempor nulla, eu interdum velit nisi ut tortor. Mauris scelerisque leo vehicula ultricies molestie. Nam ac volutpat magna, eu ullamcorper sapien. Ut faucibus in metus at volutpat. Suspendisse a tempus nulla. Phasellus consequat risus id sapien volutpat, faucibus eleifend arcu auctor. Vivamus viverra nibh vitae nisl blandit, pellentesque rhoncus tellus imperdiet. Maecenas at ex iaculis, elementum magna sit amet, ultricies dui. In at mi nunc. Vivamus fringilla eu mauris non dignissim. Donec fermentum faucibus diam. Nunc a sapien a nibh feugiat rutrum quis sit amet dui. Nulla ultricies posuere ipsum. Etiam neque magna, dignissim ut commodo sit amet, finibus sit amet massa."
        },
        {
            title: "You won't believe what's in this article",
            pubDate: "August 8, 2010",
            author: "Vicki Cooper",
            content: "Suspendisse lobortis, nisl quis suscipit sagittis, diam enim mattis turpis, in ullamcorper nisl velit eget magna. Aliquam malesuada purus nisl, vel tincidunt nisl luctus eu. Quisque nulla massa, faucibus vitae metus ac, laoreet molestie mi. In hac habitasse platea dictumst. Etiam volutpat est eget ipsum ornare molestie. Suspendisse luctus imperdiet mi eget suscipit. Maecenas in quam quis ante molestie sagittis."
        },
        {
            title: "Top 10 Article",
            pubDate: "August 1, 2010",
            author: "Garrett Lambert",
            content: "Sed maximus, nisl at ultrices vestibulum, velit justo congue sapien, ut rutrum magna velit ac eros. Aenean finibus cursus est, quis commodo libero consequat eu. Integer nec erat dui. Phasellus rutrum tristique lorem in dapibus. Aenean vel lacus sed magna facilisis vehicula at vitae nisi. Curabitur pellentesque metus nec nulla pretium, nec auctor enim malesuada. Fusce laoreet metus ut velit tempus elementum. Ut sagittis non lectus a vehicula. Cras sit amet tristique mauris, et maximus tortor. Integer varius nisl vitae lectus pulvinar, nec convallis enim elementum. Nullam quam nisi, pellentesque nec turpis id, consectetur elementum nisl. Donec accumsan turpis ac turpis efficitur, nec malesuada dui eleifend. Donec mattis accumsan dolor."
        }
    ]

    //function to add an article to the "posts" section, pass the index of the current post as a parameter
    function addAPost(index) {
        //Create a new article
        let newPost = document.createElement('article');
        //Create the post title as an h2 element
        let h2 = document.createElement('h2');
        let postTitle = document.createTextNode(posts[index].title);
        h2.appendChild(postTitle);
        //Add the post title to the article
        newPost.appendChild(h2);
        //Create the meta line
        let h3 = document.createElement('h3');
        let metaLine = document.createTextNode(`${posts[index].author} | ${posts[index].pubDate}`);
        h3.appendChild(metaLine);
        //Add the publish date and author
        newPost.appendChild(metaLine);
        //Create the post content as a p element
        let p = document.createElement('p');
        let postContent = document.createTextNode(posts[index].content);
        p.appendChild(postContent);
        //Add the post content to the article
        newPost.appendChild(p);
        //Add the article to the posts section
        postsSection.appendChild(newPost);
    }

    //for loop to add all the posts
    for (let i = 0; i < posts.length; i++) {
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
        console.log("Running search results.")
        //Store the search box input as an object
        let searchInput = input.value;
        //Clear the search results section in case there was a previous search
        output.innerHTML = '';
        //Check to make sure te search box is not empty
        if (searchInput.length !== 0) {
            //Create the title
            let h2 = document.createElement('h2');
            let titleText = document.createTextNode('Search Results');
            h2.appendChild(titleText);
            //Add the h2 element to the search results
            output.appendChild(h2);
            //Create the results as a p element
            let p = document.createElement('p');
            let resulsts = document.createTextNode(`No results found for "${searchInput}". Sorry about that.`);
            p.appendChild(resulsts);
            //Add the results to the search results section
            output.appendChild(p);
            //Create a button to clear the search results
            //Used https://www.w3schools.com/howto/howto_js_add_class.asp for help
            let clear = document.createElement('button');
            let buttonText = document.createTextNode("Clear Search Results");
            clear.appendChild(buttonText);
            clear.classList.add("clear-button");
            //Event listener to clear the search results when the "clear Search Results" button is pressed
            clear.addEventListener('click', () => {
                output.innerHTML = '';
                input.value = '';
            })
            //Add the button to the section
            output.appendChild(clear);
        }
    }

    //Event listener for the search button to return the fake results
    searchButton.addEventListener('click', () => {
        console.log("The search button was pressed.")
        fakeSearch(inputBox, fakeSearchResults);
    });

    //Event listener to return the fake results when the user presses the 'Enter' key
    inputBox.addEventListener('keypress', (e) => {
        if (e.keyCode === 13) {
            console.log("The enter key was pressed.");
            fakeSearch(inputBox, fakeSearchResults);
        }
    });
}

app();
