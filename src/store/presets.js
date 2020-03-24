export default {
    state:   {
        presets: [
            {
                id:             0,
                name:           'RGB',
                gradientPoints: [
                    {
                        id:    0,
                        color: '#ff0000',
                    },
                    {
                        id:    1,
                        color: '#00ff00',
                    }, {
                        id:    1,
                        color: '#0000ff',
                    }
                ],
            },
            {
                id:             1,
                name:           'Spring',
                gradientPoints: [
                    {
                        id:    0,
                        color: '#00ffff',
                    },
                    {
                        id:    1,
                        color: '#aaff00',
                    }, {
                        id:    1,
                        color: '#ff7700',
                    }
                ],
            }
        ],
    },
    getters: {
        getPresets: state => state.presets,
    },
};
