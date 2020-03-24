<template>
    <div class="stripes-overview-header">
        <div class="stripes-overview-header__info">
            <span>{{ $t('stripesOverView.total') }} {{ getTotalLedsCount }}</span>
            <span>{{ $t('stripesOverView.online') }} {{ getOnlineStripesCount }}</span>
        </div>
        <div class="stripes-overview-header__info stripes-overview-header__info--mobile">
            <div>
                <font-awesome-icon icon="bolt"></font-awesome-icon>
                {{ getOnlineStripesCount }}
            </div>
            <div>
                <font-awesome-icon :icon="['fab', 'delicious']"></font-awesome-icon>
                {{ getTotalLedsCount }}
            </div>
        </div>

        <div class="stripes-overview-header__icon-group">
            <div class="stripes-overview-header__icon-group-item"
                 @click="isInAnyEditMode ? onSaveClick() : onAddClick()">
                <font-awesome-icon :icon="isInAnyEditMode ? 'save' : 'plus'"/>
            </div>
            <div class="stripes-overview-header__icon-group-item"
                 :class="{ 'stripes-overview-header__icon-group-item--active' : getDragMode }"
                 @click="onOrderConfigClick">
                <font-awesome-icon icon="layer-group"/>
            </div>
            <div class="stripes-overview-header__icon-group-item"
                 :class="{ 'stripes-overview-header__icon-group-item--active' : getBulkDeleteMode }"
                 @click="onTrashcanClick">
                <font-awesome-icon icon="trash"/>
            </div>
        </div>

        <div class="stripes-overview-header__divider"></div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name:     'stripes-overview-header',
        props:    {
            isAddingEnabled:    {},
            onAddClick:         {},
            onSaveClick:        {},
            onTrashcanClick:    {},
            onOrderConfigClick: {},
        },
        computed: {
            ...mapGetters([
                'getLeds',
                'getStripes',
                'getDragMode',
                'isInAnyEditMode',
                'getBulkDeleteMode',
                'getOnlineStripeIds'
            ]),

            getTotalLedsCount() {
                return this.getStripes.reduce((_prev, _curr) => _prev + _curr.ledCount, 0);
            },
            getOnlineStripesCount() {
                return this.getOnlineStripeIds.length;
            },
        },
    };
</script>
