<template>
    <div class="stripe-detail-view content-window__mask">
        <div class="stripe-detail-view__header">
            <div class="stripe-detail-view__header-info">
                <div class="stripe-detail-view__online-status"
                     :class="{'stripe-detail-view__online-status--online': getOnlineStatus}">
                    {{ getOnlineStatus ? $t('ledDetailView.online') : $t('ledDetailView.offline') }}
                    <template v-if="getOnlineStatus">
                        [ {{ getStripeVersion }} ]
                    </template>
                </div>
                <div class="stripe-detail-view__id">
                    {{ getStripeId }}
                </div>
            </div>
            <router-link class="stripe-detail-view__close" to="/strips">
                <font-awesome-icon icon="times"></font-awesome-icon>
            </router-link>
        </div>

        <alert-box>
            {{ $t('alerts.demo') }}
        </alert-box>

        <text-divider>
            {{ $t('ledDetailView.general') }}
        </text-divider>
        <validation-observer tag="form"
                             v-slot="{ invalid }"
                             class="stripe-detail-view__form"
                             @submit.prevent="onSubmit">
            <div class="row">
                <custom-input v-model="inputRoom"
                              type="select"
                              :options="getAvailableRooms"
                              :label="$t('ledDetailView.room')">
                </custom-input>
            </div>
            <div class="row row--mobile">
                <div class="column column--margin-right">
                    <custom-input v-model="inputName"
                                  rules="required"
                                  :label="$t('ledDetailView.name')">
                    </custom-input>
                </div>
                <div class="column stripe-detail-view__form-stripe-icon"
                     @click.stop="onIconClick">
                    <font-awesome-icon :icon="inputIcon"></font-awesome-icon>
                    <icon-selector v-outside-click="closeIconSelector"
                                   :open="isIconSelectionOpened"
                                   @input="onIconChange">
                    </icon-selector>
                </div>
            </div>
            <div class="row">
                <custom-input v-model="inputNotes"
                              :label="$t('ledDetailView.notes')">
                </custom-input>
            </div>
            <text-divider>
                {{ $t('ledDetailView.config') }}
            </text-divider>
            <div class="row">
                <div class="column column--margin-right column--margin-bottom">
                    <custom-input v-model="inputLedCount"
                                  rules="required|numeric|min_value:1|max_value:300"
                                  :label="$t('ledDetailView.count')">
                    </custom-input>
                </div>
                <div class="column">
                    <custom-range-slider v-model="brightnessAdjustment"
                                         min="-100"
                                         max="100"
                                         step="5"
                                         :label="$t('ledDetailView.brightnessAdjustment')">
                    </custom-range-slider>
                </div>
            </div>
            <div class="row row--mobile">
                <div class="column column--margin-right">
                    <custom-checkbox v-model="inputIsReversed"
                                     :label="$t('ledDetailView.reversed')">
                    </custom-checkbox>
                </div>
                <div class="column">
                    <custom-checkbox v-model="inputIsDisabled"
                                     :label="$t('ledDetailView.disabled')">
                    </custom-checkbox>
                </div>
            </div>
            <div class="row row--margin-top">
                <button :disabled="invalid"
                        class="column">{{ $t('ledDetailView.save') }}
                </button>
            </div>
        </validation-observer>

        <text-divider>
            {{ $t('optionsView.debug') }}
        </text-divider>
        <collapsible :title="$t('modals.sensor.title')">
            <div v-html="$t('modals.sensor.noEntries')"
                 class="stripe-detail-view__sensor-list--empty">
            </div>
        </collapsible>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import CustomInput                from '../components/CustomInput';
    import Collapsible                from '../components/Collapsible';
    import { NOTIFICATIONS_GROUP }    from './../utils/constants';
    import CustomCheckbox             from '../components/CustomCheckbox';
    import CustomRangeSlider          from '../components/CustomRangeSlider';
    import AlertBox                   from '../components/AlertBox';
    import IconSelector               from '../components/IconSelector';
    import TextDivider                from '../components/TextDivider';

    export default {
        components: {
            TextDivider,
            IconSelector,
            AlertBox,
            CustomRangeSlider,
            CustomCheckbox,
            Collapsible,
            CustomInput
        },
        data() {
            return {
                inputName:             '',
                inputRoom:             '',
                inputNotes:            '',
                inputLedCount:         '',
                inputIcon:             '',
                inputIsDisabled:       false,
                inputIsReversed:       false,
                brightnessAdjustment:  0,
                isIconSelectionOpened: false,
            };
        },
        computed:   {
            ...mapGetters([
                'getLeds',
                'getRooms',
                'getStripes',
                'getStripeOnlineStatus',
                'getStripesByRoomId',
            ]),

            getStripe() {
                return this.getStripes.find((_stripe) => _stripe.id === this.getStripeId);
            },
            getStripeId() {
                const stripeId = this.$route.params.stripeId;

                return stripeId;
            },
            getStripeVersion() {
                return this.getStripe.version;
            },
            isOutdated() {
                return false;
            },
            getOnlineStatus() {
                return this.getStripeOnlineStatus(this.getStripeId);
            },
            getAvailableRooms() {
                let rooms = [];

                this.getRooms.forEach((_room) => {
                    rooms[_room.name] = _room.id;
                });
                return rooms;
            },
        },
        methods:    {
            ...mapActions(['setModalOpenState']),

            onSubmit() {
                if (!this.getStripeId) {
                    this.$router.push({ path: `/strips/${id}` });
                }

                this.getStripe.icon = this.inputIcon;

                const isNew = !this.getStripes.find((_stripe) => _stripe.id === this.getStripeId);

                if (isNew) {
                    this.$notify({
                        group: NOTIFICATIONS_GROUP,
                        type:  'success',
                        title: this.$t('notifications.updateNewStripe.success.title'),
                        text:  this.$t('notifications.updateNewStripe.success.message', {
                            name: this.inputName,
                        }),
                    });
                } else {
                    this.$notify({
                        group: NOTIFICATIONS_GROUP,
                        type:  'success',
                        title: this.$t('notifications.updateStripe.success.title'),
                        text:  this.$t('notifications.updateStripe.success.message', {
                            name: this.inputName,
                        }),
                    });
                }
            },
            onIconClick() {
                this.isIconSelectionOpened = true;
            },
            onIconChange(icon) {
                this.inputIcon             = icon;
                this.isIconSelectionOpened = false;
            },
            closeIconSelector() {
                this.isIconSelectionOpened = false;
            },
        },
        mounted() {
            this.$nextTick(() => {
                const stripe = this.getStripe;

                if (stripe) {
                    const roomId = stripe.roomId !== -1 ? stripe.roomId : 0;

                    this.inputRoom            = roomId;
                    this.inputName            = stripe.name;
                    this.inputIcon            = stripe.icon;
                    this.inputNotes           = stripe.notes;
                    this.inputLedCount        = stripe.ledCount;
                    this.inputIsReversed      = stripe.reversed;
                    this.inputIsDisabled      = stripe.disabled;
                    this.brightnessAdjustment = stripe.brightnessAdjustment;
                }
                document.querySelector('.content-window').scrollTo(0, 0);
            });
        },
    };
</script>
