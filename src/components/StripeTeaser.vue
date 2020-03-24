<template>
    <div class="stripe-teaser"
         :class="classes"
         @click.prevent="onLinkClick">

        <div :class="miniTeaser ? 'stripe-teaser--mini__content' : 'stripe-teaser__content'">
            <template v-if="!miniTeaser">
                <div class="stripe-teaser__content-row stripe-teaser__content-text stripe-teaser__content-text--heading">
                    <div class="stripe-teaser__content-title">
                        {{ stripe.name }}
                        <span v-if="isOnline && isOutdated" class="stripe-teaser__content-title-icon">
                        <font-awesome-icon
                                class="stripe-teaser__footer-icon--warning"
                                icon="exclamation-circle">
                        </font-awesome-icon>
                    </span>
                    </div>
                    <template v-if="stripe.roomId === -1">
                        [<span class="stripe-teaser__content-text--grey">{{ stripe.id }}</span>]
                    </template>
                </div>
                <div class="stripe-teaser__content-row stripe-teaser__content-text">
                    <font-awesome-icon icon="stopwatch"></font-awesome-icon>
                    {{ getFormattedStripeRuntime }}
                </div>
                <div class="stripe-teaser__content-row stripe-teaser__content-text">
                    <font-awesome-icon :icon="['fab', 'delicious']"></font-awesome-icon>
                    {{ stripe.ledCount }}
                </div>
            </template>
            <template v-else>
                <div class="stripe-teaser--mini__content-wrapper">
                    <font-awesome-icon :icon="stripe.icon ? stripe.icon : 'atom'"></font-awesome-icon>
                </div>
            </template>
        </div>
        <transition-group name="appear" tag="div">
            <template v-if="getDragMode">
                <div key="drag" class="stripe-teaser__content-overlay stripe-teaser__content-overlay--drag">
                    <div v-show="canMoveLeft"
                         class="stripe-teaser__content-overlay-icon">
                        <font-awesome-icon icon="caret-left"></font-awesome-icon>
                    </div>
                    <div v-show="canMoveRight"
                         class="stripe-teaser__content-overlay-icon">
                        <font-awesome-icon icon="caret-right"></font-awesome-icon>
                    </div>
                </div>
            </template>
            <template v-if="getBulkDeleteMode && !miniTeaser">
                <div key="delete" class="stripe-teaser__content-overlay stripe-teaser__content-overlay--delete">
                    <font-awesome-icon icon="times"></font-awesome-icon>
                </div>
            </template>
        </transition-group>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { NOTIFICATIONS_GROUP }    from './../utils/constants';
    import { confirm }                from './../utils/confirmation';

    export default {
        name:     'stripe-teaser',
        props:    {
            stripe:     {
                type:     Object,
                required: true,
            },
            isOnline:   {},
            miniTeaser: {
                default: false,
            },
        },
        methods:  {
            ...mapActions(['removeStripe', 'resetModes']),

            onLinkClick() {
                if (this.getBulkDeleteMode) {
                    confirm({
                        title:       this.$t('stripesOverView.removeStripeModal.title', {
                            stripe: this.stripe.name,
                        }),
                        message:     this.$t('stripesOverView.removeStripeModal.message', {
                            stripe: this.stripe.name,
                        }),
                        confirmText: this.$t('modals.confirmation.accept'),
                        declineText: this.$t('modals.confirmation.decline'),
                    }).then((result) => {
                        if (result) {
                            this.$notify({
                                group:    NOTIFICATIONS_GROUP,
                                type:     'success',
                                title:    this.$t('stripesOverView.removeStripeModal.confirmation.title'),
                                text:     this.$t('stripesOverView.removeStripeModal.confirmation.message', {
                                    stripe: this.stripe.name,
                                }),
                                duration: 5000,
                            });
                        }
                    });
                } else {
                    this.$router.push({
                        path: `/strips/${this.stripe.id}`,
                    });
                }
            },
        },
        computed: {
            ...mapGetters([
                'getLeds',
                'getStripes',
                'getDragMode',
                'isInAnyEditMode',
                'getStripeRuntime',
                'getBulkDeleteMode',
                'getStripesByRoomId',
                'isOfflineStripeBackgroundEnabled'
            ]),

            isOutdated() {
                return false;
            },
            isRootNode() {
                const leds = this.getLeds[0];

                if (leds) {
                    return leds.stripeId === this.stripe.id;
                }

                return false;
            },
            classes() {
                return {
                    ['stripe-teaser--online']:         this.isOnline,
                    ['stripe-teaser--disabled']:       this.stripe.disabled,
                    ['stripe-teaser--no-hover']:       this.getDragMode,
                    ['stripe-teaser--root-node']:      this.isRootNode,
                    ['stripe-teaser--bulk-delete']:    this.getBulkDeleteMode,
                    ['stripe-teaser--mini']:           this.miniTeaser,
                    ['stripe-teaser--mini--outdated']: this.miniTeaser && this.isOutdated,
                };
            },
            getFormattedStripeRuntime() {
                const runtimeMinutes   = this.getStripeRuntime(this.stripe.id);
                const runtimeHours     = Math.floor(runtimeMinutes / 60);
                const remainingMinutes = runtimeMinutes - ((runtimeHours) * 60);

                if (runtimeMinutes !== 0) {
                    return `${runtimeHours}h ${remainingMinutes}m`;
                } else {
                    return '-';
                }
            },
            canMoveLeft() {
                const smallestPosition = Math.min(...this.getRoomStrips.map((_strip) => _strip.position));
                return (this.stripe.position > smallestPosition);
            },
            canMoveRight() {
                const highestPosition = Math.max(...this.getRoomStrips.map((_strip) => _strip.position));
                return (this.stripe.position + 1 <= highestPosition);
            },
            getRoomStrips() {
                return this.getStripesByRoomId(this.stripe.roomId);
            },
        }
    };
</script>
