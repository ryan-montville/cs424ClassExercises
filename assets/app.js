function addAPost() {
    let posts = document.querySelector('.posts');
    posts.innerHTML = "<article><h1>This is a post</h1><p>Here is some text in the post.</p></article>";
}

function fakeSearch() {
    let fakeSearchResults = document.getElementById('fake-search-results');
    fakeSearchResults.innerHTML = "<h2>Search Results</h2><p>No results found. (sorry)";
}
let searchButton = document.getElementById('search-button');
searchButton.addEventListener('click',() => {
    fakeSearch();
});

let addPostButton = document.getElementById('addPost');
addPostButton.addEventListener('click', () => {
    console.log("Post added to page!");
    addAPost();
})