<template>
    <label class="custom-checkbox">
        <div class="custom-checkbox__input">
            <input type="checkbox"
                   :checked="value"
                   :disabled="disabled"
                   @change="onInput">
            <span class="custom-checkbox__input-checkmark">
                <font-awesome-icon icon="check"></font-awesome-icon>
            </span>
        </div>
        <span class="custom-checkbox__label">
            {{ label }}
        </span>
    </label>
</template>

<script>
    export default {
        name:    'custom-checkbox',
        props:   {
            value:    {},
            label:    {},
            disabled: {},
        },
        methods: {
            onInput(event) {
                const value = event.target.checked;
                this.$emit('input', value);
            },
        },
    };
</script>

