export default {
    bind(el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
            if (!(el === event.target || el.contains(event.target))) {
                vnode.context[binding.expression](event);
            }
        };

        setTimeout(() => {
            document.addEventListener('click', el.clickOutsideEvent);
            document.addEventListener('touchstart', el.clickOutsideEvent);
        }, 600);
    },
    unbind(el) {
        document.removeEventListener('click', el.clickOutsideEvent);
        document.removeEventListener('touchstart', el.clickOutsideEvent);

        // Timeout before listening to new clicks
        document.body.style.pointerEvents = 'none';
        setTimeout(() => {
            document.body.style.pointerEvents = 'initial';
        }, 600);
    },
};
