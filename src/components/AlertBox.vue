<template>
    <transition-group name="appear" tag="div">
        <div key="box"
             :style="style"
             class="alert-box"
             :class="classes"
             @click="isOpened = false">
            <span class="alert-box__content">
                <font-awesome-icon class="alert-box__content-close"
                                   icon="exclamation-circle">
                </font-awesome-icon>
            </span>
            <div v-html="$slots.default[0].text"></div>
        </div>
    </transition-group>
</template>

<script>
    export default {
        name:     'alert-box',
        data() {
            return {
                style: {},
                isOpened: true,
            };
        },
        computed: {
            classes() {
                return {
                    ['alert-box--opened']: this.isOpened,
                };
            },
        },
        watch: {
            isOpened(state) {
                setTimeout(() => {
                    this.style = {
                        display: `${state ? 'flex' : 'none'}`
                    };
                }, 250);
            }
        },
    };
</script>
