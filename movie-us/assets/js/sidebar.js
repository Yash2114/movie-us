'use strict';

import { api_key, fetchDataFromServer } from "./api.js";

export function sidebar() {
    fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`, ({ genres }) => {
        const genreList = genres.reduce((acc, genre) => ({ ...acc, [genre.id]: genre.name }), {});
        renderSidebar(genreList);
    });
}

function renderSidebar(genreList) {
    const sidebar = document.querySelector("[sidebar]");
    const sidebarInner = document.createElement("div");
    sidebarInner.classList.add("sidebar-inner");

    // Genre Section
    const genreSection = document.createElement("div");
    genreSection.classList.add("sidebar-list");
    genreSection.innerHTML = `<p class="title">Genre</p>`;
    Object.entries(genreList).forEach(([id, name]) => {
        const link = document.createElement("a");
        link.classList.add("sidebar-link");
        link.textContent = name;
        link.addEventListener("click", () => getMovieList('genre', id));
        genreSection.appendChild(link);
    });

    // Language Section
    const languageSection = document.createElement("div");
    languageSection.classList.add("sidebar-list");
    languageSection.innerHTML = `<p class="title">Language</p>`;
    const languages = {
        en: "English",
        hi: "Hindi",
        bn: "Bengali"
    };
    Object.entries(languages).forEach(([code, language]) => {
        const link = document.createElement("a");
        link.classList.add("sidebar-link");
        link.textContent = language;
        link.addEventListener("click", () => getMovieList('language', code));
        languageSection.appendChild(link);
    });

    sidebarInner.appendChild(genreSection);
    sidebarInner.appendChild(languageSection);
    sidebar.appendChild(sidebarInner);

    toggleSidebar();
}

function toggleSidebar() {
    const sidebar = document.querySelector("[sidebar]");
    const sidebarBtn = document.querySelector("[menu-btn]");
    const overlay = document.querySelector("[overlay]");

    sidebarBtn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
        sidebarBtn.classList.toggle("active");
        overlay.classList.toggle("active");
    });

    overlay.addEventListener("click", () => {
        sidebar.classList.remove("active");
        sidebarBtn.classList.remove("active");
        overlay.classList.remove("active");
    });
}

function getMovieList(type, value) {
    let urlParam;
    if (type === 'genre') {
        urlParam = `with_genres=${value}`;
    } else if (type === 'language') {
        urlParam = `with_original_language=${value}`;
    }
    
    window.localStorage.setItem("urlParam", urlParam);
    window.location.href = "./movie-list.html";
}
