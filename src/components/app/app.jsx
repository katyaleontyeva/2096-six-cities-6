import React from 'react';
import PropTypes from 'prop-types';
import {reviewPropType} from '../../prop-types';
import {Router as BrowserRouter, Switch, Route} from 'react-router-dom';

import MainScreen from '../screens/main-screen/main-screen';
import SignInScreen from '../screens/sign-in-screen/sign-in-screen';
import FavoritesScreen from '../screens/favorites-screen/favorites-screen';
import OfferScreenContainer from '../screens/offer-screen/offer-screen-container';
import NotFoundScreen from '../screens/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';

import {AppRoutes} from '../../const';
import browserHistory from '../../browser-history';


const App = () => {

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoutes.MAIN}>
          <MainScreen />
        </Route>
        <Route exact path={AppRoutes.LOGIN}>
          <SignInScreen />
        </Route>
        <Route exact path={AppRoutes.OFFER}>
          <OfferScreenContainer />
        </Route>
        <PrivateRoute exact path={AppRoutes.FAVORITES} render={() => <FavoritesScreen />} />
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  reviews: PropTypes.arrayOf(reviewPropType)
};

export default App;
