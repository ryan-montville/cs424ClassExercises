//Adding some random content to act a an external source to load some articles
const possibleTitles = ["Real Article (Trust me bro)", "Not Fake Article", "Another Amazing Article", "You won't believe what's in this article", "Top 10 Article"]
let postBody1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus tellus nec velit ornare, ac vestibulum neque iaculis. Donec dictum scelerisque sodales. Nulla auctor imperdiet nunc sed placerat. Donec commodo elit eget nisl lobortis, nec suscipit enim molestie. Suspendisse fringilla, sem non accumsan feugiat, urna ipsum hendrerit ipsum, at porttitor arcu tortor dignissim libero. Nulla vel sem massa. Nam ultricies ac lorem nec tincidunt. Donec facilisis mauris vitae eros rhoncus fermentum. Cras sit amet neque venenatis, pretium risus in, sollicitudin neque. Donec non velit quam. Nulla efficitur congue ex et euismod.";
let postBody2 = "Sed et tellus nunc. Etiam viverra, leo eu rutrum consequat, orci lectus pellentesque enim, in porttitor tortor lacus non nisi. Quisque malesuada varius ultricies. Duis fermentum leo justo, quis egestas velit aliquet non. Aliquam fermentum sem vitae metus dapibus lobortis lacinia placerat enim. Cras semper egestas tellus vel molestie. Curabitur varius augue eget ultrices lacinia. Phasellus iaculis nisl eu consectetur vestibulum. Sed gravida convallis libero eu porta. Quisque volutpat dolor vestibulum pretium iaculis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras laoreet ante vel massa tempus fringilla id in tellus. Fusce ac eleifend sapien, non scelerisque dui. Nulla neque nibh, ultrices in vulputate ut, rhoncus sit amet ex. Integer cursus laoreet est vitae gravida.";
let postBody3 = "Duis sapien eros, lobortis suscipit porta vel, fermentum vel leo. Mauris dui arcu, fermentum sit amet ex vel, luctus consequat augue. Cras tincidunt, diam quis ultrices ullamcorper, ipsum dolor tempor nulla, eu interdum velit nisi ut tortor. Mauris scelerisque leo vehicula ultricies molestie. Nam ac volutpat magna, eu ullamcorper sapien. Ut faucibus in metus at volutpat. Suspendisse a tempus nulla. Phasellus consequat risus id sapien volutpat, faucibus eleifend arcu auctor. Vivamus viverra nibh vitae nisl blandit, pellentesque rhoncus tellus imperdiet. Maecenas at ex iaculis, elementum magna sit amet, ultricies dui. In at mi nunc. Vivamus fringilla eu mauris non dignissim. Donec fermentum faucibus diam. Nunc a sapien a nibh feugiat rutrum quis sit amet dui. Nulla ultricies posuere ipsum. Etiam neque magna, dignissim ut commodo sit amet, finibus sit amet massa.";
let postBody4 = "Suspendisse lobortis, nisl quis suscipit sagittis, diam enim mattis turpis, in ullamcorper nisl velit eget magna. Aliquam malesuada purus nisl, vel tincidunt nisl luctus eu. Quisque nulla massa, faucibus vitae metus ac, laoreet molestie mi. In hac habitasse platea dictumst. Etiam volutpat est eget ipsum ornare molestie. Suspendisse luctus imperdiet mi eget suscipit. Maecenas in quam quis ante molestie sagittis.";
let postBody5 = "Sed maximus, nisl at ultrices vestibulum, velit justo congue sapien, ut rutrum magna velit ac eros. Aenean finibus cursus est, quis commodo libero consequat eu. Integer nec erat dui. Phasellus rutrum tristique lorem in dapibus. Aenean vel lacus sed magna facilisis vehicula at vitae nisi. Curabitur pellentesque metus nec nulla pretium, nec auctor enim malesuada. Fusce laoreet metus ut velit tempus elementum. Ut sagittis non lectus a vehicula. Cras sit amet tristique mauris, et maximus tortor. Integer varius nisl vitae lectus pulvinar, nec convallis enim elementum. Nullam quam nisi, pellentesque nec turpis id, consectetur elementum nisl. Donec accumsan turpis ac turpis efficitur, nec malesuada dui eleifend. Donec mattis accumsan dolor.";
const possibleBodys = [postBody1, postBody2, postBody3, postBody4, postBody5];

//function to add an article to the "posts" section
function addAPost(index) {
    let posts = document.querySelector('.posts');
    let newPost = document.createElement('article');
    let newPostTitle = document.createElement('h2');
    newPostTitle.innerText = possibleTitles[index];
    newPost.appendChild(newPostTitle);
    let newPostBody = document.createElement('p');
    newPostBody.innerText = possibleBodys[index];
    newPost.appendChild(newPostBody);
    posts.appendChild(newPost);
}

//for loop to add all the posts
for (let i=0; i < 5; i++) {
    addAPost(i);
}

let input = document.getElementById('search-input');
let inputValue = input.value;
let fakeSearchResults = document.getElementById('fake-search-results');

//function to return a fake search results that just says "No results found"
function fakeSearch() {
    fakeSearchResults.innerHTML = `<h2>Search Results</h2><p>No results found for "${inputValue}". (sorry)`;
    inputValue = '';
}

//event listener for the search button to return the fake results
let searchButton = document.getElementById('search-button');
searchButton.addEventListener('click',() => {
    fakeSearch();
});

inputValue.addEventListener('keypress', (e) => {
    if (e.keycode === 13) {
        console.log("enter pressed");
        fakeSearch();
    }
})


