document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const totalResultsContainer = document.getElementById("total-results");

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const query = encodeURIComponent(
      searchInput.value.trim().split(" ").join("+")
    );
    const apiUrl = `https://openlibrary.org/search.json?q=${query}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        displayResults(data.docs);
        updateTotalResults(data.numFound);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });

  function displayResults(results) {
    searchResults.innerHTML = "";

    if (results && results.length > 0) {
      results.forEach((result) => {
        const title = result.title ? result.title : "Title not available";
        const author = result.author_name
          ? result.author_name.join(", ")
          : "Author not available";
        const firstPublishYear = result.first_publish_year
          ? result.first_publish_year
          : "Year not available";

        const resultDiv = document.createElement("div");
        resultDiv.classList.add("search-result");

        const resultLink = document.createElement("a");
        resultLink.href = result.key;
        resultLink.textContent = `${title} - ${author} - ${firstPublishYear}`;

        resultDiv.appendChild(resultLink);
        searchResults.appendChild(resultDiv);
      });
    } else {
      searchResults.innerHTML = "No results found for the given query.";
    }
  }

  function updateTotalResults(count) {
    
    totalResultsContainer.textContent = `Total Results: ${count}`;
  }
});
