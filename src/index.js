import Notiflix from 'notiflix';
import { fetchingImages } from './api';

// const form = document.querySelector('.search-form')
const form = document.getElementById('search-form')
const searchButton = document.querySelector('.search-button');
const input = document.querySelector('.search-input')
const gallery = document.querySelector('.gallery')

form.addEventListener('submit', onSubmit)

function onSubmit(e) {
    e.preventDefault()

    const inputValue = input.value.trim();
    console.log(inputValue);

    if (!inputValue) { 
        return; 
      }

    fetchingImages(inputValue).then(data => {
        const returnedResult = data.hits
        console.log(returnedResult);

        const totalHits = data.totalHits;
        if (returnedResult.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        } else if(returnedResult.length >= 1) {
            const createdMarkup = returnedResult.reduce((acc, card) => acc + renderPictureCard(card), '');
        gallery.insertAdjacentHTML('beforeend', createdMarkup);
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
        }
    })
    .catch(error => {
        if (error.message === '404') {
            Notiflix.Notify.failure("Oops, no data was found!");
        }
        console.log(error);
    });

 }

//  function renderPicture({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
    function renderPictureCard({ webformatURL, tags, likes, views, comments, downloads }) {
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