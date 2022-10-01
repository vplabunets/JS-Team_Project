import ApiFilmoteka from './filmotekaApi';

// import createMainMarkup from './createMainMarkup'
const apiFilmoteka = new ApiFilmoteka();
const paginationBox = document.querySelector('.paginationBox');
let globalCurrentpage = 0;

export default function pagination(currentPage, allPages) {
  let markup = '';
  let beforeTwoPage = currentPage - 2;
  let beforePage = currentPage - 1;
  let afterPage = currentPage + 1;
  let afterTwoPage = currentPage + 2;
  globalCurrentpage = currentPage;
  if (currentPage > 1) {
    markup += `<li class="paginationRow">&#129144;</li>`;
  }
  if (currentPage > 1) {
    markup += `<li>1</li>`;
  }

  if (currentPage > 4) {
    markup += `<li>...</li>`;
  }
  if (currentPage > 3) {
    markup += `<li>${beforeTwoPage}</li>`;
  }
  if (currentPage > 2) {
    markup += `<li>${beforePage}</li>`;
  }
  markup += `<li class="paginationPage--current">${currentPage}</li>`;
  if (allPages - 1 > currentPage) {
    markup += `<li>${afterPage}</li>`;
  }
  if (allPages - 2 > currentPage) {
    markup += `<li>${afterTwoPage}</li>`;
  }
  if (allPages - 3 > currentPage) {
    markup += `<li>...</li>`;
  }
  if (allPages > currentPage) {
    markup += `<li class="avd">${currentPage + 5}</li>`;
    markup += `<li class="paginationRow">&#129146;<li>`;
  }

  paginationBox.innerHTML = markup;
}

paginationBox.addEventListener('click', handlerPagination);

async function handlerPagination(evt) {
  if (evt.target.nodeName !== 'LI') {
    return;
  }
  if (evt.target.textContent === '🡸') {
    apiFilmoteka.setPageNumber((globalCurrentpage -= 1));
    const filesFromBackend = await apiFilmoteka.fetchPopularsFilms();

    cleanerMarkup(cardListEl);
    createMainMarkup(filesFromBackend);

    pagination(apiFilmoteka.pageNumber, apiFilmoteka.totalPages);

    return;
  }
  if (evt.target.textContent === '🡺') {
    apiFilmoteka.setPageNumber((globalCurrentpage += 1));
    console.log(apiFilmoteka.pageNumber);
    const filesFromBackend = await apiFilmoteka.fetchPopularsFilms();

    cleanerMarkup(cardListEl);
    createMainMarkup(filesFromBackend);

    pagination(apiFilmoteka.pageNumber, apiFilmoteka.totalPages);

    return;
  }
  if (evt.target.textContent === '...') {
    return;
  }
  const page = evt.target.textContent;

  apiFilmoteka.setPageNumber(Number(page));
  const filesFromBackend = await apiFilmoteka.fetchPopularsFilms();

  cleanerMarkup(cardListEl);
  createMainMarkup(filesFromBackend);

  pagination(apiFilmoteka.pageNumber, apiFilmoteka.totalPages);
}
// Import

import ApiFilmoteka from './filmotekaApi';
import { cleanerMarkup } from './cleanerMarkup';
import { searchGenresById } from './genresList';
import { renderFoo } from './renderMarkup';
const cardListEl = document.querySelector('ul.card__list');
//Initialize class instance
const api = new ApiFilmoteka();

function createMainMarkup(fetchedData) {
  //Getting results from API

  //Chegking response from API
  if (!fetchedData) {
  } else {
    // получаем массив из елементов 'li' , переводим в строку с помощю join
    const filmCards = fetchedData
      .map(
        ({
          id,
          poster_path,
          title,
          genre_ids,
          release_date,
        }) => `<li class="film__item">
        <a class="film__link" id="${id}">
  <div class="film__wrap">
  <img src=${
    poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : img
  } class="film-item__img" alt="${title}" width="300">
  </div>
  <div>
  <h3 class="film__title">${title}</h3>
  </div>
  <div class="film__genres-and-date">
  <p class="film__genres">${searchGenresById(genre_ids)}</p>
  <p class="film__release-date">${
    release_date ? new Date(release_date).getFullYear() : 'Nobody know'
  }</p>
   </div>
   </a>
   </li>`
      )
      .join('');

    // Running render function
    renderFoo(filmCards, cardListEl);
    return filmCards;
  }
}
