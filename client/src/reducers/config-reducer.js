import _ from 'lodash';

import Reducer from 'reducers/reducer';
import sessionStore from 'lib-app/session-store';

class ConfigReducer extends Reducer {

    getInitialState() {
        return {
            language: sessionStore.getItem('language'),
            initDone: false,
            installedDone: false,
            installed: false
        };
    }

    getTypeHandlers() {
        return {
            'CHANGE_LANGUAGE': this.onLanguageChange,
            'INIT_CONFIGS_FULFILLED': this.onInitConfigs,
            'CHECK_INSTALLATION_FULFILLED': this.onInstallationChecked,
            'UPDATE_DATA_FULFILLED': this.onInitConfigs
        };
    }

    onLanguageChange(state, payload) {
        sessionStore.setItem('language', payload);

        return _.extend({}, state, {
            language: payload
        });
    }

    onInitConfigs(state, payload) {
        const currentLanguage = sessionStore.getItem('language');

        sessionStore.storeConfigs(_.extend({}, payload.data, {
            language: currentLanguage || payload.language
        }));

        return _.extend({}, state, payload.data, {
            language: currentLanguage || payload.language,
            registration: !!(payload.data.registration * 1),
            'user-system-enabled': !!(payload.data['user-system-enabled']* 1),
            'allow-attachments': !!(payload.data['allow-attachments']* 1),
            'maintenance-mode': !!(payload.data['maintenance-mode']* 1),
            initDone: true
        });
    }

    onInstallationChecked(state, payload) {
        return _.extend({}, state, {
            installedDone: true,
            installed: payload.data
        });
    }
}

export default ConfigReducer.getInstance();