<template>
    <div class="custom-input" :class="wrapperClasses">
        <label class="custom-input__label" :for="name">
            {{ label }}
        </label>
        <validation-provider class="custom-input__validation-wrapper"
                             v-slot="{ errors }"
                             :rules="rules"
                             tag="div">
            <input v-if="type !== 'select'"
                   @input="onInput"
                   :value="value"
                   :name="name"
                   :type="type"
                   :disabled="disabled"
                   :placeholder="placeholder"
                   :class="classes(errors)"
                   class="custom-input__input">
            <div v-else :class="classes(errors)">
                <select @input="onInput" :value="value">
                    <option v-for="option in getSelectOptions" :value="option.value">
                        {{ option.name }}
                    </option>
                </select>
                <font-awesome-icon class="custom-input__input-icon" icon="angle-up"></font-awesome-icon>
            </div>
            <span class="custom-input__errors">
                {{ errors[0] }}
            </span>
        </validation-provider>
    </div>
</template>

<script>
    export default {
        name:     'custom-input',
        props:    {
            value:       {},
            label:       {},
            type:        {
                type:    String,
                default: 'text',
            },
            disabled:    {
                default: false,
            },
            options:     {},
            rowAligned:  {
                default: false,
            },
            rules:       {},
            placeholder: {},
        },
        data() {
            return {
                name: this.label,
            };
        },
        computed: {
            wrapperClasses() {
                return {
                    ['custom-input--row']: this.rowAligned,
                };
            },
            getSelectOptions() {
                return Object.keys(this.options).map((_option, i) => {
                    return {
                        value: this.options[_option],
                        name:  _option.replace('_', ' '),
                    };
                });
            },
        },
        methods:  {
            classes(validationErrors) {
                return {
                    ['custom-input--color']:  this.type === 'color',
                    ['custom-input--select']: this.type === 'select',
                    ['custom-input--error']:  validationErrors.length > 0,
                };
            },
            onInput(event) {
                const value = this.type === 'select'
                    ? parseInt(event.target.value)
                    : event.target.value;

                this.$emit('input', value);
            },
        },
    };
</script>

