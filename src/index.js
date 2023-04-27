import Notiflix from 'notiflix';
import { CardApiService } from './api';
import LoadMoreBtn from './LoadMoreBtn';
// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.getElementById('search-form')
const searchButton = document.querySelector('.search-button');
const input = document.querySelector('.search-input')
const gallery = document.querySelector('.gallery')

const cardApiService = new CardApiService();
const loadMoreBtn = new LoadMoreBtn ({
  selector: '#loadMore',
  isHidden: true,
});
// console.log(loadMoreBtn);

form.addEventListener('submit', onSubmit)

loadMoreBtn.button.addEventListener('click', loadMoreCards)

function onSubmit(e) {
    e.preventDefault()

    loadMoreBtn.show()
    const inputValue = input.value.trim();
    // console.log(inputValue);
    if (!inputValue) {
      return;
    }

    cardApiService.query = inputValue;

    cardApiService.resetPage( )
    clearSearchResult()
    fetchCards().finally(() => form.reset())
    // console.log(cardApiService);

    //   cardApiService.fetchingImages(inputValue).then(data => {
    //     const returnedResult = data.hits
    //     console.log(returnedResult);

    //     const totalHits = data.totalHits;
    //     if (returnedResult.length === 0) {
    //         Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    //     } else if(returnedResult.length >= 1) {
    //         const createdMarkup = returnedResult.reduce((acc, card) => acc + renderPictureCard(card), '');
    //     gallery.insertAdjacentHTML('beforeend', createdMarkup);
    //     Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
    //     }
    // })



    // .catch(error => {
    //     if (error.message === '404') {
    //         Notiflix.Notify.failure("Oops, no data was found!");
    //     }
    //     console.log(error);
    // });

 }

//  ФУНКЦІЯ ЩО ФЕТЧИТЬ НА ДІСПЛЕЙ КАРТКИ ТА ПЕРЕВІРЯЄ ЧИ ПРИСУТНЯ ІНФОРМАЦІЯ
 function fetchCards() {

  return getCardMarkup()
  .catch(error => {
  if (error.message === '404') {
      Notiflix.Notify.failure("Oops, no data was found!");
  }
  console.log(error);})
}

// ФУНКЦІЯ ЩО ПЕРЕВІРЯЄ НАЯВНІСТЬ РЕЗУЛЬТАТУ ТА РЕДЮСИТЬ КАРТКИ
 function getCardMarkup() {
  return cardApiService.fetchingImages(cardApiService.query).then(data => {
    const returnedResult = data.hits
    console.log(returnedResult);

    const totalHits = data.totalHits;
    console.log('total hits:', totalHits);
    if (returnedResult.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    } else if(returnedResult.length >= 1) {
        const createdMarkup = returnedResult.reduce((acc, card) => acc + renderPictureCard(card), '');
    gallery.insertAdjacentHTML('beforeend', createdMarkup);
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
    // return createdMarkup;
    }
})
 }

 function loadMoreCards() {

  loadMoreBtn.isHidden = true;
  return cardApiService.fetchingImages(cardApiService.query).then(data => {
    const returnedResult = data.hits
    console.log(returnedResult);

    if (returnedResult.length === 0) {
        Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.')
    } else if(returnedResult.length >= 1) {
        const createdMarkup = returnedResult.reduce((acc, card) => acc + renderPictureCard(card), '');
    gallery.insertAdjacentHTML('beforeend', createdMarkup);

    }
})
 }

 function clearSearchResult() {
  gallery.innerHTML = '';
 }

 function renderPictureCard({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
    return `
    <div class="photo-card">
    <img width=250 height=150 src=${webformatURL} alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>
    `
 }

//  return `
//  <div class="photo-card">
// <a href="${largeImageURL}>
//  <img width=250 height=150 src=${webformatURL} alt="${tags}" loading="lazy" />
// </a>
// <div class="info">
//  <p class="info-item">
//    <b>Likes: ${likes}</b>
//  </p>
//  <p class="info-item">
//    <b>Views: ${views}</b>
//  </p>
//  <p class="info-item">
//    <b>Comments: ${comments}</b>
//  </p>
//  <p class="info-item">
//    <b>Downloads: ${downloads}</b>
//  </p>
// </div>
// </div>
//  `