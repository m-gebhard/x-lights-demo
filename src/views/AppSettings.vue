<template>
    <form @submit.prevent="updateOptions" class="app-settings content-window__mask">
        <div class="row row--align-end">
            {{ getVersion }}
        </div>
        <text-divider>
            {{ $t('optionsView.appearance') }}
        </text-divider>
        <div class="row">
            <div class="column">
                <custom-input v-model="selectedLanguage"
                              :label="$t('optionsView.language')"
                              type="select"
                              @input="updateOptions"
                              :options="getAvailableLanguages">
                </custom-input>
            </div>
        </div>
        <div class="row">
            <custom-input v-model="inputTheme"
                          :options="getAvailableThemes"
                          type="select"
                          :label="$t('optionsView.theme')"
                          @input="updateTheme($event)">
            </custom-input>
        </div>
        <div class="row">
            <div class="column column--margin-right column--margin-bottom">
                <custom-checkbox checked="false"
                                 disabled="true"
                                 :label="$t('optionsView.enableOfflineStripeBgs')">
                </custom-checkbox>
            </div>
            <div class="column">
                <custom-checkbox v-model="isShowingStripesAsSquares"
                                 :label="$t('optionsView.showStripesAsSquares')">
                </custom-checkbox>
            </div>
        </div>
        <div class="row row--margin-top">
            <button class="column" type="submit">
                {{ $t('ledDetailView.save') }}
            </button>
        </div>
    </form>
</template>

<script>
    import { mapGetters, mapActions }              from 'vuex';
    import CustomCheckbox                          from '../components/CustomCheckbox';
    import CustomInput                             from '../components/CustomInput';
    import { NOTIFICATIONS_GROUP, LATEST_VERSION } from './../utils/constants';
    import THEMES                                  from './../utils/themes';
    import Collapsible                             from '../components/Collapsible';
    import TextDivider                             from '../components/TextDivider';

    export default {
        name:       'app-settings',
        components: { TextDivider, Collapsible, CustomInput, CustomCheckbox },
        data() {
            return {
                selectedLanguage:          0,
                inputTheme:                '',
                enableOfflineStripeBgs:    false,
                isShowingStripesAsSquares: false,
            };
        },
        methods:    {
            ...mapActions([
                'setStripeBackgroundOfflineState',
                'setStripeAsSquareState',
                'updateUserOptions',
                'setLanguage',
                'updateTheme',
            ]),

            updateOptions() {
                const lang        = Object.keys(this.getAvailableLanguages)[this.selectedLanguage];

                this.$i18n.locale = lang;
                this.$notify({
                    group: NOTIFICATIONS_GROUP,
                    type:  'success',
                    title: this.$t('notifications.updateOptions.success.title'),
                    text:  this.$t('notifications.updateOptions.success.message'),
                });
            },
        },
        computed:   {
            ...mapGetters([
                'getLanguage',
                'getSelectedTheme',
                'showStripesAsSquares',
                'isOfflineStripeBackgroundEnabled',
            ]),

            getAvailableLanguages() {
                return {
                    'en': 0,
                    'de': 1,
                };
            },
            getAvailableThemes() {
                let themes = [];
                THEMES.forEach((_theme, i) => {
                    themes[_theme.name] = i;
                });

                return themes;
            },
            getVersion() {
                return LATEST_VERSION;
            },
        },
        mounted() {
            this.selectedLanguage          = this.getAvailableLanguages[this.getLanguage];
            this.enableOfflineStripeBgs    = this.isOfflineStripeBackgroundEnabled;
            this.isShowingStripesAsSquares = this.showStripesAsSquares;
            this.inputTheme                = this.getSelectedTheme;
            window.scrollTo(0, 0);
        },
    };
</script>

