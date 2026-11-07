import { login, logout } from './login';
import { displayMap } from './mapbox';

const mapElement = document.querySelector('#map');
const form = document.querySelector('.form');
const logoutButton = document.querySelector('.nav__el--logout');

if (mapElement) {
  const locations = JSON.parse(mapElement.dataset.locations);
  mapboxgl.accessToken = mapElement.dataset.token;
  displayMap(locations);
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    login(email, password);
  });
}

if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}
