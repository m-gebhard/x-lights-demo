<template>
    <div v-if="isOpen" v-outside-click="close">
        <div class="modal">
            <div class="modal__head">
                <span>{{ title }}</span>
                <div class="modal__head-close-button" @click="close">
                    <font-awesome-icon icon="times"></font-awesome-icon>
                </div>
            </div>
            <div class="modal__content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name:     'modal',
        props:    {
            identifier: {},
            title:      {},
            onClose:    {},

        },
        computed: {
            ...mapGetters(['getModalOpenState']),

            isOpen() {
                return this.getModalOpenState(this.identifier);
            },
        },
        methods:  {
            ...mapActions(['setModalOpenState']),

            close() {
                if (this.onClose) {
                    this.onClose();
                } else {
                    this.setModalOpenState({
                        key:       this.identifier,
                        openState: false,
                    });
                }
            },
        },
        watch: {
            isOpen(open) {
                if (open) {
                    this.$emit('onOpen');
                } else {
                    this.$emit('onClose');
                }
            },
        },
    };
</script>
