export const _DEV = true

export const APP_CONSTANTS = {
  baseUrl: 'https://us-east1-dev-auction-store.cloudfunctions.net'
}

export const API_ENDPOINTS = {
  AUCTION: APP_CONSTANTS.baseUrl + '/auction',
  STATS: APP_CONSTANTS.baseUrl + '/stats',
  BID: APP_CONSTANTS.baseUrl + '/bid',
  SETTINGS: APP_CONSTANTS.baseUrl + '/settings',
  UPLOAD: APP_CONSTANTS.baseUrl + '/upload'
}
