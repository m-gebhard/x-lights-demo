<template>
    <div class="gradient-editor">
        <div class="gradient-editor__config-panel">
            <span>{{ $t('ledControlView.gradientEditor') }}</span>
            <div class="gradient-editor__config-panel-divider"></div>
            <button @click.prevent="openPresetsModal">
                <font-awesome-icon icon="heart"></font-awesome-icon>
            </button>
            <div class="gradient-editor__config-panel-divider"></div>
            <button disabled>
                <font-awesome-icon icon="plus"></font-awesome-icon>
            </button>
            <button disabled>
                <font-awesome-icon icon="trash"></font-awesome-icon>
            </button>
        </div>

        <div class="gradient-editor__preview"
             ref="gradientEditorFrame"
             :style="gradientStyle">
            <div v-for="(point, i) in gradientPoints"
                 v-model="dragData"
                 :key="`color-#${i}`"
                 :index="point.pos"
                 :style="gradientPointStyle($el, point)"
                 class="gradient-editor__preview-point"
                 :class="gradientPointClasses(point, i)">
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { Chrome }                 from 'vue-color';
    import { PRESETS_MODAL_KEY }      from './../utils/constants';
    import { hexToRGB }               from './../utils/helpers';
    import CustomInput                from './CustomInput';

    export default {
        name:       'gradient-editor',
        components: { CustomInput, Chrome },
        props:      {
            gradientPoints:        {},
            addGradientPoint:      {},
            removeGradientPoint:   {},
            updateGradientPoint:   {},
            onlyEnableFirst:       {},
            enabledGradientPoints: {},
        },
        data() {
            return {
                dragData:        {},
                selectedColor:   '#ff0000',
                selectedPointId: -1,
                isMoving:        false,
                allowUnsetPoint: false,
                isMounted:       false,
            };
        },
        computed:   {
            ...mapGetters(['getGradientPoints', 'getStripes', 'getPresets']),

            gradientStyle() {
                const _points = [...this.gradientPoints].sort((_a, _b) => _a.pos - _b.pos);
                const points  = _points.map((_point) => {
                    return `${_point.color}`;
                });

                return {
                    background: `linear-gradient(to right, ${points})`
                };
            },
            getTotalLedsCount() {
                return this.getStripes.reduce((_prev, _curr) => _prev + _curr.ledCount, 0);
            },
        },
        methods:    {
            ...mapActions([
                'setModalOpenState',
            ]),

            openPresetsModal() {
                this.setModalOpenState({
                    key:       PRESETS_MODAL_KEY,
                    openState: true,
                });
            },
            gradientPointStyle(elem, point) {
                const rgb = hexToRGB(point.color);

                return {
                    background: `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.03)`,
                };
            },
            gradientPointClasses(point, i) {
                return {
                    ['gradient-editor__preview-point--selected']: point.id === this.selectedPointId,
                    ['gradient-editor__preview-point--disabled']:
                                                                  this.enabledGradientPoints && this.enabledGradientPoints.indexOf(i) === -1,
                };
            },
        },
        mounted() {
            this.isMounted = true;
            this.gradientPoints.sort((_a, _b) => _a.pos - _b.pos);
        },
    };
</script>
