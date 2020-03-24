export const mapValue = (value, parameters) => {
    return ((value - parameters.inMin) * (parameters.outMax - parameters.outMin) / (parameters.inMax - parameters.inMin) + parameters.outMin);
};

export const hexToRGB = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
    ] : null;
};
