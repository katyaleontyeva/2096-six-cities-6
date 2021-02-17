import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {offerPropType} from '../../prop-types';

import OfferCard from '../offer-card/offer-card';

import {cardTypes} from '../../const';

import classnames from 'classnames';


const OffersList = (props) => {
  const {offers, cardType = cardTypes.MAIN} = props;
  const [activeCard, setActiveCard] = useState({});

  const handleMouseEnter = (selectedCard) => {
    setActiveCard(selectedCard);
  };

  const handleMouseLeave = () => {
    setActiveCard({});
  };

  return (
    <div className={classnames(
        `places__list`,
        {'cities__places-list tabs__content': cardType === cardTypes.MAIN},
        {'near-places__list': cardType === cardTypes.NEARBY},
        {'favorites__places': cardType === cardTypes.FAVORITES}
    )}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          cardType={cardType}
          isActive={activeCard.id === offer.id}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave} />
      ))}
    </div>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(offerPropType),
  cardType: PropTypes.oneOf(cardTypes)
};

export default OffersList;
