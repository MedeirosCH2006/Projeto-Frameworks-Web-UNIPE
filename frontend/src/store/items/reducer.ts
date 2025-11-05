// items/reducer.ts

import { ItemsState, ItemsAction, ItemsActionTypes } from './types';

const initialState: ItemsState = {
  list: [],
  loading: false,
  error: null,
};

export function itemsReducer(
  state: ItemsState = initialState,
  action: ItemsAction
): ItemsState {
  switch (action.type) {
    case ItemsActionTypes.FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ItemsActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
        error: null,
      };

    case ItemsActionTypes.FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ItemsActionTypes.ADD_ITEM:
      return {
        ...state,
        list: [...state.list, action.payload],
      };

    case ItemsActionTypes.DELETE_ITEM:
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload),
      };

    default:
      return state;
  }
}
