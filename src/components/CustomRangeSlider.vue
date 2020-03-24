<template>
    <div class="custom-range-slider">
        <div class="custom-range-slider__label">
            <label>
                {{ label }}
            </label>
        </div>
        <div class="custom-range-slider__input">
            <input type="range"
                   :value="value"
                   :min="min"
                   :max="max"
                   :step="step"
                   @input="onInput">
            <div class="custom-range-slider__value">
                <span>{{ usePercentageIndicator ? getInputPercentage : value }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapValue } from './../utils/helpers';

    export default {
        name:     'custom-range-slider',
        props:    {
            value:                  {},
            label:                  {},
            min:                    {},
            max:                    {},
            step:                   {
                default: 1,
            },
            usePercentageIndicator: {
                default: false,
            },
        },
        computed: {
            getInputPercentage() {
                return Math.round(mapValue(this.value, {
                    inMin:  this.min,
                    inMax:  this.max,
                    outMin: 0,
                    outMax: 100,
                }));
            },
        },
        methods:  {
            onInput(event) {
                const value = event.target.value;
                this.$emit('input', value);
            },
        },
    };
</script>

