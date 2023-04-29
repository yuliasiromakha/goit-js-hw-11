// import Notiflix from 'notiflix';
// import { CardApiService } from './api';
// import LoadMoreBtn from './LoadMoreBtn';
// const form = document.getElementById('search-form');
// const searchButton = document.querySelector('.search-button');
// const input = document.querySelector('.search-input');
// const gallery = document.querySelector('.gallery');
// const cardApiService = new CardApiService();
// const loadMoreBtn = new LoadMoreBtn({
//   selector: '#loadMore',
//   isHidden: true,
// });
// form.addEventListener('submit', onSubmit);
// loadMoreBtn.button.addEventListener('click', loadMoreCards);
// loadMoreBtn.hide();
// // ФУНКЦІЯ ПІСЛЯ САБМІТУ ФОРМИ
// function onSubmit(e) {
//   e.preventDefault();
//   loadMoreBtn.show();
//   const inputValue = input.value.trim();
//   if (!inputValue) {
//     loadMoreBtn.hide();
//     return;
//   }
//   cardApiService.query = inputValue;
//   cardApiService.resetPage();
//   clearSearchResult();
//   fetchCards().finally(() => form.reset());
// }
// //  ФУНКЦІЯ ЩО ФЕТЧИТЬ НА ДІСПЛЕЙ КАРТКИ ТА ПЕРЕВІРЯЄ ЧИ ПРИСУТНЯ ІНФОРМАЦІЯ
// function fetchCards() {
//   loadMoreBtn.hide();
//   return getCardMarkup().catch(error => {
//     if (error.message === '404') {
//       Notiflix.Notify.failure('Oops, no data was found!');
//     }
//     console.log(error);
//   });
// }
// // ФУНКЦІЯ ЩО ПЕРЕВІРЯЄ НАЯВНІСТЬ РЕЗУЛЬТАТУ ТА РЕДЮСИТЬ КАРТКИ
// function getCardMarkup() {
//   return cardApiService.fetchingImages(cardApiService.query).then(data => {
//     const returnedResult = data.hits;
//     console.log(returnedResult);
//     const totalHits = data.totalHits;
//     console.log('total hits:', totalHits);
//     if (returnedResult.length === 0) {
//       loadMoreBtn.hide();
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     } else if (returnedResult.length >= 1) {
//       const createdMarkup = returnedResult.reduce(
//         (acc, card) => acc + renderPictureCard(card),
//         ''
//       );
//       gallery.insertAdjacentHTML('beforeend', createdMarkup);
//       Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
//       loadMoreBtn.show();
//     }
//     if (returnedResult.length > 0 && returnedResult.length < 40) {
//       loadMoreBtn.hide();
//     }
//   });
// }
// function loadMoreCards() {
//   cardApiService.page += 1;
//   return cardApiService.fetchingImages(cardApiService.query).then(data => {
//     const returnedResult = data.hits;
//     const lastPage = Math.ceil(data.totalHits / cardApiService.per_page);
//     if (returnedResult.length >= 1) {
//       const createdMarkup = returnedResult.reduce(
//         (acc, card) => acc + renderPictureCard(card),
//         ''
//       );
//       gallery.insertAdjacentHTML('beforeend', createdMarkup);
//     }
//     if (lastPage === cardApiService.page) {
//       Notiflix.Notify.info(
//         'We are sorry, but you have reached the end of search results.'
//       );
//       loadMoreBtn.hide();
//     }
//   });
// }
// function clearSearchResult() {
//   gallery.innerHTML = '';
// }
// function renderPictureCard({
//   webformatURL,
//   largeImageURL,
//   tags,
//   likes,
//   views,
//   comments,
//   downloads,
// }) {
//   return `
//     <div class='photo-card'>
//     <img width=250 height=150 src=${webformatURL} alt='${tags}' loading='lazy' />
//   <div class='info'>
//     <p class='info-item'>
//       <b>Likes: ${likes}</b>
//     </p>
//     <p class='info-item'>
//       <b>Views: ${views}</b>
//     </p>
//     <p class='info-item'>
//       <b>Comments: ${comments}</b>
//     </p>
//     <p class='info-item'>
//       <b>Downloads: ${downloads}</b>
//     </p>
//   </div>
// </div>
//     `;
// }

import Notiflix from 'notiflix';
import { CardApiService } from './api';
import LoadMoreBtn from './LoadMoreBtn';

const form = document.getElementById('search-form');
const searchButton = document.querySelector('.search-button');
const input = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const cardApiService = new CardApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '#loadMore',
  isHidden: true,
});

form.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', loadMoreCards);
loadMoreBtn.hide();

async function onSubmit(e) {
  e.preventDefault();
  loadMoreBtn.show();
  const inputValue = input.value.trim();
  if (!inputValue) {
    loadMoreBtn.hide();
    return;
  }
  cardApiService.query = inputValue;
  cardApiService.resetPage();
  clearSearchResult();
  try {
    await fetchCards();
  } finally {
    form.reset();
  }
}

async function fetchCards() {
  loadMoreBtn.hide();
  try {
    const data = await cardApiService.fetchingImages(cardApiService.query);
    const returnedResult = data.hits;
    const totalHits = data.totalHits;
    console.log('total hits:', totalHits);
    if (returnedResult.length === 0) {
      loadMoreBtn.hide();
      Notiflix.Notify.failure('Oops, no data was found!');
    } else if (returnedResult.length >= 1) {
      const createdMarkup = returnedResult.reduce(
        (acc, card) => acc + renderPictureCard(card),
        ''
      );
      gallery.insertAdjacentHTML('beforeend', createdMarkup);
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      loadMoreBtn.show();
    }
    if (returnedResult.length > 0 && returnedResult.length < 40) {
      loadMoreBtn.hide();
    }
  } catch (error) {
    if (error.message === '404') {
      Notiflix.Notify.failure('Oops, no data was found!');
    }
    console.log(error);
  }
}

async function loadMoreCards() {
  cardApiService.page += 1;
  try {
    const data = await cardApiService.fetchingImages(cardApiService.query);
    const returnedResult = data.hits;
    const lastPage = Math.ceil(data.totalHits / cardApiService.per_page);
    if (returnedResult.length >= 1) {
      const createdMarkup = returnedResult.reduce(
        (acc, card) => acc + renderPictureCard(card),
        ''
      );
      gallery.insertAdjacentHTML('beforeend', createdMarkup);
    }
    if (lastPage === cardApiService.page) {
      Notiflix.Notify.info(
        'We are sorry, but you have reached the end of search results.'
      );
      loadMoreBtn.hide();
    }
  } catch (error) {
    console.log(error);
  }
}

function clearSearchResult() {
  gallery.innerHTML = '';
}

function renderPictureCard({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <div class='photo-card'>
    <img width=250 height=150 src=${webformatURL} alt='${tags}' loading='lazy' />
  <div class='info'>
    <p class='info-item'>
      <b>Likes: ${likes}</b>
    </p>
    <p class='info-item'>
      <b>Views: ${views}</b>
    </p>
    <p class='info-item'>
      <b>Comments: ${comments}</b>
    </p>
    <p class='info-item'>
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>
    `;
}