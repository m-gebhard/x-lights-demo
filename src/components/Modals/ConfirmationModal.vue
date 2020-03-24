<template>
    <div v-outside-click="decline">
        <div class="modal modal--auto-height">
            <div class="modal__head">
                <span>{{ title }}</span>
                <div class="modal__head-close-button"
                     @click="decline">
                    <font-awesome-icon icon="times"></font-awesome-icon>
                </div>
            </div>
            <div class="modal__content modal__content--centered" v-html="message"></div>
            <div class="modal__footer">
                <button class="modal__footer-button modal__footer-button--decline"
                        @click="confirm">
                    {{ confirmText }}
                </button>
                <button class="modal__footer-button"
                        @click="decline">
                    {{ declineText }}
                </button>
            </div>
        </div>
        <div class="modal-overlay"></div>
    </div>
</template>

<script>
    import Modal                      from '../layout/Modal';
    import CustomInput                from '../CustomInput';
    import { CONFIRMATION_MODAL_KEY } from './../../utils/constants';

    export default {
        name:       'confirmation',
        components: { CustomInput, Modal },
        props:      {
            title:       {},
            message:     {},
            confirmText: {},
            declineText: {},
        },
        methods:    {
            init() {
            },
            confirm() {
                this.$emit('confirm');
            },
            decline() {
                this.$emit('cancel');
            },
        },
        computed:   {
            getModalKey() {
                return CONFIRMATION_MODAL_KEY;
            },
        },
    };
</script>
