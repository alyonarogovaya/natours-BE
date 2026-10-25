const mapElement = document.querySelector('#map');
const locations = JSON.parse(mapElement.dataset.locations);
mapboxgl.accessToken = mapElement.dataset.token;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/alyonarogovaya/cmvnsmavr00un01pl3n0nbz5y',
  scrollZoom: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((location) => {
  const el = document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(location.coordinates)
    .addTo(map);

  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(location.coordinates)
    .setHTML(`<p>Day ${location.day}: ${location.description}</p>`)
    .addTo(map);

  bounds.extend(location.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});

map.on('style.load', () => {
  map.setFog({});
});
