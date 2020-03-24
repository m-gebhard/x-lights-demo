<template>
    <modal :identifier="getModalKey" :title="$t('modals.room.title')" @onOpen="init">
        <validation-observer v-slot="{ invalid }">
            <form @submit.prevent="onSubmit">
                <div class="row">
                    <custom-input v-model="name"
                                  rules="required"
                                  :label="$t('modals.room.name')">
                    </custom-input>
                </div>
                <div class="row">
                    <button :disabled="invalid">{{ getSaveButtonText }}</button>
                    <button @click.prevent="onDeleteClick"
                            :disabled="invalid || getRooms.length < 2"
                            v-if="!isNewRoom" class="button--red">
                        {{ $t('modals.room.delete')}}
                    </button>
                </div>
            </form>
        </validation-observer>
    </modal>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import Modal                      from './../layout/Modal';
    import CustomInput                from '../CustomInput';
    import { confirm }                from './../../utils/confirmation';
    import {
        ROOM_MODAL_KEY,
        NOTIFICATIONS_GROUP
    }                                 from './../../utils/constants';

    export default {
        name:       'room-modal',
        components: { CustomInput, Modal },
        data() {
            return {
                id:        -1,
                name:      '',
                isNewRoom: true,
            };
        },
        computed:   {
            ...mapGetters([
                'getModal',
                'getRooms',
                'getAllLedConfigs',
                'getLedConfigByRoomId',
            ]),

            modal() {
                return this.getModal(this.getModalKey);
            },
            getModalKey() {
                return ROOM_MODAL_KEY;
            },
            getSaveButtonText() {
                return !this.isNewRoom
                    ? this.$t('modals.room.update')
                    : this.$t('modals.room.add');
            },
        },
        methods:    {
            ...mapActions([
                'setModalOpenState',
                'addRoom',
                'addConfig',
                'removeConfig',
            ]),

            init() {
                const payload  = this.modal.payload;
                this.name      = payload ? payload.name : '';
                this.isNewRoom = !payload;
                this.id        = payload
                    ? payload.id
                    : Math.max(...this.getRooms.map((_room) => _room.id)) + 1;
            },
            onSubmit() {
                this.$notify({
                    group: NOTIFICATIONS_GROUP,
                    type:  'success',
                    title: this.$t('notifications.updateRoom.success.title'),
                    text:  this.$t('notifications.updateRoom.success.message', {
                        name: this.name,
                    }),
                });
                this.setModalOpenState({
                    key:       this.getModalKey,
                    openState: false,
                });
            },
            onDeleteClick() {
                this.setModalOpenState({
                    key:       this.getModalKey,
                    openState: false,
                });
                confirm({
                    title:       this.$t('modals.room.deleteConfirmation.title', {
                        name: this.name,
                    }),
                    message:     this.$t('modals.room.deleteConfirmation.message', {
                        name: this.name,
                    }),
                    confirmText: this.$t('modals.confirmation.accept'),
                    declineText: this.$t('modals.confirmation.decline'),
                }).then((result) => {
                    if (result) {
                        const roomIndex = this.getRooms.findIndex((_room) => _room.id === this.id);

                        if (roomIndex !== -1) {
                            this.$notify({
                                group: NOTIFICATIONS_GROUP,
                                type:  'success',
                                title: this.$t('modals.room.deleteConfirmation.confirmation.title'),
                                text:  this.$t('modals.room.deleteConfirmation.confirmation.message', {
                                    room: this.name,
                                }),
                            });
                        }
                        this.setModalOpenState({
                            key:       this.getModalKey,
                            openState: false,
                        });
                    }
                });
            },
        },
    };
</script>
