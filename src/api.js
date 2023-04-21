export function fetchingImages(name) {
    const BASE_URL = 'https://pixabay.com/api/'
    const API_KEY = '35566788-2396923f3520db2f530781152';
    
    return fetch(`${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(data => {

        if (!data.ok) {
            throw new Error(data.status)
          }
        
    return data.json()})

}