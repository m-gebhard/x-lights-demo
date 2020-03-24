import Vue          from 'vue';
import Confirmation from './../components/Modals/ConfirmationModal';

export function confirm(options) {
    return new Promise((resolve) => {
        const dialog = new Vue({
            methods: {
                closeHandler(fn, arg) {
                    return function () {
                        fn(arg);
                        dialog.$destroy();
                        dialog.$el.remove();
                    };
                }
            },
            render(h) {
                return h(Confirmation, {
                    props: {
                        title:       options.title,
                        message:     options.message,
                        confirmText: options.confirmText,
                        declineText: options.declineText,
                    },
                    on:    {
                        confirm: this.closeHandler(resolve, true),
                        cancel:  this.closeHandler(resolve, false)
                    }
                });
            }
        }).$mount();
        document.body.appendChild(dialog.$el);
    });
}
