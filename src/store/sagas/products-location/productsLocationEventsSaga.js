import {call, put, take} from '@redux-saga/core/effects';
import {eventChannel} from 'redux-saga';
import {SystemEventsHandler} from '../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import {
  locateProductFinishedAction,
  mapProviderSetAction,
} from '../../actions/products-location/productsLocationActions';
import Services from '../../../services/Services';
import ProductsLocationServiceEventTypes from '../../../services/products-location/data/event-types/ProductsLocationServiceEventTypes';

function createProductsLocationEventsSaga() {
  return eventChannel((emit) => {
    const mapProviderTypeSetHandler = ({
      mapProviderType,
      availableMapProviderTypes,
    }) => {
      emit(mapProviderSetAction({mapProviderType, availableMapProviderTypes}));
    };
    const locationUriSetHandler = ({locationUri}) => {
      emit(locateProductFinishedAction({locationUri}));
    };

    const productsLocationService = Services.get(
      Services.serviceTypes.PRODUCTS_LOCATION,
    );

    const mapProviderSetUnsubscribe = productsLocationService.subscribe({
      event: ProductsLocationServiceEventTypes.MAP_PROVIDER_SET,
      handler: mapProviderTypeSetHandler,
    });
    const locationUriSetUnsubscribe = productsLocationService.subscribe({
      event: ProductsLocationServiceEventTypes.LOCATION_URI_SET,
      handler: locationUriSetHandler,
    });

    return () => {
      mapProviderSetUnsubscribe();
      locationUriSetUnsubscribe();
    };
  });
}

function* productsLocationEventsSaga() {
  SystemEventsHandler.onInfo({info: 'productsLocationEventsSaga()'});

  const channel = yield call(createProductsLocationEventsSaga);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default productsLocationEventsSaga;
