export class CardApiService {
    static BASE_URL = 'https://pixabay.com/api/';
    static API_KEY = '35566788-2396923f3520db2f530781152';
    constructor() {
      this.query = '';
      this.page = 1;
      this.per_page = 40;
    }
  
    fetchingImages() {
      const url = `${CardApiService.BASE_URL}?key=${CardApiService.API_KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`;
      return fetch(url).then(data => {
        if (!data.ok) {
          throw new Error(data.status);
        }
  
        return data.json();
      });
    }
  
    resetPage() {
      this.page = 1;
    }
  }