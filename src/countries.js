import countryCardTemplate from './templates/country-card.hbs';
import countriesListTemplate from './templates/countries-list.hbs';
import fetchCountry from './fetchCountries';
import getRefs from './refs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
import { info } from '@pnotify/core';

const debounce = require('lodash.debounce');
const refs = getRefs();

refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();
  const nameValue = e.target.value;
  const name = nameValue.trim();

  fetchCountry(name)
    .then(countries => {
      clearCountriesContainers();
      if (countries.length === 1) {
        renderCountryCard(countries)
      } else if (countries.length >= 2 && countries.length <= 10) {
        renderCountriesList(countries)
      } else if (countries.length > 10) {
        error({
          title: 'Too many matches found!',
          text: 'Please enter a more specific query!'
        });
      } else if (countries.status === 404) {
        error({
          title: 'Not found! Try again!',
        });
      }
    }
    )
    .catch(onFetchError);

}

function renderCountryCard(country) {
  const markup = countryCardTemplate(country);
  refs.countryCardContainer.innerHTML = markup;
}

function renderCountriesList(countries) {
  const markup = countriesListTemplate(countries);
  refs.countriesListContainer.innerHTML = markup;
}

function onFetchError(er) {
  info({
    title: 'Write county name!',
  });
}

function clearCountriesContainers() {
  refs.countryCardContainer.innerHTML = '';
  refs.countriesListContainer.innerHTML = '';
}


