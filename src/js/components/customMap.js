
/**
 * Initializes an interactive Mapbox GL JS map instance using target container dataset attributes, custom styling, navigation controls, and a location marker.
 * 
 * 1. `initCustomMap` - Configures Mapbox access using Vite environment variables, instantiates the map with custom styles and controls at target coordinates, attaches a pin marker, and updates the loaded state.
 */
// starter
//import mapboxgl from "mapbox-gl";
 
export const initCustomMap = async (container) => {
  const { mapLat, mapLng } = container.dataset;

  const mapboxModule = await import("mapbox-gl");
  const mapboxgl = mapboxModule.default || mapboxModule;

  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const map = new mapboxgl.Map({
    container: container,
    style: "mapbox://styles/andrew-dreamer/cmsohob9k00sh01sabxf33rpc",
    center: [parseFloat(mapLng), parseFloat(mapLat)],
    zoom: 12,
    cooperativeGestures: true,
  });

  map.addControl(new mapboxgl.FullscreenControl());
  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(
    new mapboxgl.ScaleControl({
      maxWidth: 80,
      unit: "metric",
    }),
  );

  new mapboxgl.Marker({
    color: "#E5A51A",
  })
    .setLngLat([parseFloat(mapLng), parseFloat(mapLat)])
    .addTo(map);

  container.classList.add("_is-loaded");
};
