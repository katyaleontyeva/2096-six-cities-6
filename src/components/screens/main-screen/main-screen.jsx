import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {offerPropType} from '../../../prop-types';

import {useHistory, useLocation} from 'react-router-dom';

import {connect} from 'react-redux';
import {ActionCreator} from '../../../store/action';
import {getActiveCity, getSortedCityOffers} from '../../../store/main/selectors';

import Header from '../../header/header';
import CitiesList from '../../cities-list/cities-list';
import MainOffers from '../../main-offers/main-offers';
import MainEmpty from '../../main-empty/main-empty';

import {AppRoutes, Cities} from '../../../const';

import cn from 'classnames';


const MainScreen = (props) => {
  const {activeCity, cityOffers, onChangeCity} = props;

  const history = useHistory();
  const location = useLocation();
  const cityParam = new URLSearchParams(location.search).get(`city`);

  useEffect(() => {
    if (!cityParam) {
      history.push({
        pathname: AppRoutes.MAIN,
        search: `?city=${activeCity}`
      });
    }
    if (cityParam && cityParam !== activeCity) {
      onChangeCity(cityParam);
    }
  }, [cityParam]);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className={cn(`page__main page__main--index`, {'page__main--index-empty': !cityOffers.length})}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          {cityOffers.length ?
            <MainOffers offers={cityOffers} activeCity={activeCity} />
            :
            <MainEmpty activeCity={activeCity}/>
          }
        </div>
      </main>
    </div>
  );
};

MainScreen.propTypes = {
  activeCity: PropTypes.oneOf(Object.values(Cities)),
  cityOffers: PropTypes.arrayOf(offerPropType),
  onChangeCity: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  activeCity: getActiveCity(state),
  cityOffers: getSortedCityOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeCity(city) {
    dispatch(ActionCreator.changeCity(city));
  },
});

export {MainScreen};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
