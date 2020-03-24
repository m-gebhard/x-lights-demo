<template>
    <div class="presets-modal">
        <modal :identifier="getModalKey" :title="$t('modals.presets.title')">
            <div v-if="getPresets.length < 1" class="presets-modal__text">
                {{ $t('modals.presets.noItems') }}
            </div>
            <ul>
                <li v-for="preset in getPresets"
                    :key="`preset-#${preset.id}`"
                    class="presets-modal__list-item"
                    @click.prevent="onPresetClick(preset)">

                    <div class="presets-modal__list-preview"
                         :style="presetStyle(preset)">
                        <span>{{ preset.name }}</span>
                    </div>

                    <div class="presets-modal__list-item-options">
                        <div class="presets-modal__list-item-option"
                             @click.stop="onRemoveClick(preset)">
                            <font-awesome-icon class="presets-modal__list-item-icon"
                                               icon="trash">
                            </font-awesome-icon>
                        </div>
                    </div>
                </li>
            </ul>
        </modal>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import Modal                      from './../layout/Modal';
    import {
        PRESETS_MODAL_KEY,
    }                                 from './../../utils/constants';
    import { confirm }                from './../../utils/confirmation';

    export default {
        name:       'preset-modal',
        components: { Modal },
        computed:   {
            ...mapGetters([
                'getModal',
                'getPresets',
            ]),

            modal() {
                return this.getModal(this.getModalKey);
            },
            getModalKey() {
                return PRESETS_MODAL_KEY;
            },
        },
        methods:    {
            ...mapActions([
                'setModalOpenState',
            ]),

            onPresetClick() {
                this.setModalOpenState({
                    key:       this.getModalKey,
                    openState: false,
                });
            },
            onRemoveClick(preset) {
                confirm({
                    title:       this.$t('modals.presets.deleteConfirmation.title', {
                        name: preset.name,
                    }),
                    message:     this.$t('modals.presets.deleteConfirmation.message', {
                        name: preset.name,
                    }),
                    confirmText: this.$t('modals.confirmation.accept'),
                    declineText: this.$t('modals.confirmation.decline'),
                }).then((result) => {
                    if (result) {
                        this.$notify({
                            group: NOTIFICATIONS_GROUP,
                            type:  'success',
                            title: this.$t('notifications.updatePresets.success.title'),
                            text:  this.$t('notifications.updatePresets.success.message'),
                        });
                    }
                });
            },
            presetStyle(preset) {
                let points = preset.gradientPoints.map((_point) => _point.color);

                return {
                    background: `linear-gradient(to right, ${points || 'red'})`,
                };
            },
        },
    };
</script>
