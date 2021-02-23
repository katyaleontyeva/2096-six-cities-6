import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './store/reducer';
import {ActionCreator} from './store/action';
import {checkAuth} from './store/api-actions';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {redirect} from './store/middlewares/redirect';

import App from './components/app/app';
import {AuthorizationStatus} from './const';

import reviews from './mocks/reviews'; // TODO: implement loading reviews on offer page

import {createAPI} from './services/api';

const api = createAPI(
    () => store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH))
);
const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect)
));

store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App reviews={reviews} />
    </Provider>,
    document.querySelector(`#root`)
);
