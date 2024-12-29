import { countries } from "./countries.js";
import { mapStyles } from "./mapStyles.js";
const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const map = new Map(document.getElementById("map"), {
    center: { lat: 50, lng: 15 },
    zoom: 4,
    mapId: "498f42e161ed624e",
    options: `styles: ${mapStyles}`,
  });

  const countryFeatureLayer = map.getFeatureLayer(google.maps.FeatureType.COUNTRY);
  countryFeatureLayer.style = (featureStyleFunctionOptions) => {
    const placeFeature = featureStyleFunctionOptions.feature;
    const visitedBy = countries[placeFeature.placeId];

    let fillColor;
    switch (visitedBy) {
      case 1:
        fillColor = "red";
        break;
      case 2:
        fillColor = "blue";
        break;
      case 3:
        fillColor = "green";
        break;
      case 4:
        fillColor = "#FF6906";
        break;
    }
    return {
      fillColor,
      fillOpacity: 0.5,
    };
  };

  const rowdyLatLng = { lat: 54.6, lng: -5.9 };
  const pinRowdy = new PinElement({
    borderColor: "#FFFFFF",
    background: "#E74035",
    glyphColor: "#FFFFFF",
  });
  new google.maps.marker.AdvancedMarkerElement({
    position: rowdyLatLng,
    map,
    title: "Belfast",
    content: pinRowdy.element,
  });

  const rositaLatLng = { lat: 37.2, lng: -8.8 };
  const pinRosita = new PinElement({
    borderColor: "#FFFFFF",
    background: "#49A1E8",
    glyphColor: "#FFFFFF",
  });
  new google.maps.marker.AdvancedMarkerElement({
    position: rositaLatLng,
    map,
    title: "Aljezur",
    content: pinRosita.element,
  });

  const togetherLatLng = { lat: 48.86, lng: 2.34 };
  const pinTogether = new PinElement({
    borderColor: "#366321",
    background: "#A6FF6F",
    glyphColor: "#366321",
  });
  new google.maps.marker.AdvancedMarkerElement({
    position: togetherLatLng,
    map,
    title: "Paris",
    content: pinTogether.element,
  });
}

initMap();
