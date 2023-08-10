import { createReducer } from '@reduxjs/toolkit';
import { getCity } from '../utils';
import { changeCity, offersCityList, fullOffersList, reviewsList, requireAuthorization, setUserInfo, setError, setOffersDataLoadingStatus } from './action';
import { AuthorizationStatus, CITIES_LOCATION } from '../const';
import { CityOffer, FullOffer, OffersList } from '../types/offer';
import { Review } from '../types/review';
import { AuthorizationStatusType } from '../types/authorization-status';
import { UserData } from '../types/user-data';

export type InitialState = {
  city: CityOffer | undefined;
  offers: OffersList[];
  fullOffers: FullOffer[];
  reviews: Review[];
  authorizationStatus: AuthorizationStatusType;
  userInfo: UserData | null;
  error: string | null;
  isOffersDataLoading: boolean;
}

const defaultCity = getCity('Paris', CITIES_LOCATION);

const initialState : InitialState = {
  city: defaultCity,
  offers: [],
  fullOffers: [],
  reviews: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
  error: null,
  isOffersDataLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(offersCityList, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(fullOffersList, (state, action) => {
      state.fullOffers = action.payload;
    })
    .addCase(reviewsList, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.userInfo = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
