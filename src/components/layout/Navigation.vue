<template>
    <div class="navigation">
        <div v-for="(item, i) in items"
             :key="`nav-link-#${i}`"
             class="navigation__link">

            <router-link class="navigation__link-anchor"
                         :class="classes(item)"
                         :to="item.link">
                <span class="navigation__link-text">
                    {{ item.title }}
                </span>
                <font-awesome-icon class="navigation__link-icon"
                                   :icon="item.icon">
                </font-awesome-icon>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name:    'navigation',
        data() {
            return {
                items: [
                    {
                        link:  '/strips',
                        icon:  'braille',
                        title: this.$t('navigation.stripes'),
                    },
                    {
                        link:  '/control',
                        icon:  'sun',
                        title: this.$t('navigation.ledControl'),
                    },
                    {
                        link:  '/settings',
                        icon:  'cog',
                        title: this.$t('navigation.appSettings'),
                    }
                ],
            };
        },
        methods: {
            classes(item) {
                const route = this.$route.path;
                return {
                    ['router-link-active']: item.link === '/strips' && (route === '/' || route.indexOf('/strips') !== -1),
                };
            },
        },
    };
</script>
