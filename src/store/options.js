import THEMES from './../utils/themes';

export default {
    state:     {
        offlineStripeBackgroundEnabled: true,
        showStripesAsSquares:           false,
        language:                       'en',
        theme:                          0,
    },
    mutations: {
        SET_STRIPE_BACKGROUND_OFFLINE_STATE(state, value) {
            state.offlineStripeBackgroundEnabled = value;
        },
        SET_STRIPE_AS_SQUARE_STATE(state, value) {
            state.showStripesAsSquares = value;
        },
        SET_LANGUAGE(state, lang) {
            state.language = lang;
        },
        SET_THEME(state, theme) {
            state.theme = theme;
        },
    },
    actions:   {
        setStripeBackgroundOfflineState({ commit }, value) {
            commit('SET_STRIPE_BACKGROUND_OFFLINE_STATE', value);
        },
        setStripeAsSquareState({ commit }, value) {
            commit('SET_STRIPE_AS_SQUARE_STATE', value);
        },
        setLanguage({ commit }, lang) {
            commit('SET_LANGUAGE', lang);
        },
        updateTheme({ commit }, theme) {
            const selectedTheme = THEMES[theme];
            const html          = document.documentElement;

            if (selectedTheme) {
                Object.keys(selectedTheme).forEach((property) => {
                    if (property === 'name') return;
                    html.style.setProperty(property, selectedTheme[property]);
                });
                commit('SET_THEME', theme);
            }
        },
        updateUserOptions({ commit }, options) {
            commit('SET_STRIPE_BACKGROUND_OFFLINE_STATE', options.stripOfflineBackground);
            commit('SET_STRIPE_AS_SQUARE_STATE', options.stripsAsSquares);
            commit('SET_LANGUAGE', options.lang);
        },
    },
    getters:   {
        getSelectedTheme:                 state => state.theme,
        getLanguage:                      state => state.language,
        showStripesAsSquares:             state => state.showStripesAsSquares,
        isOfflineStripeBackgroundEnabled: state => state.offlineStripeBackgroundEnabled,
    },
};
