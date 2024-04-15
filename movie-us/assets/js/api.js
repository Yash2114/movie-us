'use strict';

const api_key='9ea98f72c6e80a20663d0d90a3c18e1a'; 
const imageBaseURL='https://image.tmdb.org/t/p/';

// // fetch data from a server using the url and passes the result in JSON data to a callback function
// along with an optional parameter if has optionalparameter

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZWE5OGY3MmM2ZTgwYTIwNjYzZDBkOTBhM2MxOGUxYSIsInN1YiI6IjY2MTVjZWUyZWVhMzRkMDE3ZDM0ZjZiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dD2gTCkWH1X8zVR4x5pvAKGgChgJ-Xdqo_S_mVfGMb8'
    }
  };

const fetchDataFromServer=function(url,callback,optionalParam){
    fetch(url,options)
    .then(response => response.json())
    .then(data =>callback(data,optionalParam));
}

export{imageBaseURL,api_key ,fetchDataFromServer};