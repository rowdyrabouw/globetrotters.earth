# globetrotters.earth

The website [globetrotters.earth](https://globetrotters.earth) shows the countries and places my girlfriend and/or I have visited.

Technologies used:

- PNPm
- 11ty
- Node with Express
- Google Places API
- Google Firestore
- Google Maps

## Setup

- `pnpm install`
- duplicate `.env.example` and rename it to `.env`
- set up a [Google Cloud project for Google Maps](https://developers.google.com/maps/documentation/javascript/cloud-setup)
- generate an API key and limit it to website(s)
- add the API key to GOOGLE_MAPS_API_KEY in `.env`
- set up a [Google Cloud Firestore database](https://firebase.google.com/docs/firestore/quickstart)
- add the credentials from `const firebaseConfig` (via Project Overview -> Project settings) to the FIREBASE\_ variables in `.env`

## .env

Next to the Google Maps API and Google Firebase credentials there are two extra variables.

### NODE_ENV

When set to `DEV` the admin page on [http://localhost:8080/admin/](http://localhost:8080/admin/) will be available to add countries and places to Firestore. For security reasons I only have this working locally.

When set to `PRD` analytics ([plausible.io](https://plausible.io/)) are enabled for domain . You can remove this in `src/_includes/layouts/base.njk`.

### FIRESTORE_DEV_MODE

When set to `false` the server part of this application will insert documents in the proper collection. When set to `true` it will save the documents into collection with the prefix `DUMMY_` for testing.

## Running the application

- `pnpm start` will start a server for saving documents and 11ty for the frontend
- `pnpm firestore` will retrieve the data from the Firestore database, create JSON files in `src/_data/` for reference and generate JS files in `src/assets/js/` to be used by Google Maps.

## Feedback

Feel free to reach out to me. I know the code has duplications at this point and could be refactored and restructured. Some day that will happen. :-)
