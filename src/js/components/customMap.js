export const initCustomMap = async (container) => {
  const { mapLat, mapLng } = container.dataset;

  const mapboxModule = await import("mapbox-gl");
  const mapboxgl = mapboxModule.default || mapboxModule;

  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const map = new mapboxgl.Map({
    container: container,
    style: "mapbox://styles/andrew-dreamer/cmvjd8tv300jm01s849gogpai",
    center: [parseFloat(mapLng), parseFloat(mapLat)],
    zoom: 12,
    cooperativeGestures: true,
  });

  if (window.innerWidth < 768) {
    map.setPadding({ right: 0 });
  } else {
    map.setPadding({ right: 450 });
  }

  map.addControl(new mapboxgl.FullscreenControl());
  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(
    new mapboxgl.ScaleControl({
      maxWidth: 80,
      unit: "metric",
    }),
  );

  new mapboxgl.Marker({
    color: "#6b1d2f",
  })
    .setLngLat([parseFloat(mapLng), parseFloat(mapLat)])
    .addTo(map);

  container.classList.add("_is-loaded");
};
