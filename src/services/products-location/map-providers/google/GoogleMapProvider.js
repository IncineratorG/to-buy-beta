// import {MapProviderTypes} from '../types/MapProvidresTypes';
// import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
//
// class GoogleMapProvider {
//   static getType() {
//     return MapProviderTypes.GOOGLE;
//   }
//
//   static buildUri({longitude, latitude, productName}) {
//     SystemEventsHandler.onInfo({
//       info:
//         'GoogleMapProvider->buildUri(): ' +
//         latitude +
//         ' - ' +
//         longitude +
//         ' - ' +
//         productName,
//     });
//
//     const mapsUri = 'https://www.google.ru/maps/';
//     const searchRequest = 'search/' + productName + '/';
//     const coordinates = '@' + latitude + ',' + longitude;
//     const scale = ',16z';
//
//     const uri = mapsUri + searchRequest + coordinates + scale;
//     return uri;
//
//     // return 'https://www.google.ru/maps/search/продукты/@55.8582305,37.4200327,16z';
//   }
// }
//
// export default GoogleMapProvider;
