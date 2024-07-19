import Handlebars from 'handlebars';
import {Link} from '../../components/link/link.ts';
import {Error} from '../../components/error/error.ts'

Handlebars.registerPartial('Link', Link);

const template = Handlebars.compile(Error);

const error_500 = () => {
    const context = {
        code: 500,
        text: 'Мы уже фиксим'
    };

    return template(context);
};

document.querySelector<HTMLDivElement>('#app')!.innerHTML = error_500();

export default error_500;
