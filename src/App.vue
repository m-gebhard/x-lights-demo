<template>
    <div class="app" id="app">
        <div class="content-window">
            <navigation></navigation>
            <router-view></router-view>
        </div>

        <room-modal></room-modal>
        <preset-modal></preset-modal>

        <div :style="modalOverlayStyle"
             class="modal-overlay">
        </div>

        <notifications width="100%"
                       position="top"
                       classes="notification"
                       group="notifications">
        </notifications>
    </div>
</template>

<script>
    import { mapActions, mapGetters }             from 'vuex';
    import Navigation                             from './components/layout/Navigation';
    import Modal                                  from './components/layout/Modal';
    import RoomModal                              from './components/Modals/RoomModal';
    import PresetModal                            from './components/Modals/PresetsModal';
    import CustomInput                            from './components/CustomInput';

    export default {
        components: { CustomInput, PresetModal, RoomModal, Modal, Navigation },
        data() {
            return {
                isInitialized: true,
            };
        },
        computed:   {
            ...mapGetters([
                'getStripes',
                'isAnyModalOpened',
                'getLanguage',
                'getSelectedTheme',
            ]),

            modalOverlayStyle() {
                const isOpen = this.isAnyModalOpened;

                return {
                    opacity:       isOpen ? 0.75 : 0,
                    visibility:    isOpen ? 'visible' : 'invisible',
                    pointerEvents: isOpen ? 'initial' : 'none',
                };
            },
        },
        methods:    {
            ...mapActions([
                'updateTheme',
                'resetModes',
            ]),
        },
        created() {
            this.updateTheme(this.getSelectedTheme);
        },
        mounted() {
            this.$i18n.locale = this.getLanguage;
        },
        watch:      {
            '$route.path'() {
                this.resetModes();
            },
            isAnyModalOpened(openState) {
                if (openState) {
                    document.body.style.overflowY = 'hidden';
                } else {
                    document.body.style.overflowY = 'scroll';
                }
            },
        },
    };
</script>
