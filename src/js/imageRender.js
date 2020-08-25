import imageTemplate from '../imageTemplate.hbs';
import apiService from './apiService';
import * as basicLightbox from 'basiclightbox';
import PNotify from 'pnotify/dist/es/PNotify.js';


const refs = {
    inputSearch: document.querySelector('input'),
    searchForm: document.querySelector('#search-form'),
    ul: document.querySelector('.gallery'),
    li: document.querySelector('.list-item'),
    body: document.querySelector('body'),
    loadMoreBtn: document.querySelector('.load-button'),
};
refs.searchForm.addEventListener('submit', imageSearch);
refs.loadMoreBtn.addEventListener('click', loadMore);
refs.loadMoreBtn.addEventListener('click', scroll);
refs.ul.addEventListener('click', modal);

function imageRender(images) {
    refs.ul.insertAdjacentHTML('beforeend', imageTemplate(images));
}
function imageSearch(e) {
    e.preventDefault();
    const input = event.target.value;
    clearMarkup();
    apiService.resetPage();
    apiService.searchQuery = input.value;
    apiServices(input.value);
    input.value = '';
}
function scroll() {
    setTimeout(() => {
        window.scrollTo({
            top: +window.scrollY + 700,
            behavior: 'smooth',
        })
    }, 500)
}
function pnotifyInfo(images) {
    if(!images.length) {
        PNotify.defaults.icons = 'material';
        PNotify.error({
            title: 'Oops!',
            text: 'Nothing found',
            delay: 2000,
        });
    } else {
        imageRender(images);
    }
}
function loadMore(input) {
    apiService
    .apiService(input)
    .then(images => pnotifyInfo(images))
    .catch(error => console.log(error))
}
function clearMarkup() {
    refs.ul.innerHTML = '';
}

function apiServices(input) {
    apiService
    .apiService(input)
    .then(images => {
        pnotifyInfo(images)
    }).catch(error => console.log(error))
}

function modal(e) {
    if(!e.target.dataset.source) {
        return;
    } else {
        const instance = basicLightbox.create(
            `<img src=${e.target.dataset.source} width="800" height="600">`
        )
        instance.show()
    }
}