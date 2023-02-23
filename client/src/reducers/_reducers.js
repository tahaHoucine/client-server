import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import sessionReducer from 'reducers/session-reducer';
import configReducer from 'reducers/config-reducer';
import modalReducer from 'reducers/modal-reducer';
import articlesReducer from 'reducers/articles-reducer';
import adminDataReducer from 'reducers/admin-data-reducer';

export default combineReducers({
    session: sessionReducer,
    config: configReducer,
    modal: modalReducer,
    articles: articlesReducer,
    adminData: adminDataReducer,
    routing: routerReducer
});