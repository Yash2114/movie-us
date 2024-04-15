'use strict';


const addEventOnElements=function(elements,eventType,callback){
    for(const elem of elements) elem.addEventListener(eventType,callback);
}

// toggle seach box in mobile device

const searchBox=document.querySelector("[search-box]");
const searchTogglers=document.querySelectorAll("[search-toggler]");

addEventOnElements(searchTogglers,"click",function(){
    searchBox.classList.toggle("active");
});



// store movieid in localstorage when you click any movie card 

const getMovieDetail=function(movieId){
    window.localStorage.setItem("movieId",String(movieId));
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

