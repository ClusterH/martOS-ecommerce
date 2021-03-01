// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authApiURI: 'http://51.140.48.107:8080/api',
  dataStoreApiURI: 'http://23.100.50.205:5000/api',
  dataOrderApiURI: 'http://23.100.50.205:10000/api',
  storageApiURI: 'http://23.100.50.205:7070/api',
  paymentApiURI: 'http://23.100.50.205:6090/api',
  calendarApiURI: 'http://23.100.50.205:4040/api',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
