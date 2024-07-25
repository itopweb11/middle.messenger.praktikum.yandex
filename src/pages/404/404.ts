import Handlebars from 'handlebars';
import {Link} from '../../components/link/link.ts';

import {Error} from '../../components/error/error.ts'

Handlebars.registerPartial('Link', Link);

const template = Handlebars.compile(Error);

const error_404 = () => {
    const context = {
        code: 404,
        text: 'Не туда попали'
    };

    return template(context);
};

document.querySelector<HTMLDivElement>('#app')!.innerHTML = error_404();

export default error_404;
