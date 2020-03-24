<template>
    <div class="collapsible" :class="classes">
        <div v-if="$slots.head" @click="toggleOpenState">
            <slot name="head"></slot>
        </div>
        <div v-else
             class="collapsible__head"
             :class="{'collapsible__head--opened' : isOpened}"
             @click="toggleOpenState">

            <div class="collapsible__head-title">
                <slot v-if="$slots.title" name="title"></slot>
                <template v-else>
                    {{ title }}
                </template>
            </div>

            <div v-if="actions.length > 0"
                 class="collapsible__head-actions-bar"
                 :class="{'collapsible__head-actions-bar--opened' : isOpened}">
                <div v-for="(action, i) in actions"
                     :key="`action-${i}`"
                     class="collapsible__head-action">
                    <font-awesome-icon :icon="action.icon"></font-awesome-icon>
                </div>
            </div>
            <font-awesome-icon class="collapsible__head-icon" icon="angle-up"></font-awesome-icon>
        </div>
        <div class="collapsible__content"
             :class="{'collapsible__content--open': isOpened}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name:     'collapsible',
        props:    {
            title:         {},
            actions:       {
                default: () => [],
            },
            transparent:   {
                default: false,
            },
            initiallyOpen: {
                default: false,
            },
            noPadding:     {
                default: false,
            },
        },
        data() {
            return {
                isOpened: false,
            };
        },
        computed: {
            classes() {
                return {
                    ['collapsible--transparent']: this.transparent,
                    ['collapsible--no-padding']:  this.noPadding,
                };
            }
        },
        methods:  {
            toggleOpenState() {
                this.isOpened = !this.isOpened;
            },
        },
        mounted() {
            this.isOpened = this.initiallyOpen;
        },
    };
</script>
