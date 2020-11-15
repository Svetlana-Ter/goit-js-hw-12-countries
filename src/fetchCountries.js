import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { info } from '@pnotify/core';

const BASE_URL = 'https://restcountries.eu/rest/v2';
export default function fetchCountry(name) {
  const url = `${BASE_URL}/name/${name}`;
  return fetch(url).then(response => {
    return response.json()
  }).catch(er => {
    info({
    title: 'Write county name!',
  });
  })
}
