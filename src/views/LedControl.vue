<template>
    <div class="led-control content-window__mask">
        <div class="led-control__room-selection">
            <h2 class="led-control__room-selection-title">
                {{ syncStatus ? $t('ledControlView.all') : getSelectedRoom.name }}
            </h2>
            <div class="led-control__room-selection-item led-control__room-selection-item--sync"
                 :class="{'led-control__room-selection-item--sync-active' : syncStatus}">
                <font-awesome-icon icon="sync"></font-awesome-icon>
            </div>
            <div class="led-control__room-list"
                 :class="{'led-control__room-list--extended' : !syncStatus}">
                <div v-for="(room) in getRooms"
                     :key="`led-control-room-teaser-#${room.id}`"
                     class="led-control__room-selection-item"
                     :class="{'led-control__room-selection-item--active' : room.id === selectedRoom}">
                    {{ getFormattedRoomName(room.name) }}
                </div>
            </div>
        </div>
        <form class="led-control__form"
              @submit.prevent="onSubmit">
            <div class="row">
                <custom-input v-model="mode"
                              :label="$t('ledControlView.mode')"
                              type="select"
                              :options="getAvailableModes">
                </custom-input>
            </div>

            <div class="row row--margin-top">
                <div v-if="showSpeedSlider"
                     class="column column--margin-right column--margin-bottom">
                    <custom-range-slider v-model="speed"
                                         min="0"
                                         max="750"
                                         step="10"
                                         usePercentageIndicator="true"
                                         :label="$t('ledControlView.speed')">
                    </custom-range-slider>
                </div>
                <div v-if="!showSpeedSlider"
                     class="column column--margin-right column--margin-bottom">
                </div>
                <div class="column">
                    <custom-range-slider v-model="brightness"
                                         min="0"
                                         max="255"
                                         step="5"
                                         usePercentageIndicator="true"
                                         :label="$t('ledControlView.brightness')">
                    </custom-range-slider>
                </div>
            </div>
            <div class="row row--mobile row--margin-top">
                <div class="column column--margin-right">
                    <custom-checkbox v-model="moving"
                                     :label="$t('ledControlView.moving')">
                    </custom-checkbox>
                </div>
                <div class="column">
                    <custom-checkbox v-model="fading"
                                     :label="$t('ledControlView.fading')">
                    </custom-checkbox>
                </div>
            </div>
            <div class="row">
                <gradient-editor :gradientPoints="gradientPoints"
                                 :enabledGradientPoints="getEnabledGradientPoints">
                </gradient-editor>
            </div>
            <div class="row row--no-margin">
                <button class="column">{{ $t('ledControlView.save') }}</button>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapGetters }    from 'vuex';
    import CustomInput       from '../components/CustomInput';
    import GradientEditor    from '../components/GradientEditor';
    import {
        LIGHT_MODES,
        NOTIFICATIONS_GROUP,
    }                        from './../utils/constants';
    import Collapsible       from '../components/Collapsible';
    import CustomCheckbox    from '../components/CustomCheckbox';
    import CustomRangeSlider from '../components/CustomRangeSlider';
    import TextDivider       from '../components/TextDivider';

    export default {
        name:       'home',
        components: {
            TextDivider,
            CustomRangeSlider,
            CustomCheckbox,
            Collapsible,
            GradientEditor,
            CustomInput
        },
        data() {
            return {
                mode:           2,
                speed:          600,
                minValue:       0,
                brightness:     102,
                gradientPoints: [],
                moving:         false,
                fading:         true,
                selectedRoom:   0,
                syncStatus:     false,
                isTouching:     false,
            };
        },
        computed:   {
            ...mapGetters([
                'getLeds',
                'getRooms',
                'getAllLedConfigs',
                'getGradientPoints',
                'getAvailableModes',
                'getSyncStatus',
                'getStripesByRoomId',
                'getLedConfigByRoomId',
            ]),

            getLightModes() {
                return this.getAvailableModes;
            },
            getEnabledGradientPoints() {
                switch (this.mode) {
                    case this.getLightModes.RAINBOW:
                    case this.getLightModes.EXAMPLE:
                    case this.getLightModes.OFF:
                        return [];
                    case this.getLightModes.SINGLE:
                        return [0];
                    case this.getLightModes.LIFE:
                    case this.getLightModes.MOVE:
                        const roomConfig = this.getSelectedRoomConfig;
                        return [0, roomConfig ? roomConfig.gradientPoints.length - 1 : 0];
                    default:
                        return this.getSelectedRoomConfig.gradientPoints.map((_point, i) => i);
                }
            },
            getSelectedRoom() {
                return this.getRooms.find((_room) => _room.id === this.selectedRoom);
            },
            getSelectedRoomConfig() {
                return this.getLedConfigByRoomId(this.selectedRoom);
            },
            showSpeedSlider() {
                const firstRoom = this.getRooms[this.getRooms.findIndex((_room) => _room.id === Math.min(...this.getRooms.map((_r) => _r.id)))];
                return this.selectedRoom === firstRoom.id;
            },
        },
        methods:    {
            onSubmit() {
                this.$notify({
                    group: NOTIFICATIONS_GROUP,
                    type:  'success',
                    title: this.$t('notifications.updateLeds.success.title'),
                    text:  this.$t('notifications.updateLeds.success.message'),
                });
            },
            getFormattedRoomName(name) {
                const words = name.split(' ');
                return words.map((word) => word[0].toUpperCase()).join('');
            },
        },
        mounted() {
            window.scrollTo(0, 0);
            this.gradientPoints = this.getGradientPoints;
        },
    };
</script>
