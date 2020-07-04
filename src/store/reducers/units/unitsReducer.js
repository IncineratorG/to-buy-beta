import {
  LOAD_UNITS_BEGIN,
  LOAD_UNITS_ERROR,
  LOAD_UNITS_FINISHED,
} from '../../types/units/unitsTypes';
import {SystemEventsHandler} from '../../../services/service-utils/system-events-handler/SystemEventsHandler';

const initialState = {
  units: {
    list: [],
    map: new Map(),
    loading: false,
    error: {
      hasError: false,
      description: '',
    },
  },
};

export const unitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_UNITS_BEGIN: {
      SystemEventsHandler.onInfo({
        info: 'unitsReducer()->LOAD_UNITS_BEGIN',
      });

      return {
        ...state,
        units: {
          ...state.units,
          loading: true,
          error: {
            hasError: false,
            description: '',
          },
        },
      };
    }

    case LOAD_UNITS_FINISHED: {
      SystemEventsHandler.onInfo({
        info: 'unitsReducer()->LOAD_UNITS_FINISHED',
      });

      const unitsList = [...action.payload.units];
      const unitsMap = new Map();
      unitsList.forEach((u) => unitsMap.set(u.id, u));

      return {
        ...state,
        units: {
          ...state.units,
          list: unitsList,
          map: unitsMap,
          loading: false,
          error: {
            hasError: false,
            description: '',
          },
        },
      };
    }

    case LOAD_UNITS_ERROR: {
      SystemEventsHandler.onInfo({
        info: 'unitsReducer()->LOAD_UNITS_ERROR',
      });

      return {
        ...state,
        units: {
          ...state.units,
          loading: false,
          error: {
            hasError: true,
            description: action.payload.error.description,
          },
        },
      };
    }

    default: {
      return state;
    }
  }
};
