import {
  RESTAURANTS_FAIL,
  RESTAURANTS_SUCCESS,
  RESTAURANTS_REQUEST,
  RESTAURANT_DETAILS_REQUEST,
  RESTAURANT_DETAILS_SUCCESS,
  RESTAURANT_DETAILS_FAIL,
} from '../types/types';

export const restaurantsReducer = (
  action: any,
  state = {
    loading: true,
    restaurants: [],
    pages: 0,
    error: null,
  }
) => {
  switch (action.type) {
    case RESTAURANTS_REQUEST:
      return { ...state, loading: true };
    case RESTAURANTS_SUCCESS:
      return {
        loading: false,
        restaurants: action.payload.restaurants,
        pages: action.payload.pages,
        error: null,
      };
    case RESTAURANTS_FAIL:
      return {
        loading: false,
        restaurants: [],
        pages: 0,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const restaurantDetailsReducer = (
  action: any,
  state = {
    loading: true,
    restaurant: null,
    error: null,
  }
) => {
  switch (action.type) {
    case RESTAURANT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case RESTAURANT_DETAILS_SUCCESS:
      return {
        loading: false,
        restaurant: action.payload,
      };
    case RESTAURANT_DETAILS_FAIL:
      return {
        loading: false,
        restaurant: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
