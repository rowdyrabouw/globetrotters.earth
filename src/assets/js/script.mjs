import { countries } from "./countries.js";
import { cities } from "./cities.js";
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

  let pin;
  for (const city of cities) {
    const pinRowdy = new PinElement({
      borderColor: "#FFFFFF",
      background: "#E74035",
      glyphColor: "#FFFFFF",
    });

    const pinRosita = new PinElement({
      borderColor: "#FFFFFF",
      background: "#49A1E8",
      glyphColor: "#FFFFFF",
    });

    const pinTogether = new PinElement({
      borderColor: "#366321",
      background: "#A6FF6F",
      glyphColor: "#366321",
    });

    const { name, visitedBy, latitude, longitude } = city;
    switch (visitedBy) {
      case 1:
        pin = pinRowdy;
        break;
      case 2:
        pin = pinRosita;
        break;
      case 3:
        pin = pinTogether;
        break;
    }
    new google.maps.marker.AdvancedMarkerElement({
      map,
      title: name,
      position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
      content: pin.element,
    });
  }
}

initMap();
