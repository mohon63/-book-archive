const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // clear search value
    searchField.value = '';

    // error message
    if (searchText == '') {
        document.getElementById('result-found').innerText = `Please write something to display`;
        document.getElementById('search-result').textContent = '';
    }
    else {
        const url = `http://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                displaySearchResult(data)
            });
    }
}

// display search result
const displaySearchResult = books => {
    document.getElementById('result-found').innerText = `search result found:${books.numFound}`;
    const searchResult = document.getElementById('search-result');

    // clear search result
    searchResult.textContent = '';

    // error message
    if (books.docs.length === 0) {
        document.getElementById('result-found').innerText = `Show no result found.`;

        return;
    } else {
    };

    books.docs.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col-md-3');

        const publisherName = !book.publisher ? "Publisher Name Is Not Given" : book.publisher[0]
        const authorName = !book.author_name ? "Author Name Is Not Given" : book.author_name[0]

        // Using extra image 
        let imgSrc = ''
        if (book.cover_i === undefined) {
            imgSrc = 'images/book.png'
        }
        else {
            imgSrc = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        };

        div.innerHTML = `
            <div class="card mb-3" style="width: 18rem;">
                <img class="card-img-top my-3" src="${imgSrc}" alt="">
                <div class="card-body">
                <h3>${book.title}</h3>
                <h5><span class="text-muted">Publisher:</span> ${publisherName}</h5>
                <h5><span class="text-muted">Author Name:</span> ${authorName}</h5>
                <p><span class="text-muted">Publish Year:</span> ${book.first_publish_year}</p>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    });
};
