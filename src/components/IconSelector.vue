<template>
    <div class="icon-selector" :class="classes">
        <template v-for="(letter, i) in getIconAlphabetical">
            <div class="icon-selector__letter">
                {{ letter.title }}
            </div>
            <div v-for="icon in letter.icons"
                 class="icon-selector__item"
                 @click.stop="onIconClick(icon)">

                <div v-if="icon !== undefined"
                     :key="`icon-selector-item-#${i}`">
                    <font-awesome-icon :icon="icon"></font-awesome-icon>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import faIcons from '../utils/faIcons';

    export default {
        name:     'icon-selector',
        props:    {
            open: {
                default: false,
            },
        },
        computed: {
            getIcons() {
                return faIcons;
            },
            getIconAlphabetical() {
                return Object.values(
                    this.getIcons.reduce((acc, word) => {
                        let firstLetter = word[0].toLowerCase();
                        if (!acc[firstLetter]) {
                            acc[firstLetter] = { title: firstLetter, icons: [word] };
                        } else {
                            acc[firstLetter].icons.push(word);
                        }
                        return acc;
                    }, {})
                );
            },
            classes() {
                return {
                    ['icon-selector--open']: this.open,
                };
            },
        },
        methods:  {
            onIconClick(icon) {
                this.$emit('input', icon);
            },
        },
    };
</script>
