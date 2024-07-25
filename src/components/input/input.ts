import Handlebars from 'handlebars'

Handlebars.registerHelper('isFilled', function (value) {
    return value !== '';
});

export { default as Input } from './input.hbs?raw'
