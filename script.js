const API_URL =
    "https://api.themoviedb.org/3/discover/movie?api_key=ec2e4fed861b9098a4dfd76fd6d428fc&sort_by=popularity.desc&page=1";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w500"  


const form=document.getElementById('form')
const search=document.getElementById('search')

const main=document.getElementById('main')

// Get Movie 
getMovies(API_URL)
async function getMovies(API_URL){ 
const res= await fetch(API_URL)
const data= await res.json()
displayMovie(data.results)
console.log(data.results);
}
function displayMovie(movies){ 
    main.innerHTML=''
    movies.forEach((movie)=> {
      const{title,poster_path,vote_average,overview}=movie
      const moviesElement=document.createElement('div')  
      moviesElement.classList.add('movie')
      moviesElement.innerHTML=`
      <img src="${IMAGE_PATH + poster_path}" alt="${title}" />
      <div class'movie-info'>
      <h3>${title}</h3>
      <span class="${getClassesByRating(vote_average)}> ${vote_average}</span>
      <div class='overview'>
      <h3>Overview</h3>
      ${overview}
      </div>
      </div>
      `
        main.appendChild(moviesElement)
    })
}
function getClassesByRating(rating) {
    if(rating>=8){
        return 'green'
    }else if(rating>=5){
        return 'orange'
    }else{
        return 'red'
    }
 }
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    searchValue=search.value
    const SEARCH_URL = 
    `https://api.themoviedb.org/3/search/movie?api_key=ec2e4fed861b9098a4dfd76fd6d428fc&query=${searchValue}&page=1`;
    if(searchValue && searchValue !==''){ 
        getMovies(SEARCH_URL+searchValue)
        searchValue=''
    }else{ 
        window.location.reload()
    }
})