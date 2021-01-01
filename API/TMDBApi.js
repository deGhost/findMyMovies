
const API_TOKEN = "11d1f5f13f5bd1df8b3150388623acc6";

//export enables the use of this function cross the components
export function getFilmsFromApiWithSearchedText (text, page){
    const url= 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=en&query=' + text + "&page="+page;
  
  //using Fetch API:
  // first we send a query
  //then convert the returned result to json
  //in case of errors we catch em
  return fetch(url)
  .then((response)=> response.json())
  .catch((error) => console.error(error))
  
}

export function getImageFromApi(name){
  return  'https://image.tmdb.org/t/p/w300' + name
}