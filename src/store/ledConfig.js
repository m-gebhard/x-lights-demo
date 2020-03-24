export default {
    state:   {
        syncStatus:     true,
        ledConfigs:     [{
            id:                 0,
            roomId:             0,
            usedSensor:         -1,
            mode:               Math.floor(Math.random() * 3) + 1,
            lastUsedMode:       -1,
            moving:             true,
            fading:             false,
            speed:              75,
            brightness:         100,
            sensorTriggerValue: 0,
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
        }],
        // local points for gradient editor
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
    getters: {
        getSyncStatus:        state => state.syncStatus,
        getAllLedConfigs:     state => state.ledConfigs,
        getGradientPoints:    state => state.gradientPoints,
        getLedConfigByRoomId: state => roomId => state.ledConfigs.find((_config) => _config.roomId === roomId),
    },
};
