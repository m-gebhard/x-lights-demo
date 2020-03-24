import {
    ValidationProvider,
    ValidationObserver,
    extend,
    localize,
}         from 'vee-validate';
import {
    required,
    numeric,
    min_value,
    max_value,
    regex,
}         from 'vee-validate/dist/rules';
import en from './../lang/en';

extend('required', {
    ...required,
});
extend('numeric', {
    ...numeric,
});
extend('min_value', {
    ...min_value,
});
extend('max_value', {
    ...max_value,
});
extend('regex', {
    ...regex,
});

localize({
    en: {
        messages: en.validator,
    }
});

export default { ValidationProvider, ValidationObserver };
