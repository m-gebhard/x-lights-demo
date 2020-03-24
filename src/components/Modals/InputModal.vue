<template>
    <div>
        <div class="modal modal--auto-height">
            <div class="modal__head">
                <span>{{ title }}</span>
                <div class="modal__head-close-button"
                     @click="cancel">
                    <font-awesome-icon icon="times"></font-awesome-icon>
                </div>
            </div>
            <div class="modal__content modal__content--centered"
                 v-if="message"
                 v-html="message">
            </div>
            <validation-observer v-slot="{ invalid }">
                <form>
                    <div class="modal__content modal__content--centered">
                        <custom-input v-model="inputText" :rules="getRules"></custom-input>
                    </div>

                    <div class="modal__footer">
                        <button :disabled="invalid"
                                class="modal__footer-button"
                                @click="confirm">
                            {{ confirmText }}
                        </button>
                    </div>
                </form>
            </validation-observer>
        </div>
        <div class="modal-overlay"></div>
    </div>
</template>

<script>
    import Modal               from '../layout/Modal';
    import CustomInput         from '../CustomInput';
    import { INPUT_MODAL_KEY } from './../../utils/constants';

    export default {
        name:       'confirmation',
        components: { CustomInput, Modal },
        props:      {
            title:       {},
            message:     {},
            confirmText: {},
            declineText: {},
            rules:       {},
        },
        data() {
            return {
                inputText: '',
            };
        },
        methods:    {
            confirm() {
                this.$emit('confirm', this.inputText);
            },
            cancel() {
                this.$emit('cancel');
            },
        },
        computed:   {
            getModalKey() {
                return INPUT_MODAL_KEY;
            },
            getRules() {
                return `required|${this.rules || ''}`;
            },
        },
    };
</script>
