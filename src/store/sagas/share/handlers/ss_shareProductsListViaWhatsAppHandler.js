import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../services/service-utils/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import {
  shareProductsListViaWhatsAppBeginAction,
  shareProductsListViaWhatsAppErrorAction,
  shareProductsListViaWhatsAppFinishedAction,
} from '../../../actions/share/shareActions';

function* ss_shareProductsListViaWhatsAppHandler(action) {
  const {productsListTextForm} = action.payload;

  yield put(shareProductsListViaWhatsAppBeginAction());

  try {
    const shareService = Services.get(Services.serviceTypes.SHARE);
    yield call(shareService.shareViaWhatsApp, {text: productsListTextForm});
    yield put(shareProductsListViaWhatsAppFinishedAction());
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'ss_shareProductsListViaSmsHandler()->ERROR: ' + e,
    });
    yield put(
      shareProductsListViaWhatsAppErrorAction({description: e.toString()}),
    );
  }
}

export default ss_shareProductsListViaWhatsAppHandler;
