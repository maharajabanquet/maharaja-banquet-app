// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const LOCAL_PORT = '3000';
const LOCAL_HOST = `http://localhost:${LOCAL_PORT}`;
const LOCAL_MACHINE = `http://192.168.1.14:${LOCAL_PORT}`;
const PRODUCTION = 'http://maharajaraxaul.com/';
export const environment = {
  production: true,
  host: PRODUCTION
};
