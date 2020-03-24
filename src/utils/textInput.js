import Vue        from 'vue';
import InputModal from './../components/Modals/InputModal';

export function textInput(options) {
    return new Promise((resolve) => {
        const dialog = new Vue({
            methods: {
                closeHandler(fn, arg) {
                    fn(arg);
                    dialog.$destroy();
                    dialog.$el.remove();
                }
            },
            render(h) {
                return h(InputModal, {
                    props: {
                        title:       options.title,
                        message:     options.message,
                        confirmText: options.confirmText,
                        declineText: options.declineText,
                    },
                    on:    {
                        confirm: (event) => {
                            this.closeHandler(resolve, event);
                        },
                        cancel:  () => {
                            this.closeHandler(resolve);
                        }
                    }
                });
            }
        }).$mount();
        document.body.appendChild(dialog.$el);
    });
}
