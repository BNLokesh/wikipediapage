let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResults(results) {
    let {
        title,
        link,
        description
    } = results;
    let resultsItemEl = document.createElement("div");
    resultsItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultsItemEl);

    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultsItemEl.appendChild(resultTitleEl);

    let breakEl = document.createElement("br");
    resultsItemEl.appendChild(breakEl);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.textContent = link;
    urlEl.href = link;
    urlEl.target = "_blank";
    resultsItemEl.appendChild(urlEl);

    let breakerEl = document.createElement("br");
    resultsItemEl.appendChild(breakerEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultsItemEl.appendChild(descriptionEl);

}



function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none");
    for (let results of searchResults) {
        createAndAppendSearchResults(results);
    }

}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searchResultsEl.textContent = "";

        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}


searchInputEl.addEventListener("keydown", searchWikipedia);