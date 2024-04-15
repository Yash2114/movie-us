// movie-list.js

'use strict';

import { api_key, fetchDataFromServer } from "./api.js";
import { sidebar } from "./sidebar.js";
import { createMovieCard } from "./movie-card.js";
import { search } from "./search.js";

// Assuming these are retrieved correctly from localStorage
const genreName = window.localStorage.getItem("genreName");
const urlParam = window.localStorage.getItem("urlParam");
const pageContent = document.querySelector("[page-content]");

sidebar();
search();

let currentPage = 1;
let totalPages = 0;

const baseUrl = "https://api.themoviedb.org/3/discover/movie";
const queryParams = new URLSearchParams({
    api_key: api_key,
    sort_by: "popularity.desc",
    include_adult: "false",
    page: currentPage.toString()
});

if (urlParam) {
    // Assuming urlParam is a query string like "with_genres=18"
    const additionalParams = new URLSearchParams(urlParam);
    additionalParams.forEach((value, key) => {
        queryParams.append(key, value);
    });
}

const fullUrl = `${baseUrl}?${queryParams}`;

function updateStatus(){
    onchange='updateStatus()'
}


// Fetching movie list
fetchDataFromServer(fullUrl, ({ results: movieList, total_pages }) => {
    totalPages = total_pages;
    document.title = `${genreName} Movies - FilmBox`;

    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movie-list", "genre-list");
    movieListElem.ariaLabel = `${genreName} Movies`;

    movieListElem.innerHTML = `
        <div class="title-wrapper">
            <h1 class="heading">All ${genreName} Movies</h1>
        </div>
        <div class="grid-list"></div>
        <button class="btn load-more">Load More</button>
    `;
    const gridList = movieListElem.querySelector(".grid-list");
    const loadMoreBtn = movieListElem.querySelector(".load-more");

    movieList.forEach(movie => {
        const movieCard = createMovieCard(movie);
        gridList.appendChild(movieCard);
    });

    pageContent.appendChild(movieListElem);

    loadMoreBtn.addEventListener("click", function() {
        if (currentPage >= totalPages) {
            this.style.display = "none";
            return;
        }
        currentPage++;
        this.classList.add("loading");

        // Update queryParams for the next page
        queryParams.set('page', currentPage.toString());
        const nextPageUrl = `${baseUrl}?${queryParams}`;

        fetchDataFromServer(nextPageUrl, ({ results: movieList }) => {
            this.classList.remove("loading");
            movieList.forEach(movie => {
                const movieCard = createMovieCard(movie);
                gridList.appendChild(movieCard);
            });
        });
    });
});
