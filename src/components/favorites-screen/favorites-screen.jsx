import React from 'react';

import PropTypes from 'prop-types';
import {offerPropType} from '../../prop-types';

import {Link} from 'react-router-dom';

import Header from '../header/header';
import Footer from '../footer/footer';
import OffersList from '../offers-list/offers-list';

import {cardTypes} from '../../const';

import classnames from 'classnames';


const FavoritesScreen = (props) => {
  const {offers} = props;
  const offersByCity = offers.reduce((acc, cur) => {
    acc[cur.city.name] = acc[cur.city.name] ? [...(acc[cur.city.name]), cur] : [cur];
    return acc;
  }, {});

  return (
    <div className={classnames(`page`, {'page--favorites-empty': !offers.length})}>
      <Header />

      <main className={classnames(`page__main page__main--favorites`, {'page__main--favorites-empty': !offers.length})}>
        <div className="page__favorites-container container">
          {offers.length ?
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(offersByCity).map(([city, savedOffers]) => {
                  return (
                    <li className="favorites__locations-items" key={city}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <Link className="locations__item-link" to={`/?city=${city}`}>
                            <span>{city}</span>
                          </Link>
                        </div>
                      </div>
                      <OffersList offers={savedOffers} cardType={cardTypes.FAVORITES}/>
                    </li>
                  );
                })}
              </ul>
            </section>
            :
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future
                  trips.</p>
              </div>
            </section>
          }
        </div>
      </main>

      <Footer />
    </div>
  );
};

FavoritesScreen.propTypes = {
  offers: PropTypes.arrayOf(offerPropType)
};

export default FavoritesScreen;
