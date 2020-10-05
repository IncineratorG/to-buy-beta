import {
  ADD_UNIT_BEGIN,
  ADD_UNIT_ERROR,
  ADD_UNIT_FINISHED,
  LOAD_UNITS_BEGIN,
  LOAD_UNITS_ERROR,
  LOAD_UNITS_FINISHED,
  REMOVE_UNIT_BEGIN,
  REMOVE_UNIT_ERROR,
  REMOVE_UNIT_FINISHED,
  UPDATE_UNIT_BEGIN,
  UPDATE_UNIT_ERROR,
  UPDATE_UNIT_FINISHED,
} from '../../types/units/unitsTypes';
import {SystemEventsHandler} from '../../../utils/common/service-utils/system-events-handler/SystemEventsHandler';
import unitsComparator from './helpers/unitsComparator';

const initialState = {
  units: {
    all: {
      list: [],
      map: new Map(),
    },
    active: {
      list: [],
      map: new Map(),
    },
    loading: false,
    error: {
      hasError: false,
      description: '',
    },
    addUnit: {
      error: {
        hasError: false,
        description: '',
      },
    },
    updateUnit: {
      error: {
        hasError: false,
        description: '',
      },
    },
    removeUnit: {
      error: {
        hasError: false,
        description: '',
      },
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

      const allUnitsList = [...action.payload.units];
      const activeUnitsList = allUnitsList.filter((u) => !u.deleted);
      activeUnitsList.sort(unitsComparator);

      const allUnitsMap = new Map();
      const activeUnitsMap = new Map();

      allUnitsList.forEach((u) => {
        allUnitsMap.set(u.id, u);
        if (!u.deleted) {
          activeUnitsMap.set(u.id, u);
        }
      });

      return {
        ...state,
        units: {
          ...state.units,
          all: {
            ...state.units.all,
            list: allUnitsList,
            map: allUnitsMap,
          },
          active: {
            ...state.units.active,
            list: activeUnitsList,
            map: activeUnitsMap,
          },
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

    case ADD_UNIT_BEGIN: {
      return {
        ...state,
        units: {
          ...state.units,
          addUnit: {
            ...state.units.addUnit,
            error: {
              hasError: false,
              description: '',
            },
          },
        },
      };
    }

    case ADD_UNIT_FINISHED: {
      const unit = {...action.payload.unit};

      const allUnitsList = [...state.units.all.list, unit];
      const activeUnitsList = allUnitsList.filter((c) => !c.deleted);
      activeUnitsList.sort(unitsComparator);

      const allUnitsMap = new Map();
      const activeUnitsMap = new Map();

      allUnitsList.forEach((u) => {
        allUnitsMap.set(u.id, u);
        if (!u.deleted) {
          activeUnitsMap.set(u.id, u);
        }
      });

      return {
        ...state,
        units: {
          ...state.units,
          all: {
            ...state.units.all,
            list: allUnitsList,
            map: allUnitsMap,
          },
          active: {
            ...state.units.active,
            list: activeUnitsList,
            map: activeUnitsMap,
          },
          addUnit: {
            ...state.units.addUnit,
            error: {
              hasError: false,
              description: '',
            },
          },
        },
      };
    }

    case ADD_UNIT_ERROR: {
      return {
        ...state,
        units: {
          ...state.units,
          addUnit: {
            ...state.units.addUnit,
            error: {
              hasError: true,
              description: action.payload.error.description,
            },
          },
        },
      };
    }

    case UPDATE_UNIT_BEGIN: {
      return {
        ...state,
        units: {
          ...state.units,
          updateUnit: {
            ...state.units.updateUnit,
            error: {
              hasError: false,
              description: '',
            },
          },
        },
      };
    }

    case UPDATE_UNIT_FINISHED: {
      const updatedUnit = {...action.payload.unit};

      const allUnitsList = state.units.all.list.filter(
        (u) => u.id !== updatedUnit.id,
      );
      allUnitsList.push(updatedUnit);
      const activeUnitsList = allUnitsList.filter((u) => !u.deleted);
      activeUnitsList.sort(unitsComparator);

      const allUnitsMap = new Map();
      const activeUnitsMap = new Map();

      allUnitsList.forEach((u) => {
        allUnitsMap.set(u.id, u);
        if (!u.deleted) {
          activeUnitsMap.set(u.id, u);
        }
      });

      return {
        ...state,
        units: {
          ...state.units,
          all: {
            ...state.units.all,
            list: allUnitsList,
            map: allUnitsMap,
          },
          active: {
            ...state.units.active,
            list: activeUnitsList,
            map: activeUnitsMap,
          },
          updatedUnit: {
            ...state.units.updateUnit,
            error: {
              hasError: false,
              description: '',
            },
          },
        },
      };
    }

    case UPDATE_UNIT_ERROR: {
      return {
        ...state,
        units: {
          ...state.units,
          updatedUnit: {
            ...state.units.updateUnit,
            error: {
              hasError: true,
              description: action.payload.error.description,
            },
          },
        },
      };
    }

    case REMOVE_UNIT_BEGIN: {
      return {
        ...state,
        units: {
          ...state.units,
          removeUnit: {
            ...state.units.removeUnit,
            error: {
              hasError: false,
              description: '',
            },
          },
        },
      };
    }

    case REMOVE_UNIT_FINISHED: {
      const removedUnit = {...action.payload.unit};

      const allUnitsList = state.units.all.list.filter(
        (u) => u.id !== removedUnit.id,
      );
      allUnitsList.push(removedUnit);

      const activeUnitsList = allUnitsList.filter((u) => !u.deleted);
      activeUnitsList.sort(unitsComparator);

      const allUnitsMap = new Map();
      const activeUnitsMap = new Map();

      allUnitsList.forEach((u) => {
        allUnitsMap.set(u.id, u);
        if (!u.deleted) {
          activeUnitsMap.set(u.id, u);
        }
      });

      return {
        ...state,
        units: {
          ...state.units,
          all: {
            ...state.units.all,
            list: allUnitsList,
            map: allUnitsMap,
          },
          active: {
            ...state.units.active,
            list: activeUnitsList,
            map: activeUnitsMap,
          },
          removedUnit: {
            ...state.units.removeUnit,
            error: {
              hasError: false,
              description: '',
            },
          },
        },
      };
    }

    case REMOVE_UNIT_ERROR: {
      return {
        ...state,
        units: {
          ...state.units,
          removedUnit: {
            ...state.units.removeUnit,
            error: {
              hasError: true,
              description: action.payload.error.description,
            },
          },
        },
      };
    }

    default: {
      return state;
    }
  }
};
