import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {
  shareProductsListViaSmsBeginAction,
  shareProductsListViaSmsErrorAction,
  shareProductsListViaSmsFinishedAction,
} from '../../../actions/share/shareActions';

function* ss_shareProductsListViaSmsHandler(action) {
  const {productsListTextForm} = action.payload;

  SystemEventsHandler.onInfo({
    info: 'ss_shareProductsListViaSmsHandler(): ' + productsListTextForm,
  });

  yield put(shareProductsListViaSmsBeginAction());

  try {
    const shareService = Services.get(Services.serviceTypes.SHARE);
    yield call(shareService.shareViaSms, {text: productsListTextForm});
    yield put(shareProductsListViaSmsFinishedAction());
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'ss_shareProductsListViaSmsHandler()->ERROR: ' + e,
    });
    yield put(shareProductsListViaSmsErrorAction({description: e.toString()}));
  }
}

export default ss_shareProductsListViaSmsHandler;
