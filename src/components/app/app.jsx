import React from 'react';
import PropTypes from 'prop-types';
import {reviewPropType, offerPropType} from '../../prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import MainScreen from '../main-screen/main-screen';
import SignInScreen from '../sign-in-screen/sign-in-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import OfferScreen from '../offer-screen/offer-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';


const App = (props) => {
  const {currentCity, offers, reviews} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainScreen currentCity={currentCity} offers={offers.filter((offer) => offer.city.name === currentCity)} />
        </Route>
        <Route exact path="/login">
          <SignInScreen />
        </Route>
        <Route exact path="/favorites">
          <FavoritesScreen offers={offers.filter((offer) => offer.isFavorite)}/>
        </Route>
        <Route exact path="/offer/:id">
          <OfferScreen offers={offers} reviews={reviews} />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  currentCity: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(offerPropType),
  reviews: PropTypes.arrayOf(reviewPropType)
};

export default App;
