import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';

const initialState = {
  value: undefined,
};

export const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TEST_START': {
      SystemEventsHandler.onInfo({
        info: 'testReducer->TEST_START_ACTION',
      });
      // console.log('testReducer->TEST_START_ACTION');
      return state;
    }

    case 'TEST_FINISHED': {
      SystemEventsHandler.onInfo({
        info: 'testReducer->TEST_FINISHED_ACTION',
      });
      // console.log('testReducer->TEST_FINISHED_ACTION');

      const payload = action.payload;

      return {
        ...state,
        value: state.value ? state.value + payload.value : payload.value,
      };
    }

    case 'TEST_ERROR': {
      SystemEventsHandler.onInfo({
        info: 'testReducer->TEST_ERROR_ACTION',
      });
      // console.log('testReducer->TEST_ERROR_ACTION');
      return state;
    }

    default: {
      return state;
    }
  }
};
