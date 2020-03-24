import Vue    from 'vue';
import Vuex   from 'vuex';
import THEMES from './../utils/themes';

// Modules
import presetsModule   from './presets';
import optionsModule   from './options';
import ledConfigModule from './ledConfig';

Vue.use(Vuex);

export default new Vuex.Store({
    modules:   {
        presetsModule,
        optionsModule,
        ledConfigModule,
    },
    state:     {
        log:             [],
        availableModes:  {
            'OFF':      -1,
            'SINGLE':   0,
            'RAINBOW':  1,
            'GRADIENT': 2
        },
        modals:          [],
        leds:            [],
        rooms:           [
            {
                id:       0,
                name:     'Demo Room',
                position: 0,
            }
        ],
        stripes:         [
            {
                id:                   '00:14:22:01:22:45',
                roomId:               0,
                icon:                 'cat',
                name:                 'Cats Waterbed',
                notes:                '',
                position:             0,
                ledCount:             50,
                disabled:             false,
                reversed:             false,
                brightnessAdjustment: 30,
            },
            {
                id:                   '62:13:37:01:3A:BB',
                roomId:               0,
                icon:                 'dog',
                name:                 'Doggos Treehouse',
                notes:                'My dog loves it 🐶',
                position:             1,
                ledCount:             100,
                disabled:             true,
                reversed:             false,
                brightnessAdjustment: 0,
            }],
        stripeRuntimes:  [{
            stripeId: '00:14:22:01:22:45',
            runtime: 352,
        }],
        draggingMode:    false,
        bulkDeleteMode:  false,
    },
    mutations: {
        SET_DRAGGING_MODE_STATE(state, mode) {
            state.draggingMode = mode;
        },
        SET_BULK_DELETE_MODE_STATE(state, mode) {
            state.bulkDeleteMode = mode;
        },
        RESET_MODES(state) {
            state.draggingMode   = false;
            state.bulkDeleteMode = false;
        },
        ADD_MODAL_OPEN_STATE(state, { key, openState, payload }) {
            state.modals.push({
                key,
                openState,
                payload,
            });
        },
        UPDATE_MODAL_STATE(state, { key, openState, payload }) {
            const modalToUpdate     = state.modals.find((m) => m.key === key);
            modalToUpdate.openState = openState;
            modalToUpdate.payload   = payload;
        },
    },
    actions:   {
        setModalOpenState({ commit, state }, options) {
            if (state.modals.find((m) => m.key === options.key)) {
                commit('UPDATE_MODAL_STATE', options);
            } else {
                commit('ADD_MODAL_OPEN_STATE', options);
            }
        },
        setBulkDeleteModeState({ commit }, state) {
            commit('SET_BULK_DELETE_MODE_STATE', state);
        },
        setDragModeState({ commit }, state) {
            commit('SET_DRAGGING_MODE_STATE', state);
        },
        resetModes({ commit }) {
            commit('RESET_MODES');
        },
    },
    getters:   {
        getLeds:                        state => state.leds,
        getOnlineStripeIds:             state => state.leds
            .map((_led) => _led.stripeId)
            .filter((_led) => _led !== -1),
        getStripeOnlineStatus:          (state, getters) => stripeId => getters.getOnlineStripeIds.indexOf(stripeId) !== -1,
        getStripes:                     state => state.stripes,
        getRooms:                       state => state.rooms,
        getStripesByRoomId:             state => roomId => state.stripes.filter((_stripe) => _stripe.roomId === roomId) || [],
        getStripeById:                  state => stripeId => state.stripes.find((_stripe) => _stripe.id === stripeId),
        getModal:                       state => key => {
            return state.modals.find((m) => m.key === key);
        },
        getModalOpenState:              state => key => {
            const obj = state.modals.find((m) => m.key === key);
            return obj ? obj.openState : false;
        },
        isAnyModalOpened:               state => state.modals.filter((_modal) => _modal.openState).length > 0,
        getDragMode:                    state => state.draggingMode,
        getBulkDeleteMode:              state => state.bulkDeleteMode,
        isInAnyEditMode:                state => (state.draggingMode || state.bulkDeleteMode),
        getAvailableModes:              state => state.availableModes,
        getStripeRuntime:               state => stripeId => {
            const runtime = state.stripeRuntimes.find((_stripe) => _stripe.stripeId === stripeId);
            return runtime ? runtime.runtime : 0;
        },
        getThemeColors:                 state => THEMES[state.optionsModule.theme],
    },
});
