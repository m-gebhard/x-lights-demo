<template>
    <div class="stripes-overview content-window__mask" :class="classes">
        <stripes-overview-header :isAddingEnabled="isAddingEnabled"
                                 :onOrderConfigClick="toggleDragMode"
                                 :onTrashcanClick="toggleBulDeleteMode"
                                 :onAddClick="addNewRoom"
                                 :onSaveClick="saveStripeData">
        </stripes-overview-header>

        <div class="stripes-overview__room-wrapper">
            <template v-for="room in getRooms">
                <collapsible transparent="true"
                             noPadding="true"
                             :initiallyOpen="getInitiallyOpenState(room.id)">
                    <template slot="head">
                        <div class="stripes-overview__list-item">
                            <div class="stripes-overview__list-item-head">
                                    <span v-html="room.name"
                                          class="stripes-overview__room-title">
                                    </span>
                                <span v-if="(!isRoomOff(room.id) && !getSyncStatus) || getSyncMasterRoom.id === room.id"
                                      v-html="getRoomMode(room.id)"
                                      class="stripes-overview__mode-title">
                                    </span>
                            </div>
                            <div class="stripes-overview__power-button"
                                 :class="powerButtonClasses(room.id)">

                                <font-awesome-icon v-if="showSyncIconForRoomId(room.id)"
                                                   icon="sync">
                                </font-awesome-icon>
                                <font-awesome-icon v-else icon="power-off"></font-awesome-icon>
                            </div>
                        </div>
                    </template>
                    <template v-if="getStripesByRoomId(room.id).length > 0">
                        <transition-group class="stripes-overview__list"
                                          name="list"
                                          tag="div">

                            <stripe-teaser v-for="stripe in getOrderedStripes(room.id)"
                                           :key="`room_${room.id}-${stripe.id}`"
                                           :stripe="stripe"
                                           :miniTeaser="showStripesAsSquares"
                                           :isOnline="getStripeOnlineStatus(stripe.id)">
                            </stripe-teaser>
                        </transition-group>
                    </template>
                    <div v-else v-html="$t('stripesOverView.noRoomEntries')"
                         class="stripe-detail-view__sensor-list--empty">
                    </div>
                </collapsible>
            </template>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import Vue2Filters                from 'vue2-filters';
    import StripeTeaser               from '../components/StripeTeaser';
    import StripesOverviewHeader      from '../components/StripesOverViewHeader';
    import {
        NOTIFICATIONS_GROUP,
        ROOM_MODAL_KEY,
    }                                 from './../utils/constants';
    import Collapsible                from '../components/Collapsible';

    export default {
        components: { Collapsible, StripesOverviewHeader, StripeTeaser },
        mixins:     [Vue2Filters.mixin],
        data() {
            return {
                isDraggingEnabled:  false,
                isInBulkDeleteMode: false,
            };
        },
        computed:   {
            ...mapGetters([
                'getRooms',
                'getStripes',
                'getBulkDeleteMode',
                'getDragMode',
                'getStripeOnlineStatus',
                'getStripesByRoomId',
                'getOnlineStripeIds',
                'showStripesAsSquares',
                'getLedConfigByRoomId',
                'getAvailableModes',
                'getAllLedConfigs',
                'getSyncStatus',
                'getLeds',
            ]),

            isAddingEnabled() {
                return false;
            },
            classes() {
                return {
                    ['stripes-overview--mini-teasers']: this.showStripesAsSquares,
                };
            },
            getSyncMasterRoom() {
                const rooms = this.getRooms;
                return rooms[rooms.findIndex((_room) => _room.id === Math.min(...rooms.map((_r) => _r.id)))];
            },
        },
        methods:    {
            ...mapActions([
                'setBulkDeleteModeState',
                'setDragModeState',
                'setModalOpenState',
                'resetModes',
                'updateRoomConfig',
                'setSyncStatus',
            ]),

            getInitiallyOpenState(roomId) {
                const stripes         = this.getStripesByRoomId(roomId);
                const onlineStripeIds = this.getOnlineStripeIds;

                return stripes.filter((_stripe) => onlineStripeIds.indexOf(_stripe.id) !== -1).length > 0;
            },
            addNewRoom() {
                this.setModalOpenState({
                    key:       ROOM_MODAL_KEY,
                    openState: true,
                });
            },
            saveStripeData() {
                this.resetModes();

                this.$notify({
                    group: NOTIFICATIONS_GROUP,
                    type:  'success',
                    title: this.$t('notifications.updateStripes.success.title'),
                    text:  this.$t('notifications.updateStripes.success.message'),
                });
            },
            toggleDragMode() {
                const oldState = this.getDragMode;
                this.resetModes();

                if (oldState === this.getDragMode) {
                    this.setDragModeState(true);
                } else {
                    this.setDragModeState(false);
                }
            },
            toggleBulDeleteMode() {
                const oldState = this.getBulkDeleteMode;
                this.resetModes();

                if (oldState === this.getBulkDeleteMode) {
                    this.setBulkDeleteModeState(true);
                } else {
                    this.setBulkDeleteModeState(false);
                }
            },
            getOrderedStripes(roomId) {
                const allStripes     = this.getStripesByRoomId(roomId);
                const onlineStripes  = allStripes.filter((_stripe) =>
                    this.getStripeOnlineStatus(_stripe.id) && !_stripe.disabled);
                const offlineStripes = allStripes.filter((_stripe) =>
                    !this.getStripeOnlineStatus(_stripe.id) || _stripe.disabled);

                return [
                    ...onlineStripes.sort((_a, _b) => _a.position - _b.position),
                    ...offlineStripes.sort((_a, _b) => _a.position - _b.position),
                ];
            },
            getRoomMode(roomId) {
                const allModes = this.getAvailableModes;
                const config   = this.getLedConfigByRoomId(roomId);

                const name = Object.keys(allModes)[config.mode + 1];

                return name && name !== 'OFF' ? name : '<br>';
            },
            isRoomOff(roomId) {
                return this.getLedConfigByRoomId(roomId).mode === -1;
            },
            showSyncIconForRoomId(roomId) {
                return this.getSyncStatus && this.getSyncMasterRoom.id !== roomId;
            },
            powerButtonClasses(roomId) {
                return {
                    'stripes-overview__power-button--on':       !this.isRoomOff(roomId) || (this.getSyncStatus && !this.isRoomOff(roomId)),
                    'stripes-overview__power-button--disabled': this.getSyncStatus && this.getSyncMasterRoom.id !== roomId,
                };
            },
        },
    };
</script>
