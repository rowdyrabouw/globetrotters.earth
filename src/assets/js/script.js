import { countries } from "./countries.js";

import { mapStyles } from "./mapStyles.js";

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const map = new Map(document.getElementById("map"), {
    center: { lat: 40, lng: 0 },
    zoom: 3,
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
}

initMap();
