import React from 'react';

import PropTypes from 'prop-types';
import {reviewPropType, offerPropType} from '../../prop-types';

import Header from '../header/header';
import OffersList from '../offers-list/offers-list';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewForm from '../review-form/review-form';
import Map from '../map/map';

import {CardTypes, OfferTypes} from '../../const';
import {getStarsWidth} from '../../utils';

import cn from 'classnames';


const OfferScreen = (props) => {
  const {offer, reviews, offersNearby, isAuthorized} = props;

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.images.slice(0, 6).map((image, i) => (
                <div className="property__image-wrapper" key={`image${i}`}>
                  <img className="property__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>

          <div className="property__container container">
            <div className="property__wrapper">
              {offer.isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">{offer.title}</h1>
                <button className={cn(`property__bookmark-button button`, {'property__bookmark-button--active': offer.isFavorite})} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${getStarsWidth(offer.rating)}`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.value}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">{OfferTypes[offer.type.toUpperCase()]}</li>
                <li className="property__feature property__feature--bedrooms">{offer.bedrooms} Bedrooms</li>
                <li className="property__feature property__feature--adults">Max {offer.maxAdults} adults</li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer.goods.map((item, i) => (
                    <li className="property__inside-item" key={`item${i}`}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={cn(`property__avatar-wrapper user__avatar-wrapper`, {'property__avatar-wrapper--pro': offer.host.isPro})}>
                    <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74"
                      alt="Host avatar" />
                  </div>
                  <span className="property__user-name">{offer.host.name}</span>
                </div>
                <div className="property__description">
                  <p className="property__text">{offer.description}</p>
                </div>
              </div>

              <section className="property__reviews reviews">
                <ReviewsList reviews={reviews} />
                {isAuthorized && <ReviewForm />}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map city={offer.city.location} points={offersNearby} />
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={offersNearby} cardType={CardTypes.NEARBY}/>
          </section>
        </div>
      </main>
    </div>
  );
};

OfferScreen.propTypes = {
  offer: offerPropType,
  offersNearby: PropTypes.arrayOf(offerPropType),
  reviews: PropTypes.arrayOf(reviewPropType),
  isAuthorized: PropTypes.bool
};

export default OfferScreen;
