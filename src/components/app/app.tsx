import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import { MainPage } from '../../pages/main-page/main-page';
import { Favorites } from '../../pages/favorites/favorites';
import { Login } from '../../pages/login/login';
import { Offer } from '../../pages/offer/offer';
import { PageNotFound } from '../../pages/page-not-found/page-not-found';
import { PrivateRoute } from '../private-route/private-route';
import { OffersList, FullOffer, CityOffer } from '../../types/offer';
import { Review } from '../../types/review';


type AppMainPageProps = {
  rentalOffersCount :number;
  offersList: OffersList[];
  offers: FullOffer[];
  reviews: Review[];
  city: CityOffer;
}

function App({ rentalOffersCount, offersList, offers, reviews, city}: AppMainPageProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={ AppRoute.Main }
            element={<MainPage rentalOffersCount={ rentalOffersCount } offersList={ offersList } city={ city }/>}
          />
          <Route
            path={ AppRoute.Favorites }
            element={
              <PrivateRoute
                authorizationStatus={ AuthorizationStatus.Auth }
              >
                <Favorites offersList={ offersList }/>

              </PrivateRoute>
            }
          />
          <Route
            path={ AppRoute.Login }
            element={ <Login /> }
          />
          <Route path={ `${AppRoute.Offer}/:id` } element={ <Offer offers={ offers } reviews={ reviews }/> } />
          <Route
            path="*"
            element={ <PageNotFound />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>

  );
}

export { App };
